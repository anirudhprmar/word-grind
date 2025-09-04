"use client"

import {
  type ColumnDef,
  type ColumnFiltersState,
  type VisibilityState,
  getFilteredRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel
} from "@tanstack/react-table"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import React, { useState } from "react"

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
import { DataTablePagination } from "../_wordsCollection/DataTablePagination"
import { QuizStartModal } from "./QuizStartModal"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  userId:string
  totalQuestions:number
}

interface RowData{ 
    id:number
    userId: string
    name:string
    meaning:string
    example:string[]
    pronunciation:string
    synonyms:string[]
    createdAt:Date
    learned:boolean
}


export function SearchWordsDataTable<TData extends RowData, TValue>({
  columns,
  data,
  userId,
  totalQuestions
}: DataTableProps<TData, TValue>) {
     const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  const [rowSelection, setRowSelection] = React.useState({})
  const [selectedWord,setSelectedWord] = useState<TData | null>(null)


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
      rowSelection
    }
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
        {selectedWord ?     
        <QuizStartModal
        key={selectedWord.id}
        totalQuestions={totalQuestions}
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
        /> : null}
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