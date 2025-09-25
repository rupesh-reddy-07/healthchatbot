"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, AlertTriangle, CheckCircle, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

interface Vaccination {
  id: string
  name: string
  ageGroup: string
  description: string
  schedule: string
  importance: "high" | "medium" | "low"
  nextDue?: Date
  status: "due" | "upcoming" | "completed" | "overdue"
}

interface VaccinationCardProps {
  vaccination: Vaccination
}

export function VaccinationCard({ vaccination }: VaccinationCardProps) {
  const getStatusIcon = () => {
    switch (vaccination.status) {
      case "due":
        return <Bell className="h-4 w-4" />
      case "overdue":
        return <AlertTriangle className="h-4 w-4" />
      case "upcoming":
        return <Clock className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getStatusColor = () => {
    switch (vaccination.status) {
      case "due":
        return "bg-primary text-primary-foreground"
      case "overdue":
        return "bg-destructive text-destructive-foreground"
      case "upcoming":
        return "bg-secondary text-secondary-foreground"
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getImportanceColor = () => {
    switch (vaccination.importance) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "low":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className={cn("transition-all hover:shadow-md", vaccination.status === "overdue" && "border-destructive/50")}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl">{vaccination.name}</CardTitle>
              <Badge className={getImportanceColor()}>{vaccination.importance} priority</Badge>
            </div>
            <CardDescription className="text-base">{vaccination.description}</CardDescription>
          </div>
          <Badge className={cn("flex items-center gap-1", getStatusColor())}>
            {getStatusIcon()}
            {vaccination.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-1">Age Group</h4>
            <p className="text-sm">{vaccination.ageGroup}</p>
          </div>
          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-1">Schedule</h4>
            <p className="text-sm">{vaccination.schedule}</p>
          </div>
        </div>

        {vaccination.nextDue && (
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <Calendar className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium">{vaccination.status === "overdue" ? "Was due:" : "Next due:"}</p>
              <p className="text-sm text-muted-foreground">{formatDate(vaccination.nextDue)}</p>
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button size="sm" variant="outline" className="bg-transparent">
            <Bell className="h-4 w-4 mr-2" />
            Set Reminder
          </Button>
          <Button size="sm" variant="outline" className="bg-transparent">
            View Details
          </Button>
          {vaccination.status !== "completed" && (
            <Button size="sm" variant="default">
              Mark Complete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
