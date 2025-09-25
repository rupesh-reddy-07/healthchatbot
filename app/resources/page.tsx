"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "@/components/navigation"
import { ResourceCard } from "@/components/resources/resource-card"
import { FAQSection } from "@/components/resources/faq-section"
import { BookOpen, Search, Filter, Download, FileText, RefreshCw } from "lucide-react"
import type { AIGeneratedResource } from "@/lib/ai-content-generator"

interface Resource {
  id: string
  title: string
  description: string
  type: "pdf" | "video" | "infographic" | "article" | "checklist"
  category: "prevention" | "symptoms" | "treatment" | "vaccination" | "emergency" | "nutrition"
  language: "en" | "hi" | "te" | "all"
  downloadUrl?: string
  viewUrl?: string
  fileSize?: string
  duration?: string
  lastUpdated: Date
  isPopular: boolean
}

const resources: Resource[] = [
  {
    id: "1",
    title: "Complete Guide to Preventive Healthcare",
    description: "Comprehensive guide covering all aspects of preventive healthcare for rural communities",
    type: "pdf",
    category: "prevention",
    language: "all",
    downloadUrl: "/resources/preventive-healthcare-guide.pdf",
    fileSize: "2.5 MB",
    lastUpdated: new Date("2024-10-15"),
    isPopular: true,
  },
  {
    id: "2",
    title: "Recognizing Common Disease Symptoms",
    description: "Visual guide to identify symptoms of common diseases with illustrations",
    type: "infographic",
    category: "symptoms",
    language: "all",
    viewUrl: "/resources/symptoms-infographic",
    lastUpdated: new Date("2024-11-01"),
    isPopular: true,
  },
  {
    id: "3",
    title: "Hand Washing Demonstration",
    description: "Step-by-step video showing proper hand washing techniques",
    type: "video",
    category: "prevention",
    language: "all",
    viewUrl: "/resources/handwashing-video",
    duration: "3:45",
    lastUpdated: new Date("2024-09-20"),
    isPopular: false,
  },
  {
    id: "4",
    title: "Emergency First Aid Checklist",
    description: "Quick reference checklist for common medical emergencies",
    type: "checklist",
    category: "emergency",
    language: "all",
    downloadUrl: "/resources/first-aid-checklist.pdf",
    fileSize: "1.2 MB",
    lastUpdated: new Date("2024-11-05"),
    isPopular: true,
  },
  {
    id: "5",
    title: "Vaccination Schedule for Children",
    description: "Complete vaccination timeline with reminders and important notes",
    type: "pdf",
    category: "vaccination",
    language: "all",
    downloadUrl: "/resources/child-vaccination-schedule.pdf",
    fileSize: "1.8 MB",
    lastUpdated: new Date("2024-10-30"),
    isPopular: true,
  },
  {
    id: "6",
    title: "Nutrition Guidelines for Pregnant Women",
    description: "Essential nutrition information for expecting mothers",
    type: "article",
    category: "nutrition",
    language: "all",
    viewUrl: "/resources/pregnancy-nutrition",
    lastUpdated: new Date("2024-10-10"),
    isPopular: false,
  },
  {
    id: "7",
    title: "Dengue Prevention Infographic",
    description: "Visual guide to prevent dengue fever with practical tips",
    type: "infographic",
    category: "prevention",
    language: "all",
    viewUrl: "/resources/dengue-prevention",
    lastUpdated: new Date("2024-11-08"),
    isPopular: true,
  },
  {
    id: "8",
    title: "Mental Health Awareness",
    description: "Understanding mental health and when to seek help",
    type: "article",
    category: "treatment",
    language: "all",
    viewUrl: "/resources/mental-health",
    lastUpdated: new Date("2024-10-25"),
    isPopular: false,
  },
]

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [showPopularOnly, setShowPopularOnly] = useState(false)
  const [aiResources, setAiResources] = useState<AIGeneratedResource[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [useAI, setUseAI] = useState(false)

  const fetchAIResources = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/ai-content/resources?count=12&language=${selectedLanguage}`)
      const result = await response.json()

      if (result.success) {
        setAiResources(result.data)
        setUseAI(true)
      } else {
        console.error("Failed to generate AI resources:", result.error)
      }
    } catch (error) {
      console.error("Error fetching AI resources:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAIResources()
  }, [])

  const currentResources = useAI && aiResources.length > 0 ? aiResources : resources

  const filteredResources = currentResources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    const matchesType = selectedType === "all" || resource.type === selectedType
    const matchesLanguage =
      selectedLanguage === "all" || resource.language === selectedLanguage || resource.language === "all"
    const matchesPopular = !showPopularOnly || resource.isPopular

    return matchesSearch && matchesCategory && matchesType && matchesLanguage && matchesPopular
  })

  const popularResources = currentResources.filter((resource) => resource.isPopular).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-balance">Health Resources & Education</h1>
            <Button onClick={fetchAIResources} disabled={isLoading} variant="outline" size="sm">
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              {isLoading ? "Generating..." : "Refresh AI Content"}
            </Button>
          </div>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl">
            Access educational materials, guides, and resources to stay informed about health and wellness.
            {useAI && " Content powered by AI for the latest health information."}
          </p>
        </div>

        {/* AI status indicator */}
        {useAI && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 font-medium">
                  AI-Generated Content Active - Resources updated with latest health information
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Popular Resources */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Popular Resources
            </CardTitle>
            <CardDescription>Most accessed health resources by our community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {popularResources.map((resource) => (
                <div key={resource.id} className="p-4 bg-background rounded-lg border">
                  <h3 className="font-medium mb-2 text-balance">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{resource.description}</p>
                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Access Resource
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="prevention">Prevention</SelectItem>
                    <SelectItem value="symptoms">Symptoms</SelectItem>
                    <SelectItem value="treatment">Treatment</SelectItem>
                    <SelectItem value="vaccination">Vaccination</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="nutrition">Nutrition</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="infographic">Infographic</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="checklist">Checklist</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">हिंदी</SelectItem>
                    <SelectItem value="te">తెలుగు</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={showPopularOnly ? "default" : "outline"}
                  onClick={() => setShowPopularOnly(!showPopularOnly)}
                  size="sm"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Popular Only
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredResources.length === 0 ? (
            <div className="col-span-full">
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">
                    {isLoading ? "Generating new resources..." : "No resources found matching your criteria."}
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            filteredResources.map((resource) => <ResourceCard key={resource.id} resource={resource} />)
          )}
        </div>

        {/* FAQ Section */}
        <FAQSection />

        {/* Low Bandwidth Option */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl">Low Bandwidth Version</CardTitle>
            <CardDescription>
              Having trouble with slow internet? Access text-only versions of our resources.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="bg-transparent">
              <FileText className="h-4 w-4 mr-2" />
              Switch to Text-Only Mode
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
