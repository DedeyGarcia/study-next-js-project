import { forward } from "@/lib/forward"
import { PedalsService } from "@/services/pedals"

type RouteParams = { params: Promise<{ id: string }> }

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params

  return forward(() => PedalsService.deletePedal(id))
}
