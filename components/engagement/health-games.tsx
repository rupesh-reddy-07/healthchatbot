"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Brain, Gamepad2, Star, Trophy } from "lucide-react"

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: "nutrition" | "exercise" | "mental_health" | "general"
  difficulty: "easy" | "medium" | "hard"
}

interface GameStats {
  questionsAnswered: number
  correctAnswers: number
  streak: number
  totalPoints: number
  level: number
}

const quizQuestions: QuizQuestion[] = [
  {
    id: "1",
    question: "How many glasses of water should an average adult drink per day?",
    options: ["4-5 glasses", "6-7 glasses", "8-10 glasses", "12-15 glasses"],
    correctAnswer: 2,
    explanation: "Adults should drink 8-10 glasses (about 2-2.5 liters) of water daily to maintain proper hydration.",
    category: "nutrition",
    difficulty: "easy",
  },
  {
    id: "2",
    question: "What is the recommended amount of moderate exercise per week for adults?",
    options: ["75 minutes", "150 minutes", "300 minutes", "450 minutes"],
    correctAnswer: 1,
    explanation:
      "Adults should get at least 150 minutes of moderate-intensity aerobic activity per week, according to WHO guidelines.",
    category: "exercise",
    difficulty: "medium",
  },
  {
    id: "3",
    question: "Which vitamin is primarily produced when skin is exposed to sunlight?",
    options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin E"],
    correctAnswer: 2,
    explanation: "Vitamin D is synthesized in the skin when exposed to UVB radiation from sunlight.",
    category: "nutrition",
    difficulty: "easy",
  },
  {
    id: "4",
    question: "What is the normal resting heart rate range for healthy adults?",
    options: ["40-60 bpm", "60-100 bpm", "100-120 bpm", "120-140 bpm"],
    correctAnswer: 1,
    explanation: "A normal resting heart rate for adults ranges from 60 to 100 beats per minute.",
    category: "general",
    difficulty: "medium",
  },
  {
    id: "5",
    question: "Which of these is NOT a symptom of dehydration?",
    options: ["Dark yellow urine", "Dry mouth", "Increased energy", "Headache"],
    correctAnswer: 2,
    explanation: "Dehydration typically causes fatigue and decreased energy, not increased energy.",
    category: "general",
    difficulty: "easy",
  },
]

const healthTips = [
  "Drinking water first thing in the morning helps kickstart your metabolism!",
  "Taking the stairs instead of the elevator can burn up to 10 calories per minute.",
  "Eating slowly helps your brain register fullness, preventing overeating.",
  "A 10-minute walk after meals can help improve digestion and blood sugar levels.",
  "Getting 7-9 hours of sleep is crucial for immune system function.",
  "Deep breathing exercises can reduce stress hormones in just 2-3 minutes.",
]

