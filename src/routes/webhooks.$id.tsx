import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { WebhooksDetails } from '../components/webhook-details'

export const Route = createFileRoute('/webhooks/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <WebhooksDetails id={id} />
    </Suspense>
  )
}
