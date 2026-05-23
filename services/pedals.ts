import "server-only"

import { apiFetch } from "@/lib/api-client"
import {
  CreatePedalRequest,
  CreatePedalResponse,
  GetPedalsResponse,
} from "@/types/pedals"

export const PedalsService = {
  getPedals: () => apiFetch<GetPedalsResponse>("/api/v1/pedals"),
  createPedal: (pedal: CreatePedalRequest) =>
    apiFetch<CreatePedalResponse>("/api/v1/pedals", {
      method: "POST",
      body: pedal,
    }),
}
