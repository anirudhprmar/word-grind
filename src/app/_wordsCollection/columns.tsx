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
    cell: ({ row }) => {
        const content:string = row.getValue("meaning")
        const truncatedContent = content.length > 10 
          ? content.substring(0, 12) + "..." 
          : content
        return truncatedContent
      }
  },
  {
    accessorKey: "pronunciation",
    header: "Pronunciation",
  },
  {
    accessorKey: "example",
    header: "Examples",
     cell: ({ row }) => {
        const content:string[] = row.getValue("example")
        const truncatedContent = content.length >= 1 
          ? content.slice(0,1).join('').substring(0, 10) + "..." 
          : content
        return truncatedContent
      }
  },
  {
    accessorKey: "synonyms",
    header: "Synonyms",
     cell: ({ row }) => {
        const content:string[] = row.getValue("synonyms")
        const truncatedContent = content.length >= 1
          ? content.slice(0,1).join('').substring(0, 10) + "..." 
          : content
        return truncatedContent
      }
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

