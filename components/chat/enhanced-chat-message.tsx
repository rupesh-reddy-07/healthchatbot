"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Volume2, VolumeX, ExternalLink, AlertTriangle, Shield, StopCircle } from "lucide-react"

interface ChatSource {
  title: string
  category: string
  tags: string[]
}

interface EnhancedChatMessageProps {
  message: string
  isBot: boolean
  timestamp: string
  language: "en" | "hi" | "te" | "ta" | "or" | "kn" // Added new languages
  isEmergency?: boolean
  sources?: ChatSource[]
  onSpeak?: (text: string, language: string) => void
  isSpeaking?: boolean
  onStopSpeak?: () => void // Added onStopSpeak prop
}

export function EnhancedChatMessage({
  message,
  isBot,
  timestamp,
  language,
  isEmergency = false,
  sources = [],
  onSpeak,
  isSpeaking = false,
  onStopSpeak, // Destructured onStopSpeak
}: EnhancedChatMessageProps) {
  const [showSources, setShowSources] = useState(false)

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-6`}>
      <div className={`max-w-[85%] ${isBot ? "mr-auto" : "ml-auto"}`}>
        <div
          className={`p-6 rounded-2xl ${
            isBot ? (isEmergency ? "chat-bubble-emergency" : "chat-bubble-bot") : "chat-bubble-user text-white"
          } transition-all duration-200 hover:shadow-lg`}
        >
          {isEmergency && (
            <div className="flex items-center gap-3 mb-4 p-3 bg-destructive/10 rounded-xl border border-destructive/20">
              <div className="p-2 bg-destructive/20 rounded-full">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <span className="text-sm font-bold text-destructive">Medical Emergency Alert</span>
                <p className="text-xs text-destructive/80 mt-1">Please seek immediate medical attention</p>
              </div>
            </div>
          )}

          <div className={`text-pretty leading-relaxed ${isBot ? "text-foreground" : "text-white"} text-base`}>
            {message}
          </div>

          {isBot && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
              <div className="flex items-center gap-3">
                {onSpeak && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSpeak(message, language)}
                    disabled={isSpeaking}
                    className="h-10 w-10 p-0 hover:bg-primary/10 rounded-full transition-all duration-200"
                  >
                    {isSpeaking ? (
                      <VolumeX className="h-5 w-5 text-primary animate-pulse" />
                    ) : (
                      <Volume2 className="h-5 w-5 text-primary" />
                    )}
                  </Button>
                )}
                {isSpeaking && onStopSpeak && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onStopSpeak}
                    className="h-10 w-10 p-0 hover:bg-destructive/10 rounded-full transition-all duration-200"
                  >
                    <StopCircle className="h-5 w-5 text-destructive" />
                    <span className="sr-only">Stop speaking</span>
                  </Button>
                )}

                {sources.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSources(!showSources)}
                    className="text-sm text-primary hover:text-primary/80 hover:bg-primary/10 px-3 py-2 rounded-full transition-all duration-200"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {sources.length} source{sources.length > 1 ? "s" : ""}
                  </Button>
                )}
              </div>

              <span className="text-xs text-muted-foreground font-medium">{formatTime(timestamp)}</span>
            </div>
          )}

          {showSources && sources.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border/30">
              <div className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Medical Sources:
              </div>
              <div className="space-y-3">
                {sources.map((source, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-xl border border-border/50">
                    <div className="font-medium text-foreground text-sm">{source.title}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                        {source.category}
                      </Badge>
                      <div className="flex gap-2">
                        {source.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-xs text-muted-foreground">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* User message timestamp */}
          {!isBot && (
            <div className="text-right mt-3 pt-3 border-t border-white/20">
              <span className="text-xs text-white/80 font-medium">{formatTime(timestamp)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
