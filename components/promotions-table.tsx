"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { EditItemDialog } from "./edit-item-dialog"
import { DeleteItemDialog } from "./delete-item-dialog"

type Promotion = {
  id: string
  name: string
  description: string
  discountType: "percentage" | "fixed" | "bundle"
  discountValue: number
  startDate: string
  endDate: string
  productCount: number
  active: boolean
}

const data: Promotion[] = [
  {
    id: "1",
    name: "Organic Fruit Bundle",
    description: "Get a selection of our best organic fruits at a special price",
    discountType: "bundle",
    discountValue: 19.99,
    startDate: "2025-05-01",
    endDate: "2025-06-30",
    productCount: 5,
    active: true,
  },
  {
    id: "2",
    name: "Veggie Box Special",
    description: "Weekly vegetable box with seasonal organic vegetables",
    discountType: "bundle",
    discountValue: 24.99,
    startDate: "2025-05-01",
    endDate: "2025-12-31",
    productCount: 8,
    active: true,
  },
  {
    id: "3",
    name: "Breakfast Bundle",
    description: "Organic breakfast essentials at a discounted price",
    discountType: "percentage",
    discountValue: 15,
    startDate: "2025-05-15",
    endDate: "2025-07-15",
    productCount: 4,
    active: true,
  },
  {
    id: "4",
    name: "Summer Salad Kit",
    description: "Everything you need for a fresh summer salad",
    discountType: "fixed",
    discountValue: 5,
    startDate: "2025-06-01",
    endDate: "2025-08-31",
    productCount: 6,
    active: false,
  },
  {
    id: "5",
    name: "Organic Smoothie Pack",
    description: "Fruits and superfoods for healthy smoothies",
    discountType: "bundle",
    discountValue: 16.99,
    startDate: "2025-05-01",
    endDate: "2025-06-15",
    productCount: 7,
    active: true,
  },
]

export function PromotionsTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [editItem, setEditItem] = useState<Promotion | null>(null)
  const [deleteItem, setDeleteItem] = useState<Promotion | null>(null)

  const columns: ColumnDef<Promotion>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Bundle Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.getValue("name")}</span>
          <span className="text-xs text-muted-foreground mt-1 max-w-[200px] truncate">{row.original.description}</span>
        </div>
      ),
    },
    {
      accessorKey: "discountType",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("discountType") as string
        const value = row.original.discountValue

        return (
          <div>{type === "percentage" ? `${value}% off` : type === "fixed" ? `$${value} off` : `$${value} bundle`}</div>
        )
      },
    },
    {
      accessorKey: "productCount",
      header: "Products",
      cell: ({ row }) => <div className="text-center">{row.getValue("productCount")}</div>,
    },
    {
      accessorKey: "dateRange",
      header: "Date Range",
      cell: ({ row }) => {
        const startDate = new Date(row.original.startDate).toLocaleDateString()
        const endDate = new Date(row.original.endDate).toLocaleDateString()
        return (
          <div>
            {startDate} - {endDate}
          </div>
        )
      },
    },
    {
      accessorKey: "active",
      header: "Status",
      cell: ({ row }) => {
        const isActive = row.getValue("active") as boolean
        return (
          <Badge
            variant="outline"
            className={`${isActive ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"}`}
          >
            {isActive ? "Active" : "Inactive"}
          </Badge>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const promotion = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setEditItem(promotion)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDeleteItem(promotion)} className="text-red-600 focus:text-red-600">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter bundles..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <div className="flex gap-2">
          <Button variant="outline">Export</Button>
          <Button className="bg-green-600 hover:bg-green-700">Create New Bundle</Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No promotions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>

      {editItem && <EditItemDialog item={editItem} open={!!editItem} setOpen={() => setEditItem(null)} type="promo" />}

      {deleteItem && (
        <DeleteItemDialog
          item={deleteItem}
          open={!!deleteItem}
          setOpen={() => setDeleteItem(null)}
          itemType="promotion"
        />
      )}
    </div>
  )
}
