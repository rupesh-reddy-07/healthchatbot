"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Target,
  Heart,
  Activity,
  Droplets,
  Moon,
  Calendar,
  Award,
  AlertCircle,
} from "lucide-react"

interface HealthMetric {
  date: string
  weight: number
  bloodPressure: { systolic: number; diastolic: number }
  heartRate: number
  steps: number
  sleep: number
  water: number
  mood: number
  symptoms: number
}

interface HealthGoal {
  id: string
  title: string
  type: "weight" | "exercise" | "nutrition" | "sleep" | "medication"
  target: number
  current: number
  unit: string
  deadline: string
  progress: number
  status: "active" | "completed" | "overdue"
}

const healthData: HealthMetric[] = [
  {
    date: "2024-01-01",
    weight: 75,
    bloodPressure: { systolic: 125, diastolic: 82 },
    heartRate: 72,
    steps: 8500,
    sleep: 7.5,
    water: 2.1,
    mood: 4,
    symptoms: 2,
  },
  {
    date: "2024-01-08",
    weight: 74.5,
    bloodPressure: { systolic: 122, diastolic: 80 },
    heartRate: 70,
    steps: 9200,
    sleep: 8,
    water: 2.3,
    mood: 4,
    symptoms: 1,
  },
  {
    date: "2024-01-15",
    weight: 74,
    bloodPressure: { systolic: 120, diastolic: 78 },
    heartRate: 68,
    steps: 10100,
    sleep: 7.8,
    water: 2.5,
    mood: 5,
    symptoms: 0,
  },
  {
    date: "2024-01-22",
    weight: 73.8,
    bloodPressure: { systolic: 118, diastolic: 76 },
    heartRate: 66,
    steps: 11000,
    sleep: 8.2,
    water: 2.7,
    mood: 5,
    symptoms: 0,
  },
  {
    date: "2024-01-29",
    weight: 73.5,
    bloodPressure: { systolic: 115, diastolic: 75 },
    heartRate: 65,
    steps: 11500,
    sleep: 8.5,
    water: 2.8,
    mood: 5,
    symptoms: 0,
  },
]

const healthGoals: HealthGoal[] = [
  {
    id: "1",
    title: "Lose 5kg",
    type: "weight",
    target: 70,
    current: 73.5,
    unit: "kg",
    deadline: "2024-06-01",
    progress: 70,
    status: "active",
  },
  {
    id: "2",
    title: "Walk 10,000 steps daily",
    type: "exercise",
    target: 10000,
    current: 11500,
    unit: "steps",
    deadline: "2024-12-31",
    progress: 115,
    status: "completed",
  },
  {
    id: "3",
    title: "Sleep 8 hours nightly",
    type: "sleep",
    target: 8,
    current: 8.5,
    unit: "hours",
    deadline: "2024-12-31",
    progress: 106,
    status: "completed",
  },
  {
    id: "4",
    title: "Drink 3L water daily",
    type: "nutrition",
    target: 3,
    current: 2.8,
    unit: "liters",
    deadline: "2024-12-31",
    progress: 93,
    status: "active",
  },
]

const moodData = [
  { name: "Excellent", value: 35, color: "#10b981" },
  { name: "Good", value: 40, color: "#3b82f6" },
  { name: "Fair", value: 20, color: "#f59e0b" },
  { name: "Poor", value: 5, color: "#ef4444" },
]

