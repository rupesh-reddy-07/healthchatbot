"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, Heart, Droplets, Moon, Activity, AlertCircle, CheckCircle, TrendingUp } from "lucide-react"

interface BMIResult {
  bmi: number
  category: string
  recommendations: string[]
  risks: string[]
  idealWeight: { min: number; max: number }
}

interface BloodPressureResult {
  category: string
  recommendations: string[]
  risks: string[]
  lifestyle: string[]
}

export function HealthCalculators() {
  const [activeCalculator, setActiveCalculator] = useState("bmi")

  // BMI Calculator State
  const [bmiData, setBmiData] = useState({ height: "", weight: "", age: "", gender: "" })
  const [bmiResult, setBmiResult] = useState<BMIResult | null>(null)

  // Blood Pressure Calculator State
  const [bpData, setBpData] = useState({ systolic: "", diastolic: "", age: "", medications: false })
  const [bpResult, setBpResult] = useState<BloodPressureResult | null>(null)

  // Water Intake Calculator State
  const [waterData, setWaterData] = useState({ weight: "", activity: "", climate: "", pregnancy: false })
  const [waterResult, setWaterResult] = useState<{ daily: number; recommendations: string[] } | null>(null)

  // Sleep Calculator State
  const [sleepData, setSleepData] = useState({ age: "", lifestyle: "", stress: "" })
  const [sleepResult, setSleepResult] = useState<{ hours: string; recommendations: string[] } | null>(null)

  const calculateBMI = () => {
    const height = Number.parseFloat(bmiData.height) / 100 // Convert cm to m
    const weight = Number.parseFloat(bmiData.weight)
    const age = Number.parseInt(bmiData.age)

    if (!height || !weight) return

    const bmi = weight / (height * height)
    let category = ""
    let recommendations: string[] = []
    let risks: string[] = []

    if (bmi < 18.5) {
      category = "Underweight"
      recommendations = [
        "Increase caloric intake with nutrient-dense foods",
        "Include protein-rich foods like lentils, nuts, and dairy",
        "Eat frequent small meals throughout the day",
        "Consider strength training exercises",
      ]
      risks = ["Weakened immune system", "Osteoporosis risk", "Fertility issues"]
    } else if (bmi < 25) {
      category = "Normal weight"
      recommendations = [
        "Maintain current healthy eating habits",
        "Continue regular physical activity",
        "Focus on balanced nutrition",
        "Monitor weight regularly",
      ]
      risks = ["Low risk for weight-related health issues"]
    } else if (bmi < 30) {
      category = "Overweight"
      recommendations = [
        "Reduce portion sizes and caloric intake",
        "Increase physical activity to 150+ minutes per week",
        "Focus on whole foods, avoid processed foods",
        "Consider consulting a nutritionist",
      ]
      risks = ["Increased risk of diabetes", "Heart disease risk", "High blood pressure"]
    } else {
      category = "Obese"
      recommendations = [
        "Consult healthcare provider for weight management plan",
        "Gradual weight loss of 1-2 pounds per week",
        "Regular monitoring of blood sugar and blood pressure",
        "Consider professional dietary counseling",
      ]
      risks = ["High risk of diabetes", "Cardiovascular disease", "Sleep apnea", "Joint problems"]
    }

    // Calculate ideal weight range
    const idealWeight = {
      min: Math.round(18.5 * height * height),
      max: Math.round(24.9 * height * height),
    }

    setBmiResult({ bmi: Math.round(bmi * 10) / 10, category, recommendations, risks, idealWeight })
  }

  const calculateBloodPressure = () => {
    const systolic = Number.parseInt(bpData.systolic)
    const diastolic = Number.parseInt(bpData.diastolic)

    if (!systolic || !diastolic) return

    let category = ""
    let recommendations: string[] = []
    let risks: string[] = []
    let lifestyle: string[] = []

    if (systolic < 120 && diastolic < 80) {
      category = "Normal"
      recommendations = ["Maintain healthy lifestyle", "Regular monitoring", "Continue current habits"]
      risks = ["Low cardiovascular risk"]
      lifestyle = ["Regular exercise", "Balanced diet", "Stress management"]
    } else if (systolic < 130 && diastolic < 80) {
      category = "Elevated"
      recommendations = ["Lifestyle modifications", "Reduce sodium intake", "Increase physical activity"]
      risks = ["Increased risk of hypertension"]
      lifestyle = ["DASH diet", "30 minutes daily exercise", "Weight management"]
    } else if (systolic < 140 || diastolic < 90) {
      category = "Stage 1 Hypertension"
      recommendations = ["Consult healthcare provider", "Medication may be needed", "Lifestyle changes essential"]
      risks = ["Heart disease", "Stroke risk", "Kidney problems"]
      lifestyle = ["Low sodium diet", "Regular cardio", "Stress reduction", "Limit alcohol"]
    } else {
      category = "Stage 2 Hypertension"
      recommendations = ["Immediate medical attention", "Medication likely required", "Close monitoring needed"]
      risks = ["High cardiovascular risk", "Organ damage possible"]
      lifestyle = ["Strict dietary changes", "Supervised exercise", "Medication compliance"]
    }

    setBpResult({ category, recommendations, risks, lifestyle })
  }

  const calculateWaterIntake = () => {
    const weight = Number.parseFloat(waterData.weight)
    if (!weight) return

    let baseIntake = weight * 35 // Base: 35ml per kg body weight

    // Adjust for activity level
    if (waterData.activity === "high") baseIntake *= 1.3
    else if (waterData.activity === "moderate") baseIntake *= 1.15

    // Adjust for climate
    if (waterData.climate === "hot") baseIntake *= 1.2
    else if (waterData.climate === "humid") baseIntake *= 1.15

    // Adjust for pregnancy
    if (waterData.pregnancy) baseIntake *= 1.1

    const dailyLiters = Math.round((baseIntake / 1000) * 10) / 10
    const recommendations = [
      "Drink water throughout the day, not just when thirsty",
      "Start your day with a glass of water",
      "Eat water-rich foods like fruits and vegetables",
      "Monitor urine color - pale yellow indicates good hydration",
    ]

    if (waterData.activity === "high") {
      recommendations.push("Drink extra water before, during, and after exercise")
    }

    if (waterData.climate === "hot" || waterData.climate === "humid") {
      recommendations.push("Increase intake during hot weather or high humidity")
    }

    setWaterResult({ daily: dailyLiters, recommendations })
  }

  const calculateSleep = () => {
    const age = Number.parseInt(sleepData.age)
    if (!age) return

    let hours = ""
    let recommendations: string[] = []

    if (age <= 17) {
      hours = "8-10 hours"
      recommendations = [
        "Maintain consistent sleep schedule",
        "Limit screen time before bed",
        "Create a comfortable sleep environment",
      ]
    } else if (age <= 64) {
      hours = "7-9 hours"
      recommendations = [
        "Establish a regular bedtime routine",
        "Avoid caffeine late in the day",
        "Keep bedroom cool and dark",
      ]
    } else {
      hours = "7-8 hours"
      recommendations = [
        "Maintain regular sleep schedule",
        "Consider afternoon naps if needed",
        "Address any sleep disorders with doctor",
      ]
    }

    if (sleepData.stress === "high") {
      recommendations.push("Practice relaxation techniques before bed", "Consider meditation or deep breathing")
    }

    if (sleepData.lifestyle === "active") {
      recommendations.push("Avoid intense exercise 3 hours before bedtime")
    }

    setSleepResult({ hours, recommendations })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Health Calculators & Tools</h2>
        <p className="text-muted-foreground">Interactive tools with AI-powered recommendations for better health</p>
      </div>

      <Tabs value={activeCalculator} onValueChange={setActiveCalculator}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="bmi" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            BMI
          </TabsTrigger>
          <TabsTrigger value="bp" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Blood Pressure
          </TabsTrigger>
          <TabsTrigger value="water" className="flex items-center gap-2">
            <Droplets className="h-4 w-4" />
            Water Intake
          </TabsTrigger>
          <TabsTrigger value="sleep" className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            Sleep Needs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bmi">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>BMI Calculator</CardTitle>
                <CardDescription>Calculate your Body Mass Index and get personalized recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="170"
                      value={bmiData.height}
                      onChange={(e) => setBmiData({ ...bmiData, height: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="70"
                      value={bmiData.weight}
                      onChange={(e) => setBmiData({ ...bmiData, weight: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="30"
                      value={bmiData.age}
                      onChange={(e) => setBmiData({ ...bmiData, age: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select value={bmiData.gender} onValueChange={(value) => setBmiData({ ...bmiData, gender: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={calculateBMI} className="w-full">
                  Calculate BMI
                </Button>
              </CardContent>
            </Card>

            {bmiResult && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Your BMI Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{bmiResult.bmi}</div>
                    <Badge variant={bmiResult.category === "Normal weight" ? "default" : "secondary"} className="mt-2">
                      {bmiResult.category}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="font-medium text-green-600 mb-2">Recommendations</h4>
                    <ul className="space-y-1">
                      {bmiResult.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-orange-600 mb-2">Health Considerations</h4>
                    <ul className="space-y-1">
                      {bmiResult.risks.map((risk, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <AlertCircle className="h-3 w-3 text-orange-500 mt-0.5 flex-shrink-0" />
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">
                      <strong>Ideal Weight Range:</strong> {bmiResult.idealWeight.min} - {bmiResult.idealWeight.max} kg
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="bp">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Blood Pressure Analyzer</CardTitle>
                <CardDescription>Analyze your blood pressure readings and get health insights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="systolic">Systolic (mmHg)</Label>
                    <Input
                      id="systolic"
                      type="number"
                      placeholder="120"
                      value={bpData.systolic}
                      onChange={(e) => setBpData({ ...bpData, systolic: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="diastolic">Diastolic (mmHg)</Label>
                    <Input
                      id="diastolic"
                      type="number"
                      placeholder="80"
                      value={bpData.diastolic}
                      onChange={(e) => setBpData({ ...bpData, diastolic: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bp-age">Age</Label>
                  <Input
                    id="bp-age"
                    type="number"
                    placeholder="30"
                    value={bpData.age}
                    onChange={(e) => setBpData({ ...bpData, age: e.target.value })}
                  />
                </div>

                <Button onClick={calculateBloodPressure} className="w-full">
                  Analyze Blood Pressure
                </Button>
              </CardContent>
            </Card>

            {bpResult && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Blood Pressure Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <Badge
                      variant={bpResult.category === "Normal" ? "default" : "destructive"}
                      className="text-lg px-4 py-2"
                    >
                      {bpResult.category}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-600 mb-2">Medical Recommendations</h4>
                    <ul className="space-y-1">
                      {bpResult.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-green-600 mb-2">Lifestyle Changes</h4>
                    <ul className="space-y-1">
                      {bpResult.lifestyle.map((lifestyle, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Activity className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          {lifestyle}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="water">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Water Intake Calculator</CardTitle>
                <CardDescription>Calculate your personalized daily water requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="water-weight">Weight (kg)</Label>
                  <Input
                    id="water-weight"
                    type="number"
                    placeholder="70"
                    value={waterData.weight}
                    onChange={(e) => setWaterData({ ...waterData, weight: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Activity Level</Label>
                  <Select
                    value={waterData.activity}
                    onValueChange={(value) => setWaterData({ ...waterData, activity: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (Sedentary)</SelectItem>
                      <SelectItem value="moderate">Moderate (Light exercise)</SelectItem>
                      <SelectItem value="high">High (Intense exercise)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Climate</Label>
                  <Select
                    value={waterData.climate}
                    onValueChange={(value) => setWaterData({ ...waterData, climate: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select climate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="hot">Hot/Dry</SelectItem>
                      <SelectItem value="humid">Hot/Humid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={calculateWaterIntake} className="w-full">
                  Calculate Water Needs
                </Button>
              </CardContent>
            </Card>

            {waterResult && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    Your Daily Water Goal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-500">{waterResult.daily}L</div>
                    <p className="text-muted-foreground">per day</p>
                    <p className="text-sm mt-2">≈ {Math.round(waterResult.daily * 4)} glasses (250ml each)</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-600 mb-2">Hydration Tips</h4>
                    <ul className="space-y-1">
                      {waterResult.recommendations.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Droplets className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="sleep">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sleep Needs Calculator</CardTitle>
                <CardDescription>Determine your optimal sleep duration based on age and lifestyle</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sleep-age">Age</Label>
                  <Input
                    id="sleep-age"
                    type="number"
                    placeholder="30"
                    value={sleepData.age}
                    onChange={(e) => setSleepData({ ...sleepData, age: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Lifestyle</Label>
                  <Select
                    value={sleepData.lifestyle}
                    onValueChange={(value) => setSleepData({ ...sleepData, lifestyle: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select lifestyle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="very-active">Very Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Stress Level</Label>
                  <Select
                    value={sleepData.stress}
                    onValueChange={(value) => setSleepData({ ...sleepData, stress: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select stress level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={calculateSleep} className="w-full">
                  Calculate Sleep Needs
                </Button>
              </CardContent>
            </Card>

            {sleepResult && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Moon className="h-5 w-5 text-purple-500" />
                    Your Sleep Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-500">{sleepResult.hours}</div>
                    <p className="text-muted-foreground">recommended sleep</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-600 mb-2">Sleep Optimization Tips</h4>
                    <ul className="space-y-1">
                      {sleepResult.recommendations.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Moon className="h-3 w-3 text-purple-500 mt-0.5 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
