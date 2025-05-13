"use client"

import { BarChart, DollarSign, Package, ShoppingCart, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+12.4% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">+8 new products this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <p className="text-xs text-muted-foreground">+18.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Monthly revenue for the current year</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[240px] flex items-center justify-center bg-muted/20 rounded-md">
              <BarChart className="h-8 w-8 text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">Sales chart visualization would go here</span>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Your best performing organic products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Organic Apples", category: "Fruits", sales: "$4,200" },
                { name: "Fresh Spinach", category: "Vegetables", sales: "$3,800" },
                { name: "Organic Milk", category: "Dairy", sales: "$3,650" },
                { name: "Organic Honey", category: "Sweeteners", sales: "$2,900" },
                { name: "Organic Chicken", category: "Meat", sales: "$2,750" },
              ].map((product, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-medium">
                    {index + 1}
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <div className="ml-auto font-medium">{product.sales}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "#ORD-7892",
                  customer: "Sarah Johnson",
                  date: "May 12, 2025",
                  status: "Delivered",
                  amount: "$124.50",
                },
                {
                  id: "#ORD-7891",
                  customer: "Michael Chen",
                  date: "May 11, 2025",
                  status: "Processing",
                  amount: "$86.25",
                },
                { id: "#ORD-7890", customer: "Emma Davis", date: "May 11, 2025", status: "Shipped", amount: "$210.75" },
                {
                  id: "#ORD-7889",
                  customer: "James Wilson",
                  date: "May 10, 2025",
                  status: "Delivered",
                  amount: "$45.99",
                },
              ].map((order, index) => (
                <div key={index} className="flex flex-col space-y-1">
                  <div className="flex items-center">
                    <p className="text-sm font-medium">{order.id}</p>
                    <div className="ml-auto text-sm">{order.amount}</div>
                  </div>
                  <div className="flex items-center text-sm">
                    <p className="text-muted-foreground">{order.customer}</p>
                    <div className="ml-auto flex items-center">
                      <div
                        className={`h-2 w-2 rounded-full mr-1 ${
                          order.status === "Delivered"
                            ? "bg-green-500"
                            : order.status === "Shipped"
                              ? "bg-blue-500"
                              : "bg-amber-500"
                        }`}
                      />
                      <span className="text-xs">{order.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Promotions</CardTitle>
            <CardDescription>Currently running promotions and bundles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Organic Fruit Bundle", discount: "Bundle Price: $19.99", ends: "Jun 30, 2025" },
                { name: "Veggie Box Special", discount: "Bundle Price: $24.99", ends: "Dec 31, 2025" },
                { name: "Breakfast Bundle", discount: "15% Off", ends: "Jul 15, 2025" },
                { name: "Organic Smoothie Pack", discount: "Bundle Price: $16.99", ends: "Jun 15, 2025" },
              ].map((promo, index) => (
                <div key={index} className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{promo.name}</p>
                  <div className="flex items-center text-sm">
                    <p className="text-muted-foreground">{promo.discount}</p>
                    <div className="ml-auto text-xs text-muted-foreground">Ends: {promo.ends}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Alerts</CardTitle>
            <CardDescription>Products that need attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Organic Milk", issue: "Low Stock", count: "12 remaining" },
                { name: "Quinoa", issue: "Out of Stock", count: "0 remaining" },
                { name: "Organic Blueberries", issue: "Low Stock", count: "8 remaining" },
                { name: "Organic Eggs", issue: "Low Stock", count: "15 remaining" },
              ].map((alert, index) => (
                <div key={index} className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{alert.name}</p>
                  <div className="flex items-center text-sm">
                    <div
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        alert.issue === "Out of Stock" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {alert.issue}
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground">{alert.count}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
