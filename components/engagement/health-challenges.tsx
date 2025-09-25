"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Users, Calendar, Star, Target, Flame, Droplets, Moon, Activity } from "lucide-react"

interface Challenge {
  id: string
  title: string
  description: string
  type: "daily" | "weekly" | "monthly"
  category: "exercise" | "nutrition" | "sleep" | "hydration" | "mindfulness"
  target: number
  current: number
  unit: string
  points: number
  participants: number
  timeLeft: string
  difficulty: "easy" | "medium" | "hard"
  status: "available" | "active" | "completed" | "failed"
  startDate: Date
  endDate: Date
}

interface UserChallenge {
  challengeId: string
  progress: number
  joinedAt: Date
  completedAt?: Date
  streak: number
}

const availableChallenges: Challenge[] = [
  {
    id: "1",
    title: "10,000 Steps Daily",
    description: "Walk 10,000 steps every day for a week",
    type: "weekly",
    category: "exercise",
    target: 70000,
    current: 45000,
    unit: "steps",
    points: 100,
    participants: 1247,
    timeLeft: "3 days",
    difficulty: "medium",
    status: "active",
    startDate: new Date("2024-01-22"),
    endDate: new Date("2024-01-29"),
  },
  {
    id: "2",
    title: "Hydration Hero",
    description: "Drink 8 glasses of water daily for 30 days",
    type: "monthly",
    category: "hydration",
    target: 240,
    current: 168,
    unit: "glasses",
    points: 300,
    participants: 892,
    timeLeft: "12 days",
    difficulty: "easy",
    status: "active",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-31"),
  },
  {
    id: "3",
    title: "Sleep Champion",
    description: "Get 8 hours of sleep for 7 consecutive nights",
    type: "weekly",
    category: "sleep",
    target: 56,
    current: 0,
    unit: "hours",
    points: 150,
    participants: 634,
    timeLeft: "Available",
    difficulty: "medium",
    status: "available",
    startDate: new Date("2024-01-29"),
    endDate: new Date("2024-02-05"),
  },
  {
    id: "4",
    title: "Mindful Moments",
    description: "Practice 10 minutes of meditation daily",
    type: "daily",
    category: "mindfulness",
    target: 10,
    current: 7,
    unit: "minutes",
    points: 50,
    participants: 423,
    timeLeft: "Today",
    difficulty: "easy",
    status: "active",
    startDate: new Date("2024-01-26"),
    endDate: new Date("2024-01-26"),
  },
  {
    id: "5",
    title: "Veggie Power Week",
    description: "Eat 5 servings of vegetables daily for a week",
    type: "weekly",
    category: "nutrition",
    target: 35,
    current: 0,
    unit: "servings",
    points: 200,
    participants: 756,
    timeLeft: "Available",
    difficulty: "hard",
    status: "available",
    startDate: new Date("2024-01-29"),
    endDate: new Date("2024-02-05"),
  },
]

const userChallenges: UserChallenge[] = [
  {
    challengeId: "1",
    progress: 64,
    joinedAt: new Date("2024-01-22"),
    streak: 5,
  },
  {
    challengeId: "2",
    progress: 70,
    joinedAt: new Date("2024-01-01"),
    streak: 21,
  },
  {
    challengeId: "4",
    progress: 70,
    joinedAt: new Date("2024-01-26"),
    streak: 1,
  },
]

export function HealthChallenges() {
  const [selectedTab, setSelectedTab] = useState("active")
  const [challenges, setChallenges] = useState(availableChallenges)
  const [userProgress, setUserProgress] = useState(userChallenges)

  const joinChallenge = (challengeId: string) => {
    setChallenges(
      challenges.map((challenge) =>
        challenge.id === challengeId
          ? { ...challenge, status: "active", participants: challenge.participants + 1 }
          : challenge,
      ),
    )

    setUserProgress([
      ...userProgress,
      {
        challengeId,
        progress: 0,
        joinedAt: new Date(),
        streak: 0,
      },
    ])
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "exercise":
        return <Activity className="h-4 w-4" />
      case "nutrition":
        return <Target className="h-4 w-4" />
      case "sleep":
        return <Moon className="h-4 w-4" />
      case "hydration":
        return <Droplets className="h-4 w-4" />
      case "mindfulness":
        return <Star className="h-4 w-4" />
      default:
        return <Trophy className="h-4 w-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "hard":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "active":
        return "bg-blue-500"
      case "failed":
        return "bg-red-500"
      case "available":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getActiveChallenges = () => {
    return challenges.filter((challenge) =>
      userProgress.some((up) => up.challengeId === challenge.id && challenge.status === "active"),
    )
  }

  const getAvailableChallenges = () => {
    return challenges.filter(
      (challenge) => challenge.status === "available" && !userProgress.some((up) => up.challengeId === challenge.id),
    )
  }

  const getCompletedChallenges = () => {
    return challenges.filter((challenge) =>
      userProgress.some((up) => up.challengeId === challenge.id && challenge.status === "completed"),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Health Challenges</h2>
          <p className="text-muted-foreground">Join community challenges and earn rewards for healthy habits</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">1,247</p>
            <p className="text-xs text-muted-foreground">Total Points</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-secondary">12</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Flame className="h-4 w-4" />
            Active ({getActiveChallenges().length})
          </TabsTrigger>
          <TabsTrigger value="available" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Available ({getAvailableChallenges().length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Completed ({getCompletedChallenges().length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {getActiveChallenges().length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No active challenges. Join one to get started!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {getActiveChallenges().map((challenge) => {
                const userChallenge = userProgress.find((up) => up.challengeId === challenge.id)
                return (
                  <Card key={challenge.id} className="border-primary/20">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(challenge.category)}
                          <CardTitle className="text-lg">{challenge.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getDifficultyColor(challenge.difficulty)}`} />
                          <Badge variant="outline" className="text-xs">
                            {challenge.points} pts
                          </Badge>
                        </div>
                      </div>
                      <CardDescription>{challenge.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-muted-foreground">
                            {challenge.current} / {challenge.target} {challenge.unit}
                          </span>
                        </div>
                        <Progress value={(challenge.current / challenge.target) * 100} />
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{challenge.participants} participants</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{challenge.timeLeft}</span>
                        </div>
                      </div>

                      {userChallenge && (
                        <div className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm">Current Streak</span>
                          <div className="flex items-center gap-1">
                            <Flame className="h-4 w-4 text-orange-500" />
                            <span className="font-bold">{userChallenge.streak} days</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="available" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getAvailableChallenges().map((challenge) => (
              <Card key={challenge.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(challenge.category)}
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${getDifficultyColor(challenge.difficulty)}`} />
                  </div>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Trophy className="h-3 w-3" />
                      {challenge.points} points
                    </Badge>
                    <Badge variant="outline">{challenge.type}</Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{challenge.participants}</span>
                    </div>
                    <span>
                      {challenge.target} {challenge.unit}
                    </span>
                  </div>

                  <Button onClick={() => joinChallenge(challenge.id)} className="w-full">
                    Join Challenge
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardContent className="text-center py-8">
              <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <p className="text-muted-foreground">Complete challenges to see them here!</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
