
"use client";

import { useI18n } from "../../locales/client";

export default function I18nLink({ href, i18nKey, className }: { href: string; i18nKey: any; className?: string }) {
  const t = useI18n();

  return (
    <a href={href} className={className || "font-medium text-primary hover:text-secondary"}>
      {t(i18nKey, {})}
    </a>
  );
}
