"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface EditItemDialogProps {
  item: any
  open: boolean
  setOpen: (open: boolean) => void
  type: "product" | "category" | "promo" | "discount"
}

export function EditItemDialog({ item, open, setOpen, type }: EditItemDialogProps) {
  // Form state based on item type
  const [formData, setFormData] = useState<any>(item)

  // Update form data when item changes
  useEffect(() => {
    if (item) {
      setFormData(item)
    }
  }, [item])

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your API
    console.log(`Updating ${type}:`, formData)
    setOpen(false)
  }

  // Render the appropriate form based on the type
  const renderForm = () => {
    switch (type) {
      case "product":
        return renderProductForm()
      case "category":
        return renderCategoryForm()
      case "promo":
        return renderPromoForm()
      case "discount":
        return renderDiscountForm()
      default:
        return null
    }
  }

  // Product form
  const renderProductForm = () => (
    <>
      <DialogHeader>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogDescription>Make changes to the product information.</DialogDescription>
      </DialogHeader>
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
        </TabsList>
        <TabsContent value="basic" className="space-y-4 pt-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select
              defaultValue={formData.category}
              onValueChange={(value) => setFormData((prev: any) => ({ ...prev, category: value }))}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fruits">Fruits</SelectItem>
                <SelectItem value="Vegetables">Vegetables</SelectItem>
                <SelectItem value="Dairy">Dairy</SelectItem>
                <SelectItem value="Grains">Grains & Cereals</SelectItem>
                <SelectItem value="Meat">Organic Meat</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price ($)
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right">
              Stock
            </Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
        </TabsContent>
        <TabsContent value="details" className="space-y-4 pt-4">
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              className="col-span-3 min-h-[100px]"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="organic" className="text-right">
              Organic Certified
            </Label>
            <div className="flex items-center space-x-2 col-span-3">
              <Switch
                id="organic"
                checked={formData.organic}
                onCheckedChange={(checked) => setFormData((prev: any) => ({ ...prev, organic: checked }))}
              />
              <Label htmlFor="organic" className="cursor-pointer">
                {formData.organic ? "Yes" : "No"}
              </Label>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="featured" className="text-right">
              Featured Product
            </Label>
            <div className="flex items-center space-x-2 col-span-3">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData((prev: any) => ({ ...prev, featured: checked }))}
              />
              <Label htmlFor="featured" className="cursor-pointer">
                {formData.featured ? "Yes" : "No"}
              </Label>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="nutrition" className="space-y-4 pt-4">
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="nutritionalInfo" className="text-right pt-2">
              Nutritional Info
            </Label>
            <Textarea
              id="nutritionalInfo"
              name="nutritionalInfo"
              value={formData.nutritionalInfo || ""}
              onChange={handleChange}
              className="col-span-3 min-h-[150px]"
              placeholder="Enter nutritional information, ingredients, allergens, etc."
            />
          </div>
        </TabsContent>
      </Tabs>
    </>
  )

  // Category form
  const renderCategoryForm = () => (
    <>
      <DialogHeader>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogDescription>Make changes to the category information.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="description" className="text-right pt-2">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="parentCategory" className="text-right">
            Parent Category
          </Label>
          <Select
            defaultValue={formData.parentCategory || "none"}
            onValueChange={(value) =>
              setFormData((prev: any) => ({ ...prev, parentCategory: value === "none" ? null : value }))
            }
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select a parent category (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None (Top Level)</SelectItem>
              <SelectItem value="Fruits">Fruits</SelectItem>
              <SelectItem value="Vegetables">Vegetables</SelectItem>
              <SelectItem value="Dairy">Dairy</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="featured" className="text-right">
            Featured Category
          </Label>
          <div className="flex items-center space-x-2 col-span-3">
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData((prev: any) => ({ ...prev, featured: checked }))}
            />
            <Label htmlFor="featured" className="cursor-pointer">
              {formData.featured ? "Yes" : "No"}
            </Label>
          </div>
        </div>
      </div>
    </>
  )

  // Promotion/Bundle form
  const renderPromoForm = () => (
    <>
      <DialogHeader>
        <DialogTitle>Edit Bundle</DialogTitle>
        <DialogDescription>Make changes to the bundle information.</DialogDescription>
      </DialogHeader>
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="products">Products & Pricing</TabsTrigger>
        </TabsList>
        <TabsContent value="basic" className="space-y-4 pt-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Bundle Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startDate" className="text-right">
              Start Date
            </Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endDate" className="text-right">
              End Date
            </Label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="active" className="text-right">
              Active
            </Label>
            <div className="flex items-center space-x-2 col-span-3">
              <Switch
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => setFormData((prev: any) => ({ ...prev, active: checked }))}
              />
              <Label htmlFor="active" className="cursor-pointer">
                {formData.active ? "Yes" : "No"}
              </Label>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="products" className="space-y-4 pt-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="discountType" className="text-right">
              Discount Type
            </Label>
            <Select
              defaultValue={formData.discountType}
              onValueChange={(value) => setFormData((prev: any) => ({ ...prev, discountType: value }))}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select discount type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage (%)</SelectItem>
                <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                <SelectItem value="bundle">Bundle Price</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="discountValue" className="text-right">
              {formData.discountType === "percentage"
                ? "Discount (%)"
                : formData.discountType === "fixed"
                  ? "Discount Amount ($)"
                  : "Bundle Price ($)"}
            </Label>
            <Input
              id="discountValue"
              name="discountValue"
              type="number"
              step={formData.discountType === "percentage" ? "1" : "0.01"}
              min="0"
              value={formData.discountValue}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="col-span-4 pt-2">
            <Label className="block mb-2">Products in Bundle</Label>
            <div className="border rounded-md p-4 bg-muted/20">
              <p className="text-sm text-muted-foreground mb-2">
                Select products to include in this bundle (product selection UI would go here)
              </p>
              {/* This would be replaced with a proper product selection UI */}
              <div className="flex flex-wrap gap-2">
                <div className="bg-primary/10 text-primary rounded-md px-2 py-1 text-sm flex items-center">
                  Organic Apples (5lb)
                </div>
                <div className="bg-primary/10 text-primary rounded-md px-2 py-1 text-sm flex items-center">
                  Organic Carrots (2lb)
                </div>
                <div className="bg-primary/10 text-primary rounded-md px-2 py-1 text-sm flex items-center">
                  Organic Spinach (1lb)
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  )

  // Discount form
  const renderDiscountForm = () => (
    <>
      <DialogHeader>
        <DialogTitle>Edit Discount</DialogTitle>
        <DialogDescription>Make changes to the discount information.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Discount Name
          </Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="code" className="text-right">
            Coupon Code
          </Label>
          <Input id="code" name="code" value={formData.code} onChange={handleChange} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="description" className="text-right pt-2">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="discountType" className="text-right">
            Discount Type
          </Label>
          <Select
            defaultValue={formData.discountType}
            onValueChange={(value) => setFormData((prev: any) => ({ ...prev, discountType: value }))}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select discount type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="percentage">Percentage (%)</SelectItem>
              <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
              <SelectItem value="shipping">Free Shipping</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {formData.discountType !== "shipping" && (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="discountValue" className="text-right">
              {formData.discountType === "percentage" ? "Discount (%)" : "Discount Amount ($)"}
            </Label>
            <Input
              id="discountValue"
              name="discountValue"
              type="number"
              step={formData.discountType === "percentage" ? "1" : "0.01"}
              min="0"
              value={formData.discountValue}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
        )}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="minPurchase" className="text-right">
            Min. Purchase ($)
          </Label>
          <Input
            id="minPurchase"
            name="minPurchase"
            type="number"
            step="0.01"
            min="0"
            value={formData.minPurchase || ""}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="startDate" className="text-right">
            Start Date
          </Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="endDate" className="text-right">
            End Date
          </Label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="usageLimit" className="text-right">
            Usage Limit
          </Label>
          <Input
            id="usageLimit"
            name="usageLimit"
            type="number"
            min="0"
            value={formData.usageLimit || ""}
            onChange={handleChange}
            className="col-span-3"
            placeholder="Leave empty for unlimited"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="active" className="text-right">
            Active
          </Label>
          <div className="flex items-center space-x-2 col-span-3">
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => setFormData((prev: any) => ({ ...prev, active: checked }))}
            />
            <Label htmlFor="active" className="cursor-pointer">
              {formData.active ? "Yes" : "No"}
            </Label>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          {renderForm()}
          <DialogFooter>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
