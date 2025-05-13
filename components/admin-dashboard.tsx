"use client"

import { useState, useEffect } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { ProductsTable } from "@/components/products-table"
import { CategoriesTable } from "@/components/categories-table"
import { PromotionsTable } from "@/components/promotions-table"
import { DiscountsTable } from "@/components/discount-table"
import { OrdersTable } from "@/components/orders-table"
import { CustomersTable } from "@/components/customers-table"
import { DashboardOverview } from "@/components/dashboard-overview"
import { AnalyticsView } from "@/components/analytics-view"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
  }

  useEffect(() => {
    const handleSectionChange = (event: CustomEvent) => {
      if (event.detail && typeof event.detail.section === "string") {
        setActiveSection(event.detail.section)
      }
    }

    window.addEventListener("sectionChange" as any, handleSectionChange)

    return () => {
      window.removeEventListener("sectionChange" as any, handleSectionChange)
    }
  }, [])

  const renderContent = () => {
    switch (activeSection) {
      case "products":
        return <ProductsTable />
      case "categories":
        return <CategoriesTable />
      case "promotions":
        return <PromotionsTable />
      case "discounts":
        return <DiscountsTable />
      case "orders":
        return <OrdersTable />
      case "customers":
        return <CustomersTable />
      case "analytics":
        return <AnalyticsView />
      case "dashboard":
      default:
        return <DashboardOverview />
    }
  }

  const getSectionTitle = () => {
    switch (activeSection) {
      case "products":
        return "Organic Products"
      case "categories":
        return "Product Categories"
      case "promotions":
        return "Promotions & Bundles"
      case "discounts":
        return "Discounts & Offers"
      case "orders":
        return "Customer Orders"
      case "customers":
        return "Customer Management"
      case "analytics":
        return "Sales Analytics"
      case "dashboard":
      default:
        return "Dashboard Overview"
    }
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="bg-background">
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-green-800">{getSectionTitle()}</h1>
            <p className="text-muted-foreground">Manage your organic food e-commerce store</p>
          </div>
          {renderContent()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
