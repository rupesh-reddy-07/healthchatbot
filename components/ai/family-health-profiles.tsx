"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, Plus, User, Heart, Calendar, AlertCircle, Pill } from "lucide-react"

interface FamilyMember {
  id: string
  name: string
  relationship: string
  age: number
  gender: "male" | "female" | "other"
  bloodType: string
  allergies: string[]
  medications: string[]
  conditions: string[]
  vaccinations: {
    name: string
    date: string
    nextDue?: string
  }[]
  lastCheckup: string
  emergencyContact: {
    name: string
    phone: string
  }
}

const sampleFamily: FamilyMember[] = [
  {
    id: "1",
    name: "John Doe",
    relationship: "Self",
    age: 35,
    gender: "male",
    bloodType: "O+",
    allergies: ["Penicillin", "Shellfish"],
    medications: ["Lisinopril 10mg", "Metformin 500mg"],
    conditions: ["Hypertension", "Type 2 Diabetes"],
    vaccinations: [
      { name: "COVID-19", date: "2024-01-15", nextDue: "2024-07-15" },
      { name: "Flu Shot", date: "2023-10-01", nextDue: "2024-10-01" },
    ],
    lastCheckup: "2024-01-10",
    emergencyContact: { name: "Jane Doe", phone: "+1-555-0123" },
  },
  {
    id: "2",
    name: "Jane Doe",
    relationship: "Spouse",
    age: 32,
    gender: "female",
    bloodType: "A+",
    allergies: ["Latex"],
    medications: ["Prenatal Vitamins"],
    conditions: ["Pregnancy"],
    vaccinations: [
      { name: "COVID-19", date: "2024-01-15", nextDue: "2024-07-15" },
      { name: "Tdap", date: "2024-02-01" },
    ],
    lastCheckup: "2024-02-15",
    emergencyContact: { name: "John Doe", phone: "+1-555-0124" },
  },
  {
    id: "3",
    name: "Emma Doe",
    relationship: "Daughter",
    age: 8,
    gender: "female",
    bloodType: "O+",
    allergies: ["Peanuts"],
    medications: ["EpiPen"],
    conditions: ["Food Allergies"],
    vaccinations: [
      { name: "MMR", date: "2023-08-15" },
      { name: "DTaP", date: "2023-08-15" },
      { name: "Flu Shot", date: "2023-10-01", nextDue: "2024-10-01" },
    ],
    lastCheckup: "2023-12-01",
    emergencyContact: { name: "John Doe", phone: "+1-555-0124" },
  },
]

