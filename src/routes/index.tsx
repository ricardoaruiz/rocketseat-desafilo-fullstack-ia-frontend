import { createFileRoute } from '@tanstack/react-router'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { CodeBlock } from '../components/ui/code-block'
import { SectionDataTable } from '../components/ui/section-data-table'
import { SectionTitle } from '../components/ui/section-title'
import { Sidebar } from '../components/ui/sidebar'
import { WebhooksDetailHeader } from '../components/webhooks-detail-header'

export const Route = createFileRoute('/')({
  component: Index,
})

const overviewData = [
  { key: 'Method', value: 'POST' },
  { key: 'Status Code', value: '200' },
  { key: 'Content-type', value: 'application/json' },
  { key: 'Content-length', value: '23482343 bytes' },
]

function Index() {
  return (
    <div className="h-screen bg-zinc-900">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={20} minSize={15} maxSize={40}>
          <Sidebar />
        </Panel>

        <PanelResizeHandle className="w-px bg-zinc-700 hover:bg-zinc-600 transition-colors duration-150" />

        <Panel defaultSize={80} minSize={60}>
          <div className="flex h-full flex-col">
            <WebhooksDetailHeader
              ip="192.168.1.1"
              timestamp="April 18th 14pm"
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
        </Panel>
      </PanelGroup>
    </div>
  )
}
