"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Phone, AlertTriangle, Heart, Flame, Shield, Ambulance, User, Navigation } from "lucide-react"

interface EmergencyContact {
  id: string
  name: string
  number: string
  type: "medical" | "fire" | "police" | "poison" | "mental"
  description: string
  available: "24/7" | "business_hours"
}

interface EmergencyProfile {
  name: string
  age: number
  bloodType: string
  allergies: string[]
  medications: string[]
  conditions: string[]
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
}

const emergencyContacts: EmergencyContact[] = [
  {
    id: "1",
    name: "Emergency Medical Services",
    number: "911",
    type: "medical",
    description: "For life-threatening medical emergencies",
    available: "24/7",
  },
  {
    id: "2",
    name: "Fire Department",
    number: "911",
    type: "fire",
    description: "For fires, explosions, and rescue operations",
    available: "24/7",
  },
  {
    id: "3",
    name: "Police Department",
    number: "911",
    type: "police",
    description: "For crimes, accidents, and public safety",
    available: "24/7",
  },
  {
    id: "4",
    name: "Poison Control Center",
    number: "1-800-222-1222",
    type: "poison",
    description: "For poisoning emergencies and toxic exposures",
    available: "24/7",
  },
  {
    id: "5",
    name: "Mental Health Crisis Line",
    number: "988",
    type: "mental",
    description: "For mental health emergencies and suicide prevention",
    available: "24/7",
  },
]

const firstAidSteps = {
  choking: [
    "Check if person can cough or speak",
    "If not, perform 5 back blows between shoulder blades",
    "If unsuccessful, perform 5 abdominal thrusts",
    "Alternate between back blows and abdominal thrusts",
    "Call 911 if object doesn't dislodge",
  ],
  bleeding: [
    "Apply direct pressure to wound with clean cloth",
    "Elevate injured area above heart if possible",
    "Don't remove embedded objects",
    "Apply pressure bandage if bleeding continues",
    "Seek immediate medical attention for severe bleeding",
  ],
  burns: [
    "Remove from heat source immediately",
    "Cool burn with cool (not cold) water for 10-20 minutes",
    "Remove jewelry/clothing before swelling occurs",
    "Cover with sterile, non-adhesive bandage",
    "Seek medical attention for severe burns",
  ],
  heartAttack: [
    "Call 911 immediately",
    "Give aspirin if person is conscious and not allergic",
    "Help person sit in comfortable position",
    "Loosen tight clothing",
    "Be prepared to perform CPR if needed",
  ],
}

