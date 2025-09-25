"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, Clock, Video, Phone, MessageSquare, Star, MapPin } from "lucide-react"
import { format } from "date-fns"

interface Doctor {
  id: string
  name: string
  specialty: string
  experience: number
  rating: number
  consultationFee: number
  languages: string[]
  availability: string[]
  image: string
  location: string
}

interface Appointment {
  id: string
  doctorId: string
  date: Date
  time: string
  type: "video" | "phone" | "chat"
  status: "scheduled" | "completed" | "cancelled"
  symptoms: string
  notes?: string
}

const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "General Medicine",
    experience: 8,
    rating: 4.8,
    consultationFee: 500,
    languages: ["English", "Hindi"],
    availability: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"],
    image: "/female-doctor.png",
    location: "City Hospital, Mumbai",
  },
  {
    id: "2",
    name: "Dr. Rajesh Patel",
    specialty: "Cardiology",
    experience: 12,
    rating: 4.9,
    consultationFee: 800,
    languages: ["English", "Hindi", "Gujarati"],
    availability: ["10:00 AM", "1:00 PM", "3:00 PM"],
    image: "/male-cardiologist.jpg",
    location: "Heart Care Center, Delhi",
  },
  {
    id: "3",
    name: "Dr. Priya Sharma",
    specialty: "Pediatrics",
    experience: 6,
    rating: 4.7,
    consultationFee: 600,
    languages: ["English", "Hindi", "Punjabi"],
    availability: ["9:30 AM", "11:30 AM", "2:30 PM", "4:30 PM"],
    image: "/female-pediatrician.png",
    location: "Children's Hospital, Bangalore",
  },
]

export function ConsultationBooking() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [consultationType, setConsultationType] = useState<"video" | "phone" | "chat">("video")
  const [symptoms, setSymptoms] = useState("")
  const [patientName, setPatientName] = useState("")
  const [patientAge, setPatientAge] = useState("")
  const [patientPhone, setPatientPhone] = useState("")
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>([])

  const handleBookAppointment = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime || !patientName || !symptoms) {
      return
    }

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      doctorId: selectedDoctor.id,
      date: selectedDate,
      time: selectedTime,
      type: consultationType,
      status: "scheduled",
      symptoms,
      notes: `Patient: ${patientName}, Age: ${patientAge}, Phone: ${patientPhone}`,
    }

    setAppointments([...appointments, newAppointment])
    setShowBookingForm(false)
    setSelectedDoctor(null)
    setSelectedDate(undefined)
    setSelectedTime("")
    setSymptoms("")
    setPatientName("")
    setPatientAge("")
    setPatientPhone("")
  }

  const getConsultationIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "phone":
        return <Phone className="h-4 w-4" />
      case "chat":
        return <MessageSquare className="h-4 w-4" />
      default:
        return <Video className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Telemedicine Consultation</h2>
        <p className="text-muted-foreground">Book online consultations with qualified doctors</p>
      </div>

      {!showBookingForm ? (
        <div className="space-y-6">
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Available Doctors</h3>
            {doctors.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
                      <AvatarFallback>
                        {doctor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-lg font-semibold">{doctor.name}</h4>
                          <p className="text-primary font-medium">{doctor.specialty}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{doctor.location}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{doctor.rating}</span>
                          </div>
                          <p className="text-lg font-bold text-primary">₹{doctor.consultationFee}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-3">
                        <Badge variant="secondary">{doctor.experience} years exp</Badge>
                        <div className="flex gap-1">
                          {doctor.languages.map((lang) => (
                            <Badge key={lang} variant="outline" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex gap-2">
                          {doctor.availability.slice(0, 3).map((time) => (
                            <Badge key={time} variant="outline" className="text-xs">
                              {time}
                            </Badge>
                          ))}
                          {doctor.availability.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{doctor.availability.length - 3} more
                            </Badge>
                          )}
                        </div>
                        <Button
                          onClick={() => {
                            setSelectedDoctor(doctor)
                            setShowBookingForm(true)
                          }}
                        >
                          Book Consultation
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {appointments.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Your Appointments</h3>
              {appointments.map((appointment) => {
                const doctor = doctors.find((d) => d.id === appointment.doctorId)
                return (
                  <Card key={appointment.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={doctor?.image || "/placeholder.svg"} alt={doctor?.name} />
                            <AvatarFallback>
                              {doctor?.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{doctor?.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {format(appointment.date, "MMM dd, yyyy")} at {appointment.time}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getConsultationIcon(appointment.type)}
                          <Badge variant={appointment.status === "scheduled" ? "default" : "secondary"}>
                            {appointment.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Book Consultation with {selectedDoctor?.name}</CardTitle>
            <CardDescription>Fill in the details to schedule your appointment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input
                    id="patientName"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter patient name"
                  />
                </div>

                <div>
                  <Label htmlFor="patientAge">Age</Label>
                  <Input
                    id="patientAge"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    placeholder="Enter age"
                  />
                </div>

                <div>
                  <Label htmlFor="patientPhone">Phone Number</Label>
                  <Input
                    id="patientPhone"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <Label>Consultation Type</Label>
                  <Select
                    value={consultationType}
                    onValueChange={(value: "video" | "phone" | "chat") => setConsultationType(value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video Call</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="chat">Chat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Select Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label>Available Time Slots</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {selectedDoctor?.availability.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className="flex items-center gap-2"
                      >
                        <Clock className="h-3 w-3" />
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="symptoms">Describe your symptoms or health concerns</Label>
              <Textarea
                id="symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Please describe your symptoms, concerns, or reason for consultation..."
                rows={4}
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <p className="text-lg font-semibold">Consultation Fee: ₹{selectedDoctor?.consultationFee}</p>
                <p className="text-sm text-muted-foreground">Payment will be processed after confirmation</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowBookingForm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleBookAppointment}>Book Appointment</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
