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
import { useLanguage } from "@/contexts/language-context";

type SupportedLanguage = "en" | "es" | "fr";

export function AdminSidebar() {
  const { language, t } = useLanguage();
  const lang = language as SupportedLanguage;
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
          <span className="font-semibold">{t("sidebar.title")}</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("sidebar.subtitle")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "dashboard"}
                  onClick={() => handleSectionChange("dashboard")}
                >
                  <Home className="h-4 w-4" />
                  <span>{t("sidebar.dashboard")}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeSection === "orders"} onClick={() => handleSectionChange("orders")}>
                  <ShoppingCart className="h-4 w-4" />
                  <span>{t("sidebar.orders")}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "customers"}
                  onClick={() => handleSectionChange("customers")}
                >
                  <Users className="h-4 w-4" />
                  <span>{t("sidebar.customers")}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "analytics"}
                  onClick={() => handleSectionChange("analytics")}
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>{t("sidebar.analitycs")}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{t("sidebar.cataloge")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "products"}
                  onClick={() => handleSectionChange("products")}
                >
                  <Package className="h-4 w-4" />
                  <span>{t("sidebar.products")}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "categories"}
                  onClick={() => handleSectionChange("categories")}
                >
                  <Tag className="h-4 w-4" />
                  <span>{t("sidebar.categories")}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "promotions"}
                  onClick={() => handleSectionChange("promotions")}
                >
                  <Gift className="h-4 w-4" />
                  <span>{t("sidebar.bundles")}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "discounts"}
                  onClick={() => handleSectionChange("discounts")}
                >
                  <Percent className="h-4 w-4" />
                  <span>{t("sidebar.discounts")}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{t("sidebar.actions")}</SidebarGroupLabel>
          <SidebarGroupContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" onClick={() => handleCreateNew("product")}>
              <Plus className="mr-2 h-4 w-4" />
              {t("sidebar.add.products")}
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => handleCreateNew("category")}>
              <Plus className="mr-2 h-4 w-4" />
              {t("sidebar.add.category")}
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => handleCreateNew("promo")}>
              <Plus className="mr-2 h-4 w-4" />
              {t("sidebar.add.bundle")}
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => handleCreateNew("discount")}>
              <Plus className="mr-2 h-4 w-4" />
              {t("sidebar.add.discount")}
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings className="h-4 w-4" />
              <span>{t("sidebar.settings")}</span>
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
