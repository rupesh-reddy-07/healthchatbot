"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Gift, Star, Trophy, Crown, Award } from "lucide-react"

interface Reward {
  id: string
  title: string
  description: string
  type: "badge" | "discount" | "feature" | "physical"
  cost: number
  category: "health" | "fitness" | "nutrition" | "premium"
  icon: string
  rarity: "common" | "rare" | "epic" | "legendary"
  available: boolean
  claimed: boolean
}

interface UserStats {
  totalPoints: number
  level: number
  nextLevelPoints: number
  badges: string[]
  streak: number
  challengesCompleted: number
  rank: number
}

const availableRewards: Reward[] = [
  {
    id: "1",
    title: "Health Warrior Badge",
    description: "Complete 5 health challenges",
    type: "badge",
    cost: 0,
    category: "health",
    icon: "🏆",
    rarity: "common",
    available: true,
    claimed: false,
  },
  {
    id: "2",
    title: "Fitness Tracker Premium",
    description: "Unlock advanced analytics for 1 month",
    type: "feature",
    cost: 500,
    category: "premium",
    icon: "📊",
    rarity: "rare",
    available: true,
    claimed: false,
  },
  {
    id: "3",
    title: "Nutrition Consultation",
    description: "Free 30-minute consultation with a nutritionist",
    type: "physical",
    cost: 1000,
    category: "nutrition",
    icon: "🥗",
    rarity: "epic",
    available: true,
    claimed: false,
  },
  {
    id: "4",
    title: "Wellness Store Discount",
    description: "20% off on health supplements",
    type: "discount",
    cost: 300,
    category: "health",
    icon: "💊",
    rarity: "common",
    available: true,
    claimed: false,
  },
  {
    id: "5",
    title: "Meditation Master",
    description: "Complete 30 days of meditation",
    type: "badge",
    cost: 0,
    category: "health",
    icon: "🧘",
    rarity: "rare",
    available: false,
    claimed: false,
  },
  {
    id: "6",
    title: "Fitness Equipment Voucher",
    description: "$50 voucher for fitness equipment",
    type: "discount",
    cost: 800,
    category: "fitness",
    icon: "🏋️",
    rarity: "epic",
    available: true,
    claimed: false,
  },
]

const userStats: UserStats = {
  totalPoints: 1247,
  level: 8,
  nextLevelPoints: 1500,
  badges: ["🏃", "💧", "🥗"],
  streak: 12,
  challengesCompleted: 15,
  rank: 234,
}

const achievements = [
  {
    id: "1",
    title: "First Steps",
    description: "Complete your first challenge",
    icon: "👶",
    unlocked: true,
    unlockedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Consistency King",
    description: "Maintain a 7-day streak",
    icon: "👑",
    unlocked: true,
    unlockedAt: "2024-01-22",
  },
  {
    id: "3",
    title: "Health Enthusiast",
    description: "Earn 1000 points",
    icon: "⭐",
    unlocked: true,
    unlockedAt: "2024-01-25",
  },
  {
    id: "4",
    title: "Community Leader",
    description: "Reach top 500 in leaderboard",
    icon: "🏆",
    unlocked: true,
    unlockedAt: "2024-01-26",
  },
  {
    id: "5",
    title: "Marathon Master",
    description: "Complete 25 challenges",
    icon: "🏃‍♂️",
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "6",
    title: "Wellness Guru",
    description: "Reach level 10",
    icon: "🧘‍♀️",
    unlocked: false,
    unlockedAt: null,
  },
]

