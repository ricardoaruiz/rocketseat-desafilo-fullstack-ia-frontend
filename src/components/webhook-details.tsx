import { useSuspenseQuery } from '@tanstack/react-query'
import { WEBHOOK_DETAIL_SCHEMA } from '../http/schemas/webhooks'
import { CodeBlock } from './ui/code-block'
import { SectionDataTable } from './ui/section-data-table'
import { SectionTitle } from './ui/section-title'
import { WebhooksDetailHeader } from './webhooks-detail-header'

type WebhooksDetailsProps = {
  id: string
}

export function WebhooksDetails({ id }: WebhooksDetailsProps) {
  const { data } = useSuspenseQuery({
    queryKey: ['webhook-detail', id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3334/api/webhooks/${id}`)
      const data = await response.json()

      return WEBHOOK_DETAIL_SCHEMA.parse(data)
    },
    retry: false,
  })

  const overviewData = [
    { key: 'Method', value: data.method ? data.method : '' },
    {
      key: 'Status Code',
      value: data.statusCode ? data.statusCode.toString() : '',
    },
    {
      key: 'Content-type',
      value: data.contentType ? data.contentType : 'application/json',
    },
    {
      key: 'Content-length',
      value: `${data.contentLength ?? 0} bytes`,
    },
  ]

  return (
    <div className="flex h-full flex-col">
      <WebhooksDetailHeader
        method={data.method}
        pathname={data.pathname}
        ip={data.ip}
        createdAt={data.createdAt}
      />

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="space-y-4">
          <SectionTitle>Request Overview</SectionTitle>
          <SectionDataTable data={overviewData} />
        </div>

        <div className="space-y-4">
          <SectionTitle>Query Parameters</SectionTitle>
          <SectionDataTable data={overviewData} />
        </div>

        <div className="space-y-4">
          <SectionTitle>Headers</SectionTitle>
          <SectionDataTable data={overviewData} />
        </div>

        <div className="space-y-4">
          <SectionTitle>Request Body</SectionTitle>
          <CodeBlock code={JSON.stringify(overviewData, null, 2)} />
        </div>
      </div>
    </div>
  )
}
