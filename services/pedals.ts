import "server-only"

import { apiFetch } from "@/lib/api-client"
import { CreatePedalRequest, Pedal } from "@/types/pedals"

export interface GetPedalsResponse {
  data: Pedal[]
}

export type CreatePedalResponse = Pedal

export const PedalsService = {
  getPedals: () => apiFetch<GetPedalsResponse>("/api/v1/pedals/"),
  createPedal: (pedal: CreatePedalRequest) =>
    apiFetch<CreatePedalResponse>("/api/v1/pedals/", {
      method: "POST",
      body: pedal,
    }),
}
