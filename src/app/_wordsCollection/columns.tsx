"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "~/components/ui/checkbox"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Words = {
    id: number;
    userId: string;
    name: string;
    meaning: string;
    pronunciation: string | null;
    example: string[] | null;
    synonyms: string[] | null;
    createdAt: Date;
    updatedAt: Date | null;
    learned: boolean;
}

export const columns: ColumnDef<Words>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "meaning",
    header: "Meaning",
  },
  {
    accessorKey: "pronunciation",
    header: "Pronunciation",
  },
  {
    accessorKey: "example",
    header: "Examples",
  },
  {
    accessorKey: "synonyms",
    header: "Synonyms",
  },
  {
    accessorKey: "learned",
    header: "Learned",
  },
   {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  
]

