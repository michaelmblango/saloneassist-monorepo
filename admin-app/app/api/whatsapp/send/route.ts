import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { to, message, metaAccessToken, phoneNumberId } = await request.json()

    if (!to || !message) {
      return NextResponse.json({ error: "Missing required fields: to, message" }, { status: 400 })
    }

    const META_ACCESS_TOKEN = metaAccessToken || process.env.META_ACCESS_TOKEN
    const PHONE_NUMBER_ID = phoneNumberId || process.env.WHATSAPP_PHONE_NUMBER_ID || "812246008649774"

    if (!META_ACCESS_TOKEN) {
      return NextResponse.json({ error: "Meta access token not configured" }, { status: 400 })
    }

    console.log("[v0] Sending WhatsApp message to:", to)

    const response = await fetch(`https://graph.facebook.com/v22.0/${PHONE_NUMBER_ID}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${META_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: to,
        type: "text",
        text: {
          body: message,
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("[v0] WhatsApp send failed:", data)
      return NextResponse.json({ error: "Failed to send message", details: data }, { status: response.status })
    }

    console.log("[v0] WhatsApp message sent successfully:", data)
    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    console.error("[v0] WhatsApp send error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
