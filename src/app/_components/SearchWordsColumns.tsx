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
]

