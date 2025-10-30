import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { Sidebar } from '../components/ui/sidebar'

const RootLayout = () => (
  <>
    <div className="h-screen bg-zinc-900">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={20} minSize={15} maxSize={40}>
          <Sidebar />
        </Panel>

        <PanelResizeHandle className="w-px bg-zinc-700 hover:bg-zinc-600 transition-colors duration-150" />

        <Panel defaultSize={80} minSize={60}>
          <Outlet />
        </Panel>
      </PanelGroup>
    </div>
  </>
)

export const Route = createRootRoute({ component: RootLayout })
