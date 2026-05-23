import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import PedalsList from "./pedals-list"
import { queryKeys } from "@/lib/query-keys"
import { PedalsService } from "@/services/pedals"

export default async function PedalsPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: queryKeys.pedals.lists(),
    queryFn: PedalsService.getPedals,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Pedais</h1>
        <PedalsList />
      </div>
    </HydrationBoundary>
  )
}
