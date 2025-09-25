"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { EnhancedChatMessage } from "@/components/chat/enhanced-chat-message"
import { VoiceInput } from "@/components/chat/voice-input"
import { QuickActions } from "@/components/chat/quick-actions"
import { LocationSelector } from "@/components/chat/location-selector"
import { LanguageSelector } from "@/components/chat/language-selector"
import { FileUpload } from "@/components/chat/file-upload"
import { Send, Paperclip, Brain, Shield } from "lucide-react"

interface ChatSource {
  title: string
  category: string
  tags: string[]
}

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: string
  language?: string
  isEmergency?: boolean
  sources?: ChatSource[]
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI-powered health assistant with access to verified medical knowledge. I can help you with health questions, vaccination schedules, and medical information using the latest medical research. Click the speaker icon 🔊 next to my messages to hear them read aloud. How can I help you today?",
      sender: "bot",
      timestamp: new Date().toISOString(),
      sources: [
        {
          title: "WHO Health Guidelines",
          category: "prevention",
          tags: ["health", "guidelines", "WHO"],
        },
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [isSpeaking, setIsSpeaking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSpeak = (text: string, language: string) => {
    if ("speechSynthesis" in window) {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel()
      }
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)

      const languageMap: { [key: string]: string } = {
        en: "en-US",
        hi: "hi-IN",
        te: "te-IN",
        ta: "ta-IN", // Tamil (India)
        or: "or-IN", // Odia (India)
        kn: "kn-IN", // Kannada (India)
      }

      utterance.lang = languageMap[language] || "en-US"
      utterance.rate = 0.8
      utterance.pitch = 1.0
      utterance.volume = 1.0

      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      speechSynthesis.speak(utterance)
    }
  }

  const handleStopSpeak = () => {
    if ("speechSynthesis" in window && speechSynthesis.speaking) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date().toISOString(),
      language: selectedLanguage,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content.trim(),
          language: selectedLanguage,
          location: selectedLocation,
          userContext: {},
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        sender: "bot",
        timestamp: data.timestamp,
        language: selectedLanguage,
        isEmergency: data.isEmergency,
        sources: data.sources || [],
      }

      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm sorry, I'm having trouble connecting right now. Please try again later, or visit your nearest health center if you need immediate assistance.",
        sender: "bot",
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleVoiceInput = (transcript: string) => {
    setInputValue(transcript)
  }

  const handleQuickAction = (action: string) => {
    handleSendMessage(action)
  }

  const handleFileUpload = (file: File) => {
    const fileMessage: Message = {
      id: Date.now().toString(),
      content: `Uploaded file: ${file.name}`,
      sender: "user",
      timestamp: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, fileMessage])

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I've received your file. Let me analyze it and provide relevant health information.",
        sender: "bot",
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  return (
    <div className="min-h-screen health-gradient">
      <Navigation />

      <div className="container max-w-5xl mx-auto px-4 py-8">
        <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Brain className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-bold text-balance bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      AI Health Assistant
                    </CardTitle>
                    <p className="text-lg text-muted-foreground mt-1">Your trusted medical knowledge companion</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
                    <Shield className="h-4 w-4 mr-2" />
                    Verified Medical Sources
                  </Badge>
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 px-3 py-1">
                    <Brain className="h-4 w-4 mr-2" />
                    AI-Powered RAG System
                  </Badge>
                </div>

                <p className="text-foreground/80 leading-relaxed max-w-2xl">
                  Get accurate health information backed by verified medical research.
                  <span className="font-semibold text-primary ml-1">
                    Click the speaker icon 🔊 to hear responses in your preferred language.
                  </span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <LanguageSelector value={selectedLanguage} onChange={setSelectedLanguage} />
                <LocationSelector value={selectedLocation} onChange={setSelectedLocation} />
              </div>
            </div>
          </CardHeader>
        </Card>

        <QuickActions onActionClick={handleSendMessage} />

        <Card className="mb-6 border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="h-[600px] overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-white/50 to-muted/30">
              {messages.map((message) => (
                <EnhancedChatMessage
                  key={message.id}
                  message={message.content}
                  isBot={message.sender === "bot"}
                  timestamp={message.timestamp}
                  language={selectedLanguage as "en" | "hi" | "te" | "ta" | "or" | "kn"}
                  isEmergency={message.isEmergency}
                  sources={message.sources}
                  onSpeak={handleSpeak}
                  isSpeaking={isSpeaking}
                  onStopSpeak={handleStopSpeak}
                />
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/90 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 max-w-sm shadow-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Brain className="h-5 w-5 text-primary animate-pulse" />
                      </div>
                      <span className="text-sm font-medium text-foreground">Analyzing medical knowledge...</span>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me anything about your health..."
                    className="pr-14 text-base py-4 h-14 border-2 border-border/50 focus:border-primary/50 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage(inputValue)
                      }
                    }}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <FileUpload onFileUpload={(file) => console.log("File uploaded:", file)}>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10">
                        <Paperclip className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">Attach file</span>
                      </Button>
                    </FileUpload>
                  </div>
                </div>
                <VoiceInput onTranscript={setInputValue} />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isLoading}
                  size="lg"
                  className="px-8 h-14 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl"
                >
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>

              <div className="text-sm text-muted-foreground text-center space-y-2">
                <p>
                  This AI assistant uses verified medical sources and provides general health information.
                  <span className="font-semibold text-destructive ml-1">
                    Always consult healthcare professionals for medical advice.
                  </span>
                </p>
                <p className="text-primary font-medium">
                  💡 Pro tip: Use the speaker button (🔊) to hear responses in your selected language
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
