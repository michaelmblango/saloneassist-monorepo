import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { type ServiceContext, type Intent, CHATBOT_CONFIG } from "@/lib/chatbot/config"

const ADMIN_CHATBOT_URL = "https://v0-saloneassistadmin.vercel.app/api/public/chat"

interface ChatRequest {
  message: string
  conversationHistory?: Array<{ role: string; content: string }>
  language?: "en" | "krio"
  serviceContext?: ServiceContext
  sessionId?: string
  conversationId?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json()
    const {
      message,
      conversationHistory = [],
      language = "en",
      serviceContext = "general",
      sessionId,
      conversationId,
    } = body

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Initialize Supabase client
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Detect intent from message
    const intent = detectIntent(message)

    // Fetch contextual data based on intent
    const contextData = await fetchContextualData(supabase, intent, message)

    let aiResponse = ""

    try {
      const adminResponse = await fetch(ADMIN_CHATBOT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          conversationId: conversationId || sessionId || `user-${Date.now()}`,
          // Include additional context for better responses
          metadata: {
            serviceContext,
            language,
            contextData,
            intent,
            platform: "salone-assist",
          },
        }),
      })

      if (!adminResponse.ok) {
        console.error("[v0] Admin API error:", adminResponse.status, await adminResponse.text())
        throw new Error(`Admin API returned ${adminResponse.status}`)
      }

      const data = await adminResponse.json()
      aiResponse = data.response || data.message || "I'm having trouble responding right now."
    } catch (apiError: any) {
      console.error("[v0] Admin API error:", apiError)
      // Provide fallback response
      aiResponse = generateFallbackResponse(intent, serviceContext, contextData)
    }

    // Generate suggestions based on intent and context
    const suggestions = generateSuggestions(intent, serviceContext)

    // Save conversation if user is authenticated
    if (user && sessionId) {
      await saveConversation(supabase, {
        userId: user.id,
        sessionId,
        userMessage: message,
        aiResponse,
        intent,
        serviceContext,
        language,
      })
    }

    return NextResponse.json({
      response: aiResponse,
      suggestions,
      intent,
      context: serviceContext,
    })
  } catch (error) {
    console.error("[v0] Chat API error:", error)

    return NextResponse.json(
      {
        response:
          "I'm having trouble connecting right now. You can still:\n\n" +
          "• Use the search features\n" +
          "• Navigate through the menu\n" +
          "• Try asking again in a moment\n\n" +
          "All platform features remain accessible.",
        suggestions: ["View All Services", "Ask Another Question", "Contact Support"],
      },
      { status: 200 },
    )
  }
}

// Detect user intent from message
function detectIntent(message: string): Intent {
  const lowerMessage = message.toLowerCase()

  for (const [intent, keywords] of Object.entries(CHATBOT_CONFIG.intentKeywords)) {
    if (keywords.some((keyword) => lowerMessage.includes(keyword))) {
      return intent as Intent
    }
  }

  return "general_inquiry"
}

// Fetch contextual data from Supabase based on intent
async function fetchContextualData(supabase: any, intent: Intent, message: string): Promise<string> {
  try {
    const lowerMessage = message.toLowerCase()

    switch (intent) {
      case "business_verification": {
        const { data: businesses } = await supabase
          .from("businesses")
          .select("name, district, category, phone, is_verified")
          .or(`name.ilike.%${lowerMessage.split(" ").slice(0, 3).join("%")}%`)
          .limit(5)

        if (businesses && businesses.length > 0) {
          return `\n\nRelevant businesses found:\n${businesses.map((b: any) => `- ${b.name} (${b.district}, ${b.category})${b.is_verified ? " ✓ Verified" : ""}`).join("\n")}`
        }
        break
      }

      case "job_search": {
        // Extract location from message
        const districts = ["freetown", "bo", "kenema", "makeni", "koidu", "port loko", "waterloo", "kabala", "kailahun"]
        const mentionedDistrict = districts.find((d) => lowerMessage.includes(d))

        let query = supabase.from("jobs").select("title, company, location, type, salary_range").eq("is_active", true)

        if (mentionedDistrict) {
          query = query.ilike("location", `%${mentionedDistrict}%`)
        }

        const { data: jobs } = await query.limit(5)

        if (jobs && jobs.length > 0) {
          return `\n\nCurrent job openings${mentionedDistrict ? ` in ${mentionedDistrict}` : ""}:\n${jobs.map((j: any) => `- ${j.title} at ${j.company} (${j.location}) - ${j.salary_range || "Competitive salary"}`).join("\n")}`
        }
        break
      }

      case "healthcare": {
        const { data: facilities } = await supabase
          .from("health_facilities")
          .select("name, type, district, services, emergency_services")
          .limit(5)

        if (facilities && facilities.length > 0) {
          return `\n\nNearby health facilities:\n${facilities.map((f: any) => `- ${f.name} (${f.type}, ${f.district})${f.emergency_services ? " - Emergency 24/7" : ""}`).join("\n")}`
        }
        break
      }

      default:
        return ""
    }

    return ""
  } catch (error) {
    console.error("[v0] Error fetching contextual data:", error)
    return ""
  }
}

// Build system prompt based on service context
function buildSystemPrompt(serviceContext: ServiceContext, language: string, contextData: string): string {
  const basePrompt = `You are Salone Assist AI Helper, a friendly and knowledgeable assistant for Sierra Leone's digital public services platform.

Your role:
- Provide accurate information about businesses, jobs, healthcare, career guidance, and government services in Sierra Leone
- Maintain a warm, professional, and culturally appropriate tone
- Understand both English and Krio languages
- Offer to guide users to specific platform features when relevant
- Be concise but comprehensive in your responses

Current service context: ${serviceContext}
Language preference: ${language === "krio" ? "Krio (include Krio greetings when appropriate)" : "English"}

${contextData ? `Context from database:${contextData}` : ""}

Important guidelines:
- For medical questions, always remind users to consult healthcare professionals for emergencies
- For legal/official matters, direct users to official government offices
- For job applications, encourage users to use the CV builder and application tools
- Always be honest if you don't have specific information
- Provide actionable next steps when possible`

  return basePrompt
}

