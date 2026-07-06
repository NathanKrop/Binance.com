import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Binance Clone — Crypto Exchange",
  description: "A cloned Binance homepage and trading experience built with Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-bg-primary text-text-primary">
        {children}
      </body>
    </html>
  );
}
