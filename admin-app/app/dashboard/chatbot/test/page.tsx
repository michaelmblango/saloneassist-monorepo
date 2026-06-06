"use client"

import { useEffect, useState, useRef } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Bot, User, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function TestChatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [nvidiaConfigured, setNvidiaConfigured] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    setNvidiaConfigured(true)

    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hello! I'm your SaloneAssist AI. Ask me anything about jobs, government services, or Sierra Leone!",
        timestamp: new Date(),
      },
    ])
  }, [])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const response = await fetch("/api/chatbot/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })

      const data = await response.json()

      if (!response.ok) {
        let errorContent = "Sorry, I encountered an error. Please try again."

        if (data.type === "quota_exceeded") {
          errorContent = `API quota exceeded. The service is temporarily unavailable. Please try again in ${data.retryAfter || "a few minutes"}. Consider upgrading your NVIDIA API plan for higher limits.`
        } else if (data.error) {
          errorContent = `Error: ${data.error}`
        }

        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: errorContent,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, errorMessage])
        setLoading(false)
        return
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || "I'm still learning. Please add more training data to help me answer better!",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered a network error. Please check your connection and try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        <Link href="/dashboard/chatbot">
          <Button variant="ghost" className="mb-4 -ml-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Chatbot
          </Button>
        </Link>

        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Test Chatbot</h1>
          <p className="text-sm sm:text-base text-gray-600">Test your AI assistant responses in real-time</p>
        </div>

        <Card className="flex flex-col h-[calc(100vh-280px)] sm:h-[600px]">
          <CardHeader className="border-b flex-shrink-0 py-3 sm:py-4">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Bot className="h-5 w-5 text-[#1EB53A]" />
              Chat Interface
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 sm:gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="bg-gradient-to-br from-[#1EB53A] to-[#0072CE] p-1.5 sm:p-2 rounded-full h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-lg p-2.5 sm:p-3 break-words ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-[#1EB53A] to-[#0072CE] text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                  </div>
                  {message.role === "user" && (
                    <div className="bg-gray-300 p-1.5 sm:p-2 rounded-full h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex gap-2 sm:gap-3 justify-start">
                  <div className="bg-gradient-to-br from-[#1EB53A] to-[#0072CE] p-1.5 sm:p-2 rounded-full h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t p-3 sm:p-4 bg-white flex-shrink-0">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                  placeholder="Type your message..."
                  disabled={loading}
                  className="flex-1 text-sm sm:text-base"
                />
                <Button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="bg-gradient-to-r from-[#1EB53A] to-[#0072CE] px-3 sm:px-4"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4 sm:mt-6">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">WhatsApp Testing Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
              <h4 className="font-semibold text-blue-900 mb-2">How to Test WhatsApp Integration</h4>
              <ol className="space-y-2 text-blue-800 list-decimal list-inside">
                <li>
                  Send a WhatsApp message to your business number: <strong>+[Your WhatsApp Number]</strong>
                </li>
                <li>
                  The webhook at{" "}
                  <code className="bg-blue-100 px-1 rounded text-xs">
                    https://v0-saloneassistadmin.vercel.app/api/webhook/whatsapp
                  </code>{" "}
                  will receive it
                </li>
                <li>Your AI (powered by NVIDIA) will process the message</li>
                <li>The response will be sent back automatically to the user</li>
                <li>
                  View all conversations in the <strong>Conversations</strong> page
                </li>
              </ol>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded">
              <h4 className="font-semibold text-amber-900 mb-2">No Test Number? Here's What to Do:</h4>
              <ul className="space-y-1 text-amber-800 list-disc list-inside text-sm">
                <li>Use your own phone number to send test messages</li>
                <li>Ask a friend to send a test message to your business number</li>
                <li>
                  Check webhook logs in the <strong>Conversations</strong> page to verify connectivity
                </li>
                <li>Meta provides a test number during development - check your Meta App dashboard</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
