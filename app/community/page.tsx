"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HealthcareFinder } from "@/components/community/healthcare-finder"
import { EmergencyServices } from "@/components/community/emergency-services"
import { MapPin, Ambulance, Users, Bell } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Community Health</h1>
        <p className="text-muted-foreground">Connect with local healthcare services and emergency resources</p>
      </div>

      <Tabs defaultValue="finder" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="finder" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Healthcare Finder
          </TabsTrigger>
          <TabsTrigger value="emergency" className="flex items-center gap-2">
            <Ambulance className="h-4 w-4" />
            Emergency
          </TabsTrigger>
          <TabsTrigger value="community" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Community
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Health Alerts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="finder">
          <HealthcareFinder />
        </TabsContent>

        <TabsContent value="emergency">
          <EmergencyServices />
        </TabsContent>

        <TabsContent value="community">
          <Card>
            <CardHeader>
              <CardTitle>Community Health Network</CardTitle>
              <CardDescription>Coming soon - connect with local health initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This section will include community health programs, vaccination drives, health camps, and local health
                statistics.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Health Alerts & Notifications</CardTitle>
              <CardDescription>Coming soon - real-time health alerts for your area</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This section will show disease outbreaks, vaccination reminders, weather-related health advisories, and
                emergency notifications.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
