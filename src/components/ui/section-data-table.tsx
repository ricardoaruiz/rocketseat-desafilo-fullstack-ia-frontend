import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type SectionDataTableProps = ComponentProps<'div'> & {
  data: { key: string; value: string }[]
}

export function SectionDataTable({
  data,
  className,
  ...props
}: SectionDataTableProps) {
  return (
    <div
      className={twMerge(
        'overflow-hidden rounded-lg border border-zinc-700',
        className,
      )}
      {...props}
    >
      <table className="w-full">
        {data.map(({ key, value }) => (
          <tr
            key={key}
            className="even:bg-zinc-800 odd:bg-zinc-900 border-b border-zinc-700 last:border-0"
          >
            <td className="p-3 text-sm font-medium text-zinc-400 bg-zinc-800/50 border-r border-zinc-700">
              {key}
            </td>
            <td className="p-3 text-sm font-medium text-zinc-300 bg-zinc-800/50 border-r border-zinc-700 font-mono">
              {value}
            </td>
          </tr>
        ))}
      </table>
    </div>
  )
}
