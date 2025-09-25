"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Users, MessageCircle, AlertTriangle, FileText, TrendingUp, Clock } from "lucide-react"

export function AdminStats() {
  const stats = [
    {
      title: "Total Users",
      value: "12,543",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Chat Sessions",
      value: "8,921",
      change: "+8%",
      icon: MessageCircle,
      color: "text-green-600",
    },
    {
      title: "Active Alerts",
      value: "23",
      change: "+3",
      icon: AlertTriangle,
      color: "text-red-600",
    },
    {
      title: "Resources",
      value: "156",
      change: "+5",
      icon: FileText,
      color: "text-purple-600",
    },
    {
      title: "Avg Response Time",
      value: "1.2s",
      change: "-0.3s",
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Success Rate",
      value: "98.5%",
      change: "+0.2%",
      icon: TrendingUp,
      color: "text-emerald-600",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Icon className={`h-4 w-4 ${stat.color}`} />
                <span className="text-xs text-green-600 font-medium">{stat.change}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
