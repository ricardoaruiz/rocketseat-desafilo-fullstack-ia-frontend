import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { Badge } from './ui/badge'

type WebhooksDetailHeaderProps = ComponentProps<'div'> & {
  ip: string
  timestamp: string
}

export function WebhooksDetailHeader({
  ip,
  timestamp,
  className,
  ...props
}: WebhooksDetailHeaderProps) {
  return (
    <div
      className={twMerge('space-y-4 border-b border-zinc-700 p-5', className)}
      {...props}
    >
      <div className="flex items-center gap-3">
        <Badge>POST</Badge>
        <span className="text-lg font-medium text-zinc-300">/video/status</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-sm text-zinc-400">
          <span>From IP:</span>
          <span className="font-mono underline underline-offset-4">{ip}</span>
        </div>
        <span className="w-px h-4 bg-zinc-700" />
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span>At</span>
          <span>{timestamp}</span>
        </div>
      </div>
    </div>
  )
}