export function EmergencyServices() {
  const [selectedEmergency, setSelectedEmergency] = useState<string | null>(null)
  const [showProfile, setShowProfile] = useState(false)
  const [emergencyProfile, setEmergencyProfile] = useState<EmergencyProfile>({
    name: "John Doe",
    age: 35,
    bloodType: "O+",
    allergies: ["Penicillin", "Shellfish"],
    medications: ["Lisinopril 10mg", "Metformin 500mg"],
    conditions: ["Hypertension", "Type 2 Diabetes"],
    emergencyContact: {
      name: "Jane Doe",
      phone: "+1-555-0123",
      relationship: "Spouse",
    },
  })

  const callEmergency = (number: string) => {
    window.location.href = `tel:${number}`
  }

  const shareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const message = `Emergency! My location: https://maps.google.com/?q=${latitude},${longitude}`

          // Try to share via Web Share API
          if (navigator.share) {
            navigator.share({
              title: "Emergency Location",
              text: message,
            })
          } else {
            // Fallback to copying to clipboard
            navigator.clipboard.writeText(message)
            alert("Location copied to clipboard!")
          }
        },
        (error) => {
          console.error("Error getting location:", error)
          alert("Unable to get location. Please enable location services.")
        },
      )
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "medical":
        return <Heart className="h-4 w-4 text-red-500" />
      case "fire":
        return <Flame className="h-4 w-4 text-orange-500" />
      case "police":
        return <Shield className="h-4 w-4 text-blue-500" />
      case "poison":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "mental":
        return <User className="h-4 w-4 text-purple-500" />
      default:
        return <Phone className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Emergency Services</h2>
          <p className="text-muted-foreground">Quick access to emergency contacts and first aid guidance</p>
        </div>
        <Button onClick={() => setShowProfile(!showProfile)} variant="outline" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          {showProfile ? "Hide" : "Show"} Profile
        </Button>
      </div>

      {showProfile && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <User className="h-5 w-5" />
              Emergency Medical Profile
            </CardTitle>
            <CardDescription>Critical information for emergency responders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Personal Information</p>
                <div className="mt-2 space-y-1">
                  <p>
                    <strong>Name:</strong> {emergencyProfile.name}
                  </p>
                  <p>
                    <strong>Age:</strong> {emergencyProfile.age}
                  </p>
                  <p>
                    <strong>Blood Type:</strong> {emergencyProfile.bloodType}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Emergency Contact</p>
                <div className="mt-2 space-y-1">
                  <p>
                    <strong>Name:</strong> {emergencyProfile.emergencyContact.name}
                  </p>
                  <p>
                    <strong>Phone:</strong> {emergencyProfile.emergencyContact.phone}
                  </p>
                  <p>
                    <strong>Relationship:</strong> {emergencyProfile.emergencyContact.relationship}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Allergies</p>
                <div className="space-y-1">
                  {emergencyProfile.allergies.map((allergy, idx) => (
                    <Badge key={idx} variant="destructive" className="text-xs">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Medications</p>
                <div className="space-y-1">
                  {emergencyProfile.medications.map((med, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {med}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Conditions</p>
                <div className="space-y-1">
                  {emergencyProfile.conditions.map((condition, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-700">
          <strong>In case of life-threatening emergency, call 911 immediately.</strong>
          <br />
          This app is for information only and should not replace professional medical advice.
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Emergency Contacts
            </CardTitle>
            <CardDescription>Quick access to emergency services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {emergencyContacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getTypeIcon(contact.type)}
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">{contact.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {contact.available}
                  </Badge>
                  <Button
                    onClick={() => callEmergency(contact.number)}
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {contact.number}
                  </Button>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t">
              <Button
                onClick={shareLocation}
                variant="outline"
                className="w-full flex items-center gap-2 bg-transparent"
              >
                <Navigation className="h-4 w-4" />
                Share My Location
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ambulance className="h-5 w-5 text-secondary" />
              First Aid Guide
            </CardTitle>
            <CardDescription>Quick reference for common emergencies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(firstAidSteps).map(([emergency, steps]) => (
              <div key={emergency} className="border rounded-lg">
                <button
                  onClick={() => setSelectedEmergency(selectedEmergency === emergency ? null : emergency)}
                  className="w-full p-3 text-left flex items-center justify-between hover:bg-muted"
                >
                  <span className="font-medium capitalize">{emergency.replace(/([A-Z])/g, " $1")}</span>
                  <span className="text-muted-foreground">{selectedEmergency === emergency ? "−" : "+"}</span>
                </button>

                {selectedEmergency === emergency && (
                  <div className="px-3 pb-3">
                    <ol className="space-y-2 text-sm">
                      {steps.map((step, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
                            {idx + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="h-5 w-5" />
            Emergency Action Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                1
              </div>
              <h4 className="font-medium text-red-700">Assess the Situation</h4>
              <p className="text-sm text-red-600">Check for immediate dangers and ensure your safety first</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                2
              </div>
              <h4 className="font-medium text-red-700">Call for Help</h4>
              <p className="text-sm text-red-600">Dial appropriate emergency number and provide clear information</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                3
              </div>
              <h4 className="font-medium text-red-700">Provide First Aid</h4>
              <p className="text-sm text-red-600">Follow first aid steps while waiting for professional help</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
