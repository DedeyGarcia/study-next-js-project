import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import PedalsTable from "./components/pedals-table"
import { queryKeys } from "@/lib/query-keys"
import { PedalsService } from "@/services/pedals"
import { PedalsPageShell } from "./components/pedal-page-shell"

export default async function PedalsPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: queryKeys.pedals.lists(),
    queryFn: PedalsService.getPedals,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PedalsPageShell>
        <PedalsTable />
      </PedalsPageShell>
    </HydrationBoundary>
  )
}
