import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["700"], variable: "--font-bodoni", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Independent Talent Search",
  description: "Register to receive updates about upcoming talent opportunities.",
};

export const viewport: Viewport = { themeColor: "#000000" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${inter.variable}`}>
      <body className="min-h-dvh bg-black font-sans text-white antialiased">{children}</body>
    </html>
  );
}
