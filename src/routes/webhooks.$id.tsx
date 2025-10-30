import { createFileRoute } from '@tanstack/react-router'
import { CodeBlock } from '../components/ui/code-block'
import { SectionDataTable } from '../components/ui/section-data-table'
import { SectionTitle } from '../components/ui/section-title'
import { WebhooksDetailHeader } from '../components/webhooks-detail-header'

const overviewData = [
  { key: 'Method', value: 'POST' },
  { key: 'Status Code', value: '200' },
  { key: 'Content-type', value: 'application/json' },
  { key: 'Content-length', value: '23482343 bytes' },
]

export const Route = createFileRoute('/webhooks/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex h-full flex-col">
      <WebhooksDetailHeader ip="192.168.1.1" timestamp="April 18th 14pm" />

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
