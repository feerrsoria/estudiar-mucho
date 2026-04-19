"use client";

import { useI18n } from "../../../locales/client";

export default function PrivacyPage() {
  const t = useI18n();

  return (
    <div className="container mx-auto px-4 py-8 text-foreground">
      <h1 className="text-4xl font-extrabold mb-6">{t("privacy.title")}</h1>

      <p className="mb-6 text-foreground/80">
        <strong>{t("privacy.lastUpdatedLabel")}</strong> {t("privacy.lastUpdatedValue")}<br />
        <strong>{t("privacy.websiteLabel")}</strong> <a href="https://flashcards.fernandosoria.site" className="text-primary hover:underline">{t("privacy.websiteValue")}</a>
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">{t("privacy.section1.title")}</h2>
          <p className="text-foreground/90">{t("privacy.section1.content")}</p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-foreground/80">
            <li><strong>{t("privacy.section1.item1.label")}</strong> {t("privacy.section1.item1.content")}</li>
            <li><strong>{t("privacy.section1.item2.label")}</strong> {t("privacy.section1.item2.content")}</li>
            <li><strong>{t("privacy.section1.item3.label")}</strong> {t("privacy.section1.item3.content")}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("privacy.section2.title")}</h2>
          <p className="text-foreground/90">{t("privacy.section2.content")}</p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-foreground/80">
            <li>{t("privacy.section2.item1")}</li>
            <li>{t("privacy.section2.item2")}</li>
            <li>{t("privacy.section2.item3")}</li>
            <li>{t("privacy.section2.item4")}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("privacy.section3.title")}</h2>
          <p className="text-foreground/90">{t("privacy.section3.content")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("privacy.section4.title")}</h2>
          <p className="text-foreground/90">{t("privacy.section4.content")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("privacy.section5.title")}</h2>
          <p className="text-foreground/90">{t("privacy.section5.content")}</p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-foreground/80">
            <li>{t("privacy.section5.item1")}</li>
            <li>{t("privacy.section5.item2")}</li>
            <li>{t("privacy.section5.item3")}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t("privacy.section6.title")}</h2>
          <p className="text-foreground/90">{t("privacy.section6.content")}</p>
        </section>
      </div>
    </div>
  );
}
