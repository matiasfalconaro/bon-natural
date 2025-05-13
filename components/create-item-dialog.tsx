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

interface CreateItemDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  type: "product" | "category" | "promo" | "discount"
  onClose: () => void
}

export function CreateItemDialog({ open, setOpen, type, onClose }: CreateItemDialogProps) {
  const [productForm, setProductForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    organic: true,
    featured: false,
    origin: "",
    nutritionalInfo: "",
    imageUrl: "",
  })

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
    parentCategory: "",
    featured: false,
    imageUrl: "",
  })

  const [promoForm, setPromoForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    discountType: "percentage",
    discountValue: "",
    products: [],
    active: true,
    imageUrl: "",
  })

  const [discountForm, setDiscountForm] = useState({
    name: "",
    code: "",
    description: "",
    discountType: "percentage",
    discountValue: "",
    minPurchase: "",
    startDate: "",
    endDate: "",
    usageLimit: "",
    active: true,
  })

  useEffect(() => {
    if (!open) {
      onClose()
    }
  }, [open, onClose])

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProductForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCategoryForm((prev) => ({ ...prev, [name]: value }))
  }

  const handlePromoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPromoForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setDiscountForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    switch (type) {
      case "product":
        console.log("Creating new product:", productForm)
        break
      case "category":
        console.log("Creating new category:", categoryForm)
        break
      case "promo":
        console.log("Creating new promotion/bundle:", promoForm)
        break
      case "discount":
        console.log("Creating new discount:", discountForm)
        break
    }

    setOpen(false)
  }

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

  const renderProductForm = () => (
    <>
      <DialogHeader>
        <DialogTitle>Add New Organic Product</DialogTitle>
        <DialogDescription>Add a new organic food product to your inventory.</DialogDescription>
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
              value={productForm.name}
              onChange={handleProductChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select onValueChange={(value) => setProductForm((prev) => ({ ...prev, category: value }))}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fruits">Fruits</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="dairy">Dairy</SelectItem>
                <SelectItem value="grains">Grains & Cereals</SelectItem>
                <SelectItem value="meat">Organic Meat</SelectItem>
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
              value={productForm.price}
              onChange={handleProductChange}
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
              value={productForm.stock}
              onChange={handleProductChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageUrl" className="text-right">
              Image URL
            </Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              value={productForm.imageUrl}
              onChange={handleProductChange}
              className="col-span-3"
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
              value={productForm.description}
              onChange={handleProductChange}
              className="col-span-3 min-h-[100px]"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="origin" className="text-right">
              Origin
            </Label>
            <Input
              id="origin"
              name="origin"
              value={productForm.origin}
              onChange={handleProductChange}
              className="col-span-3"
              placeholder="Country or region of origin"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="organic" className="text-right">
              Organic Certified
            </Label>
            <div className="flex items-center space-x-2 col-span-3">
              <Switch
                id="organic"
                checked={productForm.organic}
                onCheckedChange={(checked) => setProductForm((prev) => ({ ...prev, organic: checked }))}
              />
              <Label htmlFor="organic" className="cursor-pointer">
                {productForm.organic ? "Yes" : "No"}
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
                checked={productForm.featured}
                onCheckedChange={(checked) => setProductForm((prev) => ({ ...prev, featured: checked }))}
              />
              <Label htmlFor="featured" className="cursor-pointer">
                {productForm.featured ? "Yes" : "No"}
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
              value={productForm.nutritionalInfo}
              onChange={handleProductChange}
              className="col-span-3 min-h-[150px]"
              placeholder="Enter nutritional information, ingredients, allergens, etc."
            />
          </div>
        </TabsContent>
      </Tabs>
    </>
  )

  const renderCategoryForm = () => (
    <>
      <DialogHeader>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogDescription>Create a new category for organizing your organic products.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            value={categoryForm.name}
            onChange={handleCategoryChange}
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
            value={categoryForm.description}
            onChange={handleCategoryChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="parentCategory" className="text-right">
            Parent Category
          </Label>
          <Select onValueChange={(value) => setCategoryForm((prev) => ({ ...prev, parentCategory: value }))}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select a parent category (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None (Top Level)</SelectItem>
              <SelectItem value="fruits">Fruits</SelectItem>
              <SelectItem value="vegetables">Vegetables</SelectItem>
              <SelectItem value="dairy">Dairy</SelectItem>
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
              checked={categoryForm.featured}
              onCheckedChange={(checked) => setCategoryForm((prev) => ({ ...prev, featured: checked }))}
            />
            <Label htmlFor="featured" className="cursor-pointer">
              {categoryForm.featured ? "Yes" : "No"}
            </Label>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="imageUrl" className="text-right">
            Image URL
          </Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            value={categoryForm.imageUrl}
            onChange={handleCategoryChange}
            className="col-span-3"
          />
        </div>
      </div>
    </>
  )

  const renderPromoForm = () => (
    <>
      <DialogHeader>
        <DialogTitle>Create New Bundle</DialogTitle>
        <DialogDescription>Create a new bundle or promotion for your organic products.</DialogDescription>
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
              value={promoForm.name}
              onChange={handlePromoChange}
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
              value={promoForm.description}
              onChange={handlePromoChange}
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
              value={promoForm.startDate}
              onChange={handlePromoChange}
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
              value={promoForm.endDate}
              onChange={handlePromoChange}
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
                checked={promoForm.active}
                onCheckedChange={(checked) => setPromoForm((prev) => ({ ...prev, active: checked }))}
              />
              <Label htmlFor="active" className="cursor-pointer">
                {promoForm.active ? "Yes" : "No"}
              </Label>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageUrl" className="text-right">
              Image URL
            </Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              value={promoForm.imageUrl}
              onChange={handlePromoChange}
              className="col-span-3"
            />
          </div>
        </TabsContent>
        <TabsContent value="products" className="space-y-4 pt-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="discountType" className="text-right">
              Discount Type
            </Label>
            <Select
              defaultValue={promoForm.discountType}
              onValueChange={(value) => setPromoForm((prev) => ({ ...prev, discountType: value }))}
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
              {promoForm.discountType === "percentage"
                ? "Discount (%)"
                : promoForm.discountType === "fixed"
                  ? "Discount Amount ($)"
                  : "Bundle Price ($)"}
            </Label>
            <Input
              id="discountValue"
              name="discountValue"
              type="number"
              step={promoForm.discountType === "percentage" ? "1" : "0.01"}
              min="0"
              value={promoForm.discountValue}
              onChange={handlePromoChange}
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

  const renderDiscountForm = () => (
    <>
      <DialogHeader>
        <DialogTitle>Create New Discount</DialogTitle>
        <DialogDescription>Create a new discount or coupon code for your store.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Discount Name
          </Label>
          <Input
            id="name"
            name="name"
            value={discountForm.name}
            onChange={handleDiscountChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="code" className="text-right">
            Coupon Code
          </Label>
          <Input
            id="code"
            name="code"
            value={discountForm.code}
            onChange={handleDiscountChange}
            className="col-span-3"
            placeholder="e.g. ORGANIC20"
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
            value={discountForm.description}
            onChange={handleDiscountChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="discountType" className="text-right">
            Discount Type
          </Label>
          <Select
            defaultValue={discountForm.discountType}
            onValueChange={(value) => setDiscountForm((prev) => ({ ...prev, discountType: value }))}
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
        {discountForm.discountType !== "shipping" && (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="discountValue" className="text-right">
              {discountForm.discountType === "percentage" ? "Discount (%)" : "Discount Amount ($)"}
            </Label>
            <Input
              id="discountValue"
              name="discountValue"
              type="number"
              step={discountForm.discountType === "percentage" ? "1" : "0.01"}
              min="0"
              value={discountForm.discountValue}
              onChange={handleDiscountChange}
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
            value={discountForm.minPurchase}
            onChange={handleDiscountChange}
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
            value={discountForm.startDate}
            onChange={handleDiscountChange}
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
            value={discountForm.endDate}
            onChange={handleDiscountChange}
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
            value={discountForm.usageLimit}
            onChange={handleDiscountChange}
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
              checked={discountForm.active}
              onCheckedChange={(checked) => setDiscountForm((prev) => ({ ...prev, active: checked }))}
            />
            <Label htmlFor="active" className="cursor-pointer">
              {discountForm.active ? "Yes" : "No"}
            </Label>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen)
        if (!newOpen) onClose()
      }}
    >
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          {renderForm()}
          <DialogFooter>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              {type === "product"
                ? "Add Product"
                : type === "category"
                  ? "Add Category"
                  : type === "promo"
                    ? "Create Bundle"
                    : "Create Discount"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
