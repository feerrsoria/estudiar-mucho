"use client";

import { useI18n } from "../../../locales/client";

export default function TermsPage() {
  const t = useI18n();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-foreground">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-8">{t("terms.title")}</h1>

        <p className="mb-6 text-foreground/80">
          <strong>{t("terms.effectiveDateLabel")}</strong> {t("terms.effectiveDateValue")}<br />
          <strong>{t("terms.websiteLabel")}</strong> <a href="https://flashcards.fernandosoria.site" className="text-primary hover:underline">{t("terms.websiteValue")}</a>
        </p>

        <div className="space-y-8 text-lg">
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t("terms.section1.title")}</h2>
            <p className="text-foreground/90 leading-relaxed">{t("terms.section1.content")}</p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t("terms.section2.title")}</h2>
            <p className="text-foreground/90 leading-relaxed">{t("terms.section2.content")}</p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-foreground/80 leading-relaxed">
              <li>{t("terms.section2.item1")}</li>
              <li>{t("terms.section2.item2.intro")}</li>
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-foreground/70">
                <li>{t("terms.section2.item2.bullet1")}</li>
                <li>{t("terms.section2.item2.bullet2")}</li>
                <li>{t("terms.section2.item2.bullet3")}</li>
              </ul>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t("terms.section3.title")}</h2>
            <p className="text-foreground/90 leading-relaxed">{t("terms.section3.content")}</p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t("terms.section4.title")}</h2>
            <p className="text-foreground/90 leading-relaxed">{t("terms.section4.content")}</p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t("terms.section5.title")}</h2>
            <p className="text-foreground/90 leading-relaxed">{t("terms.section5.content")}</p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t("terms.section6.title")}</h2>
            <p className="text-foreground/90 leading-relaxed">{t("terms.section6.content")}</p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t("terms.section7.title")}</h2>
            <p className="text-foreground/90 leading-relaxed">{t("terms.section7.content")}</p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t("terms.section8.title")}</h2>
            <p className="text-foreground/90 leading-.page.tsx
- [ts Error] Line 11: No overload matches this call.
  Overload 1 of 2, 
    Argument of type relaxed">{t("terms.section8.content")}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
