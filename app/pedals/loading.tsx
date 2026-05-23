import { DataTableLoading } from "@/components/data-table/data-table-loading"
import { PedalsCard } from "./components/pedals-card"
import { PedalsPageShell } from "./components/pedal-page-shell"

export default function Loading() {
  return (
    <PedalsPageShell>
      <PedalsCard actionDisabled>
        <DataTableLoading columns={7} />
      </PedalsCard>
    </PedalsPageShell>
  )
}
