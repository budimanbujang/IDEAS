import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "IDEAS - Integrated Discovery, Engagement & Acceleration System",
  description:
    "JCorp's multi-sector innovation aggregator platform orchestrating AI innovation across healthcare, proptech, agrifood, and food services.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-sans">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
