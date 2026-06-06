"use client"

import { useEffect, useState } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, XCircle, Copy, ExternalLink, AlertCircle, ArrowLeft, Send, Loader2 } from "lucide-react"
import Link from "next/link"

export default function WhatsAppSetup() {
  const [webhookUrl, setWebhookUrl] = useState("https://v0-saloneassistadmin.vercel.app/api/webhook/whatsapp")
  const [verifyToken, setVerifyToken] = useState("")
  const [phoneNumberId, setPhoneNumberId] = useState("")
  const [isConfigured, setIsConfigured] = useState(false)
  const [testPhoneNumber, setTestPhoneNumber] = useState("232034646391")
  const [testMessage, setTestMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [sendStatus, setSendStatus] = useState<"idle" | "success" | "error">("idle")
  const [webhookStatus, setWebhookStatus] = useState<"checking" | "ready" | "error">("checking")
  const [isCheckingWebhook, setIsCheckingWebhook] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    setVerifyToken(localStorage.getItem("webhook_verify_token") || "saloneassist_webhook_token_2024")
    setPhoneNumberId(localStorage.getItem("whatsapp_phone_number_id") || "812246008649774")

    const metaToken = localStorage.getItem("meta_access_token")
    setIsConfigured(!!metaToken)

    checkWebhookStatus()
  }, [])

  const checkWebhookStatus = async () => {
    setIsCheckingWebhook(true)
    try {
      const response = await fetch("/api/webhook/status")
      const data = await response.json()

      if (data.success) {
        setWebhookStatus("ready")
      } else {
        setWebhookStatus("error")
      }
    } catch (error) {
      console.error("Failed to check webhook status:", error)
      setWebhookStatus("error")
    } finally {
      setIsCheckingWebhook(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Copied to clipboard!")
  }

  const handleSendTestMessage = async () => {
    if (!testPhoneNumber || !testMessage) {
      alert("Please enter both phone number and message")
      return
    }

    setIsSending(true)
    setSendStatus("idle")
    setErrorMessage("")

    try {
      const metaAccessToken = localStorage.getItem("meta_access_token")
      const phoneNumberId = localStorage.getItem("whatsapp_phone_number_id")

      const response = await fetch("/api/whatsapp/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: testPhoneNumber,
          message: testMessage,
          metaAccessToken,
          phoneNumberId,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSendStatus("success")
        setTestMessage("")
        setTimeout(() => setSendStatus("idle"), 3000)
      } else {
        console.error("Failed to send message:", data)
        setSendStatus("error")
        const errorDetail = data.details?.error?.message || data.error || "Unknown error"
        setErrorMessage(errorDetail)
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setSendStatus("error")
      setErrorMessage("Network error: Failed to send message")
    } finally {
      setIsSending(false)
    }
  }

  const setupSteps = [
    {
      step: 1,
      title: "Configure API Keys",
      description: "Add your Meta Access Token and Phone Number ID in Settings",
      status: isConfigured ? "complete" : "pending",
      action: (
        <Link href="/dashboard/chatbot/settings">
          <Button variant="outline" size="sm">
            Go to Settings
          </Button>
        </Link>
      ),
    },
    {
      step: 2,
      title: "Set Up Webhook in Meta",
      description: "Configure the webhook URL in your Meta App Dashboard",
      status: "pending",
      action: (
        <a href="https://developers.facebook.com/apps" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm">
            <ExternalLink className="h-3 w-3 mr-1" />
            Open Meta Dashboard
          </Button>
        </a>
      ),
    },
    {
      step: 3,
      title: "Test Integration",
      description: "Send a test message to verify the connection",
      status: "pending",
      action: (
        <Button variant="outline" size="sm" onClick={() => document.getElementById("test-section")?.scrollIntoView()}>
          Test Below
        </Button>
      ),
    },
  ]

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto pb-20">
        <Link href="/dashboard/chatbot">
          <Button variant="ghost" className="mb-4 -ml-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Chatbot
          </Button>
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">WhatsApp Integration Setup</h1>
          <p className="text-gray-600">Connect your chatbot to WhatsApp Business</p>
        </div>

        {/* Status Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isConfigured ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-gray-400" />
              )}
              Integration Status
            </CardTitle>
            <CardDescription>
              {isConfigured
                ? "WhatsApp credentials configured. Complete webhook setup in Meta."
                : "API credentials not configured. Please add them in Settings."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {isCheckingWebhook ? (
                  <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                ) : webhookStatus === "ready" ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                )}
                <div>
                  <p className="font-medium text-sm">
                    {isCheckingWebhook
                      ? "Checking webhook..."
                      : webhookStatus === "ready"
                        ? "Webhook is operational"
                        : "Webhook needs verification in Meta"}
                  </p>
                  <p className="text-xs text-gray-600">
                    {webhookStatus === "ready"
                      ? "Your webhook is ready to receive messages"
                      : "Follow the setup steps below to verify"}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={checkWebhookStatus} disabled={isCheckingWebhook}>
                Recheck
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting Alert */}
        <Card className="mb-6 border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <AlertCircle className="h-5 w-5" />
              Not Receiving Messages?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-amber-800 space-y-3">
            <p className="font-semibold">Common Issues and Solutions:</p>
            <ol className="space-y-2 list-decimal list-inside">
              <li>
                <strong>Webhook not verified in Meta:</strong> Go to Meta for Developers and verify your webhook using
                the URL and token below
              </li>
              <li>
                <strong>Not subscribed to webhook events:</strong> Make sure you've subscribed to "messages" field in
                Meta
              </li>
              <li>
                <strong>Using test number:</strong> Meta's test number (232034646391) only receives messages you send to
                it. You cannot receive messages FROM it unless your business is verified
              </li>
              <li>
                <strong>Business not verified:</strong> Your business account must be verified before you can receive
                messages from real users
              </li>
            </ol>
            <div className="bg-white rounded-lg p-3 mt-4">
              <p className="font-semibold mb-2">What you CAN do now:</p>
              <ul className="space-y-1 text-sm">
                <li>✓ Send test messages TO the test number (232034646391) using the sender below</li>
                <li>✓ Test your chatbot in the Test interface</li>
                <li>✓ Configure webhook in Meta to prepare for verification</li>
              </ul>
              <p className="font-semibold mb-2 mt-3">What you CANNOT do yet:</p>
              <ul className="space-y-1 text-sm">
                <li>✗ Receive messages FROM other phone numbers (until business is verified)</li>
                <li>✗ Message users who haven't messaged you first (need approved templates)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Test Message Sender */}
        <Card className="mb-6" id="test-section">
          <CardHeader>
            <CardTitle>Test Message Sender</CardTitle>
            <CardDescription>
              Send a test message to any WhatsApp number (including Meta's test number: 232034646391)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Recipient Phone Number (with country code)</label>
              <Input
                type="tel"
                value={testPhoneNumber}
                onChange={(e) => setTestPhoneNumber(e.target.value)}
                placeholder="232034646391"
                className="mb-2"
              />
              <p className="text-xs text-gray-500">Format: Country code + phone number (e.g., 232034646391)</p>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Test Message</label>
              <Textarea
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                placeholder="Hello from SaloneAssist Admin!"
                rows={3}
              />
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={handleSendTestMessage}
                disabled={!isConfigured || isSending}
                className="bg-gradient-to-r from-[#1EB53A] to-[#0072CE] hover:from-[#17a333] hover:to-[#005bb5]"
              >
                {isSending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Test Message
                  </>
                )}
              </Button>

              {sendStatus === "success" && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-medium">Message sent!</span>
                </div>
              )}
            </div>

            {sendStatus === "error" && errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-red-800 text-sm mb-1">Failed to send message</p>
                    <p className="text-sm text-red-700 mb-2">{errorMessage}</p>
                    {errorMessage.includes("expired") && (
                      <div className="bg-white rounded p-2 mb-2">
                        <p className="text-xs text-red-800 font-semibold mb-1">Your access token has expired.</p>
                        <p className="text-xs text-red-700">
                          Go to{" "}
                          <Link href="/dashboard/chatbot/settings" className="underline font-medium">
                            Settings
                          </Link>{" "}
                          to update your Meta Access Token with a new one from Meta for Developers.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {!isConfigured && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
                <AlertCircle className="h-4 w-4 inline mr-2" />
                Please configure your Meta Access Token in Settings first
              </div>
            )}
          </CardContent>
        </Card>

        {/* Setup Steps */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Setup Steps</CardTitle>
            <CardDescription>Follow these steps to complete WhatsApp integration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {setupSteps.map((item) => (
              <div key={item.step} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    item.status === "complete" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {item.status === "complete" ? <CheckCircle2 className="h-5 w-5" /> : item.step}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  {item.action}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Webhook Configuration */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Webhook Configuration</CardTitle>
            <CardDescription>Use these values when setting up your webhook in Meta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Webhook URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={webhookUrl}
                  readOnly
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-mono"
                />
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(webhookUrl)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Verify Token</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={verifyToken}
                  readOnly
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-mono"
                />
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(verifyToken)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Phone Number ID</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={phoneNumberId}
                  readOnly
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-mono"
                />
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(phoneNumberId)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Instructions</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <ol className="space-y-3">
              <li>
                Go to{" "}
                <a
                  href="https://developers.facebook.com/apps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Meta for Developers
                </a>{" "}
                and select your app
              </li>
              <li>Navigate to WhatsApp &gt; Configuration in the left sidebar</li>
              <li>
                In the Webhook section, click "Edit" and paste the <strong>Webhook URL</strong> above
              </li>
              <li>
                Paste the <strong>Verify Token</strong> above
              </li>
              <li>Subscribe to the "messages" webhook field</li>
              <li>Click "Verify and Save"</li>
              <li>Use the test message sender above to verify your setup works!</li>
            </ol>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">Using Meta's Test Number</h4>
                  <p className="text-sm text-blue-700">
                    While your business account is pending verification, you can send and receive messages using Meta's
                    test number. The webhook will receive messages from any number that contacts your WhatsApp Business
                    number, and you can use the test sender above to message the test number directly.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
