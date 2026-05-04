import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Samedha — A Second Brain",
  description:
    "Samedha is a personal AI memory layer. Built so knowledge never dies between conversations.",
  openGraph: {
    title: "Samedha — A Second Brain",
    description: "Not who you thought.",
    siteName: "Samedha",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans bg-bg text-text-primary">{children}</body>
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="7b06da29-55bf-43f9-9d6c-3b6d16283346"
        strategy="afterInteractive"
      />
    </html>
  );
}
