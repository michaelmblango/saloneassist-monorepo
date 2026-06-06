"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Copy, Check, Globe } from "lucide-react"
import Link from "next/link"

export default function ChatbotIntegrationPage() {
  const [copiedApi, setCopiedApi] = useState(false)
  const [copiedEmbed, setCopiedEmbed] = useState(false)
  const [copiedWidget, setCopiedWidget] = useState(false)

  const apiEndpoint = "https://v0-saloneassistadmin.vercel.app/api/public/chat"
  const embedUrl = "https://v0-saloneassistadmin.vercel.app/embed/chat"

  const apiCode = `// Example API call from your main SaloneAssist app
const response = await fetch('${apiEndpoint}', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // Optional: Add API key for security
    // 'x-api-key': 'your-api-key'
  },
  body: JSON.stringify({
    message: userMessage,
    sessionId: 'unique-session-id',
    conversationHistory: [] // Optional: previous messages
  })
});

const data = await response.json();
console.log(data.response); // AI response`

  const embedCode = `<!-- Embed chatbot widget in your main app -->
<iframe
  src="${embedUrl}"
  style="position: fixed; bottom: 0; right: 0; width: 400px; height: 600px; border: none; z-index: 9999;"
  title="SaloneAssist AI Chat"
></iframe>

<!-- Or make it responsive for mobile -->
<iframe
  src="${embedUrl}"
  style="position: fixed; bottom: 0; right: 0; width: 100%; height: 100%; border: none; z-index: 9999;"
  class="md:w-[400px] md:h-[600px] md:bottom-4 md:right-4"
  title="SaloneAssist AI Chat"
></iframe>`

  const widgetCode = `<!-- Floating chat button widget -->
<script>
(function() {
  const iframe = document.createElement('iframe');
  iframe.src = '${embedUrl}';
  iframe.style.cssText = 'position:fixed;bottom:0;right:0;width:400px;height:600px;border:none;z-index:9999;';
  iframe.className = 'saloneassist-chat-widget';
  document.body.appendChild(iframe);
})();
</script>`

  const copyToClipboard = (text: string, setCopied: (val: boolean) => void) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-6 max-w-5xl pb-24">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/chatbot">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Chatbot Integration</h1>
            <p className="text-muted-foreground">Connect your main app to this AI chatbot</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Integration Options
              </CardTitle>
              <CardDescription>
                Choose how you want to integrate the chatbot into your main SaloneAssist app
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="api" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="api">API Integration</TabsTrigger>
                  <TabsTrigger value="embed">Embed Widget</TabsTrigger>
                  <TabsTrigger value="script">Script Tag</TabsTrigger>
                </TabsList>

                <TabsContent value="api" className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Public API Endpoint</h3>
                    <p className="text-sm text-muted-foreground">
                      Call this endpoint from your main app to get AI responses. Perfect for custom chat interfaces.
                    </p>
                    <div className="bg-muted p-3 rounded-lg font-mono text-sm break-all">{apiEndpoint}</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Example Code</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(apiCode, setCopiedApi)}
                        className="gap-2"
                      >
                        {copiedApi ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copiedApi ? "Copied!" : "Copy"}
                      </Button>
                    </div>
                    <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                      <code>{apiCode}</code>
                    </pre>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">Response Format</h3>
                    <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                      <code>{`{
  "success": true,
  "response": "AI assistant response text",
  "sessionId": "session_1234567890",
  "timestamp": "2025-01-10T12:34:56.789Z"
}`}</code>
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="embed" className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Embed URL</h3>
                    <p className="text-sm text-muted-foreground">
                      Add this iframe to your main app to display the full chatbot interface. Works on desktop and
                      mobile.
                    </p>
                    <div className="bg-muted p-3 rounded-lg font-mono text-sm break-all">{embedUrl}</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">HTML Code</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(embedCode, setCopiedEmbed)}
                        className="gap-2"
                      >
                        {copiedEmbed ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copiedEmbed ? "Copied!" : "Copy"}
                      </Button>
                    </div>
                    <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                      <code>{embedCode}</code>
                    </pre>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Preview</h4>
                    <Button asChild variant="outline" className="w-full bg-transparent">
                      <a href={embedUrl} target="_blank" rel="noopener noreferrer">
                        Open Chat Widget Preview
                      </a>
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="script" className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">One-Line Installation</h3>
                    <p className="text-sm text-muted-foreground">
                      Add this single script tag to your main app's HTML and the chatbot will automatically appear as a
                      floating widget.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Script Code</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(widgetCode, setCopiedWidget)}
                        className="gap-2"
                      >
                        {copiedWidget ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copiedWidget ? "Copied!" : "Copy"}
                      </Button>
                    </div>
                    <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                      <code>{widgetCode}</code>
                    </pre>
                  </div>

                  <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
                    <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Best Practice</h4>
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      Place this script tag at the bottom of your HTML, just before the closing body tag for optimal
                      loading performance.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integration Checklist</CardTitle>
              <CardDescription>Steps to successfully integrate the chatbot</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold">Configure API Keys</h4>
                  <p className="text-sm text-muted-foreground">
                    Ensure NVIDIA API key and Meta access token are configured in Settings
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold">Choose Integration Method</h4>
                  <p className="text-sm text-muted-foreground">
                    API for custom UIs, Embed for quick setup, Script for easiest installation
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold">Add to Main App</h4>
                  <p className="text-sm text-muted-foreground">
                    Copy the code and paste it into your SaloneAssist main application
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-semibold">Test & Deploy</h4>
                  <p className="text-sm text-muted-foreground">
                    Test the chatbot integration locally, then deploy to production
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Integration Status</CardTitle>
              <CardDescription>Current WhatsApp bot connection status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-semibold">WhatsApp Webhook</p>
                    <p className="text-sm text-muted-foreground">Configured and ready</p>
                  </div>
                  <div className="h-3 w-3 bg-green-500 rounded-full" />
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-semibold">Test Number Available</p>
                    <p className="text-sm text-muted-foreground">Use Meta test number until business verified</p>
                  </div>
                  <div className="h-3 w-3 bg-amber-500 rounded-full" />
                </div>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/dashboard/chatbot/whatsapp">Configure WhatsApp Settings</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
