"use client"

import { Button } from "@/components/ui/button"
import { apiFetch } from "@/lib/api-client"
import { queryKeys } from "@/lib/query-keys"
import { Pedal } from "@/types/pedals"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Trash2 } from "lucide-react"

export default function DeletePedalButton({ pedal }: { pedal: Pedal }) {
  const qc = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      apiFetch(`/api/v1/pedals/${pedal.id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.pedals.all }),
  })

  return (
    <Button variant="destructive" disabled={isPending} onClick={() => mutate()}>
      <Trash2 />
    </Button>
  )
}
