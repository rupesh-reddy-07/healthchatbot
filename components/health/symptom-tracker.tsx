"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Calendar, TrendingUp, AlertTriangle, Heart, Brain, Thermometer } from "lucide-react"
import type { SymptomEntry } from "@/lib/health-data"

const commonSymptoms = [
  "Headache",
  "Fever",
  "Cough",
  "Fatigue",
  "Nausea",
  "Dizziness",
  "Chest Pain",
  "Shortness of Breath",
  "Stomach Pain",
  "Joint Pain",
  "Muscle Aches",
  "Sore Throat",
  "Runny Nose",
  "Loss of Appetite",
]

const moodOptions = [
  { value: 1, label: "Very Poor", color: "bg-red-500" },
  { value: 2, label: "Poor", color: "bg-orange-500" },
  { value: 3, label: "Fair", color: "bg-yellow-500" },
  { value: 4, label: "Good", color: "bg-green-500" },
  { value: 5, label: "Excellent", color: "bg-emerald-500" },
]

export function SymptomTracker() {
  const [currentEntry, setCurrentEntry] = useState<Partial<SymptomEntry>>({
    date: new Date().toISOString().split("T")[0],
    symptoms: [],
    mood: 3,
    sleepHours: 8,
    waterIntake: 8,
    exerciseMinutes: 0,
    medications: [],
    triggers: [],
  })

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [customSymptom, setCustomSymptom] = useState("")
  const [symptomSeverity, setSymptomSeverity] = useState<{ [key: string]: number }>({})
  const [recentEntries, setRecentEntries] = useState<SymptomEntry[]>([])

  const addSymptom = (symptom: string) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom])
      setSymptomSeverity({ ...symptomSeverity, [symptom]: 3 })
    }
  }

  const removeSymptom = (symptom: string) => {
    setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom))
    const newSeverity = { ...symptomSeverity }
    delete newSeverity[symptom]
    setSymptomSeverity(newSeverity)
  }

  const saveEntry = () => {
    const symptoms = selectedSymptoms.map((symptom) => ({
      name: symptom,
      severity: symptomSeverity[symptom] as 1 | 2 | 3 | 4 | 5,
      duration: "Today", // Could be enhanced with duration selection
      notes: "",
    }))

    const entry: SymptomEntry = {
      id: Date.now().toString(),
      userId: "current-user",
      date: currentEntry.date!,
      symptoms,
      mood: currentEntry.mood!,
      sleepHours: currentEntry.sleepHours!,
      waterIntake: currentEntry.waterIntake!,
      exerciseMinutes: currentEntry.exerciseMinutes!,
      medications: currentEntry.medications || [],
      triggers: currentEntry.triggers,
    }

    setRecentEntries([entry, ...recentEntries.slice(0, 6)])

    // Reset form
    setSelectedSymptoms([])
    setSymptomSeverity({})
    setCurrentEntry({
      date: new Date().toISOString().split("T")[0],
      symptoms: [],
      mood: 3,
      sleepHours: 8,
      waterIntake: 8,
      exerciseMinutes: 0,
      medications: [],
      triggers: [],
    })
  }

  const getSeverityColor = (severity: number) => {
    const colors = {
      1: "bg-green-500",
      2: "bg-yellow-500",
      3: "bg-orange-500",
      4: "bg-red-500",
      5: "bg-red-700",
    }
    return colors[severity as keyof typeof colors] || "bg-gray-500"
  }

  const getHealthInsights = () => {
    if (recentEntries.length === 0) return []

    const insights = []
    const avgMood = recentEntries.reduce((sum, entry) => sum + entry.mood, 0) / recentEntries.length
    const avgSleep = recentEntries.reduce((sum, entry) => sum + entry.sleepHours, 0) / recentEntries.length

    if (avgMood < 3) {
      insights.push("Your mood has been below average. Consider speaking with a healthcare provider.")
    }
    if (avgSleep < 7) {
      insights.push("You're getting less sleep than recommended. Aim for 7-9 hours per night.")
    }

    const commonSymptoms = recentEntries
      .flatMap((entry) => entry.symptoms.map((s) => s.name))
      .reduce(
        (acc, symptom) => {
          acc[symptom] = (acc[symptom] || 0) + 1
          return acc
        },
        {} as { [key: string]: number },
      )

    const frequentSymptom = Object.entries(commonSymptoms).sort(([, a], [, b]) => b - a)[0]

    if (frequentSymptom && frequentSymptom[1] > 2) {
      insights.push(`${frequentSymptom[0]} appears frequently. Consider consulting a doctor.`)
    }

    return insights
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Symptom Tracker</h2>
          <p className="text-muted-foreground">Track your daily symptoms and health patterns</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          <Input
            type="date"
            value={currentEntry.date}
            onChange={(e) => setCurrentEntry({ ...currentEntry, date: e.target.value })}
            className="w-auto"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-secondary" />
                Current Symptoms
              </CardTitle>
              <CardDescription>Select and rate your symptoms for today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {commonSymptoms.map((symptom) => (
                  <Badge
                    key={symptom}
                    variant={selectedSymptoms.includes(symptom) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => (selectedSymptoms.includes(symptom) ? removeSymptom(symptom) : addSymptom(symptom))}
                  >
                    {symptom}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Add custom symptom..."
                  value={customSymptom}
                  onChange={(e) => setCustomSymptom(e.target.value)}
                />
                <Button
                  onClick={() => {
                    if (customSymptom.trim()) {
                      addSymptom(customSymptom.trim())
                      setCustomSymptom("")
                    }
                  }}
                  variant="outline"
                >
                  Add
                </Button>
              </div>

              {selectedSymptoms.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-medium">Rate Severity (1 = Mild, 5 = Severe)</h4>
                  {selectedSymptoms.map((symptom) => (
                    <div key={symptom} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>{symptom}</Label>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{symptomSeverity[symptom] || 3}</span>
                          <div className={`w-3 h-3 rounded-full ${getSeverityColor(symptomSeverity[symptom] || 3)}`} />
                        </div>
                      </div>
                      <Slider
                        value={[symptomSeverity[symptom] || 3]}
                        onValueChange={(value) => setSymptomSeverity({ ...symptomSeverity, [symptom]: value[0] })}
                        max={5}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Daily Wellness
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Mood Today</Label>
                  <div className="flex gap-1">
                    {moodOptions.map((mood) => (
                      <button
                        key={mood.value}
                        onClick={() => setCurrentEntry({ ...currentEntry, mood: mood.value })}
                        className={`w-8 h-8 rounded-full ${mood.color} ${
                          currentEntry.mood === mood.value ? "ring-2 ring-primary" : "opacity-50"
                        }`}
                        title={mood.label}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {moodOptions.find((m) => m.value === currentEntry.mood)?.label}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Sleep Hours: {currentEntry.sleepHours}h</Label>
                  <Slider
                    value={[currentEntry.sleepHours || 8]}
                    onValueChange={(value) => setCurrentEntry({ ...currentEntry, sleepHours: value[0] })}
                    max={12}
                    min={0}
                    step={0.5}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Water Intake: {currentEntry.waterIntake} glasses</Label>
                  <Slider
                    value={[currentEntry.waterIntake || 8]}
                    onValueChange={(value) => setCurrentEntry({ ...currentEntry, waterIntake: value[0] })}
                    max={15}
                    min={0}
                    step={1}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Exercise: {currentEntry.exerciseMinutes} minutes</Label>
                  <Slider
                    value={[currentEntry.exerciseMinutes || 0]}
                    onValueChange={(value) => setCurrentEntry({ ...currentEntry, exerciseMinutes: value[0] })}
                    max={180}
                    min={0}
                    step={15}
                  />
                </div>
              </div>

              <Button onClick={saveEntry} className="w-full">
                Save Today's Entry
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {getHealthInsights().length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI Health Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getHealthInsights().map((insight, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{insight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Recent Entries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentEntries.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No entries yet</p>
                ) : (
                  recentEntries.map((entry) => (
                    <div key={entry.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm">{entry.date}</p>
                        <div
                          className={`w-3 h-3 rounded-full ${moodOptions.find((m) => m.value === entry.mood)?.color}`}
                        />
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {entry.symptoms.slice(0, 3).map((symptom, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {symptom.name}
                          </Badge>
                        ))}
                        {entry.symptoms.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{entry.symptoms.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
