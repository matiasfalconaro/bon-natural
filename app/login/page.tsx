"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";
import { useAuth } from "@/contexts/auth-context";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";

export default function LoginPage() {
  const { t } = useLanguage();
  const { login, user, isLoading } = useAuth();
  const { toast } = useToast();

  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const hasResetToken = searchParams.get("resetToken");
    const hasEmailToken = searchParams.get("token");
  
    if (!isLoading && user) {
      if (!hasResetToken && !hasEmailToken) {
        router.push("/");
      }
    }
  }, [user, isLoading, searchParams, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const success = await login(formData.email, formData.password);

      if (success) {
        toast({
          title: t("login.successTitle") || "Login successful",
          description: t("login.successDescription") || "Welcome back!",
        });
        router.push("/");
      } else {
        toast({
          title: t("login.failedTitle") || "Login failed",
          description: t("login.failedDescription") || "Invalid email or password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t("login.errorTitle") || "Error",
        description: t("login.errorDescription") || "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return null;

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>{t("login.title")}</h1>
        <p className={styles.subtitle}>{t("login.subtitle")}</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              {t("login.email")}
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="you@example.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              {t("login.password")}
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="Your password"
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className={styles.submitButton}>
            {isSubmitting ? t("login.loggingIn") : t("login.login")}
          </Button>
        </form>

        <div className={styles.links}>
          <Link href="/register" className={styles.link}>
            {t("login.noAccount")}
          </Link>
          <Link href="/forgot-password" className={styles.link}>
            {t("login.forgotPassword")}
          </Link>
        </div>
      </div>
    </div>
  );
}
