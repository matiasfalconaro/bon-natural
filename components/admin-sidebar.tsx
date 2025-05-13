"use client"

import { useState } from "react"
import { BarChart3, Gift, Home, Leaf, Package, Percent, Plus, Settings, ShoppingCart, Tag, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { CreateItemDialog } from "./create-item-dialog"

export function AdminSidebar() {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")
  const [createDialogType, setCreateDialogType] = useState<"product" | "category" | "promo" | "discount" | null>(null)

  const handleCreateNew = (type: "product" | "category" | "promo" | "discount") => {
    setCreateDialogType(type)
    setOpen(true)
  }

  const handleSectionChange = (section: string) => {
    setActiveSection(section)

    const event = new CustomEvent("sectionChange", { detail: { section } })
    window.dispatchEvent(event)
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-4 py-2">
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="font-semibold">Bon Natural Boutique</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "dashboard"}
                  onClick={() => handleSectionChange("dashboard")}
                >
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeSection === "orders"} onClick={() => handleSectionChange("orders")}>
                  <ShoppingCart className="h-4 w-4" />
                  <span>Orders</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "customers"}
                  onClick={() => handleSectionChange("customers")}
                >
                  <Users className="h-4 w-4" />
                  <span>Customers</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "analytics"}
                  onClick={() => handleSectionChange("analytics")}
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Analytics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Catalog Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "products"}
                  onClick={() => handleSectionChange("products")}
                >
                  <Package className="h-4 w-4" />
                  <span>Products</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "categories"}
                  onClick={() => handleSectionChange("categories")}
                >
                  <Tag className="h-4 w-4" />
                  <span>Categories</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "promotions"}
                  onClick={() => handleSectionChange("promotions")}
                >
                  <Gift className="h-4 w-4" />
                  <span>Promotions & Bundles</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "discounts"}
                  onClick={() => handleSectionChange("discounts")}
                >
                  <Percent className="h-4 w-4" />
                  <span>Discounts</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Actions</SidebarGroupLabel>
          <SidebarGroupContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" onClick={() => handleCreateNew("product")}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Product
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => handleCreateNew("category")}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Category
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => handleCreateNew("promo")}>
              <Plus className="mr-2 h-4 w-4" />
              Create New Bundle
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => handleCreateNew("discount")}>
              <Plus className="mr-2 h-4 w-4" />
              Create New Discount
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />

      {createDialogType && (
        <CreateItemDialog
          open={open}
          setOpen={setOpen}
          type={createDialogType}
          onClose={() => setCreateDialogType(null)}
        />
      )}
    </Sidebar>
  )
}
