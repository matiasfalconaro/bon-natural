"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/atoms/button/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import styles from "./page.module.css"

export default function AccountPage() {
  const { t } = useLanguage()
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if not logged in
  if (!user) {
    router.push("/login")
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your new passwords match.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    })

    setIsSubmitting(false)
    setFormData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }))
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{t("account.title") || "Account Settings"}</h1>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>{t("account.profile") || "Profile Information"}</h2>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                {t("account.name") || "Name"}
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                {t("account.email") || "Email"}
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className={styles.submitButton}>
              {isSubmitting ? t("account.saving") || "Saving..." : t("account.save") || "Save Changes"}
            </Button>
          </form>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>{t("account.password") || "Change Password"}</h2>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="currentPassword" className={styles.label}>
                {t("account.currentPassword") || "Current Password"}
              </label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="newPassword" className={styles.label}>
                {t("account.newPassword") || "New Password"}
              </label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                {t("account.confirmPassword") || "Confirm New Password"}
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className={styles.submitButton}>
              {isSubmitting ? t("account.saving") || "Saving..." : t("account.changePassword") || "Change Password"}
            </Button>
          </form>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>{t("account.logout") || "Logout"}</h2>
          <p className={styles.cardDescription}>
            {t("account.logoutDescription") || "Ready to leave? You can always come back later."}
          </p>
          <Button variant="outline" onClick={handleLogout} className={styles.logoutButton}>
            {t("account.logout") || "Logout"}
          </Button>
        </div>
      </div>
    </div>
  )
}
