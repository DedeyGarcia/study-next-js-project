"use client"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ApiError, apiFetch } from "@/lib/api-client"
import { queryKeys } from "@/lib/query-keys"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { useMemo } from "react"
import CreatePedalSheet from "./create-pedal-sheet"
import { GetPedalsResponse, Pedal, pedalTypeDict } from "@/types/pedals"

export default function PedalsList() {
  const {
    data: pedals,
    isPending,
    error,
  } = useQuery<GetPedalsResponse, ApiError, Pedal[]>({
    queryKey: queryKeys.pedals.lists(),
    queryFn: () => apiFetch<GetPedalsResponse>("/api/v1/pedals"),
    select: (response) => response.data,
  })

  const pedalsTotalPrice = useMemo(() => {
    if (!pedals) return 0

    return pedals.reduce((acc, pedal) => acc + pedal.price, 0)
  }, [pedals])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Minha coleção de pedais</CardTitle>
        <CardAction>
          <CreatePedalSheet />
        </CardAction>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Comprado em:</TableHead>
              <TableHead>Foto</TableHead>
              <TableHead>Preço</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pedals?.map((pedal) => (
              <TableRow key={pedal.id}>
                <TableCell>{pedal.name}</TableCell>
                <TableCell>{pedal.brand}</TableCell>
                <TableCell>{pedalTypeDict[pedal.type]}</TableCell>
                <TableCell>{pedal.acquired_at}</TableCell>
                <TableCell>
                  {pedal.img_url && (
                    <Link
                      href={pedal.img_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver foto
                    </Link>
                  )}
                </TableCell>
                <TableCell>{pedal.price.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>Total:</TableCell>
              <TableCell>{pedalsTotalPrice.toFixed(2)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  )
}
