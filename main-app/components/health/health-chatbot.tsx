"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Mic, RotateCcw, Heart } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  role: "user" | "bot"
  content: string
  timestamp: Date
}

export function HealthChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "bot",
      content: `Hello! I'm HealthBot, your health information assistant. I can help you with:

- Common health questions
- Symptom guidance (non-emergency)
- Vaccination schedules
- Disease prevention tips
- Clinic recommendations
- Health tips

⚠️ Important: I provide general health information only. For emergencies, call 117. For medical advice, please consult a healthcare professional.

How can I help you today?`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const quickActions = [
    "Find nearest clinic",
    "Vaccination schedule",
    "Malaria prevention",
    "COVID-19 info",
    "Child health",
    "Maternal health",
  ]

  const handleSend = (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(messageText.toLowerCase())
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: botResponse,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const generateBotResponse = (query: string): string => {
    if (query.includes("malaria")) {
      return `Common malaria symptoms include:
- High fever and sweating
- Chills and headache
- Nausea and vomiting
- Muscle pain and fatigue
- Diarrhea

If you experience these symptoms:
1. Visit a clinic immediately for testing
2. Don't self-medicate
3. Stay hydrated

📍 Would you like me to find malaria treatment centers near you?`
    }

    if (query.includes("vaccination") || query.includes("vaccine")) {
      return `Sierra Leone's vaccination schedule for children:

🔹 At Birth: BCG, Polio 0, Hep B
🔹 6 Weeks: Penta 1, Polio 1, PCV 1, Rota 1
🔹 10 Weeks: Penta 2, Polio 2, PCV 2, Rota 2
🔹 14 Weeks: Penta 3, Polio 3, PCV 3
🔹 9 Months: Measles, Yellow Fever

All vaccinations are free at government health centers.

📍 Would you like to find vaccination centers near you?`
    }

    if (query.includes("clinic") || query.includes("hospital") || query.includes("near")) {
      return `I can help you find clinics! To give you the best results, I need to know:

1. What type of clinic are you looking for?
   - Hospital
   - Health Center
   - Pharmacy
   - Laboratory

2. What district are you in?

You can also use the "Find a Clinic" tab to search with filters.`
    }

    if (query.includes("fever") || query.includes("headache") || query.includes("sick")) {
      return `I understand you're not feeling well. Common causes of fever and headache include:

- Malaria (very common in Sierra Leone)
- Flu or cold
- Typhoid
- Dehydration

⚠️ Important: Please visit a clinic for proper diagnosis. Don't self-medicate.

Would you like me to help you find the nearest clinic?`
    }

    if (query.includes("covid") || query.includes("corona")) {
      return `COVID-19 Information:

🔸 Symptoms: Fever, cough, difficulty breathing, loss of taste/smell
🔸 Prevention:
   - Wear masks in crowded places
   - Wash hands frequently
   - Get vaccinated (free at health centers)
   - Maintain physical distance when possible

🔸 Testing & Treatment:
   - Free testing available at major health centers
   - Call 117 if symptoms are severe

Would you like information about vaccination centers?`
    }

    if (query.includes("child") || query.includes("baby") || query.includes("infant")) {
      return `Child Healthcare Tips:

👶 Newborn Care:
   - Exclusive breastfeeding for first 6 months
   - Keep baby warm
   - Umbilical cord care
   - Regular clinic visits

💉 Vaccinations:
   - Follow the vaccination schedule strictly
   - Free at all government health centers

🏥 When to seek urgent care:
   - High fever (above 38°C)
   - Difficulty breathing
   - Not feeding well
   - Unusual drowsiness

Would you like to know more about any specific topic?`
    }

    if (query.includes("pregnant") || query.includes("pregnancy") || query.includes("maternal")) {
      return `Maternal Health Information:

🤰 Antenatal Care:
   - Register at a health facility early
   - Attend all scheduled appointments
   - Take prescribed supplements (iron, folic acid)
   - Get tested for HIV, malaria, and other conditions

⚠️ Danger Signs During Pregnancy:
   - Severe bleeding
   - Severe headache with blurred vision
   - Severe abdominal pain
   - Reduced baby movements
   → Seek immediate medical care!

🏥 Delivery:
   - Deliver at a health facility with skilled attendant
   - Prepare birth plan and emergency transport

📍 Would you like to find maternity services near you?`
    }

    return `Thank you for your question. I can provide information on:

- Common health conditions
- Vaccination schedules
- Finding clinics and health services
- General health tips
- Disease prevention

For specific medical advice, please consult a healthcare professional.

Could you please be more specific about what health information you need?`
  }

  const handleClearChat = () => {
    setMessages([
      {
        id: "1",
        role: "bot",
        content: `Hello! I'm HealthBot, your health information assistant. I can help you with:

- Common health questions
- Symptom guidance (non-emergency)
- Vaccination schedules
- Disease prevention tips
- Clinic recommendations
- Health tips

⚠️ Important: I provide general health information only. For emergencies, call 117. For medical advice, please consult a healthcare professional.

How can I help you today?`,
        timestamp: new Date(),
      },
    ])
  }

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-[#1EB53A] text-2xl text-white">
              <Heart className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">HealthBot SL</h2>
            <p className="text-sm text-muted-foreground">Your trusted health information assistant</p>
          </div>
        </div>
      </Card>

      <Card className="flex h-[600px] flex-col">
        {/* Messages */}
        <ScrollArea className="flex-1 p-6" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "bot" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-[#1EB53A] text-white">
                      <Heart className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === "user" ? "bg-[#1EB53A] text-white" : "bg-muted"
                  }`}
                >
                  <p className="whitespace-pre-line text-sm">{message.content}</p>
                  <p className={`mt-2 text-xs ${message.role === "user" ? "text-white/70" : "text-muted-foreground"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                {message.role === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-[#0072C6] text-white">U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Quick Actions */}
        <div className="border-t p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <Badge
                key={action}
                variant="outline"
                className="cursor-pointer hover:bg-[#1EB53A] hover:text-white"
                onClick={() => handleSend(action)}
              >
                {action}
              </Badge>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Type your health question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button variant="outline" size="icon">
              <Mic className="h-4 w-4" />
            </Button>
            <Button onClick={() => handleSend()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={handleClearChat}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Clear Chat
            </Button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t bg-yellow-50 p-3">
          <p className="text-xs text-yellow-800">
            ⚠️ This chatbot provides general health information only and is not a substitute for professional medical
            advice, diagnosis, or treatment. In case of emergency, call 117.
          </p>
        </div>
      </Card>
    </div>
  )
}
