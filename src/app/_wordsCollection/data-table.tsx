"use client"

import {
  type ColumnDef,
  type ColumnFiltersState,
  type VisibilityState,
  getFilteredRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,

} from "@tanstack/react-table"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import React, { useEffect, useState } from "react"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { DataTablePagination } from "./DataTablePagination"
import { AddWordDialogBox } from "~/components/AddWordDialogBox"
import { WordViewModal } from "../_components/WordViewModal"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  userId:string
}

interface RowData{ 
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


export function DataTable<TData extends RowData, TValue>({
  columns,
  data,
  userId
}: DataTableProps<TData, TValue>) {
     const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  const [rowSelection, setRowSelection] = React.useState({})
  const [selectedWord,setSelectedWord] = useState<TData | null>(null)
  const [isModalOpen,setIsModelOpen] = useState<boolean>(false)
  const [pagination, setPagination] = React.useState({
  pageIndex: 0,
  pageSize: 3, // default page size example
});

useEffect(()=>{
  if(selectedWord){
    setIsModelOpen(true)
  }
},[selectedWord])


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state:{
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination:pagination
    },
    onPaginationChange:setPagination
  })

 

  return (
    <div>

       <div className="flex items-center py-4">

        <div className="flex gap-3 ">
          <Input
            placeholder="Filter words..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
          />
        
          <AddWordDialogBox userId={userId} />

        </div>

         <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                  return (
                      <TableHead key={header.id} >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
            })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                  <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => setSelectedWord(row.original)}
                  className="cursor-pointer"
                  >
                {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
        ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="mt-10">
        {selectedWord && isModalOpen ?     
        <WordViewModal
        key={selectedWord.name}
        onClose={()=>setIsModelOpen(false)}
        wordInfo={{
            name:selectedWord.name ,
            id:selectedWord.id,
            userId:userId,
            pronunciation:selectedWord.pronunciation ?? "",
            meaning:selectedWord.meaning,
            synonyms:selectedWord.synonyms ?? [],
            example:selectedWord.example ?? [],
            createdAt:selectedWord.createdAt,
            learned:selectedWord.learned
          }}
        /> : null }
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          >
          Next
        </Button>
      </div>
    </div>
    
    <DataTablePagination table={table}/>
    </div>
  )
}