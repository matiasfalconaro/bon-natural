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

type Order = {
  id: string
  orderNumber: string
  customer: string
  date: string
  total: number
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"
  paymentStatus: "Paid" | "Pending" | "Failed" | "Refunded"
  items: number
}

const data: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-7892",
    customer: "Sarah Johnson",
    date: "2025-05-12",
    total: 124.5,
    status: "Delivered",
    paymentStatus: "Paid",
    items: 5,
  },
  {
    id: "2",
    orderNumber: "ORD-7891",
    customer: "Michael Chen",
    date: "2025-05-11",
    total: 86.25,
    status: "Processing",
    paymentStatus: "Paid",
    items: 3,
  },
  {
    id: "3",
    orderNumber: "ORD-7890",
    customer: "Emma Davis",
    date: "2025-05-11",
    total: 210.75,
    status: "Shipped",
    paymentStatus: "Paid",
    items: 8,
  },
  {
    id: "4",
    orderNumber: "ORD-7889",
    customer: "James Wilson",
    date: "2025-05-10",
    total: 45.99,
    status: "Delivered",
    paymentStatus: "Paid",
    items: 2,
  },
  {
    id: "5",
    orderNumber: "ORD-7888",
    customer: "Olivia Martinez",
    date: "2025-05-10",
    total: 67.5,
    status: "Pending",
    paymentStatus: "Pending",
    items: 4,
  },
  {
    id: "6",
    orderNumber: "ORD-7887",
    customer: "Noah Thompson",
    date: "2025-05-09",
    total: 132.75,
    status: "Cancelled",
    paymentStatus: "Refunded",
    items: 6,
  },
  {
    id: "7",
    orderNumber: "ORD-7886",
    customer: "Sophia Garcia",
    date: "2025-05-09",
    total: 94.25,
    status: "Delivered",
    paymentStatus: "Paid",
    items: 4,
  },
]

export function OrdersTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "orderNumber",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Order #
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-medium">{row.getValue("orderNumber")}</div>,
    },
    {
      accessorKey: "customer",
      header: "Customer",
      cell: ({ row }) => <div>{row.getValue("customer")}</div>,
    },
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("date")).toLocaleDateString()
        return <div>{date}</div>
      },
    },
    {
      accessorKey: "total",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Total
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("total"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
        return <div className="text-right font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "items",
      header: "Items",
      cell: ({ row }) => <div className="text-center">{row.getValue("items")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge
            variant="outline"
            className={`
              ${
                status === "Delivered"
                  ? "bg-green-100 text-green-800 border-green-200"
                  : status === "Shipped"
                    ? "bg-blue-100 text-blue-800 border-blue-200"
                    : status === "Processing"
                      ? "bg-amber-100 text-amber-800 border-amber-200"
                      : status === "Pending"
                        ? "bg-purple-100 text-purple-800 border-purple-200"
                        : "bg-red-100 text-red-800 border-red-200"
              }
            `}
          >
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment",
      cell: ({ row }) => {
        const status = row.getValue("paymentStatus") as string
        return (
          <Badge
            variant="outline"
            className={`
              ${
                status === "Paid"
                  ? "bg-green-100 text-green-800 border-green-200"
                  : status === "Pending"
                    ? "bg-amber-100 text-amber-800 border-amber-200"
                    : status === "Refunded"
                      ? "bg-blue-100 text-blue-800 border-blue-200"
                      : "bg-red-100 text-red-800 border-red-200"
              }
            `}
          >
            {status}
          </Badge>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const order = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>Update Status</DropdownMenuItem>
              <DropdownMenuItem>Print Invoice</DropdownMenuItem>
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
                  No orders found.
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
    </div>
  )
}
