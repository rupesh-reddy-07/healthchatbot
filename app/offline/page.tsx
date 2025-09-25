"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { WifiOff, RefreshCw, Heart } from "lucide-react"
import Link from "next/link"

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="pb-4">
          <div className="mx-auto mb-4 p-3 bg-muted rounded-full w-fit">
            <WifiOff className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">You're Offline</CardTitle>
          <CardDescription className="text-base leading-relaxed">
            It looks like you've lost your internet connection. Don't worry, you can still access some features.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-left">Available Offline:</h3>
            <ul className="text-sm text-muted-foreground space-y-2 text-left">
              <li>• Previously viewed health resources</li>
              <li>• Cached vaccination schedules</li>
              <li>• Emergency contact information</li>
              <li>• Basic health guidelines</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button onClick={() => window.location.reload()} className="w-full" variant="default">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>

            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/">
                <Heart className="h-4 w-4 mr-2" />
                Go to Home
              </Link>
            </Button>
          </div>

          <div className="pt-4 border-t text-xs text-muted-foreground">
            <p>Emergency: Call 108 for immediate medical assistance</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
