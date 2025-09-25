"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RefreshCw, Globe, Calendar, BookOpen } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface MedicalNewsItem {
  id: string
  title: string
  summary: string
  category: string
  language: string
  publishedAt: string
  source: string
  tags: string[]
  importance: "low" | "medium" | "high" | "critical"
}

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" },
  { code: "te", name: "తెలుగు" },
  { code: "ta", name: "தமிழ்" },
  { code: "or", name: "ଓଡ଼ିଆ" },
]

const categories = [
  "Disease Prevention",
  "Vaccination Updates",
  "Health Guidelines",
  "Nutrition & Wellness",
  "Mental Health",
  "Maternal Health",
  "Child Health",
  "Emergency Preparedness",
]

export default function MedicalNewsPage() {
  const [newsItems, setNewsItems] = useState<MedicalNewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const fetchMedicalNews = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/medical-news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: selectedLanguage,
          category: selectedCategory === "all" ? undefined : selectedCategory,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setNewsItems(data.newsItems)
        toast({
          title: "Health Updates Refreshed",
          description: `Loaded ${data.newsItems.length} health awareness articles`,
        })
      }
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Using cached health information",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMedicalNews()
  }, [selectedLanguage, selectedCategory])

  const getImportanceBadge = (importance: string) => {
    const variants = {
      low: "secondary",
      medium: "default",
      high: "destructive",
      critical: "destructive",
    }
    return variants[importance as keyof typeof variants] || "default"
  }

  const filteredNews = newsItems.filter(
    (item) => item.language === selectedLanguage && (selectedCategory === "all" || item.category === selectedCategory),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-orange-500 bg-clip-text text-transparent mb-4">
            Health Awareness Updates
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            AI-generated health education content based on official guidelines from WHO, CDC, and Indian health
            authorities. Educational content for awareness purposes only.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-between">
          <div className="flex gap-4">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-40">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <BookOpen className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={fetchMedicalNews}
            disabled={loading}
            className="bg-gradient-to-r from-cyan-500 to-orange-500 hover:from-cyan-600 hover:to-orange-600"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh Updates
          </Button>
        </div>

        {/* News Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-cyan-500">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={getImportanceBadge(item.importance)}>{item.importance.toUpperCase()}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(item.publishedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Badge variant="outline">{item.category}</Badge>
                    <span className="text-xs">Source: {item.source}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed mb-4">{item.summary}</p>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredNews.length === 0 && !loading && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Updates Available</h3>
            <p className="text-gray-500">Try refreshing or selecting a different category.</p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <h3 className="font-semibold text-amber-800 mb-2">Important Disclaimer</h3>
          <p className="text-amber-700 text-sm leading-relaxed">
            This content is AI-generated for educational purposes based on official health guidelines. It is not actual
            news reporting and should not replace professional medical advice. Always consult healthcare professionals
            for medical decisions. For official health updates, visit WHO.int, CDC.gov, or your local health department.
          </p>
        </div>
      </div>
    </div>
  )
}
