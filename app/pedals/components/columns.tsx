"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Pedal, pedalTypeDict } from "@/types/pedals"
import Link from "next/link"
import DeletePedalButton from "./delete-pedal-button"

export const pedalColumns: ColumnDef<Pedal>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "brand",
    header: "Marca",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => pedalTypeDict[row.original.type],
  },
  {
    accessorKey: "acquired_at",
    header: "Comprado em:",
  },
  {
    accessorKey: "img_url",
    header: "Foto",
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
    header: "Preço",
    cell: ({ row }) => row.original.price.toFixed(2),
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => <DeletePedalButton pedal={row.original} />,
  },
]
