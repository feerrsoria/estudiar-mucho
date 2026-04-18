
"use client";

import { useI18n } from "../../locales/client";

export default function I18nLink({ href, i18nKey }: { href: string;  i18nKey: "signin.noaccount" | "signup.haveaccount";}) {
  const t = useI18n();

  return (
    <a href={href} className="font-medium text-primary hover:text-secondary">
      {t(i18nKey)}
    </a>
  );
}
