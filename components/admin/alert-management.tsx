"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Send, Eye } from "lucide-react"

export function AlertManagement() {
  const [isCreating, setIsCreating] = useState(false)

  const alerts = [
    {
      id: "1",
      title: "Dengue Outbreak Alert - Hyderabad",
      severity: "high",
      status: "active",
      location: "Hyderabad, Telangana",
      created: "2024-11-10",
      views: 1250,
    },
    {
      id: "2",
      title: "Water Quality Advisory - Visakhapatnam",
      severity: "critical",
      status: "active",
      location: "Visakhapatnam, AP",
      created: "2024-11-12",
      views: 890,
    },
    {
      id: "3",
      title: "Seasonal Flu Vaccination Drive",
      severity: "medium",
      status: "scheduled",
      location: "All Districts",
      created: "2024-11-08",
      views: 456,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Alert Management</h2>
          <p className="text-muted-foreground">Create and manage health alerts and advisories</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Alert
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Alert</CardTitle>
            <CardDescription>Publish a new health alert or advisory</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Alert Title</label>
                <Input placeholder="Enter alert title..." />
              </div>
              <div>
                <label className="text-sm font-medium">Severity</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="outbreak">Outbreak</SelectItem>
                    <SelectItem value="advisory">Advisory</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="update">Update</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input placeholder="Affected location..." />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea placeholder="Enter detailed description..." rows={4} />
            </div>
            <div>
              <label className="text-sm font-medium">Action Required (Optional)</label>
              <Textarea placeholder="What actions should people take..." rows={2} />
            </div>
            <div className="flex gap-2">
              <Button>
                <Send className="h-4 w-4 mr-2" />
                Publish Alert
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
          <CardDescription>Manage existing health alerts and advisories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium">{alert.title}</h3>
                    <Badge
                      variant={
                        alert.severity === "critical"
                          ? "destructive"
                          : alert.severity === "high"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {alert.severity}
                    </Badge>
                    <Badge variant="outline">{alert.status}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span>{alert.location}</span> • <span>Created {alert.created}</span> •{" "}
                    <span>{alert.views} views</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
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
