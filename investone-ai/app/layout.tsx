import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "InvestOne AI — One Platform. Every Investment. Smarter Decisions.",
  description: "India's first unified multi-asset investment super app. Consolidate all your investments — stocks, MFs, ETFs, REITs, InvITs, bonds — in one AI-powered platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
