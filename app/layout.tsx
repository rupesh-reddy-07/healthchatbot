import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { PWAInstall } from "@/components/pwa-install"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "HealthBot - AI-Powered Public Health Assistant",
  description: "Get reliable health information, vaccination schedules, and outbreak alerts for your community",
  generator: "v0.app",
  keywords: ["health", "healthcare", "vaccination", "public health", "AI chatbot", "rural health"],
  authors: [{ name: "HealthBot Team" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "HealthBot",
  },
  openGraph: {
    title: "HealthBot - AI-Powered Public Health Assistant",
    description: "Get reliable health information, vaccination schedules, and outbreak alerts for your community",
    type: "website",
    siteName: "HealthBot",
  },
  twitter: {
    card: "summary_large_image",
    title: "HealthBot - AI-Powered Public Health Assistant",
    description: "Get reliable health information, vaccination schedules, and outbreak alerts for your community",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0891b2",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="HealthBot" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0891b2" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={`font-sans antialiased`}>
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
          {children}
        </Suspense>
        <PWAInstall />
        <Analytics />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
