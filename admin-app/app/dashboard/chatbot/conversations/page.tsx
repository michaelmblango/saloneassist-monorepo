"use client"

import { useEffect, useState, useRef } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, MessageSquare, Clock, User, Smartphone, Globe } from "lucide-react"

interface Conversation {
  id: string
  userId: string
  userName: string
  platform: "web" | "whatsapp"
  messages: Array<{
    role: "user" | "assistant"
    content: string
    timestamp: Date
  }>
  startedAt: Date
  lastMessageAt: Date
}

export default function Conversations() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectedConversation) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [selectedConversation])

  useEffect(() => {
    fetchConversations()
  }, [])

  const fetchConversations = async () => {
    setLoading(true)
    try {
      // TODO: Fetch from API
      // For now, load from localStorage or show empty state
      setConversations([])
    } catch (error) {
      console.error("Failed to fetch conversations:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.userId.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Conversation History</h1>
          <p className="text-sm sm:text-base text-gray-600">View and analyze all chatbot interactions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Card>
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600 flex items-center gap-2">
                <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                Total Conversations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{conversations.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600 flex items-center gap-2">
                <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
                Web Conversations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">
                {conversations.filter((c) => c.platform === "web").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600 flex items-center gap-2">
                <Smartphone className="h-3 w-3 sm:h-4 sm:w-4" />
                WhatsApp Conversations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">
                {conversations.filter((c) => c.platform === "whatsapp").length}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="flex flex-col h-[400px] sm:h-[500px] lg:h-[600px]">
              <CardHeader className="border-b flex-shrink-0 py-3 sm:py-4">
                <CardTitle className="text-base sm:text-lg">Conversations</CardTitle>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search conversations..."
                    className="pl-10 text-sm"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-0">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1EB53A]" />
                  </div>
                ) : filteredConversations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-4 sm:p-6 text-gray-500">
                    <MessageSquare className="h-10 w-10 sm:h-12 sm:w-12 mb-3 opacity-50" />
                    <p className="font-medium text-sm sm:text-base">No conversations yet</p>
                    <p className="text-xs sm:text-sm mt-1">Conversations will appear here once users start chatting</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {filteredConversations.map((conv) => (
                      <button
                        key={conv.id}
                        onClick={() => setSelectedConversation(conv)}
                        className={`w-full text-left p-3 sm:p-4 hover:bg-gray-50 transition-colors ${
                          selectedConversation?.id === conv.id ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                            <span className="font-semibold text-xs sm:text-sm truncate">{conv.userName}</span>
                          </div>
                          {conv.platform === "whatsapp" ? (
                            <Smartphone className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                          ) : (
                            <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{conv.messages.length} messages</p>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="h-3 w-3" />
                          {new Date(conv.lastMessageAt).toLocaleString()}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="flex flex-col h-[400px] sm:h-[500px] lg:h-[600px]">
              <CardHeader className="border-b flex-shrink-0 py-3 sm:py-4">
                <CardTitle className="text-base sm:text-lg">Conversation Details</CardTitle>
                {selectedConversation && (
                  <CardDescription className="text-xs sm:text-sm">
                    {selectedConversation.userName} via {selectedConversation.platform}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-3 sm:p-4">
                {!selectedConversation ? (
                  <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                    <p>Select a conversation to view details</p>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {selectedConversation.messages.map((msg, idx) => (
                      <div key={idx} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[90%] sm:max-w-[80%] rounded-lg p-2.5 sm:p-3 break-words ${
                            msg.role === "user"
                              ? "bg-gradient-to-r from-[#1EB53A] to-[#0072CE] text-white"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                          <p className="text-xs opacity-70 mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
