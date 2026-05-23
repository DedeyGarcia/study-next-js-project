"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Pedal, pedalTypeDict } from "@/types/pedals"
import Link from "next/link"
import DeletePedalButton from "./delete-pedal-button"
import SortableTableHeader from "./sortable-table-header"

export const pedalColumns: ColumnDef<Pedal>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableTableHeader column={column} title="Nome" />
    ),
  },
  {
    accessorKey: "brand",
    header: ({ column }) => (
      <SortableTableHeader column={column} title="Marca" />
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <SortableTableHeader column={column} title="Tipo" />
    ),
    cell: ({ row }) => pedalTypeDict[row.original.type],
  },
  {
    accessorKey: "acquired_at",
    header: ({ column }) => (
      <SortableTableHeader column={column} title="Comprado em:" />
    ),
  },
  {
    accessorKey: "img_url",
    header: "Foto", // sem sort (não faz sentido ordenar URL)
    enableSorting: false,
    cell: ({ row }) =>
      row.original.img_url && (
        <Link
          href={row.original.img_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Ver foto
        </Link>
      ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <SortableTableHeader column={column} title="Preço" />
    ),
    cell: ({ row }) => row.original.price.toFixed(2),
  },
  {
    id: "actions",
    header: "Ações",
    enableSorting: false,
    cell: ({ row }) => <DeletePedalButton pedal={row.original} />,
  },
]
