"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
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
  const { t } = useLanguage();
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
        <h2 className="text-lg font-semibold">{t("payment.title")}</h2>
        <p className="text-sm text-muted-foreground">{t("payment.subtitle")}</p>

        <Tabs defaultValue="debit" value={method} onValueChange={setMethod} className="w-full space-y-2">
          <TabsList className="flex justify-between gap-2">
            <TabsTrigger value="debit" className="flex-1">{t("payment.debit")}</TabsTrigger>
            <TabsTrigger value="credit" className="flex-1">{t("payment.credit")}</TabsTrigger>
          </TabsList>
          <TabsList className="flex justify-between gap-2">
            <TabsTrigger value="paypal" className="flex-1">{t("payment.paypal")}</TabsTrigger>
            <TabsTrigger value="mercado" className="flex-1">{t("payment.mercado")}</TabsTrigger>
          </TabsList>
        </Tabs>

        {(method === "debit" || method === "credit") && (
          <div className="space-y-2">
            <Input placeholder={t("payment.fullName")} />
            <Input placeholder={t("payment.city")} />
            <Input placeholder={t("payment.cardNumber")} />
            <div className="grid grid-cols-3 gap-2">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={t("payment.month")} />
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
                  <SelectValue placeholder={t("payment.year")} />
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
            {t(`payment.redirect.${method}`)}
          </p>
        )}

        <div className="space-y-2 pt-2">
          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? "Processing..." : "Continue"}
          </Button>
          <Button variant="outline" className="w-full" onClick={onCancel}>
             {t("payment.cancel")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
