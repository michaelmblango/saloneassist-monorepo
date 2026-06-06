import { type NextRequest, NextResponse } from "next/server"

// Public API endpoint that your main SaloneAssist app can use
export async function POST(request: NextRequest) {
  try {
    const { message, sessionId, conversationHistory = [] } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Optional: Add API key verification for production
    const apiKey = request.headers.get("x-api-key")
    const expectedApiKey = process.env.PUBLIC_CHATBOT_API_KEY || "saloneassist_chatbot_key_2024"

    // Uncomment this in production to require API key
    // if (apiKey !== expectedApiKey) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    const nvidiaApiKey =
      process.env.NVIDIA_API_KEY || "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"
    const nvidiaApiBase = process.env.NVIDIA_API_BASE || "https://integrate.api.nvidia.com/v1"

    const systemPrompt = `You are SaloneAssist AI, a helpful assistant for Sierra Leone. You help users with:
- Job searches and career guidance
- Government services and information
- Business verification and registration
- Health guidance and medical information
- Education and skill development

Be friendly, concise, accurate, and culturally appropriate for Sierra Leone users.`

    // Build conversation history
    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: "user", content: message },
    ]

    const response = await fetch(`${nvidiaApiBase}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${nvidiaApiKey}`,
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-70b-instruct",
        messages,
        temperature: 0.7,
        top_p: 0.95,
        max_tokens: 1024,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("[v0] NVIDIA API error:", errorData)
      return NextResponse.json({ error: "Failed to get AI response", details: errorData }, { status: response.status })
    }

    const data = await response.json()
    const aiResponse = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response."

    return NextResponse.json({
      success: true,
      response: aiResponse,
      sessionId: sessionId || `session_${Date.now()}`,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Public chat API error:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

// CORS support for main app
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, x-api-key",
    },
  })
}
