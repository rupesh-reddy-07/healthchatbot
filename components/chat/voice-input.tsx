"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Mic, Square } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SpeechRecognition } from "types/web"

interface VoiceInputProps {
  onTranscript: (transcript: string) => void
}

export function VoiceInput({ onTranscript }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(true)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setIsSupported(false)
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = "en-US" // This could be dynamic based on selected language

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      onTranscript(transcript)
      setIsListening(false)
    }

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  if (!isSupported) {
    return null
  }

  return (
    <Button
      variant={isListening ? "destructive" : "outline"}
      size="lg"
      onClick={isListening ? stopListening : startListening}
      className={cn(
        "px-4 transition-all duration-200",
        isListening && "animate-pulse bg-destructive hover:bg-destructive/90",
      )}
    >
      {isListening ? (
        <>
          <Square className="h-4 w-4 mr-2" />
          Stop
        </>
      ) : (
        <>
          <Mic className="h-4 w-4 mr-2" />
          Voice
        </>
      )}
    </Button>
  )
}
