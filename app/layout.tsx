import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ThemeProvider } from "@/components/theme-provider"
import { TemperatureProvider } from "@/components/temperature-context"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Weather & Maps | Real-Time Insights",
  description:
    "Live weather, accurate forecasts, and interactive maps worldwide.",
  authors: [{ name: "Sujan Das" }],
  icons: {
    icon: "/logo.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased flex flex-col min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TemperatureProvider>
            <Header />
            <main className="flex-1 bg-background">{children}</main>
            <Footer />
          </TemperatureProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
