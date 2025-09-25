// Channel adapter utilities for multi-channel support
export interface ChannelMessage {
  id: string
  content: string
  from: string
  to: string
  channel: "web" | "whatsapp" | "sms" | "voice"
  language: "en" | "hi" | "te" | "ta" | "or" | "kn"
  timestamp: string
  metadata?: Record<string, any>
}

export interface ChannelResponse {
  content: string
  channel: "web" | "whatsapp" | "sms" | "voice"
  metadata?: Record<string, any>
}

// Format response for different channels
export function formatResponseForChannel(
  response: string,
  channel: "web" | "whatsapp" | "sms" | "voice",
  sources?: Array<{ title: string; category: string }>,
): ChannelResponse {
  switch (channel) {
    case "web":
      return {
        content: response,
        channel,
        metadata: { sources },
      }

    case "whatsapp":
      let whatsappResponse = response
      if (sources && sources.length > 0) {
        const sourceList = sources.slice(0, 3).map((s) => `• ${s.title}`)
        whatsappResponse += `\n\n📚 Sources:\n${sourceList.join("\n")}`
      }
      whatsappResponse += "\n\n💬 Reply to continue the conversation"
      return {
        content: whatsappResponse,
        channel,
      }

    case "sms":
      let smsResponse = response
      // Keep SMS responses under 1600 characters
      if (smsResponse.length > 1500) {
        smsResponse = smsResponse.substring(0, 1500) + "..."
      }
      if (sources && sources.length > 0) {
        smsResponse += `\n\n📚 ${sources.length} source(s) used`
      }
      return {
        content: smsResponse,
        channel,
      }

    case "voice":
      // Remove emojis and format for speech
      const voiceResponse = response
        .replace(/[📚💬🚨]/gu, "")
        .replace(/\n\n/g, ". ")
        .replace(/\n/g, ". ")
      return {
        content: voiceResponse,
        channel,
      }

    default:
      return {
        content: response,
        channel: "web",
      }
  }
}

// Session management for multi-channel conversations
export class ChannelSessionManager {
  private sessions = new Map<string, ChannelSession>()

  getSession(channelId: string, userId: string): ChannelSession {
    const sessionKey = `${channelId}:${userId}`
    if (!this.sessions.has(sessionKey)) {
      this.sessions.set(sessionKey, new ChannelSession(channelId, userId))
    }
    return this.sessions.get(sessionKey)!
  }

  cleanupExpiredSessions() {
    const now = Date.now()
    const expiredSessions = Array.from(this.sessions.entries()).filter(
      ([_, session]) => now - session.lastActivity > 30 * 60 * 1000, // 30 minutes
    )

    expiredSessions.forEach(([key]) => {
      this.sessions.delete(key)
    })
  }
}

class ChannelSession {
  public messages: ChannelMessage[] = []
  public lastActivity: number = Date.now()
  public userContext: {
    language?: "en" | "hi" | "te" | "ta" | "or" | "kn"
    location?: string
    preferences?: Record<string, any>
  } = {}

  constructor(
    public channelId: string,
    public userId: string,
  ) {}

  addMessage(message: ChannelMessage) {
    this.messages.push(message)
    this.lastActivity = Date.now()

    // Keep only last 10 messages to manage memory
    if (this.messages.length > 10) {
      this.messages = this.messages.slice(-10)
    }
  }

  updateContext(context: Partial<typeof this.userContext>) {
    this.userContext = { ...this.userContext, ...context }
    this.lastActivity = Date.now()
  }
}

// Global session manager instance
export const sessionManager = new ChannelSessionManager()

if (typeof window === "undefined" && typeof globalThis !== "undefined") {
  const g = globalThis as any
  if (!g.__channelSessionCleanupInterval) {
    g.__channelSessionCleanupInterval = setInterval(
      () => {
        sessionManager.cleanupExpiredSessions()
      },
      15 * 60 * 1000,
    )
  }
}
