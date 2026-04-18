"use client";

import { Providers } from "../../providers";
import I18nProvider from "../../i18n-provider";

export function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nProvider>
      <Providers>{children}</Providers>
    </I18nProvider>
  );
}
