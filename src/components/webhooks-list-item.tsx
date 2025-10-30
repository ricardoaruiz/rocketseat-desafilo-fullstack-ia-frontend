import { Link } from '@tanstack/react-router'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Trash2Icon } from 'lucide-react'
import { Checkbox } from './ui/checkbox'
import { IconButton } from './ui/icon-button'

type WebhookListItemProps = {
  data: {
    id: string
    method: string
    pathname: string
    createdAt: Date
  }
}

export function WebhooksListItem({ data }: WebhookListItemProps) {
  const { method, pathname, createdAt } = data

  return (
    <div className="group rounded-lg transition-colors duration-150 hover:bg-zinc-700/50">
      <div className="flex items-start gap-3 px-4 py-2.5">
        <Checkbox />

        <Link to="/" className="flex flex-1 min-w-0 items-start gap-3">
          <span className="w-12 shrink-0 font-mono text-xs font-semibold text-zinc-300 text-right">
            {method}
          </span>
          <div className="flex-1 min-w-0">
            <p className="truncate text-xs text-zinc-200 leading-tight font-mono">
              {pathname}
              <p className="text-xs text-zinc-500 font-medium mt-1">
                {formatDistanceToNow(createdAt, {
                  addSuffix: true,
                  locale: ptBR,
                })}
              </p>
            </p>
          </div>
        </Link>

        <IconButton
          icon={<Trash2Icon className="size-2.5 text-zinc-400" />}
          className="opacity-0 transition-opacity group-hover:opacity-100"
        />
      </div>
    </div>
  )
}