// Generate contextual suggestions based on intent
function generateSuggestions(intent: Intent, serviceContext: ServiceContext): string[] {
  const contextSuggestions = CHATBOT_CONFIG.quickActions[serviceContext] || CHATBOT_CONFIG.quickActions.general

  // Add intent-specific suggestions
  const intentSuggestions: Record<Intent, string[]> = {
    business_verification: ["Search for verified businesses", "Learn about business registration", "Contact business"],
    job_search: ["View all jobs", "Build my CV", "Set up job alerts"],
    healthcare: ["Find nearest clinic", "Emergency contacts", "Health tips"],
    career_guidance: ["Check my eligibility", "Compare universities", "Find scholarships"],
    government_services: ["Apply for NIN", "Passport requirements", "Government offices"],
    scam_verification: ["Report this scam", "Learn about common scams", "Verify sender"],
    general_inquiry: contextSuggestions.slice(0, 3),
  }

  return intentSuggestions[intent] || contextSuggestions.slice(0, 3)
}

// Save conversation to database
async function saveConversation(
  supabase: any,
  data: {
    userId: string
    sessionId: string
    userMessage: string
    aiResponse: string
    intent?: Intent
    serviceContext?: ServiceContext
    language?: string
  },
) {
  try {
    let { data: session } = await supabase.from("chat_sessions").select("id").eq("id", data.sessionId).single()

    if (!session) {
      const { data: newSession } = await supabase
        .from("chat_sessions")
        .insert({
          id: data.sessionId,
          user_id: data.userId,
          context_type: data.serviceContext || "general",
          title: data.userMessage.slice(0, 50) + (data.userMessage.length > 50 ? "..." : ""),
        })
        .select("id")
        .single()

      session = newSession
    }

    if (session) {
      await supabase.from("chat_messages").insert([
        {
          session_id: session.id,
          role: "user",
          content: data.userMessage,
          language: data.language,
          intent: data.intent,
        },
        {
          session_id: session.id,
          role: "assistant",
          content: data.aiResponse,
          language: data.language,
          intent: data.intent,
          context_data: { service_context: data.serviceContext },
        },
      ])
    }
  } catch (error) {
    console.error("[v0] Error saving conversation:", error)
    // Don't throw - conversation saving is optional
  }
}

// CORS headers for cross-origin requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}

function generateFallbackResponse(intent: Intent, serviceContext: ServiceContext, contextData: string): string {
  const responses: Record<Intent, string> = {
    job_search: `I'm temporarily unavailable, but I can share some quick job search tips:

${contextData || "• Visit the Jobs section to browse all available positions\n• Use filters to narrow down by location, industry, or job type\n• Create your profile to save job searches\n• Set up job alerts to get notified of new opportunities"}

For the best results, please use the Jobs page directly or try chatting again in a few minutes.`,

    business_verification: `I'm temporarily unavailable right now. To verify businesses:

${contextData || "• Check the Business Directory for verified listings\n• Look for the green verification badge\n• View business ratings and reviews\n• Contact businesses directly through their listed information"}

You can access the full Business Directory through the main menu.`,

    healthcare: `I'm temporarily unavailable, but here's how to find healthcare services:

${contextData || "• Visit the Health Directory for all medical facilities\n• Filter by location and services offered\n• Check emergency contacts for urgent care\n• View facility ratings and specializations"}

Access the Health Directory directly from the main menu for complete information.`,

    career_guidance: `I'm temporarily unavailable. For career and education guidance:

• Explore the Career section for university programs
• Check eligibility requirements for various courses
• Compare institutions and programs
• Find scholarship opportunities

Visit the Career Guidance page for comprehensive resources.`,

    government_services: `I'm temporarily unavailable. For government services:

• Use the Government Services section for official information
• Find contact details for relevant departments
• Check application requirements
• Access downloadable forms and guides

Navigate to Government Services through the main menu.`,

    scam_verification: `I'm temporarily unavailable right now. To protect yourself from scams:

• Report suspicious activity through our Truth Engine
• Check our verified business database
• Never share personal or financial information
• Contact official sources directly to verify requests

Visit the Truth Engine section for scam reporting and verification.`,

    general_inquiry: `I'm temporarily unavailable, but you can still:

• Browse all services through the navigation menu
• Search for jobs, businesses, and health facilities
• Access career guidance and government services
• Use all platform features without assistance

Please try again in a few minutes, or navigate directly to the service you need.`,
  }

  return responses[intent] || responses.general_inquiry
}

// Generate quick suggestions based on message content
function generateQuickSuggestions(message: string): string[] {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("job") || lowerMessage.includes("work")) {
    return ["View all jobs", "Build my CV", "Set up job alerts"]
  }

  if (lowerMessage.includes("health") || lowerMessage.includes("hospital") || lowerMessage.includes("clinic")) {
    return ["Find nearest clinic", "Emergency contacts", "Health tips"]
  }

  if (lowerMessage.includes("business") || lowerMessage.includes("company")) {
    return ["Search businesses", "Verify business", "Contact business"]
  }

  if (lowerMessage.includes("school") || lowerMessage.includes("university") || lowerMessage.includes("education")) {
    return ["Check eligibility", "Compare universities", "Find scholarships"]
  }

  return ["Browse Services", "Ask Another Question", "Contact Support"]
}
