export async function getAllCustomers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/users/customers/admin`, {
    credentials: "include",
    cache: "no-store",
  })

  if (!res.ok) throw new Error("Failed to fetch customers")
  return res.json()
}