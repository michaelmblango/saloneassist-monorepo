"use client"

import { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"
import { ChatInterface } from "@/components/chatbot/chat-interface"

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleClose = () => setIsOpen(false)
    window.addEventListener("closeChatInterface", handleClose)
    return () => window.removeEventListener("closeChatInterface", handleClose)
  }, [])

  return (
    <>
      {isOpen && <ChatInterface serviceContext="general" embedded={false} />}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-r from-[#1EB53A] to-[#0072C6] shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
          aria-label="Open AI chat assistant"
        >
          <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 text-white group-hover:animate-pulse" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold animate-pulse">
            AI
          </span>
        </button>
      )}
    </>
  )
}
