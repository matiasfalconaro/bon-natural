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
import { ArrowUpDown, Eye, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useAdminOrders } from "@/hooks/use-admin-orders"

export function OrdersTable() {
  const { orders: data, loading } = useAdminOrders()

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "orderNumber",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Order #<ArrowUpDown className="ml-2 h-4 w-4" /></Button>
      ),
      cell: ({ row }) => <div className="font-medium">{row.getValue("orderNumber")}</div>,
    },
    {
      accessorKey: "customer",
      header: "Customer",
      cell: ({ row }) => <div>{row.getValue("customer")}</div>,
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Date<ArrowUpDown className="ml-2 h-4 w-4" /></Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("date")).toLocaleDateString()
        return <div>{date}</div>
      },
    },
    {
      accessorKey: "total",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Total<ArrowUpDown className="ml-2 h-4 w-4" /></Button>
      ),
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("total"))
        const formatted = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
        return <div className="text-right font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "items",
      header: "Items",
      cell: ({ row }) => {
        const items = row.getValue("items") as any[]
        return (
          <div className="text-left space-y-1">
            {items.map((item, idx) => (
              <div key={idx} className="text-sm">
                {item.title} × {item.quantity}
              </div>
            ))}
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status")
        return (
          <Badge variant="outline" className={
            status === "Delivered" ? "bg-green-100 text-green-800 border-green-200" :
            status === "Shipped" ? "bg-blue-100 text-blue-800 border-blue-200" :
            status === "Processing" ? "bg-amber-100 text-amber-800 border-amber-200" :
            status === "Pending" ? "bg-purple-100 text-purple-800 border-purple-200" :
            "bg-red-100 text-red-800 border-red-200"
          }>
            {status as string}
          </Badge>
        )
      },
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment",
      cell: ({ row }) => {
        const status = row.getValue("paymentStatus")
        return (
          <Badge variant="outline" className={
            status === "Paid" ? "bg-green-100 text-green-800 border-green-200" :
            status === "Pending" ? "bg-amber-100 text-amber-800 border-amber-200" :
            status === "Refunded" ? "bg-blue-100 text-blue-800 border-blue-200" :
            "bg-red-100 text-red-800 border-red-200"
          }>
            {status as string}
          </Badge>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem><Eye className="mr-2 h-4 w-4" />View Details</DropdownMenuItem>
            <DropdownMenuItem>Update Status</DropdownMenuItem>
            <DropdownMenuItem>Print Invoice</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
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
          placeholder="Filter orders..."
          value={(table.getColumn("orderNumber")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("orderNumber")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <div className="flex gap-2">
          <Button variant="outline">Export Orders</Button>
          <Button className="bg-green-600 hover:bg-green-700">Create Manual Order</Button>
        </div>
      </div>
      {loading ? (
        <div className="text-center py-10 text-muted-foreground">Loading orders...</div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
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
                  <TableCell colSpan={columns.length} className="h-24 text-center">No orders found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
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
    </div>
  )
}
