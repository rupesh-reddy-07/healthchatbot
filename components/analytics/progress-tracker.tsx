"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Target, Plus, CalendarIcon, Trophy, TrendingUp, CheckCircle } from "lucide-react"
import { format } from "date-fns"

interface Goal {
  id: string
  title: string
  description: string
  type: "weight_loss" | "weight_gain" | "exercise" | "nutrition" | "medication" | "custom"
  targetValue: number
  currentValue: number
  unit: string
  deadline: Date
  progress: number
  milestones: {
    value: number
    date: Date
    achieved: boolean
    note?: string
  }[]
  status: "active" | "completed" | "paused"
  createdAt: Date
}

const sampleGoals: Goal[] = [
  {
    id: "1",
    title: "Lose 10kg",
    description: "Reach my target weight for better health",
    type: "weight_loss",
    targetValue: 70,
    currentValue: 73.5,
    unit: "kg",
    deadline: new Date("2024-06-01"),
    progress: 65,
    milestones: [
      { value: 78, date: new Date("2024-01-01"), achieved: true, note: "Starting weight" },
      { value: 75, date: new Date("2024-02-01"), achieved: true, note: "First milestone reached!" },
      { value: 72, date: new Date("2024-04-01"), achieved: false },
      { value: 70, date: new Date("2024-06-01"), achieved: false },
    ],
    status: "active",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    title: "Walk 300,000 steps monthly",
    description: "Maintain active lifestyle with daily walking",
    type: "exercise",
    targetValue: 300000,
    currentValue: 285000,
    unit: "steps",
    deadline: new Date("2024-12-31"),
    progress: 95,
    milestones: [
      { value: 75000, date: new Date("2024-01-07"), achieved: true },
      { value: 150000, date: new Date("2024-01-15"), achieved: true },
      { value: 225000, date: new Date("2024-01-23"), achieved: true },
      { value: 300000, date: new Date("2024-01-31"), achieved: false },
    ],
    status: "active",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "3",
    title: "Take medication daily",
    description: "Maintain consistent medication schedule",
    type: "medication",
    targetValue: 30,
    currentValue: 28,
    unit: "days",
    deadline: new Date("2024-01-31"),
    progress: 93,
    milestones: [
      { value: 7, date: new Date("2024-01-07"), achieved: true },
      { value: 14, date: new Date("2024-01-14"), achieved: true },
      { value: 21, date: new Date("2024-01-21"), achieved: true },
      { value: 30, date: new Date("2024-01-31"), achieved: false },
    ],
    status: "active",
    createdAt: new Date("2024-01-01"),
  },
]

