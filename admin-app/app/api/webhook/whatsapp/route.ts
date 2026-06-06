import { type NextRequest, NextResponse } from "next/server"

// GET endpoint for webhook verification by Meta
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const mode = searchParams.get("hub.mode")
  const token = searchParams.get("hub.verify_token")
  const challenge = searchParams.get("hub.challenge")

  const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN || "saloneassist_webhook_token_2024"

  console.log("[v0] Webhook verification attempt:", { mode, token, challenge })

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("[v0] ✅ Webhook verified successfully!")
    return new NextResponse(challenge, { status: 200 })
  } else {
    console.error("[v0] ❌ Webhook verification failed - incorrect token or mode")
    return NextResponse.json({ error: "Verification failed" }, { status: 403 })
  }
}

// POST endpoint for receiving WhatsApp messages
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[v0] 📥 WhatsApp webhook received:")
    console.log(JSON.stringify(body, null, 2))

    // Check if this is a WhatsApp Business Account webhook
    if (body.object === "whatsapp_business_account") {
      const entry = body.entry?.[0]
      const changes = entry?.changes?.[0]
      const value = changes?.value

      // Handle incoming messages
      if (value?.messages) {
        const message = value.messages[0]
        const from = message.from
        const messageText = message.text?.body
        const messageId = message.id

        console.log("[v0] 💬 Incoming message:", {
          from,
          messageText,
          messageId,
        })

        if (messageText) {
          console.log("[v0] 🤖 Processing message with AI...")
          await handleWhatsAppMessage(from, messageText, messageId)
        }
      }

      // Handle message status updates (sent, delivered, read)
      if (value?.statuses) {
        console.log("[v0] 📊 Message status update:", value.statuses)
      }
    } else {
      console.log("[v0] ⚠️ Received non-WhatsApp webhook:", body.object)
    }

    // Always return 200 to Meta to acknowledge receipt
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("[v0] ❌ WhatsApp webhook error:", error)
    // Still return 200 to prevent Meta from retrying
    return NextResponse.json({ success: true }, { status: 200 })
  }
}

async function handleWhatsAppMessage(from: string, messageText: string, messageId: string) {
  try {
    const META_ACCESS_TOKEN =
      process.env.META_ACCESS_TOKEN ||
      "EAAULL98CvrUBQH7yldE0QfWkOm0QzrvnsfqioZCObnlAmJyyvruYKaEUUHaagYaLIRGSSzSzn8SXhF67xaN40JRnG6cRdwoMNGEvdqDZBZAYKgVqqbjFsPnKTpZBUOGMTHbIVI9s2kfWsCsuG9bwIN08n4hTDp2cQUjFat0hm9wZAiWa2yDcuZAhxZC4KdeSJx3kEf3GdCK5BV0P9pQ8lusbsOMfh4ZAfKuSBnHuFyAxYsZCNwbT9LblV2WHE2pgbianql6jIySmKHC6eijmtfylAeIYnv6w8P6mmeXMSLgZDZD"
    const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID || "812246008649774"

    console.log("[v0] 🔄 Calling AI chatbot API...")

    // Call your AI chatbot API
    const aiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "https://v0-saloneassistadmin.vercel.app"}/api/chatbot/chat`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText }),
      },
    )

    if (!aiResponse.ok) {
      console.error("[v0] ❌ AI API error:", aiResponse.status, await aiResponse.text())
      throw new Error("AI API request failed")
    }

    const aiData = await aiResponse.json()
    const responseText = aiData.response || "Sorry, I couldn't process your message. Please try again."

    console.log("[v0] 🤖 AI Response:", responseText.substring(0, 100) + "...")

    // Send response back to WhatsApp user
    console.log("[v0] 📤 Sending WhatsApp reply to:", from)

    const whatsappResponse = await fetch(`https://graph.facebook.com/v22.0/${PHONE_NUMBER_ID}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${META_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: from,
        type: "text",
        text: {
          body: responseText,
        },
      }),
    })

    if (!whatsappResponse.ok) {
      const errorData = await whatsappResponse.json()
      console.error("[v0] ❌ Failed to send WhatsApp message:", errorData)
    } else {
      const successData = await whatsappResponse.json()
      console.log("[v0] ✅ WhatsApp message sent successfully!")
      console.log("[v0] Message ID:", successData.messages?.[0]?.id)
    }
  } catch (error) {
    console.error("[v0] ❌ Error handling WhatsApp message:", error)
  }
}
