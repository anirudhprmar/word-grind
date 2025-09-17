"use client"

import type { ColumnDef } from "@tanstack/react-table"


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
    cell: ({ row }) => {
        const content:boolean = row.getValue("learned")
        return content === false ? "In Progress" : "Mastered"
      }
  },
]

