import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import AppShell from "@/components/AppShell";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "VYOMA — Free Vedic Astrology, Birth Chart & Kundli Matching",
    template: "%s | VYOMA",
  },
  description:
    "Generate your free Vedic birth chart (kundli), see today's panchang, ask questions about your chart in plain English, and check kundli matching — rooted in traditional Jyotish and Lal Kitab.",
  keywords: [
    "vedic astrology", "birth chart", "kundli", "kundli generator",
    "panchang", "today panchang", "kundli matching", "guna milan",
    "ashta kuta", "lal kitab", "jyotish", "free horoscope",
  ],
  openGraph: {
    type: "website",
    siteName: "VYOMA",
    title: "VYOMA — Free Vedic Astrology, Birth Chart & Kundli Matching",
    description:
      "Generate your free Vedic birth chart, see today's panchang, ask questions about your chart, and check kundli matching.",
  },
  twitter: {
    card: "summary_large_image",
    title: "VYOMA — Free Vedic Astrology, Birth Chart & Kundli Matching",
    description:
      "Generate your free Vedic birth chart, see today's panchang, ask questions about your chart, and check kundli matching.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VYOMA",
  url: SITE_URL,
  description:
    "Free Vedic astrology: birth chart generation, daily panchang, chart Q&A, and kundli matching.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans text-[14px] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
