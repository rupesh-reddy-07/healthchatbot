"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Thermometer, Heart, Baby, Pill, Shield, AlertTriangle } from "lucide-react"

interface QuickActionsProps {
  onActionClick: (action: string) => void
}

const quickActions = [
  {
    icon: Thermometer,
    label: "Fever Symptoms",
    query: "I have a fever. What should I do?",
  },
  {
    icon: Heart,
    label: "Heart Health",
    query: "How can I maintain good heart health?",
  },
  {
    icon: Baby,
    label: "Child Care",
    query: "What are important child health checkups?",
  },
  {
    icon: Pill,
    label: "Medication Info",
    query: "How should I take my medications safely?",
  },
  {
    icon: Shield,
    label: "Prevention Tips",
    query: "What are the best disease prevention practices?",
  },
  {
    icon: AlertTriangle,
    label: "Emergency Signs",
    query: "What are warning signs that need immediate medical attention?",
  },
]

export function QuickActions({ onActionClick }: QuickActionsProps) {
  return (
    <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-balance">Quick Health Questions</CardTitle>
        <p className="text-muted-foreground">Get instant answers to common health concerns</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-6 flex flex-col items-center gap-3 text-center bg-white/60 hover:bg-white hover:border-primary/50 hover:shadow-md transition-all duration-200 rounded-xl border-border/50"
                onClick={() => onActionClick(action.query)}
              >
                <div className="p-3 bg-primary/10 rounded-full">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm font-medium leading-tight text-foreground">{action.label}</span>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
