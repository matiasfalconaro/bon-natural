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
          <p className={styles.paragraph}>{t("about.storyParagraph1")}</p>
          <p className={styles.paragraph}>{t("about.storyParagraph2")}</p>
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
            <h3 className={styles.valueTitle}>{t("about.values.quality.title")}</h3>
            <p className={styles.valueDescription}>{t("about.values.quality.description")}</p>
          </div>
          <div className={styles.valueCard}>
            <h3 className={styles.valueTitle}>{t("about.values.sustainability.title")}</h3>
            <p className={styles.valueDescription}>{t("about.values.sustainability.description")}</p>
          </div>
          <div className={styles.valueCard}>
            <h3 className={styles.valueTitle}>{t("about.values.community.title")}</h3>
            <p className={styles.valueDescription}>{t("about.values.community.description")}</p>
          </div>
          <div className={styles.valueCard}>
            <h3 className={styles.valueTitle}>{t("about.values.education.title")}</h3>
            <p className={styles.valueDescription}>{t("about.values.education.description")}</p>
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
                alt={t("about.team.sarah.name")}
                width={200}
                height={200}
                className={styles.teamImage}
              />
            </div>
            <h3 className={styles.teamName}>{t("about.team.sarah.name")}</h3>
            <p className={styles.teamRole}>{t("about.team.sarah.role")}</p>
          </div>

          <div className={styles.teamMember}>
            <div className={styles.teamImageContainer}>
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt={t("about.team.michael.name")}
                width={200}
                height={200}
                className={styles.teamImage}
              />
            </div>
            <h3 className={styles.teamName}>{t("about.team.michael.name")}</h3>
            <p className={styles.teamRole}>{t("about.team.michael.role")}</p>
          </div>

          <div className={styles.teamMember}>
            <div className={styles.teamImageContainer}>
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt={t("about.team.emily.name")}
                width={200}
                height={200}
                className={styles.teamImage}
              />
            </div>
            <h3 className={styles.teamName}>{t("about.team.emily.name")}</h3>
            <p className={styles.teamRole}>{t("about.team.emily.role")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
