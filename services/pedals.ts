import "server-only"

import { apiFetch } from "@/lib/api-client"
import { Pedal } from "@/types/pedals"

export interface GetPedalsResponse {
  data: Pedal[]
}

export const PedalsService = {
  getPedals: () => apiFetch<GetPedalsResponse>("/api/v1/pedals/"),
}
