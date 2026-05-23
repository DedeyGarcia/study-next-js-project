"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ApiError, apiFetch } from "@/lib/api-client"
import { queryKeys } from "@/lib/query-keys"
import { useQuery } from "@tanstack/react-query"
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { useMemo, useState } from "react"
import { GetPedalsResponse, Pedal } from "@/types/pedals"
import { pedalColumns } from "./columns"
import { DataTable } from "@/components/data-table/data-table"
import { DataTablePagination } from "@/components/data-table/data-table-pagination"
import { DataTableLoading } from "@/components/data-table/data-table-loading"
import { PedalsCard } from "./pedals-card"

export default function PedalsTable() {
  const [sorting, setSorting] = useState<SortingState>([])

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

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: pedals ?? [],
    columns: pedalColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  })

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
    <PedalsCard
      actionDisabled={isPending}
      total={isPending ? undefined : pedalsTotalPrice}
    >
      {isPending ? (
        <DataTableLoading columns={pedalColumns.length} />
      ) : (
        <>
          <DataTable table={table} emptyMessage="Nenhum pedal encontrado." />
          <DataTablePagination
            table={table}
            totalLabel={(count) => `${count} pedal(is)`}
          />
        </>
      )}
    </PedalsCard>
  )
}
