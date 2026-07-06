import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Binance Clone — Advanced Trading",
  description: "High-performance crypto trading terminal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="h-screen w-screen overflow-hidden bg-bg-primary">
        {children}
      </body>
    </html>
  );
}
