import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const nvidiaApiKey =
      process.env.NVIDIA_API_KEY || "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"
    const nvidiaApiBase = process.env.NVIDIA_API_BASE || "https://integrate.api.nvidia.com/v1"

    if (!nvidiaApiKey) {
      return NextResponse.json({ error: "NVIDIA API key not configured" }, { status: 500 })
    }

    const systemPrompt = `You are SaloneAssist AI, a helpful assistant for Sierra Leone. You help users with job searches, government services, business verification, health guidance, and general information about Sierra Leone. Be friendly, concise, and accurate.

Important information you should know:
- SaloneAssist is a comprehensive platform for Sierra Leone citizens
- We offer job listings, business verification, government services, health guidance, and career planning
- Always provide accurate, helpful, and culturally appropriate responses
- If you don't know something, be honest and suggest alternative resources`

    const response = await fetch(`${nvidiaApiBase}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${nvidiaApiKey}`,
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-70b-instruct",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
        top_p: 0.95,
        max_tokens: 1024,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("[v0] NVIDIA API error:", errorData)

      if (response.status === 429) {
        return NextResponse.json(
          {
            error: "API quota exceeded. Please try again in a few moments.",
            type: "quota_exceeded",
          },
          { status: 429 },
        )
      }

      if (response.status === 404) {
        return NextResponse.json(
          {
            error: "Model not found. The specified model may not be available with your NVIDIA API key.",
            details: errorData,
          },
          { status: 404 },
        )
      }

      return NextResponse.json({ error: "Failed to get AI response", details: errorData }, { status: response.status })
    }

    const data = await response.json()
    const aiResponse = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response."

    console.log("[v0] Chatbot conversation:", {
      user: message,
      assistant: aiResponse,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      response: aiResponse,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Chatbot error:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
