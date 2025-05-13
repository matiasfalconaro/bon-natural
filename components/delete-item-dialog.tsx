"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DeleteItemDialogProps {
  item: any
  open: boolean
  setOpen: (open: boolean) => void
  itemType: "product" | "category" | "promotion" | "discount"
}

export function DeleteItemDialog({ item, open, setOpen, itemType }: DeleteItemDialogProps) {
  const handleDelete = () => {
    console.log(`Deleting ${itemType}:`, item.id)
    setOpen(false)
  }

  const getWarningMessage = () => {
    switch (itemType) {
      case "product":
        return "This will permanently delete this product and remove it from your inventory."
      case "category":
        return `This will permanently delete this category. ${item.productCount > 0 ? `${item.productCount} products are currently assigned to this category.` : ""}`
      case "promotion":
        return "This will permanently delete this promotion/bundle and it will no longer be available to customers."
      case "discount":
        return "This will permanently delete this discount code and it will no longer be valid for customers."
      default:
        return "This action cannot be undone."
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{getWarningMessage()}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
