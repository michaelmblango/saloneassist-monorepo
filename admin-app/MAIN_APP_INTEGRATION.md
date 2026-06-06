# SaloneAssist Main App Integration Guide

## Quick Start: Add AI Chatbot to Your Main App

This guide shows you how to add the AI chatbot from your admin panel to your main SaloneAssist application.

---

## Option 1: Embedded Chat Widget (Recommended - Easiest)

### Step 1: Add the iframe to any page

\`\`\`tsx
// app/chat/page.tsx or components/ChatWidget.tsx
export default function ChatPage() {
  return (
    <div className="h-screen w-full">
      <iframe
        src="https://v0-saloneassistadmin.vercel.app/embed/chat"
        className="w-full h-full border-0"
        title="SaloneAssist AI Chat"
      />
    </div>
  )
}
\`\`\`

### Step 2: Add a floating chat button (optional)

\`\`\`tsx
// components/FloatingChatButton.tsx
'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'

export default function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-[400px] h-[600px] bg-white rounded-lg shadow-2xl border border-gray-200">
          <iframe
            src="https://v0-saloneassistadmin.vercel.app/embed/chat"
            className="w-full h-full rounded-lg border-0"
            title="SaloneAssist AI Chat"
          />
        </div>
      )}
    </>
  )
}
\`\`\`

---

## Option 2: API Integration (For Custom Chat UI)

### Step 1: Create the chat API client

\`\`\`typescript
// lib/chatbot-api.ts
const CHATBOT_API_URL = 'https://v0-saloneassistadmin.vercel.app/api/public/chat'

export async function sendChatMessage(message: string, conversationId?: string) {
  const response = await fetch(CHATBOT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      conversationId: conversationId || `user-${Date.now()}`,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to send message')
  }

  return response.json()
}
\`\`\`

### Step 2: Create your custom chat component

\`\`\`tsx
// components/CustomChatbot.tsx
'use client'

import { useState } from 'react'
import { Send, Bot, User } from 'lucide-react'
import { sendChatMessage } from '@/lib/chatbot-api'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function CustomChatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [conversationId] = useState(`user-${Date.now()}`)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await sendChatMessage(input, conversationId)
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen max-h-[600px] bg-gray-50 rounded-lg shadow-lg">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h2 className="text-lg font-semibold">SaloneAssist AI</h2>
        <p className="text-sm text-blue-100">Ask me anything about Sierra Leone</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <Bot className="h-12 w-12 mx-auto mb-2 text-gray-400" />
            <p>Start a conversation with SaloneAssist AI</p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex items-start gap-2 max-w-[85%] ${
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === 'user' ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="h-4 w-4 text-white" />
                ) : (
                  <Bot className="h-4 w-4 text-gray-700" />
                )}
              </div>
              <div
                className={`rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <Bot className="h-4 w-4 text-gray-700" />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4 bg-white rounded-b-lg">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
\`\`\`

### Step 3: Use the chat component

\`\`\`tsx
// app/chat/page.tsx
import CustomChatbot from '@/components/CustomChatbot'

export default function ChatPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Chat with SaloneAssist AI</h1>
      <CustomChatbot />
    </div>
  )
}
\`\`\`

---

## Option 3: Direct React Component (Copy-Paste Ready)

If you want the exact same chat UI from the admin panel in your main app, copy this complete component:

\`\`\`tsx
// components/SaloneAssistChat.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, Bot, User, ArrowLeft } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function SaloneAssistChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [conversationId] = useState(`user-${Date.now()}`)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('https://v0-saloneassistadmin.vercel.app/api/public/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          conversationId,
        }),
      })

      if (!response.ok) throw new Error('Failed to send message')

      const data = await response.json()
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error('Error:', error)
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen max-h-[100dvh] bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b bg-card">
        <button
          onClick={() => window.history.back()}
          className="lg:hidden p-2 hover:bg-accent rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Bot className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-semibold text-base sm:text-lg">SaloneAssist AI</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Your digital assistant for Sierra Leone
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 sm:pb-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Bot className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Welcome to SaloneAssist AI</h2>
            <p className="text-muted-foreground max-w-md">
              Ask me anything about government services, jobs, health information, or business
              verification in Sierra Leone.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div
              className={`flex items-start gap-2 sm:gap-3 max-w-[85%] sm:max-w-[75%] ${
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
              <div
                className={`rounded-2xl px-4 py-2.5 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm sm:text-base whitespace-pre-wrap break-words">
                  {message.content}
                </p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-muted rounded-2xl px-4 py-2.5">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="fixed bottom-0 left-0 right-0 lg:relative border-t bg-card p-4 safe-bottom">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 text-sm sm:text-base border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-primary text-primary-foreground px-4 sm:px-6 py-3 rounded-2xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
\`\`\`

---

## No Environment Variables Required for Main App!

Your main app doesn't need any environment variables to use the chatbot. Everything is handled by the admin panel at `https://v0-saloneassistadmin.vercel.app`.

---

## Testing Your Integration

1. **Test the API directly:**
   \`\`\`bash
   curl -X POST https://v0-saloneassistadmin.vercel.app/api/public/chat \
     -H "Content-Type: application/json" \
     -d '{
       "message": "Hello, what can you help me with?",
       "conversationId": "test-123"
     }'
   \`\`\`

2. **Test the embedded widget:**
   - Visit: `https://v0-saloneassistadmin.vercel.app/embed/chat`
   - Try sending messages

3. **Monitor conversations:**
   - Go to your admin panel: `https://v0-saloneassistadmin.vercel.app/dashboard/chatbot/conversations`
   - All conversations from the main app will appear here

---

## Quick Integration Checklist

- [ ] Copy one of the three options above into your main app
- [ ] Test the chatbot functionality
- [ ] Customize colors/styles to match your brand (optional)
- [ ] Deploy your main app
- [ ] Monitor conversations in the admin panel

---

## Support & Monitoring

All chatbot interactions are logged in your admin panel:
- **URL:** https://v0-saloneassistadmin.vercel.app/dashboard/chatbot
- **Conversations:** View all chat history
- **Analytics:** Track usage and performance
- **Training:** Add Q&A pairs to improve responses
- **WhatsApp:** Monitor WhatsApp integration status

---

## What's Already Working

✅ **AI Chatbot:** Powered by NVIDIA AI (Llama 3.1 70B)  
✅ **Admin Panel:** Full management at v0-saloneassistadmin.vercel.app  
✅ **Public API:** Ready to accept requests from your main app  
✅ **WhatsApp Integration:** Configured and ready (waiting on Meta verification)  
✅ **Training System:** Add custom Q&A pairs  
✅ **Conversation Logging:** All chats are saved and searchable  

---

**That's it! Choose any option above and paste it into your main SaloneAssist app. The chatbot will work immediately.**
