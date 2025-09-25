"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Bell, MapPin, Clock, ExternalLink, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Alert {
  id: string
  title: string
  description: string
  severity: "critical" | "high" | "medium" | "low"
  type: "outbreak" | "advisory" | "emergency" | "update"
  location: string
  timestamp: Date
  isActive: boolean
  source: string
  actionRequired?: string
}

interface AlertCardProps {
  alert: Alert
}

export function AlertCard({ alert }: AlertCardProps) {
  const getSeverityIcon = () => {
    switch (alert.severity) {
      case "critical":
      case "high":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getSeverityColor = () => {
    switch (alert.severity) {
      case "critical":
        return "bg-destructive text-destructive-foreground"
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "low":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getTypeColor = () => {
    switch (alert.type) {
      case "outbreak":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      case "emergency":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
      case "advisory":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "update":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
    }
  }

  return (
    <Card
      className={cn(
        "transition-all hover:shadow-md",
        alert.severity === "critical" && "border-destructive/50 bg-destructive/5",
        !alert.isActive && "opacity-60",
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={cn("flex items-center gap-1", getSeverityColor())}>
                {getSeverityIcon()}
                {alert.severity}
              </Badge>
              <Badge className={getTypeColor()}>{alert.type}</Badge>
              {!alert.isActive && <Badge variant="outline">Inactive</Badge>}
            </div>
            <CardTitle className="text-xl text-balance">{alert.title}</CardTitle>
            <CardDescription className="text-base leading-relaxed">{alert.description}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{alert.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{formatTimestamp(alert.timestamp)}</span>
          </div>
        </div>

        <div className="text-sm">
          <span className="text-muted-foreground">Source: </span>
          <span className="font-medium">{alert.source}</span>
        </div>

        {alert.actionRequired && (
          <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <h4 className="font-medium text-primary mb-1">Action Required:</h4>
            <p className="text-sm text-muted-foreground">{alert.actionRequired}</p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button size="sm" variant="outline" className="bg-transparent">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Details
          </Button>
          <Button size="sm" variant="outline" className="bg-transparent">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          {alert.isActive && (
            <Button size="sm" variant="default">
              <Bell className="h-4 w-4 mr-2" />
              Subscribe
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
