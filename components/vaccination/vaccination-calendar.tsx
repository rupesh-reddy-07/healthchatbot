"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
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

interface VaccinationCalendarProps {
  vaccinations: Vaccination[]
}

export function VaccinationCalendar({ vaccinations }: VaccinationCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getVaccinationsForDate = (date: Date) => {
    return vaccinations.filter((vaccination) => {
      if (!vaccination.nextDue) return false
      return (
        vaccination.nextDue.getDate() === date.getDate() &&
        vaccination.nextDue.getMonth() === date.getMonth() &&
        vaccination.nextDue.getFullYear() === date.getFullYear()
      )
    })
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = getFirstDayOfMonth(currentDate)
  const monthName = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  const days = []
  const today = new Date()

  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-24 border border-border/50"></div>)
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const dayVaccinations = getVaccinationsForDate(date)
    const isToday = date.toDateString() === today.toDateString()

    days.push(
      <div
        key={day}
        className={cn("h-24 border border-border/50 p-1 overflow-hidden", isToday && "bg-primary/10 border-primary/50")}
      >
        <div className={cn("text-sm font-medium mb-1", isToday && "text-primary")}>{day}</div>
        <div className="space-y-1">
          {dayVaccinations.slice(0, 2).map((vaccination) => (
            <Badge
              key={vaccination.id}
              variant="secondary"
              className={cn(
                "text-xs px-1 py-0 h-4 block truncate",
                vaccination.status === "due" && "bg-primary text-primary-foreground",
                vaccination.status === "overdue" && "bg-destructive text-destructive-foreground",
              )}
            >
              {vaccination.name}
            </Badge>
          ))}
          {dayVaccinations.length > 2 && (
            <Badge variant="outline" className="text-xs px-1 py-0 h-4">
              +{dayVaccinations.length - 2}
            </Badge>
          )}
        </div>
      </div>,
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Vaccination Calendar
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-lg font-medium min-w-48 text-center">{monthName}</span>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-0 border border-border/50">
          {/* Day headers */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="h-10 border border-border/50 bg-muted flex items-center justify-center">
              <span className="text-sm font-medium">{day}</span>
            </div>
          ))}
          {/* Calendar days */}
          {days}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded"></div>
            <span className="text-sm">Due Now</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-destructive rounded"></div>
            <span className="text-sm">Overdue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-secondary rounded"></div>
            <span className="text-sm">Upcoming</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
