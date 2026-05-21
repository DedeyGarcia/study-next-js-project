import { apiFetch } from "@/lib/api-client"
import { Pedal } from "@/types/pedals"

export interface GetPedalsResponse {
  data: Pedal[]
}

export async function getPedals() {
  return await apiFetch<GetPedalsResponse>("/api/v1/pedals/")
}
