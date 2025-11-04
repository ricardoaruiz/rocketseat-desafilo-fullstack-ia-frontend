import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { WEBHOOK_LIST_SCHEMA } from '../http/schemas/webhooks'
import { WebhooksListItem } from './webhooks-list-item'

export function WebhooksList() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [_checkedWebhookIds, setCheckedWebhookIds] = useState<string[]>([])

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
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-1 p-2">
        {data.webhooks.map((webhook) => (
          <WebhooksListItem
            key={webhook.id}
            data={webhook}
            checked={_checkedWebhookIds.includes(webhook.id)}
            onCheckedChange={() => _handleCheckWebhook(webhook.id)}
          />
        ))}
      </div>

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
  )
}
