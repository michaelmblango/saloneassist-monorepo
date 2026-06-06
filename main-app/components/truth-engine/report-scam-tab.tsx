"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Phone, Globe, Building2, User, Gift, CreditCard, Mail, CheckCircle2, Upload } from "lucide-react"

const scamTypes = [
  { value: "financial", label: "Financial Scam", icon: DollarSign, desc: "Fake bank messages, money transfers" },
  { value: "phone", label: "Phone/SMS Scam", icon: Phone, desc: "Lottery wins, fake alerts" },
  { value: "online", label: "Online Scam", icon: Globe, desc: "Fake websites, phishing" },
  { value: "business", label: "Business Fraud", icon: Building2, desc: "Fake companies, fake products" },
  { value: "identity", label: "Identity Theft", icon: User, desc: "Impersonation, stolen data" },
  { value: "email", label: "Email Scam", icon: Mail, desc: "Phishing, fake job offers" },
  { value: "card", label: "Card Fraud", icon: CreditCard, desc: "Credit/debit card scams" },
  { value: "prize", label: "Prize/Lottery Scam", icon: Gift, desc: "Fake winnings" },
]

export function ReportScamTab() {
  const [step, setStep] = useState<"type" | "details" | "info" | "review" | "success">("type")
  const [scamType, setScamType] = useState("")
  const [anonymous, setAnonymous] = useState(false)
  const [lostMoney, setLostMoney] = useState(false)
  const [referenceNumber, setReferenceNumber] = useState("")

  const handleSubmit = () => {
    // Generate reference number
    const ref = `REP-2024-${Math.floor(10000 + Math.random() * 90000)}`
    setReferenceNumber(ref)
    setStep("success")
  }

  if (step === "success") {
    return (
      <div className="mx-auto max-w-2xl">
        <Card className="p-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-green-600">Report Submitted Successfully!</h2>
          <p className="mb-6 text-muted-foreground">We've received your report and will investigate</p>

          <div className="mb-6 rounded-lg bg-muted p-4">
            <p className="mb-1 text-sm text-muted-foreground">Reference Number</p>
            <p className="text-2xl font-bold text-[#1EB53A]">{referenceNumber}</p>
          </div>

          <div className="mb-6 space-y-3 text-left">
            <h3 className="font-semibold">What Happens Next:</h3>
            <ol className="space-y-2 text-sm">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1EB53A] text-xs font-semibold text-white">
                  1
                </span>
                <span>Our team will review your report within 48 hours</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1EB53A] text-xs font-semibold text-white">
                  2
                </span>
                <span>If needed, we'll contact you for more information</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1EB53A] text-xs font-semibold text-white">
                  3
                </span>
                <span>You'll be notified of any actions taken</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1EB53A] text-xs font-semibold text-white">
                  4
                </span>
                <span>Your report helps protect others in the community</span>
              </li>
            </ol>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button className="bg-[#1EB53A] hover:bg-[#1EB53A]/90">Track My Report</Button>
            <Button
              variant="outline"
              onClick={() => {
                setStep("type")
                setScamType("")
                setAnonymous(false)
                setLostMoney(false)
              }}
            >
              Report Another Scam
            </Button>
            <Button variant="outline">Return to Dashboard</Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <Card className="p-6 text-center">
        <h2 className="mb-2 text-2xl font-bold">Report a Scam or Fraud</h2>
        <p className="mb-4 text-muted-foreground">Help us protect others by reporting suspicious activity</p>
        <Badge className="bg-[#1EB53A]">Your reports help protect the community</Badge>
      </Card>

      {/* Progress */}
      <div className="flex items-center justify-center gap-2">
        {["type", "details", "info", "review"].map((s, index) => (
          <>
            <div
              key={s}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                step === s ? "bg-[#1EB53A] text-white" : "bg-muted text-muted-foreground",
              )}
            >
              {index + 1}
            </div>
            {index < 3 && <div key={`line-${s}`} className="h-0.5 w-8 bg-muted" />}
          </>
        ))}
      </div>

      {/* Step 1: Scam Type */}
      {step === "type" && (
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Select Scam Type</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {scamTypes.map((type) => (
              <Button
                key={type.value}
                variant={scamType === type.value ? "default" : "outline"}
                className={cn(
                  "h-auto justify-start gap-3 p-4 text-left",
                  scamType === type.value && "bg-[#1EB53A] hover:bg-[#1EB53A]/90",
                )}
                onClick={() => setScamType(type.value)}
              >
                <type.icon className="h-6 w-6 shrink-0" />
                <div>
                  <p className="font-semibold">{type.label}</p>
                  <p className="text-xs opacity-80">{type.desc}</p>
                </div>
              </Button>
            ))}
          </div>
          <Button
            onClick={() => setStep("details")}
            disabled={!scamType}
            className="mt-6 w-full bg-[#1EB53A] hover:bg-[#1EB53A]/90"
          >
            Continue
          </Button>
        </Card>
      )}

      {/* Step 2: Details */}
      {step === "details" && (
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Incident Details</h3>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>When did this happen?</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>How did they contact you?</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone">Phone Call</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="person">In Person</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Contact Details</Label>
              <Input placeholder="Phone number, email, username, or website URL..." />
            </div>

            <div className="space-y-2">
              <Label>Describe what happened</Label>
              <Textarea placeholder="Please provide as much detail as possible..." className="min-h-[150px]" />
              <p className="text-xs text-muted-foreground">0/1000 characters</p>
            </div>

            <div className="space-y-2">
              <Label>Upload Evidence (Optional)</Label>
              <div className="rounded-lg border-2 border-dashed p-6 text-center">
                <Upload className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Screenshots, documents, photos, or audio recordings</p>
                <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                  Add Files
                </Button>
              </div>
            </div>

            <div className="space-y-3 rounded-lg bg-muted p-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="money"
                  checked={lostMoney}
                  onCheckedChange={(checked) => setLostMoney(checked as boolean)}
                />
                <Label htmlFor="money" className="cursor-pointer">
                  Did you lose money?
                </Label>
              </div>
              {lostMoney && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Amount Lost</Label>
                    <Input type="number" placeholder="SLL" />
                  </div>
                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                        <SelectItem value="mobile">Mobile Money</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="card">Credit/Debit Card</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("type")}>
                Back
              </Button>
              <Button onClick={() => setStep("info")} className="flex-1 bg-[#1EB53A] hover:bg-[#1EB53A]/90">
                Continue
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Step 3: Your Information */}
      {step === "info" && (
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Your Information (Optional)</h3>
          <div className="space-y-4">
            <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-900">
              Your information is confidential and will only be used for investigation purposes. You can report
              anonymously.
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="anonymous"
                checked={anonymous}
                onCheckedChange={(checked) => setAnonymous(checked as boolean)}
              />
              <Label htmlFor="anonymous" className="cursor-pointer">
                I want to remain anonymous
              </Label>
            </div>

            {!anonymous && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input placeholder="Your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input type="tel" placeholder="For follow-up" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="For updates" />
                  </div>
                  <div className="space-y-2">
                    <Label>District</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="freetown">Western Area Urban (Freetown)</SelectItem>
                        <SelectItem value="bo">Bo</SelectItem>
                        <SelectItem value="kenema">Kenema</SelectItem>
                        <SelectItem value="makeni">Makeni</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="updates" defaultChecked />
                  <Label htmlFor="updates" className="cursor-pointer">
                    Send me updates on this report
                  </Label>
                </div>
              </>
            )}

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("details")}>
                Back
              </Button>
              <Button onClick={() => setStep("review")} className="flex-1 bg-[#1EB53A] hover:bg-[#1EB53A]/90">
                Continue
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Step 4: Review */}
      {step === "review" && (
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Review & Submit</h3>
          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <div className="mb-3 grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Scam Type:</span>
                  <span className="font-medium">Financial Scam</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">Dec 28, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Evidence:</span>
                  <span className="font-medium">3 files</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium">{anonymous ? "Anonymous" : "With Contact Info"}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("info")}>
                Back
              </Button>
              <Button onClick={handleSubmit} className="flex-1 bg-[#1EB53A] hover:bg-[#1EB53A]/90">
                Submit Report
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
