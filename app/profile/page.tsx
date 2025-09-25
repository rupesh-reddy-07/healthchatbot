"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Download,
  Trash2,
  FileText,
  Shield,
  Heart,
  AlertTriangle,
  Search,
  Phone,
  Camera,
  Plus,
  Archive,
} from "lucide-react"

interface FileRecord {
  id: string
  name: string
  type: "government" | "medical"
  category?: string
  uploadDate: string
  size: string
  aiSummary?: string
  doctorName?: string
  hospitalName?: string
}

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    fullName: "Rajesh Kumar",
    gender: "male",
    dateOfBirth: "1985-06-15",
    phoneNumber: "+91 9876543210",
    email: "rajesh.kumar@email.com",
    state: "Telangana",
    district: "Hyderabad",
    village: "Secunderabad",
    profilePicture: null as string | null,
  })

  const [files, setFiles] = useState<FileRecord[]>([
    {
      id: "1",
      name: "Aadhaar_Card.pdf",
      type: "government",
      category: "Aadhaar Card",
      uploadDate: "2024-01-15",
      size: "2.1 MB",
    },
    {
      id: "2",
      name: "Arogyasri_Card.pdf",
      type: "government",
      category: "Arogyasri Card",
      uploadDate: "2024-01-20",
      size: "1.8 MB",
    },
    {
      id: "3",
      name: "Blood_Test_Report.pdf",
      type: "medical",
      uploadDate: "2024-02-10",
      size: "3.2 MB",
      aiSummary:
        "Blood test conducted at Apollo Hospital on 10 Feb 2024. Normal glucose levels, slight vitamin D deficiency noted.",
      doctorName: "Dr. Priya Sharma",
      hospitalName: "Apollo Hospital",
    },
    {
      id: "4",
      name: "Prescription_Fever.pdf",
      type: "medical",
      uploadDate: "2024-02-28",
      size: "1.5 MB",
      aiSummary: "Consulted Dr. Ramesh for Fever on 28 Feb 2024. Prescribed Paracetamol and rest for 3 days.",
      doctorName: "Dr. Ramesh Reddy",
      hospitalName: "Government Hospital",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "government" | "medical">("all")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const profilePicRef = useRef<HTMLInputElement>(null)

  const calculateProgress = () => {
    const fields = [
      profileData.fullName,
      profileData.gender,
      profileData.dateOfBirth,
      profileData.phoneNumber,
      profileData.email,
      profileData.state,
      profileData.district,
      profileData.village,
    ]
    const filledFields = fields.filter((field) => field && field.trim() !== "").length
    const hasGovernmentId = files.some((file) => file.type === "government")
    const hasMedicalRecord = files.some((file) => file.type === "medical")

    let progress = (filledFields / fields.length) * 60 // 60% for profile fields
    if (hasGovernmentId) progress += 20 // 20% for government ID
    if (hasMedicalRecord) progress += 20 // 20% for medical records

    return Math.round(progress)
  }

  const filteredFiles = files.filter((file) => {
    const matchesSearch =
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.aiSummary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.doctorName?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || file.type === filterType
    return matchesSearch && matchesFilter
  })

  const handleFileUpload = (type: "government" | "medical") => {
    // Simulate file upload
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".pdf,.jpg,.jpeg,.png"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const newFile: FileRecord = {
          id: Date.now().toString(),
          name: file.name,
          type,
          uploadDate: new Date().toISOString().split("T")[0],
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          ...(type === "medical" && {
            aiSummary: "AI analysis will be generated shortly...",
            doctorName: "",
            hospitalName: "",
          }),
        }
        setFiles((prev) => [...prev, newFile])
      }
    }
    input.click()
  }

  const handleProfilePictureUpload = () => {
    profilePicRef.current?.click()
  }

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileData((prev) => ({ ...prev, profilePicture: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const deleteFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id))
  }

  const downloadAllFiles = () => {
    // Simulate bulk download
    alert("Downloading all files as ZIP... This feature will be available in emergency situations.")
  }

  const progress = calculateProgress()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">My Health Profile</h1>
          <p className="text-muted-foreground">Manage your medical records and health information</p>
        </div>

        {/* Profile Completeness */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Profile Completeness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Profile Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Complete your profile to get better health recommendations
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Profile Picture */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profileData.profilePicture || undefined} />
                    <AvatarFallback className="text-lg">
                      {profileData.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleProfilePictureUpload}
                      className="flex items-center gap-2 bg-transparent"
                    >
                      <Camera className="h-4 w-4" />
                      Upload Photo
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 5MB</p>
                  </div>
                  <input
                    ref={profilePicRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="hidden"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, fullName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={profileData.gender}
                      onValueChange={(value) => setProfileData((prev) => ({ ...prev, gender: value }))}
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
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phoneNumber}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email ID</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={profileData.state}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, state: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">District</Label>
                    <Input
                      id="district"
                      value={profileData.district}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, district: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="village">Village/City</Label>
                    <Input
                      id="village"
                      value={profileData.village}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, village: e.target.value }))}
                    />
                  </div>
                </div>

                <Button className="w-full">Save Profile Information</Button>
              </CardContent>
            </Card>

            {/* Government IDs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Government IDs
                </CardTitle>
                <CardDescription>Upload and manage your government identification documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => handleFileUpload("government")}
                  className="w-full flex items-center gap-2"
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                  Upload Government ID
                </Button>

                <div className="space-y-3">
                  {files
                    .filter((file) => file.type === "government")
                    .map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">{file.category || file.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Uploaded on {new Date(file.uploadDate).toLocaleDateString()} • {file.size}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => deleteFile(file.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Medical Records */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Medical Records
                </CardTitle>
                <CardDescription>Upload prescriptions, reports, and medical documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search medical records..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Records</SelectItem>
                      <SelectItem value="medical">Medical Only</SelectItem>
                      <SelectItem value="government">Government Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={() => handleFileUpload("medical")}
                  className="w-full flex items-center gap-2"
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                  Upload Medical Record
                </Button>

                <div className="space-y-3">
                  {filteredFiles
                    .filter((file) => file.type === "medical")
                    .map((file) => (
                      <div key={file.id} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <Heart className="h-5 w-5 text-primary mt-1" />
                            <div className="flex-1">
                              <p className="font-medium">{file.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Uploaded on {new Date(file.uploadDate).toLocaleDateString()} • {file.size}
                              </p>
                              {file.doctorName && (
                                <p className="text-sm text-muted-foreground">
                                  Dr: {file.doctorName} • {file.hospitalName}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => deleteFile(file.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {file.aiSummary && (
                          <div className="bg-muted/50 p-3 rounded-md">
                            <p className="text-sm font-medium mb-1">AI Summary:</p>
                            <p className="text-sm text-muted-foreground">{file.aiSummary}</p>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Section */}
          <div className="space-y-6">
            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Emergency Section
                </CardTitle>
                <CardDescription>Quick access to your health information during emergencies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={downloadAllFiles}
                  className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                >
                  <Archive className="h-4 w-4 mr-2" />
                  Download All Files (ZIP)
                </Button>

                <div className="bg-destructive/10 p-3 rounded-md">
                  <p className="text-sm font-medium text-destructive mb-1">Emergency Note:</p>
                  <p className="text-xs text-destructive/80">
                    Use this option during emergencies to quickly share your health files with hospitals.
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium">Emergency Contacts</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-destructive" />
                      <span>Emergency: 108</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>Family: +91 9876543211</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Government IDs</span>
                  <Badge variant="secondary">{files.filter((f) => f.type === "government").length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Medical Records</span>
                  <Badge variant="secondary">{files.filter((f) => f.type === "medical").length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Files</span>
                  <Badge variant="secondary">{files.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Last Updated</span>
                  <span className="text-xs text-muted-foreground">Today</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
