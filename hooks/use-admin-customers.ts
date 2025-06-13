import { useEffect, useState } from "react"
import { getAllCustomers } from "@/lib/api/customers"

export function useCustomers() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllCustomers()
      .then(setCustomers)
      .finally(() => setLoading(false))
  }, [])

  return { customers, loading }
}