export function ProgressTracker() {
  const [goals, setGoals] = useState<Goal[]>(sampleGoals)
  const [selectedGoal, setSelectedGoal] = useState<Goal>(sampleGoals[0])
  const [isAddingGoal, setIsAddingGoal] = useState(false)
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({
    title: "",
    description: "",
    type: "weight_loss",
    targetValue: 0,
    currentValue: 0,
    unit: "",
    deadline: new Date(),
    milestones: [],
    status: "active",
  })

  const addGoal = () => {
    if (newGoal.title && newGoal.targetValue) {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        description: newGoal.description || "",
        type: newGoal.type || "custom",
        targetValue: newGoal.targetValue,
        currentValue: newGoal.currentValue || 0,
        unit: newGoal.unit || "",
        deadline: newGoal.deadline || new Date(),
        progress: ((newGoal.currentValue || 0) / newGoal.targetValue) * 100,
        milestones: [],
        status: "active",
        createdAt: new Date(),
      }

      setGoals([...goals, goal])
      setIsAddingGoal(false)
      setNewGoal({
        title: "",
        description: "",
        type: "weight_loss",
        targetValue: 0,
        currentValue: 0,
        unit: "",
        deadline: new Date(),
        milestones: [],
        status: "active",
      })
    }
  }

  const updateGoalProgress = (goalId: string, newValue: number) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          const progress = (newValue / goal.targetValue) * 100
          return {
            ...goal,
            currentValue: newValue,
            progress: Math.min(100, progress),
            status: progress >= 100 ? "completed" : "active",
          }
        }
        return goal
      }),
    )
  }

  const getGoalTypeIcon = (type: string) => {
    switch (type) {
      case "weight_loss":
      case "weight_gain":
        return "⚖️"
      case "exercise":
        return "🏃"
      case "nutrition":
        return "🥗"
      case "medication":
        return "💊"
      default:
        return "🎯"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "active":
        return "bg-blue-500"
      case "paused":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getDaysRemaining = (deadline: Date) => {
    const today = new Date()
    const diffTime = deadline.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Progress Tracker</h2>
          <p className="text-muted-foreground">Set and track your health goals with detailed progress monitoring</p>
        </div>
        <Dialog open={isAddingGoal} onOpenChange={setIsAddingGoal}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Health Goal</DialogTitle>
              <DialogDescription>Set a new goal to track your health progress</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goal-title">Goal Title</Label>
                <Input
                  id="goal-title"
                  placeholder="e.g., Lose 5kg"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal-description">Description</Label>
                <Input
                  id="goal-description"
                  placeholder="Brief description of your goal"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Goal Type</Label>
                  <Select
                    value={newGoal.type}
                    onValueChange={(value) => setNewGoal({ ...newGoal, type: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weight_loss">Weight Loss</SelectItem>
                      <SelectItem value="weight_gain">Weight Gain</SelectItem>
                      <SelectItem value="exercise">Exercise</SelectItem>
                      <SelectItem value="nutrition">Nutrition</SelectItem>
                      <SelectItem value="medication">Medication</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal-unit">Unit</Label>
                  <Input
                    id="goal-unit"
                    placeholder="kg, steps, days, etc."
                    value={newGoal.unit}
                    onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-value">Current Value</Label>
                  <Input
                    id="current-value"
                    type="number"
                    value={newGoal.currentValue}
                    onChange={(e) => setNewGoal({ ...newGoal, currentValue: Number.parseFloat(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target-value">Target Value</Label>
                  <Input
                    id="target-value"
                    type="number"
                    value={newGoal.targetValue}
                    onChange={(e) => setNewGoal({ ...newGoal, targetValue: Number.parseFloat(e.target.value) })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Deadline</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newGoal.deadline ? format(newGoal.deadline, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newGoal.deadline}
                      onSelect={(date) => setNewGoal({ ...newGoal, deadline: date || new Date() })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button onClick={addGoal} className="w-full">
                Create Goal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Your Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedGoal.id === goal.id ? "bg-primary/10 border-primary" : "hover:bg-muted"
                }`}
                onClick={() => setSelectedGoal(goal)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getGoalTypeIcon(goal.type)}</span>
                    <p className="font-medium text-sm">{goal.title}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(goal.status)}`} />
                </div>
                <Progress value={goal.progress} className="h-1 mb-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {goal.currentValue} / {goal.targetValue} {goal.unit}
                  </span>
                  <span>{Math.round(goal.progress)}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-secondary" />
                {selectedGoal.title}
              </CardTitle>
              <CardDescription>{selectedGoal.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-primary">{selectedGoal.currentValue}</p>
                  <p className="text-sm text-muted-foreground">Current</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-secondary">{selectedGoal.targetValue}</p>
                  <p className="text-sm text-muted-foreground">Target</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{getDaysRemaining(selectedGoal.deadline)}</p>
                  <p className="text-sm text-muted-foreground">Days Left</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Overall Progress</h4>
                  <Badge variant={selectedGoal.status === "completed" ? "default" : "secondary"}>
                    {selectedGoal.status}
                  </Badge>
                </div>
                <Progress value={selectedGoal.progress} className="h-3" />
                <p className="text-sm text-muted-foreground mt-1">{Math.round(selectedGoal.progress)}% complete</p>
              </div>

              <div>
                <h4 className="font-medium mb-3">Milestones</h4>
                <div className="space-y-3">
                  {selectedGoal.milestones.map((milestone, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="flex-shrink-0">
                        {milestone.achieved ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-muted rounded-full" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">
                            {milestone.value} {selectedGoal.unit}
                          </p>
                          <p className="text-xs text-muted-foreground">{format(milestone.date, "MMM dd")}</p>
                        </div>
                        {milestone.note && <p className="text-xs text-muted-foreground mt-1">{milestone.note}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Update progress..."
                  className="flex-1"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      const value = Number.parseFloat((e.target as HTMLInputElement).value)
                      if (value) {
                        updateGoalProgress(selectedGoal.id, value)
                        ;(e.target as HTMLInputElement).value = ""
                      }
                    }
                  }}
                />
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <TrendingUp className="h-4 w-4" />
                  Update
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
