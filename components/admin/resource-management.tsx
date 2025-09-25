"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Upload, Download, Eye } from "lucide-react"

export function ResourceManagement() {
  const [isCreating, setIsCreating] = useState(false)

  const resources = [
    {
      id: "1",
      title: "Complete Guide to Preventive Healthcare",
      type: "pdf",
      category: "prevention",
      language: "all",
      status: "published",
      downloads: 1250,
      lastUpdated: "2024-10-15",
    },
    {
      id: "2",
      title: "Recognizing Common Disease Symptoms",
      type: "infographic",
      category: "symptoms",
      language: "all",
      status: "published",
      downloads: 890,
      lastUpdated: "2024-11-01",
    },
    {
      id: "3",
      title: "Emergency First Aid Checklist",
      type: "checklist",
      category: "emergency",
      language: "all",
      status: "draft",
      downloads: 0,
      lastUpdated: "2024-11-05",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Resource Management</h2>
          <p className="text-muted-foreground">Manage educational resources and materials</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Resource
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Resource</CardTitle>
            <CardDescription>Upload and configure a new educational resource</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Resource Title</label>
                <Input placeholder="Enter resource title..." />
              </div>
              <div>
                <label className="text-sm font-medium">Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="infographic">Infographic</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="checklist">Checklist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prevention">Prevention</SelectItem>
                    <SelectItem value="symptoms">Symptoms</SelectItem>
                    <SelectItem value="treatment">Treatment</SelectItem>
                    <SelectItem value="vaccination">Vaccination</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="nutrition">Nutrition</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Language</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                    <SelectItem value="te">Telugu</SelectItem>
                    <SelectItem value="ta">Tamil</SelectItem>
                    <SelectItem value="or">Odia</SelectItem>
                    <SelectItem value="kn">Kannada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea placeholder="Enter resource description..." rows={3} />
            </div>
            <div>
              <label className="text-sm font-medium">Upload File</label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">PDF, DOC, JPG, PNG up to 10MB</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button>Save Resource</Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Resource Library</CardTitle>
          <CardDescription>Manage existing educational resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {resources.map((resource) => (
              <div key={resource.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium">{resource.title}</h3>
                    <Badge variant="outline">{resource.type}</Badge>
                    <Badge variant="secondary">{resource.category}</Badge>
                    <Badge variant={resource.status === "published" ? "default" : "secondary"}>{resource.status}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span>{resource.language} languages</span> • <span>{resource.downloads} downloads</span> •{" "}
                    <span>Updated {resource.lastUpdated}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
