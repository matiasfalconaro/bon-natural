"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import styles from "./page.module.css"

export default function ContactPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5100"}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const contentType = response.headers.get("content-type")

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json()

        if (response.ok) {
          toast({
            title: t("contact.toast.successTitle"),
            description: t("contact.toast.successDescription"),
          })
          setFormData({ name: "", email: "", subject: "", message: "" })
        } else {
          toast({
            title: t("contact.toast.errorTitle"),
            description: data.message || t("contact.toast.errorDescription"),
            variant: "destructive",
          })
        }
      } else {
        throw new Error("Server did not return JSON")
      }
    } catch (error) {
      console.error(error)
      toast({
        title: t("contact.toast.errorTitle"),
        description: t("contact.toast.errorDescription"),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t("contact.title")}</h1>
        <p className={styles.subtitle}>{t("contact.subtitle")}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.contactInfo}>
          <div className={styles.infoCard}>
            <div className={styles.infoHeader}>
              <h2 className={styles.infoTitle}>{t("contact.getInTouch")}</h2>
              <p className={styles.infoSubtitle}>{t("contact.reachOut")}</p>
            </div>

            <div className={styles.infoItems}>
              <div className={styles.infoItem}>
                <MapPin className={styles.infoIcon} />
                <div>
                  <h3 className={styles.infoItemTitle}>{t("contact.address")}</h3>
                  <p className={styles.infoItemText}>{t("contact.addressDetails")}</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <Phone className={styles.infoIcon} />
                <div>
                  <h3 className={styles.infoItemTitle}>{t("contact.phone")}</h3>
                  <p className={styles.infoItemText}>{t("contact.phoneNumber")}</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <Mail className={styles.infoIcon} />
                <div>
                  <h3 className={styles.infoItemTitle}>{t("contact.email")}</h3>
                  <p className={styles.infoItemText}>{t("contact.emailAddress")}</p>
                </div>
              </div>

              <div className={styles.infoItem}>
              <Clock className={styles.infoIcon} />
              <div>
                <h3 className={styles.infoItemTitle}>{t("contact.hours")}</h3>
                <p className={styles.infoItemText}>
                  {t("contact.hoursDetails").split("\n").map((line, idx) => (
                    <React.Fragment key={idx}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>
            </div>
          </div>
        </div>

        <div className={styles.contactForm}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>
                {t("contact.form.name")}
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                {t("contact.form.email")}
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject" className={styles.formLabel}>
                {t("contact.form.subject")}
              </label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>
                {t("contact.form.message")}
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className={styles.formTextarea}
                rows={5}
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className={styles.submitButton}>
              {isSubmitting ? t("contact.form.sending") : t("contact.form.send")}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
