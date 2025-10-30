import { useSuspenseQuery } from '@tanstack/react-query'
import { WEBHOOK_LIST_SCHEMA } from '../http/schemas/webhooks'
import { WebhooksListItem } from './webhooks-list-item'

export function WebhooksList() {
  const { data } = useSuspenseQuery({
    queryKey: ['webhooks'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3334/api/webhooks')
      const data = await response.json()

      return WEBHOOK_LIST_SCHEMA.parse(data)
    },
  })

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-1 p-2">
        {data.webhooks.map((webhook) => (
          <WebhooksListItem key={webhook.id} data={webhook} />
        ))}
      </div>
    </div>
  )
}
