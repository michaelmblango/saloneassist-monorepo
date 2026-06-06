"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User } from "lucide-react"

interface AICounselorProps {
  onClose: () => void
}

const SAMPLE_QUESTIONS = [
  "What courses can I study with a C5 in Math?",
  "What's the difference between Engineering and Technology?",
  "Which universities have the best Computer Science programs?",
  "How much does it cost to study Medicine?",
  "Can I change my course after first year?",
]

const SAMPLE_RESPONSES: Record<string, string> = {
  "What courses can I study with a C5 in Math?":
    "With a C5 in Mathematics, you have many options! You can pursue courses in Business Administration, Social Sciences, Education, Mass Communication, and some Technology programs. While pure sciences like Engineering or Computer Science typically require C6 or better, you still have excellent career paths available. Would you like me to recommend specific courses based on your other subjects?",
  "What's the difference between Engineering and Technology?":
    "Great question! Engineering programs are more theory-focused and involve advanced mathematics and scientific principles. They prepare you for design and innovation roles. Technology programs are more hands-on and practical, focusing on application and implementation. Engineering takes 5 years, Technology takes 4 years. Both lead to excellent careers!",
  "Which universities have the best Computer Science programs?":
    "For Computer Science in Sierra Leone, Fourah Bay College, University of Makeni, and Ernest Bai Koroma University have strong programs. Fourah Bay College is the oldest and most established, while EBKU has modern facilities. Consider factors like location, tuition (SLL 3-5M/year), and your aggregate score when choosing.",
  "How much does it cost to study Medicine?":
    "Medicine is one of the most expensive programs. At College of Medicine and Allied Health Sciences (COMAHS), expect SLL 8-12M per year. The program takes 6 years including internship. However, scholarships are available for excellent students. You'll need strong sciences (Biology, Chemistry, Physics) and an aggregate below 15.",
  "Can I change my course after first year?":
    "Yes, course changes are possible but have conditions. You typically need a minimum GPA (2.5-3.0), approval from both departments, and must meet entry requirements for the new course. Some credits may transfer if courses overlap. It's best to choose carefully initially, but you're not locked in forever. Talk to the registry if considering a change.",
}

export function AICounselor({ onClose }: AICounselorProps) {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content: "Hi! I'm your AI guidance counselor. Ask me anything about courses or careers in Sierra Leone!",
    },
  ])
  const [input, setInput] = useState("")

  const handleQuestionClick = (question: string) => {
    handleSend(question)
  }

  const handleSend = (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    setMessages((prev) => [...prev, { role: "user", content: messageText }])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      const response =
        SAMPLE_RESPONSES[messageText] ||
        "That's an interesting question! Based on your results and interests, I'd recommend exploring courses that align with your strong subjects. Would you like me to suggest specific universities or discuss entry requirements for particular programs?"
      setMessages((prev) => [...prev, { role: "assistant", content: response }])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-[#1EB53A]" />
            AI Guidance Counselor
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-[500px]">
          {/* Messages */}
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}>
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-[#1EB53A] text-white">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.role === "user" ? "bg-[#1EB53A] text-white" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  {message.role === "user" && (
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Sample Questions */}
          {messages.length === 1 && (
            <div className="my-4">
              <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_QUESTIONS.map((question) => (
                  <Button
                    key={question}
                    variant="outline"
                    size="sm"
                    className="text-xs bg-transparent"
                    onClick={() => handleQuestionClick(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="flex gap-2 pt-4 border-t">
            <Input
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button onClick={() => handleSend()} className="bg-[#1EB53A] hover:bg-[#1EB53A]/90">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
