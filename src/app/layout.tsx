import type { Metadata } from "next";
import { Suspense } from "react";
import { Montserrat, Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "./theme-provider";
import { QueryProvider } from "./query-provider";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import Loader from "@/components/Loader";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Country Explorer",
  description:
    "Explore detailed information about countries worldwide, including population, region, capital, and more. Search, filter, and discover countries with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${inter.variable} antialiased font-sans bg-white dark:bg-background`}
      >
        <ThemeProvider>
          <QueryProvider>
            <Navbar />
            <Suspense fallback={<Loader />}>{children}</Suspense>
            <Toaster
              position="top-right"
              richColors
              closeButton
              theme="system"
            />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
