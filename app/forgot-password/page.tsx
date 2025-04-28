"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";
import styles from "../login/page.module.css";

export default function PasswordPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5100/api/users/forgot-password-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast({
          title: t("password.resetSuccessTitle"),
          description: t("password.resetSuccessDescription"),
        });
        router.push("/login");
      } else {
        const data = await response.json();
        toast({
          title: t("password.resetErrorTitle"),
          description: data.message || t("password.resetErrorDescription"),
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: t("password.resetErrorTitle"),
        description: t("password.resetErrorDescription"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>{t("password.resetPageTitle")}</h1>
        <p className={styles.subtitle}>{t("password.resetPageSubtitle")}</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              {t("contact.form.email")}
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="you@example.com"
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className={styles.submitButton}>
            {isSubmitting ? t("contact.form.sending") : t("password.resetSubmitButton")}
          </Button>
        </form>

        <div className={styles.links}>
          <a href="/login" className={styles.link}>
            {t("login.title")}
          </a>
        </div>
      </div>
    </div>
  );
}
