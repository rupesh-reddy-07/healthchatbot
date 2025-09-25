"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, FileText, Video, ImageIcon, CheckSquare, Clock, Calendar, Star } from "lucide-react"
import { cn } from "@/lib/utils"

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

interface ResourceCardProps {
  resource: Resource
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const getTypeIcon = () => {
    switch (resource.type) {
      case "pdf":
        return <FileText className="h-5 w-5" />
      case "video":
        return <Video className="h-5 w-5" />
      case "infographic":
        return <ImageIcon className="h-5 w-5" />
      case "checklist":
        return <CheckSquare className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const getTypeColor = () => {
    switch (resource.type) {
      case "pdf":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      case "video":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "infographic":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "checklist":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  const getCategoryColor = () => {
    switch (resource.category) {
      case "prevention":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "symptoms":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "treatment":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "vaccination":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
      case "emergency":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      case "nutrition":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getLanguageDisplay = () => {
    switch (resource.language) {
      case "en":
        return "English"
      case "hi":
        return "हिंदी"
      case "te":
        return "తెలుగు"
      case "all":
        return "All Languages"
      default:
        return "English"
    }
  }

  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge className={cn("flex items-center gap-1", getTypeColor())}>
            {getTypeIcon()}
            {resource.type.toUpperCase()}
          </Badge>
          {resource.isPopular && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              Popular
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg text-balance">{resource.title}</CardTitle>
        <CardDescription className="text-sm leading-relaxed">{resource.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge className={getCategoryColor()}>{resource.category}</Badge>
            <Badge variant="outline">{getLanguageDisplay()}</Badge>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            {resource.fileSize && (
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>{resource.fileSize}</span>
              </div>
            )}
            {resource.duration && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{resource.duration}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Updated {formatDate(resource.lastUpdated)}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          {resource.viewUrl && (
            <Button size="sm" variant="outline" className="flex-1 bg-transparent">
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
          )}
          {resource.downloadUrl && (
            <Button size="sm" variant="default" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
