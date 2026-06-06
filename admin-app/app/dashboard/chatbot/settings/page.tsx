"use client"

import { useEffect, useState } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, Save, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ChatbotSettings() {
  const [nvidiaApiKey, setNvidiaApiKey] = useState("")
  const [metaAccessToken, setMetaAccessToken] = useState("")
  const [webhookVerifyToken, setWebhookVerifyToken] = useState("")
  const [whatsappPhoneNumberId, setWhatsappPhoneNumberId] = useState("")
  const [systemPrompt, setSystemPrompt] = useState("")
  const [showNvidiaKey, setShowNvidiaKey] = useState(false)
  const [showMetaToken, setShowMetaToken] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle")
  const [role, setRole] = useState("")
  const [showTokenExpiredWarning, setShowTokenExpiredWarning] = useState(true)

  useEffect(() => {
    setRole(localStorage.getItem("admin_role") || "")
    loadSettings()
    autoSaveDefaults()
  }, [])

  const loadSettings = () => {
    const savedNvidiaKey = localStorage.getItem("nvidia_api_key")
    const savedMetaToken = localStorage.getItem("meta_access_token")
    const savedPhoneNumberId = localStorage.getItem("whatsapp_phone_number_id")
    const savedWebhookToken = localStorage.getItem("webhook_verify_token")

    setNvidiaApiKey(savedNvidiaKey || "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")
    setMetaAccessToken(
      savedMetaToken ||
        "EAAULL98CvrUBQH7yldE0QfWkOm0QzrvnsfqioZCObnlAmJyyvruYKaEUUHaagYaLIRGSSzSzn8SXhF67xaN40JRnG6cRdwoMNGEvdqDZBZAYKgVqqbjFsPnKTpZBUOGMTHbIVI9s2kfWsCsuG9bwIN08n4hTDp2cQUjFat0hm9wZAiWa2yDcuZAhxZC4KdeSJx3kEf3GdCK5BV0P9pQ8lusbsOMfh4ZAfKuSBnHuFyAxYsZCNwbT9LblV2WHE2pgbianql6jIySmKHC6eijmtfylAeIYnv6w8P6mmeXMSLgZDZD",
    )
    setWhatsappPhoneNumberId(savedPhoneNumberId || "812246008649774")
    setWebhookVerifyToken(savedWebhookToken || "saloneassist_webhook_token_2024")
    setSystemPrompt(
      localStorage.getItem("chatbot_system_prompt") ||
        "You are SaloneAssist AI, a helpful assistant for Sierra Leone. You help users with job searches, government services, business verification, health guidance, and general information about Sierra Leone. Be friendly, concise, and accurate.",
    )
  }

  const autoSaveDefaults = () => {
    const hasNvidiaKey = localStorage.getItem("nvidia_api_key")

    if (!hasNvidiaKey) {
      localStorage.setItem("nvidia_api_key", "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")
      localStorage.setItem(
        "meta_access_token",
        "EAAULL98CvrUBQH7yldE0QfWkOm0QzrvnsfqioZCObnlAmJyyvruYKaEUUHaagYaLIRGSSzSzn8SXhF67xaN40JRnG6cRdwoMNGEvdqDZBZAYKgVqqbjFsPnKTpZBUOGMTHbIVI9s2kfWsCsuG9bwIN08n4hTDp2cQUjFat0hm9wZAiWa2yDcuZAhxZC4KdeSJx3kEf3GdCK5BV0P9pQ8lusbsOMfh4ZAfKuSBnHuFyAxYsZCNwbT9LblV2WHE2pgbianql6jIySmKHC6eijmtfylAeIYnv6w8P6mmeXMSLgZDZD",
      )
      localStorage.setItem("whatsapp_phone_number_id", "812246008649774")
      localStorage.setItem("webhook_verify_token", "saloneassist_webhook_token_2024")
      localStorage.setItem(
        "chatbot_system_prompt",
        "You are SaloneAssist AI, a helpful assistant for Sierra Leone. You help users with job searches, government services, business verification, health guidance, and general information about Sierra Leone. Be friendly, concise, and accurate.",
      )
    }
  }

  const handleSave = async () => {
    if (role === "viewer") {
      alert("Viewers cannot modify settings")
      return
    }

    setSaveStatus("saving")

    try {
      localStorage.setItem("nvidia_api_key", nvidiaApiKey)
      localStorage.setItem("meta_access_token", metaAccessToken)
      localStorage.setItem("webhook_verify_token", webhookVerifyToken)
      localStorage.setItem("whatsapp_phone_number_id", whatsappPhoneNumberId)
      localStorage.setItem("chatbot_system_prompt", systemPrompt)

      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSaveStatus("success")
      setShowTokenExpiredWarning(false)
      setTimeout(() => setSaveStatus("idle"), 3000)
    } catch (error) {
      console.error("Failed to save settings:", error)
      setSaveStatus("error")
      setTimeout(() => setSaveStatus("idle"), 3000)
    }
  }

  const isViewerRole = role === "viewer"

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard/chatbot">
          <Button variant="ghost" className="mb-4 -ml-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Chatbot
          </Button>
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Chatbot Settings</h1>
          <p className="text-gray-600">Configure API keys and integration settings for your AI chatbot</p>
        </div>

        {showTokenExpiredWarning && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-800 mb-2">Meta Access Token Expired</h3>
                <p className="text-sm text-red-700 mb-3">
                  Your Meta access token expired on December 10, 2025. You need to generate a new token to continue
                  sending WhatsApp messages.
                </p>
                <div className="bg-white rounded-lg p-3 mb-3">
                  <p className="text-sm font-semibold text-red-900 mb-2">How to get a new token:</p>
                  <ol className="text-sm text-red-800 space-y-1 list-decimal list-inside">
                    <li>
                      Go to{" "}
                      <a
                        href="https://developers.facebook.com/apps"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium"
                      >
                        Meta for Developers
                      </a>
                    </li>
                    <li>Select your WhatsApp Business app</li>
                    <li>Go to WhatsApp &gt; API Setup</li>
                    <li>Copy the temporary or permanent access token</li>
                    <li>Paste it in the field below and click Save Settings</li>
                  </ol>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTokenExpiredWarning(false)}
                  className="text-red-700 border-red-300 hover:bg-red-100"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        )}

        {isViewerRole && (
          <div className="mb-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-800">Read-Only Access</h3>
                <p className="text-sm text-amber-700">Viewers cannot modify chatbot settings</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* NVIDIA AI Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>NVIDIA AI API</CardTitle>
              <CardDescription>
                Configure your NVIDIA API key for AI-powered responses using Llama models
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="nvidia-key">NVIDIA API Key</Label>
                <div className="flex gap-2 mt-2">
                  <div className="relative flex-1">
                    <Input
                      id="nvidia-key"
                      type={showNvidiaKey ? "text" : "password"}
                      value={nvidiaApiKey}
                      onChange={(e) => setNvidiaApiKey(e.target.value)}
                      placeholder="nvapi-..."
                      disabled={isViewerRole}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNvidiaKey(!showNvidiaKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showNvidiaKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Get your API key from{" "}
                  <a
                    href="https://build.nvidia.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    NVIDIA Build
                  </a>
                </p>
              </div>

              <div>
                <Label htmlFor="system-prompt">System Prompt</Label>
                <Textarea
                  id="system-prompt"
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  placeholder="Define your chatbot's personality and purpose..."
                  disabled={isViewerRole}
                  rows={4}
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">This prompt defines how your AI assistant behaves</p>
              </div>
            </CardContent>
          </Card>

          {/* WhatsApp Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Business API</CardTitle>
              <CardDescription>Configure Meta WhatsApp Business integration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="meta-token">Meta Access Token</Label>
                <div className="flex gap-2 mt-2">
                  <div className="relative flex-1">
                    <Input
                      id="meta-token"
                      type={showMetaToken ? "text" : "password"}
                      value={metaAccessToken}
                      onChange={(e) => setMetaAccessToken(e.target.value)}
                      placeholder="EAAxxxxx..."
                      disabled={isViewerRole}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowMetaToken(!showMetaToken)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showMetaToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="phone-number-id">WhatsApp Phone Number ID</Label>
                <Input
                  id="phone-number-id"
                  type="text"
                  value={whatsappPhoneNumberId}
                  onChange={(e) => setWhatsappPhoneNumberId(e.target.value)}
                  placeholder="123456789012345"
                  disabled={isViewerRole}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="verify-token">Webhook Verify Token</Label>
                <Input
                  id="verify-token"
                  type="text"
                  value={webhookVerifyToken}
                  onChange={(e) => setWebhookVerifyToken(e.target.value)}
                  placeholder="your_secure_token_here"
                  disabled={isViewerRole}
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use this token when setting up your webhook in Meta Developer Portal
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-blue-900 mb-2">Webhook URL</h4>
                <code className="text-sm bg-white px-3 py-2 rounded border border-blue-200 block">
                  https://v0-saloneassistadmin.vercel.app/api/webhook/whatsapp
                </code>
                <p className="text-xs text-blue-700 mt-2">Configure this URL in your Meta App webhook settings</p>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex items-center gap-4">
            <Button
              onClick={handleSave}
              disabled={isViewerRole || saveStatus === "saving"}
              className="bg-gradient-to-r from-[#1EB53A] to-[#0072CE] hover:from-[#17a333] hover:to-[#005bb5]"
            >
              <Save className="h-4 w-4 mr-2" />
              {saveStatus === "saving" ? "Saving..." : "Save Settings"}
            </Button>

            {saveStatus === "success" && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Settings saved successfully!</span>
              </div>
            )}

            {saveStatus === "error" && (
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">Failed to save settings</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
