export type DiscountType = "percentage" | "fixed"

export interface Discount {
  id: string
  code: string
  type: DiscountType
  amount: number
  expiresAt?: string
  usageLimit?: number
  usedCount: number
}
