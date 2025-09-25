"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Smartphone, Mail } from "lucide-react"

export function AlertSubscription() {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [alertTypes, setAlertTypes] = useState({
    outbreak: true,
    emergency: true,
    advisory: false,
    update: false,
  })
  const [notificationMethods, setNotificationMethods] = useState({
    email: true,
    sms: false,
    push: true,
  })

  const handleSubscribe = () => {
    // Handle subscription logic here
    console.log("Subscribing with:", {
      email,
      phone,
      selectedLocation,
      alertTypes,
      notificationMethods,
    })
  }

  return (
    <Card className="mb-6 border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Subscribe to Health Alerts
        </CardTitle>
        <CardDescription>
          Get notified about health emergencies and important advisories in your area. Stay informed and stay safe.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hyderabad">Hyderabad, Telangana</SelectItem>
                  <SelectItem value="visakhapatnam">Visakhapatnam, Andhra Pradesh</SelectItem>
                  <SelectItem value="vijayawada">Vijayawada, Andhra Pradesh</SelectItem>
                  <SelectItem value="warangal">Warangal, Telangana</SelectItem>
                  <SelectItem value="guntur">Guntur, Andhra Pradesh</SelectItem>
                  <SelectItem value="all">All Locations</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Alert Types</Label>
              <div className="space-y-2 mt-2">
                {Object.entries(alertTypes).map(([key, checked]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={checked}
                      onCheckedChange={(checked) => setAlertTypes((prev) => ({ ...prev, [key]: checked as boolean }))}
                    />
                    <Label htmlFor={key} className="capitalize">
                      {key} Alerts
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Notification Methods</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="email-notif"
                    checked={notificationMethods.email}
                    onCheckedChange={(checked) =>
                      setNotificationMethods((prev) => ({ ...prev, email: checked as boolean }))
                    }
                  />
                  <Label htmlFor="email-notif" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Notifications
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sms-notif"
                    checked={notificationMethods.sms}
                    onCheckedChange={(checked) =>
                      setNotificationMethods((prev) => ({ ...prev, sms: checked as boolean }))
                    }
                  />
                  <Label htmlFor="sms-notif" className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    SMS Notifications
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="push-notif"
                    checked={notificationMethods.push}
                    onCheckedChange={(checked) =>
                      setNotificationMethods((prev) => ({ ...prev, push: checked as boolean }))
                    }
                  />
                  <Label htmlFor="push-notif" className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Push Notifications
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button onClick={handleSubscribe} className="w-full md:w-auto">
          <Bell className="h-4 w-4 mr-2" />
          Subscribe to Alerts
        </Button>
      </CardContent>
    </Card>
  )
}
