"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, X, Smartphone } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
      return
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowInstallPrompt(true)
    }

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowInstallPrompt(false)
      setDeferredPrompt(null)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === "accepted") {
        console.log("User accepted the install prompt")
      } else {
        console.log("User dismissed the install prompt")
      }

      setDeferredPrompt(null)
      setShowInstallPrompt(false)
    } catch (error) {
      console.error("Error during installation:", error)
    }
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
  }

  // Don't show if already installed or no prompt available
  if (isInstalled || !showInstallPrompt || !deferredPrompt) {
    return null
  }

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 border-primary/20 bg-primary/5 md:left-auto md:right-4 md:w-96">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Smartphone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Install HealthBot</CardTitle>
              <CardDescription className="text-sm">Get quick access and work offline</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleDismiss} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex gap-2">
          <Button onClick={handleInstallClick} size="sm" className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Install App
          </Button>
          <Button variant="outline" size="sm" onClick={handleDismiss} className="bg-transparent">
            Not Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
