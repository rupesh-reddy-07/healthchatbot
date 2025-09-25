"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  language?: string
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handleTextToSpeech = () => {
    if ("speechSynthesis" in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel()
        setIsPlaying(false)
        return
      }

      const utterance = new SpeechSynthesisUtterance(message.content)
      utterance.rate = 0.7 // Slower rate for better comprehension
      utterance.pitch = 1.1 // Slightly higher pitch for clarity
      utterance.volume = 0.9 // Ensure good volume

      // Set language based on message language
      if (message.language === "hi") {
        utterance.lang = "hi-IN"
      } else if (message.language === "te") {
        utterance.lang = "te-IN"
      } else {
        utterance.lang = "en-US"
      }

      utterance.onstart = () => setIsPlaying(true)
      utterance.onend = () => setIsPlaying(false)
      utterance.onerror = () => setIsPlaying(false)

      window.speechSynthesis.speak(utterance)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className={cn("flex gap-3", message.sender === "user" ? "justify-end" : "justify-start")}>
      <div className={cn("max-w-[80%] sm:max-w-[70%]", message.sender === "user" ? "order-2" : "order-1")}>
        <Card
          className={cn(
            "p-4 shadow-sm",
            message.sender === "user"
              ? "bg-primary text-primary-foreground ml-auto"
              : "bg-card border-2 border-border/50",
          )}
        >
          <div className="space-y-2">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
            <div className="flex items-center justify-between gap-2">
              <span
                className={cn(
                  "text-xs opacity-70",
                  message.sender === "user" ? "text-primary-foreground" : "text-muted-foreground",
                )}
              >
                {formatTime(message.timestamp)}
              </span>
              {message.sender === "bot" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleTextToSpeech}
                  className={cn(
                    "h-8 w-8 p-0 hover:bg-primary/10 transition-colors",
                    isPlaying && "bg-primary/20 text-primary",
                  )}
                  title={isPlaying ? "Stop reading aloud" : "Read this message aloud"}
                >
                  {isPlaying ? <VolumeX className="h-4 w-4 animate-pulse" /> : <Volume2 className="h-4 w-4" />}
                  <span className="sr-only">{isPlaying ? "Stop reading" : "Read aloud"}</span>
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
