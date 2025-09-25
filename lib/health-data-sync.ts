// Real-time health data synchronization with government databases
export interface HealthAlert {
  id: string
  title: string
  description: string
  severity: "low" | "medium" | "high" | "critical"
  category: "outbreak" | "vaccination" | "advisory" | "emergency"
  location: {
    state?: string
    district?: string
    pincode?: string
    coordinates?: { lat: number; lng: number }
  }
  dateIssued: string
  dateExpires?: string
  source: string
  language: "en" | "hi" | "te"
  isActive: boolean
}

export interface VaccinationData {
  id: string
  vaccineName: string
  ageGroup: string
  schedule: {
    dose: number
    ageInMonths?: number
    ageInYears?: number
    description: string
  }[]
  location: string
  availability: "available" | "limited" | "unavailable"
  lastUpdated: string
}

export interface HealthFacility {
  id: string
  name: string
  type: "hospital" | "clinic" | "phc" | "chc" | "pharmacy"
  address: string
  location: {
    state: string
    district: string
    pincode: string
    coordinates: { lat: number; lng: number }
  }
  contact: {
    phone?: string
    email?: string
  }
  services: string[]
  operatingHours: string
  isActive: boolean
  lastVerified: string
}

// Mock government health data APIs
export class HealthDataSyncService {
  private alerts: HealthAlert[] = []
  private vaccinationData: VaccinationData[] = []
  private healthFacilities: HealthFacility[] = []
  private lastSyncTime: string = new Date().toISOString()

  constructor() {
    this.initializeMockData()
  }

  private initializeMockData() {
    // Mock health alerts
    this.alerts = [
      {
        id: "alert-001",
        title: "Dengue Outbreak Alert",
        description:
          "Increased dengue cases reported in urban areas. Take preventive measures against mosquito breeding.",
        severity: "high",
        category: "outbreak",
        location: {
          state: "Telangana",
          district: "Hyderabad",
        },
        dateIssued: new Date().toISOString(),
        dateExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        source: "State Health Department",
        language: "en",
        isActive: true,
      },
      {
        id: "alert-002",
        title: "COVID-19 Booster Campaign",
        description:
          "Free COVID-19 booster shots available for adults above 60 years at all government health centers.",
        severity: "medium",
        category: "vaccination",
        location: {
          state: "Andhra Pradesh",
        },
        dateIssued: new Date().toISOString(),
        source: "Ministry of Health",
        language: "en",
        isActive: true,
      },
    ]

    // Mock vaccination data
    this.vaccinationData = [
      {
        id: "vaccine-001",
        vaccineName: "COVID-19 Vaccine",
        ageGroup: "18+ years",
        schedule: [
          { dose: 1, description: "First dose" },
          { dose: 2, description: "Second dose (4-12 weeks after first)" },
          { dose: 3, description: "Booster dose (6 months after second)" },
        ],
        location: "All districts",
        availability: "available",
        lastUpdated: new Date().toISOString(),
      },
      {
        id: "vaccine-002",
        vaccineName: "DPT Vaccine",
        ageGroup: "Children",
        schedule: [
          { dose: 1, ageInMonths: 6, description: "First dose at 6 weeks" },
          { dose: 2, ageInMonths: 10, description: "Second dose at 10 weeks" },
          { dose: 3, ageInMonths: 14, description: "Third dose at 14 weeks" },
        ],
        location: "All PHCs and CHCs",
        availability: "available",
        lastUpdated: new Date().toISOString(),
      },
    ]

    // Mock health facilities
    this.healthFacilities = [
      {
        id: "facility-001",
        name: "Government General Hospital",
        type: "hospital",
        address: "Tank Bund Road, Hyderabad, Telangana 500001",
        location: {
          state: "Telangana",
          district: "Hyderabad",
          pincode: "500001",
          coordinates: { lat: 17.4065, lng: 78.4772 },
        },
        contact: {
          phone: "+91-40-2461-1111",
          email: "ggh.hyderabad@gov.in",
        },
        services: ["Emergency", "General Medicine", "Surgery", "Pediatrics", "Gynecology"],
        operatingHours: "24/7",
        isActive: true,
        lastVerified: new Date().toISOString(),
      },
      {
        id: "facility-002",
        name: "Primary Health Center - Secunderabad",
        type: "phc",
        address: "SP Road, Secunderabad, Telangana 500003",
        location: {
          state: "Telangana",
          district: "Hyderabad",
          pincode: "500003",
          coordinates: { lat: 17.4399, lng: 78.4983 },
        },
        contact: {
          phone: "+91-40-2784-5555",
        },
        services: ["General Medicine", "Vaccination", "Maternal Health", "Child Health"],
        operatingHours: "9:00 AM - 5:00 PM",
        isActive: true,
        lastVerified: new Date().toISOString(),
      },
    ]
  }

