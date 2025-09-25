"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Calendar, Plus, Utensils, Apple, AlertCircle, CheckCircle } from "lucide-react"
import {
  sampleFoodDatabase,
  healthConditionRecommendations,
  type FoodItem,
  type NutritionPlan,
} from "@/lib/health-data"

export function NutritionPlanner() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [healthConditions, setHealthConditions] = useState<string[]>([])
  const [currentPlan, setCurrentPlan] = useState<NutritionPlan | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMeal, setSelectedMeal] = useState<"breakfast" | "lunch" | "dinner" | "snacks">("breakfast")

  const filteredFoods = sampleFoodDatabase.filter((food) => food.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const addFoodToMeal = (food: FoodItem) => {
    if (!currentPlan) {
      const newPlan: NutritionPlan = {
        id: Date.now().toString(),
        userId: "current-user",
        date: selectedDate,
        meals: {
          breakfast: [],
          lunch: [],
          dinner: [],
          snacks: [],
        },
        totalCalories: 0,
        macros: { protein: 0, carbs: 0, fat: 0, fiber: 0 },
        recommendations: [],
        restrictions: [],
      }
      setCurrentPlan(newPlan)
    }

    const updatedPlan = { ...currentPlan! }
    updatedPlan.meals[selectedMeal].push(food)

    // Recalculate totals
    const allFoods = [
      ...updatedPlan.meals.breakfast,
      ...updatedPlan.meals.lunch,
      ...updatedPlan.meals.dinner,
      ...updatedPlan.meals.snacks,
    ]

    updatedPlan.totalCalories = allFoods.reduce((sum, item) => sum + item.calories, 0)
    updatedPlan.macros = {
      protein: allFoods.reduce((sum, item) => sum + item.protein, 0),
      carbs: allFoods.reduce((sum, item) => sum + item.carbs, 0),
      fat: allFoods.reduce((sum, item) => sum + item.fat, 0),
      fiber: 0, // Would be calculated from food data
    }

    setCurrentPlan(updatedPlan)
  }

  const getRecommendationsForConditions = () => {
    const recommendations: string[] = []
    const restrictions: string[] = []

    healthConditions.forEach((condition) => {
      const conditionKey = condition.toLowerCase() as keyof typeof healthConditionRecommendations
      if (healthConditionRecommendations[conditionKey]) {
        const data = healthConditionRecommendations[conditionKey]
        recommendations.push(...data.foods_to_eat.map((food) => `Include ${food}`))
        restrictions.push(...data.foods_to_avoid.map((food) => `Avoid ${food}`))
      }
    })

    return { recommendations, restrictions }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">AI Nutrition Planner</h2>
          <p className="text-muted-foreground">Personalized meal planning based on your health conditions</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-auto"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-secondary" />
            Health Conditions
          </CardTitle>
          <CardDescription>Select your health conditions for personalized recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {["Diabetes", "Hypertension", "Anemia", "Heart Disease", "Obesity"].map((condition) => (
              <Badge
                key={condition}
                variant={healthConditions.includes(condition) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => {
                  if (healthConditions.includes(condition)) {
                    setHealthConditions((prev) => prev.filter((c) => c !== condition))
                  } else {
                    setHealthConditions((prev) => [...prev, condition])
                  }
                }}
              >
                {condition}
              </Badge>
            ))}
          </div>

          {healthConditions.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-green-600 mb-2">Recommended Foods</h4>
                <ul className="text-sm space-y-1">
                  {getRecommendationsForConditions()
                    .recommendations.slice(0, 5)
                    .map((rec, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {rec}
                      </li>
                    ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-red-600 mb-2">Foods to Avoid</h4>
                <ul className="text-sm space-y-1">
                  {getRecommendationsForConditions()
                    .restrictions.slice(0, 5)
                    .map((rest, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <AlertCircle className="h-3 w-3 text-red-500" />
                        {rest}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-5 w-5 text-primary" />
                Daily Meal Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedMeal} onValueChange={(value) => setSelectedMeal(value as any)}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
                  <TabsTrigger value="lunch">Lunch</TabsTrigger>
                  <TabsTrigger value="dinner">Dinner</TabsTrigger>
                  <TabsTrigger value="snacks">Snacks</TabsTrigger>
                </TabsList>

                {(["breakfast", "lunch", "dinner", "snacks"] as const).map((meal) => (
                  <TabsContent key={meal} value={meal} className="space-y-4">
                    <div className="space-y-2">
                      {currentPlan?.meals[meal].map((food, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div>
                            <p className="font-medium">{food.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {food.quantity} - {food.calories} cal
                            </p>
                          </div>
                          <div className="text-right text-sm">
                            <p>
                              P: {food.protein}g C: {food.carbs}g F: {food.fat}g
                            </p>
                          </div>
                        </div>
                      ))}

                      {(!currentPlan?.meals[meal] || currentPlan.meals[meal].length === 0) && (
                        <p className="text-muted-foreground text-center py-8">No foods added yet</p>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Apple className="h-5 w-5 text-secondary" />
                Add Foods
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Search foods..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredFoods.map((food, idx) => (
                  <div
                    key={idx}
                    className="p-3 border rounded-lg hover:bg-muted cursor-pointer"
                    onClick={() => addFoodToMeal(food)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{food.name}</p>
                        <p className="text-xs text-muted-foreground">{food.calories} cal</p>
                      </div>
                      <Plus className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {currentPlan && (
            <Card>
              <CardHeader>
                <CardTitle>Daily Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Calories</span>
                    <span>{currentPlan.totalCalories} / 2000</span>
                  </div>
                  <Progress value={(currentPlan.totalCalories / 2000) * 100} />
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Protein</p>
                    <p className="font-medium">{currentPlan.macros.protein}g</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Carbs</p>
                    <p className="font-medium">{currentPlan.macros.carbs}g</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Fat</p>
                    <p className="font-medium">{currentPlan.macros.fat}g</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
