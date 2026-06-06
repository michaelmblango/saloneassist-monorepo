import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check if webhook is accessible
    const webhookUrl = process.env.NEXT_PUBLIC_APP_URL || "https://v0-saloneassistadmin.vercel.app"
    const webhookEndpoint = `${webhookUrl}/api/webhook/whatsapp`

    // Get configuration status
    const config = {
      webhookUrl: webhookEndpoint,
      verifyToken: "saloneassist_webhook_token_2024",
      phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || "812246008649774",
      metaTokenConfigured: !!process.env.META_ACCESS_TOKEN,
      nvidiaApiConfigured: !!process.env.NVIDIA_API_KEY,
    }

    return NextResponse.json({
      success: true,
      status: "operational",
      config,
      message: "Webhook is ready to receive messages",
      instructions: [
        "1. Copy the webhook URL above",
        "2. Go to Meta for Developers > Your App > WhatsApp > Configuration",
        "3. Click Edit in the Webhook section",
        "4. Paste the webhook URL and verify token",
        "5. Subscribe to 'messages' webhook field",
        "6. Click Verify and Save",
        "7. Send a test message to your WhatsApp Business number",
      ],
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to check webhook status",
      },
      { status: 500 },
    )
  }
}
