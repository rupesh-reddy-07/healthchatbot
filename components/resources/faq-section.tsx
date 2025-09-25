"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

const faqs: FAQ[] = [
  {
    id: "1",
    question: "How do I know if I need to see a doctor?",
    answer:
      "You should see a doctor if you have persistent symptoms like fever for more than 3 days, difficulty breathing, severe pain, or any symptoms that worry you. When in doubt, it's always better to consult a healthcare professional.",
    category: "General",
  },
  {
    id: "2",
    question: "What vaccinations does my child need?",
    answer:
      "Children need various vaccinations at different ages, including BCG, DPT, Polio, MMR, and others. Check our vaccination schedule page for a complete timeline. Always consult with your pediatrician for personalized advice.",
    category: "Vaccination",
  },
  {
    id: "3",
    question: "How can I prevent common diseases?",
    answer:
      "Basic prevention includes regular hand washing, maintaining good hygiene, eating nutritious food, getting adequate sleep, exercising regularly, and staying up-to-date with vaccinations. Avoid close contact with sick people when possible.",
    category: "Prevention",
  },
  {
    id: "4",
    question: "What should I do in a medical emergency?",
    answer:
      "In a medical emergency, call emergency services immediately (108 in India). For severe bleeding, apply pressure to the wound. For unconscious persons, check breathing and pulse. Don't move someone with suspected spinal injury unless absolutely necessary.",
    category: "Emergency",
  },
  {
    id: "5",
    question: "How do I find the nearest health center?",
    answer:
      "Use our contact directory to find nearby health centers, hospitals, and government offices. You can search by location or use your current location to find the closest facilities. We also provide contact information and directions.",
    category: "General",
  },
  {
    id: "6",
    question: "Are the health resources available in my language?",
    answer:
      "Yes, many of our resources are available in Telugu, Hindi, and English. Look for the language indicator on each resource. We're continuously working to add more multilingual content to serve our diverse community better.",
    category: "Resources",
  },
]

export function FAQSection() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqs.map((faq) => (
          <Collapsible key={faq.id} open={openItems.includes(faq.id)} onOpenChange={() => toggleItem(faq.id)}>
            <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-left bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
              <div className="flex-1">
                <h3 className="font-medium text-balance">{faq.question}</h3>
                <p className="text-sm text-muted-foreground mt-1">{faq.category}</p>
              </div>
              <ChevronDown
                className={cn("h-4 w-4 transition-transform", openItems.includes(faq.id) && "transform rotate-180")}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">{faq.answer}</p>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  )
}
