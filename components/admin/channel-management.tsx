"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Phone, Smartphone, Globe, Settings, CheckCircle, XCircle } from "lucide-react"

interface ChannelConfig {
  name: string
  status: "active" | "inactive" | "error"
  icon: React.ReactNode
  description: string
  settings: Record<string, string>
}

export function ChannelManagement() {
  const [channels, setChannels] = useState<ChannelConfig[]>([
    {
      name: "WhatsApp Business",
      status: "active",
      icon: <MessageSquare className="h-5 w-5" />,
      description: "WhatsApp Business API integration",
      settings: {
        phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || "",
        accessToken: process.env.WHATSAPP_ACCESS_TOKEN || "",
        verifyToken: process.env.WHATSAPP_VERIFY_TOKEN || "",
      },
    },
    {
      name: "SMS (Twilio)",
      status: "active",
      icon: <Smartphone className="h-5 w-5" />,
      description: "SMS messaging via Twilio",
      settings: {
        accountSid: process.env.TWILIO_ACCOUNT_SID || "",
        authToken: process.env.TWILIO_AUTH_TOKEN || "",
        phoneNumber: process.env.TWILIO_PHONE_NUMBER || "",
      },
    },
    {
      name: "Voice (Twilio)",
      status: "inactive",
      icon: <Phone className="h-5 w-5" />,
      description: "Voice calls via Twilio Voice API",
      settings: {
        accountSid: process.env.TWILIO_ACCOUNT_SID || "",
        authToken: process.env.TWILIO_AUTH_TOKEN || "",
      },
    },
    {
      name: "Web Chat",
      status: "active",
      icon: <Globe className="h-5 w-5" />,
      description: "Web-based chat interface",
      settings: {},
    },
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-800">
            <XCircle className="h-3 w-3 mr-1" />
            Inactive
          </Badge>
        )
      case "error":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Error
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Channel Management</h2>
        <p className="text-muted-foreground">Configure and monitor multi-channel integrations</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {channels.map((channel) => (
          <Card key={channel.name} className="border-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {channel.icon}
                  <CardTitle className="text-lg">{channel.name}</CardTitle>
                </div>
                {getStatusBadge(channel.status)}
              </div>
              <CardDescription className="text-sm">{channel.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="whatsapp" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="sms">SMS</TabsTrigger>
          <TabsTrigger value="voice">Voice</TabsTrigger>
          <TabsTrigger value="web">Web</TabsTrigger>
        </TabsList>

        <TabsContent value="whatsapp" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Business Configuration</CardTitle>
              <CardDescription>Configure WhatsApp Business API settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="wa-phone-id">Phone Number ID</Label>
                  <Input id="wa-phone-id" placeholder="Enter phone number ID" />
                </div>
                <div>
                  <Label htmlFor="wa-access-token">Access Token</Label>
                  <Input id="wa-access-token" type="password" placeholder="Enter access token" />
                </div>
              </div>
              <div>
                <Label htmlFor="wa-verify-token">Verify Token</Label>
                <Input id="wa-verify-token" placeholder="Enter verify token" />
              </div>
              <div className="flex gap-2">
                <Button>Save Configuration</Button>
                <Button variant="outline">Test Connection</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SMS Configuration</CardTitle>
              <CardDescription>Configure Twilio SMS settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sms-account-sid">Account SID</Label>
                  <Input id="sms-account-sid" placeholder="Enter Twilio Account SID" />
                </div>
                <div>
                  <Label htmlFor="sms-auth-token">Auth Token</Label>
                  <Input id="sms-auth-token" type="password" placeholder="Enter auth token" />
                </div>
              </div>
              <div>
                <Label htmlFor="sms-phone">Phone Number</Label>
                <Input id="sms-phone" placeholder="Enter Twilio phone number" />
              </div>
              <div className="flex gap-2">
                <Button>Save Configuration</Button>
                <Button variant="outline">Test SMS</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="voice" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Voice Configuration</CardTitle>
              <CardDescription>Configure Twilio Voice API settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="voice-account-sid">Account SID</Label>
                  <Input id="voice-account-sid" placeholder="Enter Twilio Account SID" />
                </div>
                <div>
                  <Label htmlFor="voice-auth-token">Auth Token</Label>
                  <Input id="voice-auth-token" type="password" placeholder="Enter auth token" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button>Save Configuration</Button>
                <Button variant="outline">Test Call</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="web" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Web Chat Configuration</CardTitle>
              <CardDescription>Configure web chat interface settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="web-rate-limit">Rate Limit (per minute)</Label>
                  <Input id="web-rate-limit" type="number" placeholder="60" />
                </div>
                <div>
                  <Label htmlFor="web-session-timeout">Session Timeout (minutes)</Label>
                  <Input id="web-session-timeout" type="number" placeholder="30" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button>Save Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
