"use client"

import Link from "next/link"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout p-6">
      <div className="mb-4 text-right">
        <Link href="/" className="text-blue-600 underline">
          ← Back to Site
        </Link>
      </div>
      {children}
    </div>
  )
}
