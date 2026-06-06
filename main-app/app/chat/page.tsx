"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ChatInterface } from "@/components/chatbot/chat-interface"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function ChatPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold mb-2">Chat with Salone Assist AI</h1>
          <p className="text-muted-foreground">
            Get instant answers about government services, jobs, health information, business verification, and more.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <ChatInterface serviceContext="general" embedded={true} className="h-[calc(100vh-300px)] min-h-[500px]" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
