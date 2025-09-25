"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MoreHorizontal, UserCheck } from "lucide-react"

export function UserManagement() {
  const users = [
    {
      id: "1",
      name: "Anonymous User",
      location: "Hyderabad, Telangana",
      language: "Telugu",
      lastActive: "2024-11-12",
      chatSessions: 15,
      status: "active",
    },
    {
      id: "2",
      name: "Anonymous User",
      location: "Visakhapatnam, AP",
      language: "English",
      lastActive: "2024-11-11",
      chatSessions: 8,
      status: "active",
    },
    {
      id: "3",
      name: "Anonymous User",
      location: "Vijayawada, AP",
      language: "Hindi",
      lastActive: "2024-11-10",
      chatSessions: 23,
      status: "inactive",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-muted-foreground">Monitor user activity and engagement (anonymized data)</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Activity</CardTitle>
          <CardDescription>Overview of user interactions and system usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium">{user.name}</h3>
                    <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span>{user.location}</span> • <span>{user.language}</span> •{" "}
                    <span>{user.chatSessions} sessions</span> • <span>Last active {user.lastActive}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <UserCheck className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Usage Statistics</CardTitle>
            <CardDescription>User engagement and interaction metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Daily Active Users</span>
                <span className="font-medium">2,543</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Average Session Duration</span>
                <span className="font-medium">8m 32s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Most Used Feature</span>
                <span className="font-medium">Health Chat</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">User Satisfaction</span>
                <span className="font-medium">4.2/5</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Language Distribution</CardTitle>
            <CardDescription>User language preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Telugu</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full">
                    <div className="w-16 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">45%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">English</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full">
                    <div className="w-12 h-2 bg-secondary rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">35%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Hindi</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full">
                    <div className="w-6 h-2 bg-accent rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">20%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