export function HealthDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedMetric, setSelectedMetric] = useState("weight")

  const getLatestMetrics = () => {
    const latest = healthData[healthData.length - 1]
    const previous = healthData[healthData.length - 2]

    return {
      weight: {
        current: latest.weight,
        change: latest.weight - previous.weight,
        trend: latest.weight < previous.weight ? "down" : "up",
      },
      bloodPressure: {
        current: `${latest.bloodPressure.systolic}/${latest.bloodPressure.diastolic}`,
        change: latest.bloodPressure.systolic - previous.bloodPressure.systolic,
        trend: latest.bloodPressure.systolic < previous.bloodPressure.systolic ? "down" : "up",
      },
      heartRate: {
        current: latest.heartRate,
        change: latest.heartRate - previous.heartRate,
        trend: latest.heartRate < previous.heartRate ? "down" : "up",
      },
      steps: {
        current: latest.steps,
        change: latest.steps - previous.steps,
        trend: latest.steps > previous.steps ? "up" : "down",
      },
    }
  }

  const getHealthScore = () => {
    const latest = healthData[healthData.length - 1]
    let score = 0

    // Weight (BMI-based scoring)
    const bmi = latest.weight / (1.75 * 1.75) // Assuming 175cm height
    if (bmi >= 18.5 && bmi <= 24.9) score += 20
    else if (bmi >= 25 && bmi <= 29.9) score += 15
    else score += 10

    // Blood Pressure
    if (latest.bloodPressure.systolic < 120 && latest.bloodPressure.diastolic < 80) score += 20
    else if (latest.bloodPressure.systolic < 130 && latest.bloodPressure.diastolic < 80) score += 15
    else score += 10

    // Heart Rate
    if (latest.heartRate >= 60 && latest.heartRate <= 100) score += 15
    else score += 10

    // Steps
    if (latest.steps >= 10000) score += 15
    else if (latest.steps >= 7500) score += 12
    else score += 8

    // Sleep
    if (latest.sleep >= 7 && latest.sleep <= 9) score += 15
    else score += 10

    // Water intake
    if (latest.water >= 2.5) score += 10
    else score += 7

    // Mood
    score += latest.mood * 2

    // Symptoms (inverse scoring)
    score += Math.max(0, 10 - latest.symptoms * 2)

    return Math.min(100, score)
  }

  const metrics = getLatestMetrics()
  const healthScore = getHealthScore()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Health Analytics Dashboard</h2>
          <p className="text-muted-foreground">Track your health progress and achieve your wellness goals</p>
        </div>
        <div className="flex gap-2">
          {["week", "month", "quarter", "year"].map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Health Score
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-muted stroke-current"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-primary stroke-current"
                  strokeWidth="3"
                  strokeDasharray={`${healthScore}, 100`}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">{healthScore}</span>
              </div>
            </div>
            <Badge variant={healthScore >= 80 ? "default" : healthScore >= 60 ? "secondary" : "destructive"}>
              {healthScore >= 80 ? "Excellent" : healthScore >= 60 ? "Good" : "Needs Improvement"}
            </Badge>
          </CardContent>
        </Card>

        <div className="lg:col-span-3 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Weight</p>
                  <p className="text-2xl font-bold">{metrics.weight.current}kg</p>
                </div>
                <div className="flex items-center gap-1">
                  {metrics.weight.trend === "down" ? (
                    <TrendingDown className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm">{Math.abs(metrics.weight.change)}kg</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Blood Pressure</p>
                  <p className="text-2xl font-bold">{metrics.bloodPressure.current}</p>
                </div>
                <div className="flex items-center gap-1">
                  {metrics.bloodPressure.trend === "down" ? (
                    <TrendingDown className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-red-500" />
                  )}
                  <Heart className="h-4 w-4 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Heart Rate</p>
                  <p className="text-2xl font-bold">{metrics.heartRate.current} bpm</p>
                </div>
                <div className="flex items-center gap-1">
                  {metrics.heartRate.trend === "down" ? (
                    <TrendingDown className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-red-500" />
                  )}
                  <Activity className="h-4 w-4 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Daily Steps</p>
                  <p className="text-2xl font-bold">{metrics.steps.current.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-1">
                  {metrics.steps.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm">+{Math.abs(metrics.steps.change)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Health Trends
              </CardTitle>
              <CardDescription>Track your health metrics over time</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedMetric} onValueChange={setSelectedMetric}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="weight">Weight</TabsTrigger>
                  <TabsTrigger value="bp">Blood Pressure</TabsTrigger>
                  <TabsTrigger value="heart">Heart Rate</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="weight" className="mt-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={healthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="weight" stroke="#0891b2" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>

                <TabsContent value="bp" className="mt-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={healthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="bloodPressure.systolic" stroke="#ef4444" strokeWidth={2} />
                      <Line type="monotone" dataKey="bloodPressure.diastolic" stroke="#f97316" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>

                <TabsContent value="heart" className="mt-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={healthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="heartRate" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </TabsContent>

                <TabsContent value="activity" className="mt-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={healthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="steps" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-secondary" />
                Health Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {healthGoals.map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{goal.title}</p>
                    <Badge
                      variant={
                        goal.status === "completed"
                          ? "default"
                          : goal.status === "overdue"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {goal.status}
                    </Badge>
                  </div>
                  <Progress value={Math.min(100, goal.progress)} className="h-2" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {goal.current} / {goal.target} {goal.unit}
                    </span>
                    <span>{Math.round(goal.progress)}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="h-5 w-5 text-purple-500" />
                Mood Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={moodData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {moodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Weekly Health Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Droplets className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">2.8L</p>
              <p className="text-sm text-muted-foreground">Avg Water Intake</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Moon className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">8.2h</p>
              <p className="text-sm text-muted-foreground">Avg Sleep</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Activity className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">10.5K</p>
              <p className="text-sm text-muted-foreground">Avg Steps</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <AlertCircle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">Symptoms Reported</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
