"use client"

import { useChat } from "ai/react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function ChatBox() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({ api: "/api/chat" })

  return (
    <Card className="w-full max-w-md h-[600px] flex flex-col">
      <CardHeader className="border-b">
        <CardTitle className="text-center">Health Chatbot</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-4">
        <ScrollArea className="h-full pr-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex mb-4 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "assistant" && (
                <Avatar className="mr-2">
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                <p className="text-sm">{m.content}</p>
              </div>
              {m.role === "user" && (
                <Avatar className="ml-2">
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Input placeholder="Type your message..." value={input} onChange={handleInputChange} className="flex-1" />
          <Button type="submit">Send</Button>
        </form>
      </CardFooter>
    </Card>
  )
}
