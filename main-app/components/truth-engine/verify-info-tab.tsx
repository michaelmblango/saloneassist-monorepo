"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MessageSquare,
  Mail,
  FileText,
  Share2,
  LinkIcon,
  Mic,
  Upload,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

type ContentType = "whatsapp" | "email" | "document" | "social" | "website" | "audio" | ""

interface VerificationResult {
  score: number
  verdict: "legitimate" | "suspicious" | "scam"
  redFlags: string[]
  greenFlags: string[]
  recommendation: string[]
  similarReports: number
}

const contentTypes = [
  { value: "whatsapp", label: "WhatsApp/SMS Message", icon: MessageSquare },
  { value: "email", label: "Email", icon: Mail },
  { value: "document", label: "Document/Letter", icon: FileText },
  { value: "social", label: "Social Media Post", icon: Share2 },
  { value: "website", label: "Website/Link", icon: LinkIcon },
  { value: "audio", label: "Audio/Voice Note", icon: Mic },
]

export function VerifyInfoTab() {
  const [step, setStep] = useState<"form" | "result">("form")
  const [contentType, setContentType] = useState<ContentType>("")
  const [content, setContent] = useState("")
  const [source, setSource] = useState("")
  const [result, setResult] = useState<VerificationResult | null>(null)

  const handleSubmit = () => {
    // Simulate verification
    const mockResult: VerificationResult = {
      score: 15,
      verdict: "scam",
      redFlags: [
        "Requests personal banking information",
        "Claims to be from government but uses personal number",
        "Creates false urgency (respond within 24 hours)",
        "Contains grammatical errors in official communication",
        "Unverified sender (not official government channel)",
      ],
      greenFlags: [],
      recommendation: [
        "Do NOT respond or share personal information",
        "Do NOT click any links in the message",
        "Block the sender's number immediately",
        "Report this scam using our reporting tool",
        "Verify any government programs through official channels (.gov.sl websites)",
      ],
      similarReports: 47,
    }
    setResult(mockResult)
    setStep("result")
  }

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case "legitimate":
        return "text-green-600"
      case "suspicious":
        return "text-yellow-600"
      case "scam":
        return "text-red-600"
      default:
        return ""
    }
  }

  const getVerdictBg = (verdict: string) => {
    switch (verdict) {
      case "legitimate":
        return "bg-green-50 border-green-200"
      case "suspicious":
        return "bg-yellow-50 border-yellow-200"
      case "scam":
        return "bg-red-50 border-red-200"
      default:
        return ""
    }
  }

  if (step === "result" && result) {
    return (
      <div className="space-y-6">
        {/* Legitimacy Score */}
        <Card className={`p-8 text-center ${getVerdictBg(result.verdict)}`}>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white">
            {result.verdict === "scam" && <AlertTriangle className="h-10 w-10 text-red-600" />}
            {result.verdict === "suspicious" && <AlertTriangle className="h-10 w-10 text-yellow-600" />}
            {result.verdict === "legitimate" && <CheckCircle2 className="h-10 w-10 text-green-600" />}
          </div>
          <h2 className={`mb-2 text-3xl font-bold ${getVerdictColor(result.verdict)}`}>
            {result.verdict === "scam" && "LIKELY SCAM"}
            {result.verdict === "suspicious" && "SUSPICIOUS"}
            {result.verdict === "legitimate" && "LEGITIMATE"}
          </h2>
          <p className="mb-4 text-muted-foreground">Based on our analysis with {result.score}% confidence</p>
          <Progress value={result.score} className="h-2" />
        </Card>

        {/* Analysis */}
        {result.redFlags.length > 0 && (
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Red Flags Detected
            </h3>
            <ul className="space-y-2">
              {result.redFlags.map((flag, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-red-600">⚠️</span>
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {result.greenFlags.length > 0 && (
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Green Flags
            </h3>
            <ul className="space-y-2">
              {result.greenFlags.map((flag, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-green-600">✅</span>
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Recommendation */}
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">What should you do?</h3>
          <ol className="space-y-2">
            {result.recommendation.map((rec, index) => (
              <li key={index} className="flex items-start gap-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1EB53A] text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <span className="pt-0.5">{rec}</span>
              </li>
            ))}
          </ol>
        </Card>

        {/* Similar Scams */}
        {result.similarReports > 0 && (
          <Card className="border-yellow-200 bg-yellow-50 p-6">
            <h3 className="mb-2 font-semibold">Similar Scams Alert</h3>
            <p className="text-sm text-muted-foreground">
              We've detected{" "}
              <span className="font-semibold text-foreground">{result.similarReports} similar messages</span> reported
              this month. This is part of a known scam pattern targeting Sierra Leone citizens.
            </p>
          </Card>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => setStep("form")} variant="outline">
            Verify Another
          </Button>
          <Button className="bg-[#1EB53A] hover:bg-[#1EB53A]/90">
            <Share2 className="mr-2 h-4 w-4" />
            Share Results
          </Button>
          <Button variant="outline">Report This Scam</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <Card className="p-6 text-center">
        <h2 className="mb-2 text-2xl font-bold">Verify Suspicious Content</h2>
        <p className="text-muted-foreground">Check if messages, documents, or announcements are legitimate</p>
      </Card>

      {/* How It Works */}
      <div className="flex items-center justify-center gap-4 text-sm">
        <div className="text-center">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#1EB53A] text-white font-semibold">
            1
          </div>
          <p className="text-muted-foreground">Submit Content</p>
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground" />
        <div className="text-center">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#1EB53A] text-white font-semibold">
            2
          </div>
          <p className="text-muted-foreground">AI Analysis</p>
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground" />
        <div className="text-center">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#1EB53A] text-white font-semibold">
            3
          </div>
          <p className="text-muted-foreground">Get Results</p>
        </div>
      </div>

      {/* Form */}
      <Card className="p-6">
        <div className="space-y-6">
          {/* Content Type */}
          <div className="space-y-3">
            <Label>Content Type</Label>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {contentTypes.map((type) => (
                <Button
                  key={type.value}
                  variant={contentType === type.value ? "default" : "outline"}
                  className={cn(
                    "h-auto flex-col gap-2 p-4",
                    contentType === type.value && "bg-[#1EB53A] hover:bg-[#1EB53A]/90",
                  )}
                  onClick={() => setContentType(type.value as ContentType)}
                >
                  <type.icon className="h-6 w-6" />
                  <span className="text-xs">{type.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Upload/Paste */}
          <div className="space-y-3">
            <Label>Content to Verify</Label>
            <div className="rounded-lg border-2 border-dashed p-8 text-center">
              <Upload className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
              <p className="mb-2 text-sm font-medium">Drop files here or click to upload</p>
              <p className="mb-4 text-xs text-muted-foreground">Supports images, PDFs, documents, and audio files</p>
              <Button variant="outline" size="sm">
                Choose File
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or paste text</span>
            </div>
          </div>

          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste the message, email, or content you want to verify..."
            className="min-h-[150px]"
          />

          {/* Additional Context */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Where did you receive this?</Label>
              <Select value={source} onValueChange={setSource}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>When did you receive it?</Label>
              <Input type="date" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Additional Details (Optional)</Label>
            <Textarea placeholder="Any other relevant information..." className="min-h-[80px]" />
          </div>

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            className="w-full bg-[#1EB53A] hover:bg-[#1EB53A]/90"
            size="lg"
            disabled={!contentType || !content}
          >
            Submit for Verification
          </Button>
        </div>
      </Card>
    </div>
  )
}
