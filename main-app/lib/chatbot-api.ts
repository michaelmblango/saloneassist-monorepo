const CHATBOT_API_URL = "https://v0-saloneassistadmin.vercel.app/api/public/chat"

export interface ChatMessage {
  message: string
  conversationId: string
}

export interface ChatResponse {
  response: string
  conversationId: string
  timestamp: string
}

export async function sendChatMessage(message: string, conversationId?: string): Promise<ChatResponse> {
  const response = await fetch(CHATBOT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      conversationId: conversationId || `user-${Date.now()}`,
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Failed to send message" }))
    throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`)
  }

  return response.json()
}
