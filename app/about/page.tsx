"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import styles from "./page.module.css"

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t("about.title")}</h1>
        <p className={styles.subtitle}>{t("about.subtitle")}</p>
      </div>

      <div className={styles.storySection}>
        <div className={styles.storyContent}>
          <h2 className={styles.sectionTitle}>{t("about.ourStory")}</h2>
          <p className={styles.paragraph}>
            Founded in 2010, Natural Food Boutique began with a simple mission: to make organic, sustainable, and
            locally-sourced natural foods accessible to everyone. What started as a small family-owned store has grown
            into a beloved community hub for health-conscious individuals and families.
          </p>
          <p className={styles.paragraph}>
            Our founder, Sarah Johnson, was inspired to create Natural Food Boutique after struggling to find
            high-quality organic products for her family. Frustrated by limited options and high prices, she envisioned
            a store that offered premium natural foods at fair prices, while supporting local farmers and sustainable
            practices.
          </p>
        </div>
        <div className={styles.storyImage}>
          <Image
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            alt="Our store"
            width={500}
            height={400}
            className={styles.image}
          />
        </div>
      </div>

      <div className={styles.valuesSection}>
        <h2 className={styles.sectionTitle}>{t("about.ourValues")}</h2>
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <h3 className={styles.valueTitle}>Quality</h3>
            <p className={styles.valueDescription}>
              We carefully select every product in our store, ensuring it meets our strict standards for quality,
              nutrition, and taste.
            </p>
          </div>
          <div className={styles.valueCard}>
            <h3 className={styles.valueTitle}>Sustainability</h3>
            <p className={styles.valueDescription}>
              We're committed to environmentally friendly practices, from sourcing products with minimal packaging to
              supporting regenerative agriculture.
            </p>
          </div>
          <div className={styles.valueCard}>
            <h3 className={styles.valueTitle}>Community</h3>
            <p className={styles.valueDescription}>
              We believe in building strong relationships with local farmers, producers, and customers to create a
              healthier, more connected community.
            </p>
          </div>
          <div className={styles.valueCard}>
            <h3 className={styles.valueTitle}>Education</h3>
            <p className={styles.valueDescription}>
              We're passionate about helping our customers learn about nutrition, sustainable living, and the story
              behind their food.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.teamSection}>
        <h2 className={styles.sectionTitle}>{t("about.ourTeam")}</h2>
        <div className={styles.teamGrid}>
          <div className={styles.teamMember}>
            <div className={styles.teamImageContainer}>
              <Image
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Sarah Johnson"
                width={200}
                height={200}
                className={styles.teamImage}
              />
            </div>
            <h3 className={styles.teamName}>Sarah Johnson</h3>
            <p className={styles.teamRole}>Founder & CEO</p>
          </div>
          <div className={styles.teamMember}>
            <div className={styles.teamImageContainer}>
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Michael Chen"
                width={200}
                height={200}
                className={styles.teamImage}
              />
            </div>
            <h3 className={styles.teamName}>Michael Chen</h3>
            <p className={styles.teamRole}>Head of Sourcing</p>
          </div>
          <div className={styles.teamMember}>
            <div className={styles.teamImageContainer}>
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Emily Rodriguez"
                width={200}
                height={200}
                className={styles.teamImage}
              />
            </div>
            <h3 className={styles.teamName}>Emily Rodriguez</h3>
            <p className={styles.teamRole}>Nutritionist</p>
          </div>
        </div>
      </div>
    </div>
  )
}
