
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Providers } from "../providers";
import I18nProvider from "../i18n-provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Estudiar-Mucho",
  description: "Learn anything, faster.",
};

export default async function RootLayout({ 
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning={true}>
        <I18nProvider>
          <Providers>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </Providers>
        </I18nProvider>
      </body>
    </html>
  );
}
