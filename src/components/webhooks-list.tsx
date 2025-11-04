import * as Dialog from '@radix-ui/react-dialog'
import { useMutation, useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { Loader2, Wand2Icon } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import z4 from 'zod/v4'
import { WEBHOOK_LIST_SCHEMA } from '../http/schemas/webhooks'
import { CodeBlock } from './ui/code-block'
import { WebhooksListItem } from './webhooks-list-item'

const GenerateHandlerResponse = z4.object({
  code: z4.string(),
})

export function WebhooksList() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [_checkedWebhookIds, setCheckedWebhookIds] = useState<string[]>([])
  const [_generatedHandlerCode, setGeneratedHandlerCode] = useState<
    string | null
  >(null)
  const _hasAnyWebhookChecked = _checkedWebhookIds.length > 0

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: ['webhooks'],
      queryFn: async ({ pageParam }) => {
        const url = new URL('http://localhost:3334/api/webhooks')
        if (pageParam) {
          url.searchParams.set('cursor', pageParam)
        }
        const response = await fetch(url)
        const data = await response.json()

        return WEBHOOK_LIST_SCHEMA.parse(data)
      },
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      select: (data) => ({
        webhooks: data.pages.flatMap((page) => page.webhooks),
        nextCursor: data.pages[data.pages.length - 1].nextCursor,
      }),
    })

  const { mutate: generatedHandlers, isPending } = useMutation({
    mutationFn: async (webhookIds: string[]) => {
      const _response = await fetch('http://localhost:3334/api/handlers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ids: webhookIds,
        }),
      })

      const _data = await _response.json()
      return GenerateHandlerResponse.parse(_data)
    },
    onSuccess: ({ code }) => {
      setGeneratedHandlerCode(code)
    },
  })

  const _handleCheckWebhook = useCallback((id: string) => {
    setCheckedWebhookIds((prevSelected) => {
      return prevSelected.includes(id)
        ? prevSelected.filter((webhookId) => webhookId !== id)
        : [...prevSelected, id]
    })
  }, [])

  useEffect(() => {
    if (loadMoreRef.current) {
      observerRef.current?.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (loadMoreRef.current) {
        observerRef.current?.disconnect()
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <>
      {/* Overlay while generating handlers */}
      {isPending && <div className="fixed inset-0 bg-zinc-800/50 z-50"></div>}

      <div className="flex-1">
        {/* Button */}
        <div className="px-2">
          <button
            type="button"
            className={twMerge(
              'flex items-center justify-center gap-2 w-full py-3 font-medium text-sm',
              'bg-indigo-400 text-slate-800 cursor-pointer my-3 rounded-lg',
              'hover:bg-indigo-500 transition-colors',
              'disabled:opacity-40 disabled:hover:bg-indigo-400 disabled:cursor-default',
            )}
            disabled={!_hasAnyWebhookChecked || isPending}
            onClick={() => generatedHandlers(_checkedWebhookIds)}
          >
            {isPending && (
              <>
                <Loader2 className="size-5 animate-spin" />{' '}
                <div>Generating handlers</div>
              </>
            )}
            {!isPending && (
              <>
                <Wand2Icon /> <div>Generate handlers</div>
              </>
            )}
          </button>
        </div>

        {/* Webhooks List */}
        <div className="space-y-1 p-2 max-h-[calc(100vh-168px)] overflow-y-auto pb-10">
          {data.webhooks.map((webhook) => (
            <WebhooksListItem
              key={webhook.id}
              data={webhook}
              checked={_checkedWebhookIds.includes(webhook.id)}
              onCheckedChange={() => _handleCheckWebhook(webhook.id)}
            />
          ))}

          {/* Load More Indicator */}
          {hasNextPage && (
            <div className="p-2" ref={loadMoreRef}>
              {isFetchingNextPage && (
                <div className="flex items-center justify-center">
                  <Loader2 className="size-5 animate-spin" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Generated Handler Code Dialog */}
      <Dialog.Root
        open={!!_generatedHandlerCode}
        onOpenChange={(open) => {
          if (!open) {
            setGeneratedHandlerCode(null)
          }
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-zinc-600/80" />
          <Dialog.Content className="fixed bg-zinc-900 left-1/2 top-1/2 max-h-[85vh] overflow-y-auto w-full max-w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray1 p-[25px]">
            <CodeBlock
              language="typescript"
              code={_generatedHandlerCode ?? ''}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
