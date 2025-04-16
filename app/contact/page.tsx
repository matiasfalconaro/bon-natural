"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/atoms/button/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you soon!",
    })

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)
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
                  <p className={styles.infoItemText}>123 Nature Lane, Organic City, OC 12345</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <Phone className={styles.infoIcon} />
                <div>
                  <h3 className={styles.infoItemTitle}>{t("contact.phone")}</h3>
                  <p className={styles.infoItemText}>(555) 123-4567</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <Mail className={styles.infoIcon} />
                <div>
                  <h3 className={styles.infoItemTitle}>{t("contact.email")}</h3>
                  <p className={styles.infoItemText}>hello@naturalfoodboutique.com</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <Clock className={styles.infoIcon} />
                <div>
                  <h3 className={styles.infoItemTitle}>{t("contact.hours")}</h3>
                  <p className={styles.infoItemText}>
                    Monday - Friday: 9am - 6pm
                    <br />
                    Saturday: 10am - 4pm
                    <br />
                    Sunday: Closed
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
