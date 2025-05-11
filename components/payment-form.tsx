"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PaymentMethodFormProps {
  orderId: string;
  onCancel: () => void;
}

export default function PaymentMethodForm({ orderId, onCancel }: PaymentMethodFormProps) {
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("debit");

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${orderId}/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Payment confirmation failed");
      }

      alert(`✅ Payment confirmed via ${method}!`);
    } catch (err: any) {
      console.error("Payment error:", err);
      alert(`❌ ${err.message || "Payment failed"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto p-4">
      <CardContent className="space-y-4">
        <h2 className="text-lg font-semibold">Payment Method</h2>
        <p className="text-sm text-muted-foreground">Choose how you want to pay.</p>

        <Tabs defaultValue="debit" value={method} onValueChange={setMethod} className="w-full space-y-2">
          <TabsList className="flex justify-between gap-2">
            <TabsTrigger value="debit" className="flex-1">Debit Card</TabsTrigger>
            <TabsTrigger value="credit" className="flex-1">Credit Card</TabsTrigger>
          </TabsList>
          <TabsList className="flex justify-between gap-2">
            <TabsTrigger value="paypal" className="flex-1">Paypal</TabsTrigger>
            <TabsTrigger value="mercado" className="flex-1">Mercado Pago</TabsTrigger>
          </TabsList>
        </Tabs>

        {(method === "debit" || method === "credit") && (
          <div className="space-y-2">
            <Input placeholder="Full Name" />
            <Input placeholder="City" />
            <Input placeholder="Card number" />
            <div className="grid grid-cols-3 gap-2">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i} value={(i + 1).toString().padStart(2, "0")}>
                      {(i + 1).toString().padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => (
                    <SelectItem key={i} value={(2024 + i).toString()}>
                      {2024 + i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input placeholder="CVC" />
            </div>
          </div>
        )}

        {(method === "paypal" || method === "mercado") && (
          <p className="text-sm text-muted-foreground italic">
            You’ll be redirected to {method === "paypal" ? "Paypal" : "Mercado Pago"} to complete your payment.
          </p>
        )}

        <div className="space-y-2 pt-2">
          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? "Processing..." : "Continue"}
          </Button>
          <Button variant="outline" className="w-full" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