export function RewardsSystem() {
  const [rewards, setRewards] = useState(availableRewards)
  const [selectedTab, setSelectedTab] = useState("rewards")

  const claimReward = (rewardId: string) => {
    setRewards(rewards.map((reward) => (reward.id === rewardId ? { ...reward, claimed: true } : reward)))
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "border-gray-300 bg-gray-50"
      case "rare":
        return "border-blue-300 bg-blue-50"
      case "epic":
        return "border-purple-300 bg-purple-50"
      case "legendary":
        return "border-yellow-300 bg-yellow-50"
      default:
        return "border-gray-300 bg-gray-50"
    }
  }

  const getRarityBadgeColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-500"
      case "rare":
        return "bg-blue-500"
      case "epic":
        return "bg-purple-500"
      case "legendary":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const levelProgress = ((userStats.totalPoints % 200) / 200) * 100

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Rewards & Achievements</h2>
          <p className="text-muted-foreground">Earn points and unlock rewards for your healthy lifestyle</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Crown className="h-10 w-10 text-primary" />
            </div>
            <CardTitle>Level {userStats.level}</CardTitle>
            <CardDescription>{userStats.totalPoints} total points</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Next Level</span>
                <span className="text-sm text-muted-foreground">
                  {userStats.totalPoints} / {userStats.nextLevelPoints}
                </span>
              </div>
              <Progress value={levelProgress} />
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-secondary">{userStats.streak}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">#{userStats.rank}</p>
                <p className="text-xs text-muted-foreground">Rank</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Earned Badges</p>
              <div className="flex flex-wrap gap-2">
                {userStats.badges.map((badge, idx) => (
                  <div key={idx} className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-lg">
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-3">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="rewards" className="flex items-center gap-2">
                <Gift className="h-4 w-4" />
                Rewards Store
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Achievements
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="flex items-center gap-2">
                <Crown className="h-4 w-4" />
                Leaderboard
              </TabsTrigger>
            </TabsList>

            <TabsContent value="rewards" className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rewards.map((reward) => (
                  <Card
                    key={reward.id}
                    className={`${getRarityColor(reward.rarity)} ${!reward.available ? "opacity-50" : ""}`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl">{reward.icon}</div>
                        <Badge className={`${getRarityBadgeColor(reward.rarity)} text-white`}>{reward.rarity}</Badge>
                      </div>
                      <CardTitle className="text-lg">{reward.title}</CardTitle>
                      <CardDescription>{reward.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-bold">{reward.cost} points</span>
                        </div>
                        <Badge variant="outline">{reward.category}</Badge>
                      </div>

                      <Button
                        onClick={() => claimReward(reward.id)}
                        disabled={!reward.available || reward.claimed || userStats.totalPoints < reward.cost}
                        className="w-full"
                        variant={reward.claimed ? "secondary" : "default"}
                      >
                        {reward.claimed ? "Claimed" : reward.cost === 0 ? "Unlock" : "Redeem"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <Card key={achievement.id} className={achievement.unlocked ? "border-green-200 bg-green-50" : ""}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className={`text-3xl ${achievement.unlocked ? "" : "grayscale opacity-50"}`}>
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          {achievement.unlocked && achievement.unlockedAt && (
                            <p className="text-xs text-green-600 mt-1">Unlocked on {achievement.unlockedAt}</p>
                          )}
                        </div>
                        {achievement.unlocked && (
                          <div className="flex-shrink-0">
                            <Badge variant="default" className="bg-green-500">
                              <Award className="h-3 w-3 mr-1" />
                              Unlocked
                            </Badge>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Top Health Champions
                  </CardTitle>
                  <CardDescription>Weekly leaderboard based on challenge completion and points</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { rank: 1, name: "Sarah Johnson", points: 2847, badge: "🥇" },
                      { rank: 2, name: "Mike Chen", points: 2634, badge: "🥈" },
                      { rank: 3, name: "Emma Davis", points: 2521, badge: "🥉" },
                      { rank: 4, name: "Alex Rodriguez", points: 2398, badge: "🏆" },
                      { rank: 5, name: "Lisa Wang", points: 2156, badge: "⭐" },
                      { rank: 234, name: "You", points: 1247, badge: "🎯", highlight: true },
                    ].map((user) => (
                      <div
                        key={user.rank}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          user.highlight ? "bg-primary/10 border border-primary/20" : "bg-muted"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-background rounded-full flex items-center justify-center font-bold">
                            {user.rank <= 3 ? user.badge : user.rank}
                          </div>
                          <div>
                            <p className={`font-medium ${user.highlight ? "text-primary" : ""}`}>{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.points} points</p>
                          </div>
                        </div>
                        <div className="text-2xl">{user.badge}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
