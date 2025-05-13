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
import { ArrowUpDown, Copy, MoreHorizontal, Pencil, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { EditItemDialog } from "./edit-item-dialog"
import { DeleteItemDialog } from "./delete-item-dialog"
import { toast } from "@/hooks/use-toast"

type Discount = {
  id: string
  name: string
  code: string
  discountType: "percentage" | "fixed" | "shipping"
  discountValue: number
  minPurchase: number | null
  startDate: string
  endDate: string
  usageCount: number
  usageLimit: number | null
  active: boolean
}

const data: Discount[] = [
  {
    id: "1",
    name: "Summer Sale",
    code: "SUMMER25",
    discountType: "percentage",
    discountValue: 25,
    minPurchase: 50,
    startDate: "2025-06-01",
    endDate: "2025-08-31",
    usageCount: 124,
    usageLimit: 500,
    active: true,
  },
  {
    id: "2",
    name: "New Customer",
    code: "WELCOME15",
    discountType: "percentage",
    discountValue: 15,
    minPurchase: null,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    usageCount: 342,
    usageLimit: null,
    active: true,
  },
  {
    id: "3",
    name: "Free Shipping",
    code: "FREESHIP",
    discountType: "shipping",
    discountValue: 0,
    minPurchase: 75,
    startDate: "2025-05-01",
    endDate: "2025-06-30",
    usageCount: 89,
    usageLimit: 200,
    active: true,
  },
  {
    id: "4",
    name: "Flash Sale",
    code: "FLASH10",
    discountType: "fixed",
    discountValue: 10,
    minPurchase: 40,
    startDate: "2025-05-15",
    endDate: "2025-05-17",
    usageCount: 56,
    usageLimit: 100,
    active: false,
  },
  {
    id: "5",
    name: "Newsletter Signup",
    code: "NEWS20",
    discountType: "percentage",
    discountValue: 20,
    minPurchase: 30,
    startDate: "2025-04-01",
    endDate: "2025-12-31",
    usageCount: 211,
    usageLimit: null,
    active: true,
  },
]

export function DiscountsTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [editItem, setEditItem] = useState<Discount | null>(null)
  const [deleteItem, setDeleteItem] = useState<Discount | null>(null)

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Copied to clipboard",
      description: `Discount code ${code} copied to clipboard`,
      duration: 3000,
    })
  }

  const columns: ColumnDef<Discount>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Discount Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "code",
      header: "Code",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {row.getValue("code")}
          </code>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(row.getValue("code"))}>
            <Copy className="h-3 w-3" />
            <span className="sr-only">Copy code</span>
          </Button>
        </div>
      ),
    },
    {
      accessorKey: "discountType",
      header: "Discount",
      cell: ({ row }) => {
        const type = row.getValue("discountType") as string
        const value = row.original.discountValue

        return (
          <div>{type === "percentage" ? `${value}% off` : type === "fixed" ? `$${value} off` : `Free Shipping`}</div>
        )
      },
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
      accessorKey: "usage",
      header: "Usage",
      cell: ({ row }) => {
        const usageCount = row.original.usageCount
        const usageLimit = row.original.usageLimit

        return (
          <div>
            {usageCount}
            {usageLimit ? `/${usageLimit}` : ""}
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
        const discount = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setEditItem(discount)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDeleteItem(discount)} className="text-red-600 focus:text-red-600">
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
          placeholder="Filter discounts..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <div className="flex gap-2">
          <Button variant="outline">Export</Button>
          <Button className="bg-green-600 hover:bg-green-700">Create New Discount</Button>
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
                  No discounts found.
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

      {editItem && (
        <EditItemDialog item={editItem} open={!!editItem} setOpen={() => setEditItem(null)} type="discount" />
      )}

      {deleteItem && (
        <DeleteItemDialog
          item={deleteItem}
          open={!!deleteItem}
          setOpen={() => setDeleteItem(null)}
          itemType="discount"
        />
      )}
    </div>
  )
}
