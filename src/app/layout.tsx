import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import AppShell from "@/components/AppShell";
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
  title: "VYOMA — Understand your chart.",
  description:
    "VYOMA — See your Vedic chart. Understand the pattern. Ask anything.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans text-[14px] antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