export function HealthGames() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [showResult, setShowResult] = useState(false)
  const [gameStats, setGameStats] = useState<GameStats>({
    questionsAnswered: 0,
    correctAnswers: 0,
    streak: 0,
    totalPoints: 0,
    level: 1,
  })
  const [gameMode, setGameMode] = useState<"quiz" | "tips" | "memory">("quiz")
  const [currentTip, setCurrentTip] = useState(0)

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return

    const question = quizQuestions[currentQuestion]
    const isCorrect = Number.parseInt(selectedAnswer) === question.correctAnswer
    const points = isCorrect ? (question.difficulty === "hard" ? 30 : question.difficulty === "medium" ? 20 : 10) : 0

    setGameStats((prev) => ({
      ...prev,
      questionsAnswered: prev.questionsAnswered + 1,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      streak: isCorrect ? prev.streak + 1 : 0,
      totalPoints: prev.totalPoints + points,
      level: Math.floor((prev.totalPoints + points) / 100) + 1,
    }))

    setShowResult(true)
  }

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer("")
      setShowResult(false)
    } else {
      // Quiz completed
      setCurrentQuestion(0)
      setSelectedAnswer("")
      setShowResult(false)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer("")
    setShowResult(false)
  }

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % healthTips.length)
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "nutrition":
        return "🥗"
      case "exercise":
        return "🏃"
      case "mental_health":
        return "🧠"
      case "general":
        return "🏥"
      default:
        return "❓"
    }
  }

  const question = quizQuestions[currentQuestion]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Health Education Games</h2>
          <p className="text-muted-foreground">Learn about health through interactive games and quizzes</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{gameStats.totalPoints}</p>
            <p className="text-xs text-muted-foreground">Points</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-secondary">{gameStats.level}</p>
            <p className="text-xs text-muted-foreground">Level</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Game Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Level Progress</span>
                <span className="text-sm text-muted-foreground">{gameStats.totalPoints % 100} / 100</span>
              </div>
              <Progress value={gameStats.totalPoints % 100} />
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div>
                <p className="text-lg font-bold text-green-600">{gameStats.correctAnswers}</p>
                <p className="text-xs text-muted-foreground">Correct</p>
              </div>
              <div>
                <p className="text-lg font-bold text-blue-600">{gameStats.streak}</p>
                <p className="text-xs text-muted-foreground">Streak</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">Accuracy</p>
              <p className="text-2xl font-bold text-primary">
                {gameStats.questionsAnswered > 0
                  ? Math.round((gameStats.correctAnswers / gameStats.questionsAnswered) * 100)
                  : 0}
                %
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-3">
          <div className="flex gap-2 mb-4">
            <Button
              variant={gameMode === "quiz" ? "default" : "outline"}
              onClick={() => setGameMode("quiz")}
              className="flex items-center gap-2"
            >
              <Brain className="h-4 w-4" />
              Health Quiz
            </Button>
            <Button
              variant={gameMode === "tips" ? "default" : "outline"}
              onClick={() => setGameMode("tips")}
              className="flex items-center gap-2"
            >
              <Star className="h-4 w-4" />
              Daily Tips
            </Button>
            <Button
              variant={gameMode === "memory" ? "default" : "outline"}
              onClick={() => setGameMode("memory")}
              className="flex items-center gap-2"
            >
              <Gamepad2 className="h-4 w-4" />
              Memory Game
            </Button>
          </div>

          {gameMode === "quiz" && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">{getCategoryIcon(question.category)}</span>
                    Health Quiz
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getDifficultyColor(question.difficulty)} text-white`}>
                      {question.difficulty}
                    </Badge>
                    <Badge variant="outline">
                      {currentQuestion + 1} / {quizQuestions.length}
                    </Badge>
                  </div>
                </div>
                <CardDescription>Test your health knowledge and earn points!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">{question.question}</h3>

                  {!showResult ? (
                    <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                      {question.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted">
                          <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    <div className="space-y-3">
                      {question.options.map((option, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-3 border rounded-lg ${
                            index === question.correctAnswer
                              ? "bg-green-50 border-green-200"
                              : Number.parseInt(selectedAnswer) === index
                                ? "bg-red-50 border-red-200"
                                : "bg-gray-50"
                          }`}
                        >
                          <span>{option}</span>
                          {index === question.correctAnswer && <span className="text-green-600">✓ Correct</span>}
                          {Number.parseInt(selectedAnswer) === index && index !== question.correctAnswer && (
                            <span className="text-red-600">✗ Wrong</span>
                          )}
                        </div>
                      ))}
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  {!showResult ? (
                    <Button onClick={handleAnswerSubmit} disabled={!selectedAnswer} className="ml-auto">
                      Submit Answer
                    </Button>
                  ) : (
                    <div className="flex gap-2 ml-auto">
                      <Button variant="outline" onClick={resetQuiz}>
                        Restart Quiz
                      </Button>
                      <Button onClick={nextQuestion}>
                        {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {gameMode === "tips" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Daily Health Tips
                </CardTitle>
                <CardDescription>Learn something new about health every day</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
                  <div className="text-4xl mb-4">💡</div>
                  <p className="text-lg font-medium text-foreground mb-4">{healthTips[currentTip]}</p>
                  <Badge variant="secondary">
                    Tip {currentTip + 1} of {healthTips.length}
                  </Badge>
                </div>
                <div className="flex justify-center">
                  <Button onClick={nextTip} className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Next Tip
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {gameMode === "memory" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                  Health Memory Game
                </CardTitle>
                <CardDescription>Match health terms with their definitions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🧠</div>
                  <p className="text-lg text-muted-foreground mb-4">Memory game coming soon!</p>
                  <p className="text-sm text-muted-foreground">
                    This feature will help you memorize important health terms and concepts.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