export function FamilyHealthProfiles() {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(sampleFamily)
  const [selectedMember, setSelectedMember] = useState<FamilyMember>(sampleFamily[0])
  const [isAddingMember, setIsAddingMember] = useState(false)
  const [newMember, setNewMember] = useState<Partial<FamilyMember>>({
    name: "",
    relationship: "",
    age: 0,
    gender: "male",
    bloodType: "",
    allergies: [],
    medications: [],
    conditions: [],
    vaccinations: [],
    lastCheckup: "",
    emergencyContact: { name: "", phone: "" },
  })

  const addFamilyMember = () => {
    if (newMember.name && newMember.relationship) {
      const member: FamilyMember = {
        id: Date.now().toString(),
        name: newMember.name,
        relationship: newMember.relationship,
        age: newMember.age || 0,
        gender: newMember.gender || "male",
        bloodType: newMember.bloodType || "",
        allergies: newMember.allergies || [],
        medications: newMember.medications || [],
        conditions: newMember.conditions || [],
        vaccinations: newMember.vaccinations || [],
        lastCheckup: newMember.lastCheckup || "",
        emergencyContact: newMember.emergencyContact || { name: "", phone: "" },
      }

      setFamilyMembers([...familyMembers, member])
      setIsAddingMember(false)
      setNewMember({
        name: "",
        relationship: "",
        age: 0,
        gender: "male",
        bloodType: "",
        allergies: [],
        medications: [],
        conditions: [],
        vaccinations: [],
        lastCheckup: "",
        emergencyContact: { name: "", phone: "" },
      })
    }
  }

  const getUpcomingVaccinations = () => {
    const upcoming: { member: string; vaccination: string; dueDate: string }[] = []

    familyMembers.forEach((member) => {
      member.vaccinations.forEach((vac) => {
        if (vac.nextDue) {
          const dueDate = new Date(vac.nextDue)
          const today = new Date()
          const diffTime = dueDate.getTime() - today.getTime()
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

          if (diffDays <= 30 && diffDays >= 0) {
            upcoming.push({
              member: member.name,
              vaccination: vac.name,
              dueDate: vac.nextDue,
            })
          }
        }
      })
    })

    return upcoming.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
  }

  const getHealthAlerts = () => {
    const alerts: { member: string; type: string; message: string; urgency: "low" | "medium" | "high" }[] = []

    familyMembers.forEach((member) => {
      // Check for overdue checkups
      if (member.lastCheckup) {
        const lastCheckup = new Date(member.lastCheckup)
        const today = new Date()
        const diffTime = today.getTime() - lastCheckup.getTime()
        const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30))

        if (diffMonths > 12) {
          alerts.push({
            member: member.name,
            type: "checkup",
            message: "Annual checkup overdue",
            urgency: "medium",
          })
        }
      }

      // Check for critical allergies
      if (member.allergies.some((allergy) => ["Penicillin", "Peanuts", "Shellfish"].includes(allergy))) {
        alerts.push({
          member: member.name,
          type: "allergy",
          message: "Has critical allergies - ensure emergency medication is available",
          urgency: "high",
        })
      }
    })

    return alerts
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Family Health Profiles</h2>
          <p className="text-muted-foreground">Manage health information for your entire family</p>
        </div>
        <Dialog open={isAddingMember} onOpenChange={setIsAddingMember}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Family Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Family Member</DialogTitle>
              <DialogDescription>Add a new family member to track their health information</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship</Label>
                  <Select
                    value={newMember.relationship}
                    onValueChange={(value) => setNewMember({ ...newMember, relationship: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={newMember.age}
                    onChange={(e) => setNewMember({ ...newMember, age: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={newMember.gender}
                    onValueChange={(value) =>
                      setNewMember({ ...newMember, gender: value as "male" | "female" | "other" })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={addFamilyMember} className="w-full">
                Add Member
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Family Members
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {familyMembers.map((member) => (
              <div
                key={member.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedMember.id === member.id ? "bg-primary/10 border-primary" : "hover:bg-muted"
                }`}
                onClick={() => setSelectedMember(member)}
              >
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.relationship}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-secondary" />
                {selectedMember.name}'s Health Profile
              </CardTitle>
              <CardDescription>
                {selectedMember.relationship} • {selectedMember.age} years old
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="medical">Medical Info</TabsTrigger>
                  <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
                  <TabsTrigger value="emergency">Emergency</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Basic Information</h4>
                      <div className="space-y-1 text-sm">
                        <p>
                          <strong>Age:</strong> {selectedMember.age}
                        </p>
                        <p>
                          <strong>Gender:</strong> {selectedMember.gender}
                        </p>
                        <p>
                          <strong>Blood Type:</strong> {selectedMember.bloodType}
                        </p>
                        <p>
                          <strong>Last Checkup:</strong> {selectedMember.lastCheckup}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Health Summary</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span className="text-sm">{selectedMember.conditions.length} conditions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Pill className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">{selectedMember.medications.length} medications</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">{selectedMember.allergies.length} allergies</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="medical" className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 text-red-600">Allergies</h4>
                      <div className="space-y-1">
                        {selectedMember.allergies.map((allergy, idx) => (
                          <Badge key={idx} variant="destructive" className="text-xs">
                            {allergy}
                          </Badge>
                        ))}
                        {selectedMember.allergies.length === 0 && (
                          <p className="text-sm text-muted-foreground">No known allergies</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-blue-600">Medications</h4>
                      <div className="space-y-1">
                        {selectedMember.medications.map((med, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {med}
                          </Badge>
                        ))}
                        {selectedMember.medications.length === 0 && (
                          <p className="text-sm text-muted-foreground">No current medications</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-orange-600">Conditions</h4>
                      <div className="space-y-1">
                        {selectedMember.conditions.map((condition, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {condition}
                          </Badge>
                        ))}
                        {selectedMember.conditions.length === 0 && (
                          <p className="text-sm text-muted-foreground">No known conditions</p>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="vaccinations" className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Vaccination History</h4>
                    <div className="space-y-2">
                      {selectedMember.vaccinations.map((vac, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 border rounded">
                          <div>
                            <p className="font-medium text-sm">{vac.name}</p>
                            <p className="text-xs text-muted-foreground">Given: {vac.date}</p>
                          </div>
                          {vac.nextDue && (
                            <Badge variant="outline" className="text-xs">
                              Next: {vac.nextDue}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="emergency" className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Emergency Contact</h4>
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium">{selectedMember.emergencyContact.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedMember.emergencyContact.phone}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Vaccinations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {getUpcomingVaccinations().map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <p className="font-medium text-sm">{item.member}</p>
                    <p className="text-xs text-muted-foreground">{item.vaccination}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {item.dueDate}
                  </Badge>
                </div>
              ))}
              {getUpcomingVaccinations().length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No upcoming vaccinations</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-secondary" />
              Health Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {getHealthAlerts().map((alert, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2 border rounded">
                  <AlertCircle
                    className={`h-4 w-4 mt-0.5 ${
                      alert.urgency === "high"
                        ? "text-red-500"
                        : alert.urgency === "medium"
                          ? "text-yellow-500"
                          : "text-blue-500"
                    }`}
                  />
                  <div>
                    <p className="font-medium text-sm">{alert.member}</p>
                    <p className="text-xs text-muted-foreground">{alert.message}</p>
                  </div>
                </div>
              ))}
              {getHealthAlerts().length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No health alerts</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
