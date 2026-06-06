"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Building2,
  GraduationCap,
  Briefcase,
  Shield,
  Send,
  Mic,
  Paperclip,
  ThumbsUp,
  ThumbsDown,
  Copy,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { aiResponses } from "@/lib/truth-engine-data"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
}

const capabilities = [
  {
    icon: Building2,
    title: "Government Services",
    subtitle: "Find government information",
    description: "Business registration, IDs, permits",
  },
  {
    icon: GraduationCap,
    title: "Career & Education",
    subtitle: "Get career guidance",
    description: "Courses, universities, scholarships",
  },
  {
    icon: Briefcase,
    title: "Jobs & Employment",
    subtitle: "Find jobs and build CVs",
    description: "Job search, CV tips, interview prep",
  },
  {
    icon: Shield,
    title: "Verify Information",
    subtitle: "Verify suspicious content",
    description: "Check messages, documents, announcements",
  },
]

const quickPrompts = [
  "How do I register a business?",
  "What courses can I study with my grades?",
  "Find jobs in my district",
  "Is this WhatsApp message legitimate?",
  "Where's the nearest health clinic?",
  "How do I apply for NIN?",
]

export function AIAssistantTab() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [userName, setUserName] = useState("User")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const name = localStorage.getItem("userName") || "User"
    setUserName(name)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = getAIResponse(content.trim())
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponse,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("business") && lowerQuery.includes("register")) {
      return aiResponses.businessRegistration
    } else if (lowerQuery.includes("aggregate") || lowerQuery.includes("study") || lowerQuery.includes("course")) {
      return aiResponses.careerGuidance
    } else if (lowerQuery.includes("job") || lowerQuery.includes("employment")) {
      return aiResponses.jobSearch
    } else if (lowerQuery.includes("verify") || lowerQuery.includes("scam") || lowerQuery.includes("legitimate")) {
      return aiResponses.verification
    } else if (lowerQuery.includes("nin") || lowerQuery.includes("national id")) {
      return aiResponses.ninApplication
    } else if (lowerQuery.includes("clinic") || lowerQuery.includes("hospital") || lowerQuery.includes("health")) {
      return aiResponses.healthServices
    } else {
      return aiResponses.default
    }
  }

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt)
  }

  return (
    <div className="space-y-6">
      {/* Welcome Screen */}
      {messages.length === 0 && (
        <div className="space-y-8">
          {/* Welcome Header */}
          <Card className="p-8 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#1EB53A]/10">
              <Shield className="h-10 w-10 text-[#1EB53A]" />
            </div>
            <h2 className="mb-2 text-2xl font-bold">Hello, {userName}!</h2>
            <p className="text-muted-foreground">I'm your AI assistant. I can help you with:</p>
          </Card>

          {/* Capability Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((capability, index) => (
              <Card key={index} className="p-6 transition-all hover:border-[#1EB53A] hover:shadow-md">
                <capability.icon className="mb-3 h-8 w-8 text-[#1EB53A]" />
                <h3 className="mb-1 font-semibold">{capability.title}</h3>
                <p className="mb-2 text-sm text-muted-foreground">{capability.subtitle}</p>
                <p className="text-xs text-muted-foreground">{capability.description}</p>
              </Card>
            ))}
          </div>

          {/* Quick Prompts */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Start Prompts</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {quickPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto justify-start whitespace-normal p-4 text-left hover:border-[#1EB53A] hover:bg-[#1EB53A]/5 bg-transparent"
                  onClick={() => handleQuickPrompt(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chat Interface */}
      {messages.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
          {/* Chat Area */}
          <Card className="flex flex-col">
            <ScrollArea ref={scrollRef} className="flex-1 p-6" style={{ maxHeight: "600px" }}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn("flex gap-3", message.type === "user" ? "justify-end" : "justify-start")}
                  >
                    {message.type === "ai" && (
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className="bg-[#1EB53A] text-white">
                          <Shield className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg p-4",
                        message.type === "user" ? "bg-[#1EB53A] text-white" : "bg-muted",
                      )}
                    >
                      <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                      {message.type === "ai" && (
                        <div className="mt-3 flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="h-8 text-xs">
                            <Copy className="mr-1 h-3 w-3" />
                            Copy
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 text-xs">
                            <ThumbsUp className="mr-1 h-3 w-3" />
                            Helpful
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 text-xs">
                            <ThumbsDown className="mr-1 h-3 w-3" />
                            Not helpful
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-[#1EB53A] text-white">
                        <Shield className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg bg-muted p-4">
                      <div className="flex gap-1">
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-foreground/40"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-foreground/40"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-foreground/40"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Mic className="h-4 w-4" />
                </Button>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="min-h-[44px] max-h-32 resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage(input)
                    }
                  }}
                />
                <Button
                  onClick={() => handleSendMessage(input)}
                  className="bg-[#1EB53A] hover:bg-[#1EB53A]/90"
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Press Enter to send, Shift+Enter for new line</p>
            </div>
          </Card>

          {/* Right Sidebar */}
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="mb-3 font-semibold">Context</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Topic:</span>
                  <span className="font-medium">General Inquiry</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Confidence:</span>
                  <span className="font-medium text-[#1EB53A]">95%</span>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="mb-3 font-semibold">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  Switch to Business Search
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  View Related Jobs
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  Find Nearby Clinic
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  Open Career Guidance
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="mb-3 font-semibold">Recent Conversations</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="h-auto w-full justify-start p-2 text-left text-sm">
                  Business registration help
                </Button>
                <Button variant="ghost" className="h-auto w-full justify-start p-2 text-left text-sm">
                  Career guidance inquiry
                </Button>
                <Button variant="ghost" className="h-auto w-full justify-start p-2 text-left text-sm">
                  Job search in Bo
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Message Input (always visible at bottom when no messages) */}
      {messages.length === 0 && (
        <Card className="p-4">
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Mic className="h-4 w-4" />
            </Button>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="min-h-[44px] max-h-32 resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage(input)
                }
              }}
            />
            <Button onClick={() => handleSendMessage(input)} className="bg-[#1EB53A] hover:bg-[#1EB53A]/90" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Press Enter to send, Shift+Enter for new line</p>
        </Card>
      )}
    </div>
  )
}
