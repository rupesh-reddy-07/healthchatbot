export interface HealthProfile {
  id: string
  userId: string
  age: number
  gender: "male" | "female" | "other"
  weight: number
  height: number
  bloodType?: string
  allergies: string[]
  medications: string[]
  conditions: string[]
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
  createdAt: Date
  updatedAt: Date
}

export interface NutritionPlan {
  id: string
  userId: string
  date: string
  meals: {
    breakfast: FoodItem[]
    lunch: FoodItem[]
    dinner: FoodItem[]
    snacks: FoodItem[]
  }
  totalCalories: number
  macros: {
    protein: number
    carbs: number
    fat: number
    fiber: number
  }
  recommendations: string[]
  restrictions: string[]
}

export interface FoodItem {
  name: string
  quantity: string
  calories: number
  protein: number
  carbs: number
  fat: number
  vitamins: string[]
  minerals: string[]
  benefits: string[]
}

export interface SymptomEntry {
  id: string
  userId: string
  date: string
  symptoms: {
    name: string
    severity: 1 | 2 | 3 | 4 | 5
    duration: string
    notes?: string
  }[]
  mood: 1 | 2 | 3 | 4 | 5
  sleepHours: number
  waterIntake: number
  exerciseMinutes: number
  medications: string[]
  triggers?: string[]
}

export interface HealthGoal {
  id: string
  userId: string
  type: "weight_loss" | "weight_gain" | "exercise" | "nutrition" | "medication" | "custom"
  title: string
  description: string
  targetValue: number
  currentValue: number
  unit: string
  deadline: Date
  progress: number
  milestones: {
    value: number
    date: Date
    achieved: boolean
  }[]
  status: "active" | "completed" | "paused"
}

// Sample health data for demonstration
export const sampleFoodDatabase: FoodItem[] = [
  {
    name: "Brown Rice",
    quantity: "1 cup cooked",
    calories: 216,
    protein: 5,
    carbs: 45,
    fat: 2,
    vitamins: ["B1", "B3", "B6"],
    minerals: ["Manganese", "Selenium"],
    benefits: ["Good for diabetes", "High fiber", "Sustained energy"],
  },
  {
    name: "Spinach",
    quantity: "1 cup raw",
    calories: 7,
    protein: 1,
    carbs: 1,
    fat: 0,
    vitamins: ["A", "C", "K", "Folate"],
    minerals: ["Iron", "Magnesium"],
    benefits: ["Boosts immunity", "Good for anemia", "Eye health"],
  },
  {
    name: "Lentils",
    quantity: "1 cup cooked",
    calories: 230,
    protein: 18,
    carbs: 40,
    fat: 1,
    vitamins: ["B1", "B6", "Folate"],
    minerals: ["Iron", "Potassium"],
    benefits: ["High protein", "Heart healthy", "Blood sugar control"],
  },
  {
    name: "Almonds",
    quantity: "1 oz (23 nuts)",
    calories: 164,
    protein: 6,
    carbs: 6,
    fat: 14,
    vitamins: ["E", "B2"],
    minerals: ["Magnesium", "Calcium"],
    benefits: ["Heart health", "Brain function", "Healthy fats"],
  },
]

export const healthConditionRecommendations = {
  diabetes: {
    foods_to_eat: ["Brown rice", "Quinoa", "Leafy greens", "Berries", "Nuts", "Fish"],
    foods_to_avoid: ["White bread", "Sugary drinks", "Processed foods", "White rice"],
    vitamins: ["Chromium", "Magnesium", "Vitamin D", "Alpha-lipoic acid"],
    exercise: "30 minutes moderate exercise daily",
    monitoring: "Check blood sugar regularly",
  },
  hypertension: {
    foods_to_eat: ["Bananas", "Leafy greens", "Berries", "Oats", "Garlic", "Fish"],
    foods_to_avoid: ["Salt", "Processed foods", "Alcohol", "Caffeine"],
    vitamins: ["Potassium", "Magnesium", "Calcium", "Omega-3"],
    exercise: "Regular cardio exercise",
    monitoring: "Monitor blood pressure daily",
  },
  anemia: {
    foods_to_eat: ["Spinach", "Red meat", "Lentils", "Tofu", "Dark chocolate"],
    foods_to_avoid: ["Tea with meals", "Coffee with meals", "Calcium supplements with iron"],
    vitamins: ["Iron", "Vitamin C", "B12", "Folate"],
    exercise: "Light to moderate exercise",
    monitoring: "Regular blood tests",
  },
}
