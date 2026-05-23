import { forward } from "@/lib/forward"
import { PedalsService } from "@/services/pedals"
import { CreatePedalRequest } from "@/types/pedals"

export async function GET() {
  return forward(() => PedalsService.getPedals())
}

export async function POST(request: Request) {
  const body = (await request.json()) as CreatePedalRequest
  return forward(() => PedalsService.createPedal(body), 201)
}
