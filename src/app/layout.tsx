import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AppProviders } from "@/components/layout/app-providers";

export const metadata: Metadata = {
  title: "StadiumOS AI — FIFA World Cup 2026",
  description:
    "AI-powered fan experience and crowd intelligence platform for the FIFA World Cup 2026, built with Gemini 2.5 Flash, Next.js, and Google Cloud.",
  keywords: ["FIFA World Cup 2026", "StadiumOS", "AI", "Gemini", "Stadium", "Crowd Management"],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0aa570",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <AppProviders>
          <div className="relative flex min-h-screen flex-col">
            <div className="pointer-events-none fixed inset-0 -z-10 bg-grid-pattern bg-[size:40px_40px] opacity-[0.03]" />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
