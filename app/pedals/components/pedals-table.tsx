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
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useMemo } from "react"
import CreatePedalSheet from "./create-pedal-sheet"
import { GetPedalsResponse, Pedal } from "@/types/pedals"
import TableLoading from "./table-loading"
import { pedalColumns } from "./columns"

export default function PedalsTable() {
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

  const table = useReactTable({
    data: pedals ?? [],
    columns: pedalColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (isPending) {
    return <TableLoading />
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Erro ao carregar pedais</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error.message}</p>
        </CardContent>
      </Card>
    )
  }

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
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>Total:</TableCell>
              <TableCell colSpan={2}>{pedalsTotalPrice.toFixed(2)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  )
}
