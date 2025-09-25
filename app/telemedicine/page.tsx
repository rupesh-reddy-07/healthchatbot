import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ConsultationBooking } from "@/components/telemedicine/consultation-booking"
import { LabReportAnalyzer } from "@/components/telemedicine/lab-report-analyzer"

export default function TelemedicinePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="consultation" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="consultation">Doctor Consultation</TabsTrigger>
          <TabsTrigger value="lab-analysis">Lab Report Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="consultation">
          <ConsultationBooking />
        </TabsContent>

        <TabsContent value="lab-analysis">
          <LabReportAnalyzer />
        </TabsContent>
      </Tabs>
    </div>
  )
}