  // Simulate real-time data sync with government APIs
  async syncHealthAlerts(): Promise<HealthAlert[]> {
    try {
      // In production, this would call actual government APIs
      // For now, simulate API call with mock data
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Add some dynamic alerts based on current conditions
      const dynamicAlert: HealthAlert = {
        id: `alert-${Date.now()}`,
        title: "Seasonal Health Advisory",
        description: "Monsoon season approaching. Take precautions against water-borne diseases.",
        severity: "medium",
        category: "advisory",
        location: {
          state: "All States",
        },
        dateIssued: new Date().toISOString(),
        source: "Central Health Ministry",
        language: "en",
        isActive: true,
      }

      this.alerts.push(dynamicAlert)
      this.lastSyncTime = new Date().toISOString()

      return this.alerts.filter((alert) => alert.isActive)
    } catch (error) {
      console.error("Error syncing health alerts:", error)
      return this.alerts
    }
  }

  async syncVaccinationData(): Promise<VaccinationData[]> {
    try {
      // Simulate API call to vaccination database
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Update availability based on mock conditions
      this.vaccinationData.forEach((vaccine) => {
        vaccine.lastUpdated = new Date().toISOString()
        // Randomly update availability for demo
        if (Math.random() > 0.8) {
          vaccine.availability = "limited"
        }
      })

      return this.vaccinationData
    } catch (error) {
      console.error("Error syncing vaccination data:", error)
      return this.vaccinationData
    }
  }

  async syncHealthFacilities(): Promise<HealthFacility[]> {
    try {
      // Simulate API call to health facility database
      await new Promise((resolve) => setTimeout(resolve, 600))

      this.healthFacilities.forEach((facility) => {
        facility.lastVerified = new Date().toISOString()
      })

      return this.healthFacilities.filter((facility) => facility.isActive)
    } catch (error) {
      console.error("Error syncing health facilities:", error)
      return this.healthFacilities
    }
  }

  // Get alerts by location
  getAlertsByLocation(state?: string, district?: string): HealthAlert[] {
    return this.alerts.filter((alert) => {
      if (!alert.isActive) return false
      if (state && alert.location.state && alert.location.state !== state) return false
      if (district && alert.location.district && alert.location.district !== district) return false
      return true
    })
  }

  // Get nearby health facilities
  getNearbyFacilities(coordinates: { lat: number; lng: number }, radiusKm = 10): HealthFacility[] {
    return this.healthFacilities.filter((facility) => {
      if (!facility.isActive) return false
      const distance = this.calculateDistance(coordinates, facility.location.coordinates)
      return distance <= radiusKm
    })
  }

  private calculateDistance(point1: { lat: number; lng: number }, point2: { lat: number; lng: number }): number {
    const R = 6371 // Earth's radius in kilometers
    const dLat = this.toRadians(point2.lat - point1.lat)
    const dLng = this.toRadians(point2.lng - point1.lng)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(point1.lat)) *
        Math.cos(this.toRadians(point2.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180)
  }

  getLastSyncTime(): string {
    return this.lastSyncTime
  }
}

// Global instance
export const healthDataSync = new HealthDataSyncService()
