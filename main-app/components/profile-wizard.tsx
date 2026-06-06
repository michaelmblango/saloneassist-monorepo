"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Logo } from "@/components/logo"
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Upload,
  X,
  Edit2,
  CheckCircle2,
  User,
  MapPin,
  GraduationCap,
  FileCheck,
} from "lucide-react"

interface ProfileData {
  fullName: string
  profilePhoto: string | null
  district: string
  address: string
  nin: string
  idFront: string | null
  idBack: string | null
  education: string
  interests: string[]
  careerGoals: string
  language: string
  termsAccepted: boolean
}

const DISTRICTS = {
  "Northern Region": ["Bombali", "Kambia", "Koinadugu", "Port Loko", "Tonkolili"],
  "Southern Region": ["Bo", "Bonthe", "Moyamba", "Pujehun"],
  "Eastern Region": ["Kailahun", "Kenema", "Kono"],
  "Western Region": ["Western Area Rural", "Western Area Urban"],
}

const EDUCATION_LEVELS = [
  "Primary School",
  "JSS (Junior Secondary School)",
  "SSS (Senior Secondary School)",
  "University Student",
  "University Graduate",
  "Vocational Training",
  "Professional Certification",
  "Postgraduate",
  "Other",
]

const INTERESTS = [
  "Technology",
  "Healthcare",
  "Business",
  "Education",
  "Agriculture",
  "Arts",
  "Engineering",
  "Government",
  "Finance",
  "Law",
  "Hospitality",
  "Tourism",
  "Sports",
  "Media",
]

const STORAGE_KEY = "profileWizardDraft"

export function ProfileWizard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isCompleting, setIsCompleting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [formData, setFormData] = useState<ProfileData>({
    fullName: "",
    profilePhoto: null,
    district: "",
    address: "",
    nin: "",
    idFront: null,
    idBack: null,
    education: "",
    interests: [],
    careerGoals: "",
    language: "English",
    termsAccepted: false,
  })

  // Load draft from localStorage on mount
  useEffect(() => {
    const userName = localStorage.getItem("userName") || ""
    const savedDraft = localStorage.getItem(STORAGE_KEY)

    if (savedDraft) {
      const draft = JSON.parse(savedDraft)
      setFormData({ ...draft, fullName: draft.fullName || userName })
    } else {
      setFormData((prev) => ({ ...prev, fullName: userName }))
    }
  }, [])

  // Auto-save every 30 seconds
  const saveDraft = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    setLastSaved(new Date())
  }, [formData])

  useEffect(() => {
    const interval = setInterval(saveDraft, 30000)
    return () => clearInterval(interval)
  }, [saveDraft])

  const handleImageUpload = (field: "profilePhoto" | "idFront" | "idBack", file: File | null) => {
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, [field]: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const handleComplete = () => {
    setIsCompleting(true)
    // Save profile data to localStorage
    localStorage.setItem("userProfile", JSON.stringify(formData))
    localStorage.setItem("profileCompleted", "true")
    localStorage.removeItem(STORAGE_KEY) // Clear draft

    setTimeout(() => {
      setIsCompleting(false)
      setIsComplete(true)

      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    }, 1500)
  }

  const handleSkip = () => {
    localStorage.setItem("profileSkipped", "true")
    router.push("/dashboard")
  }

  const steps = [
    { number: 1, title: "Personal", icon: User },
    { number: 2, title: "Location", icon: MapPin },
    { number: 3, title: "Interests", icon: GraduationCap },
    { number: 4, title: "Review", icon: FileCheck },
  ]

  const progressPercentage = (currentStep / 4) * 100

  if (isComplete) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1EB53A]/10 to-[#0072C6]/10 p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="space-y-6 p-8">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#1EB53A]/10">
              <CheckCircle2 className="h-16 w-16 animate-bounce text-[#1EB53A]" />
            </div>
            <div>
              <h2 className="mb-2 text-2xl font-bold">Welcome to Salone Assist, {formData.fullName}!</h2>
              <p className="text-muted-foreground">Your profile has been set up successfully.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1EB53A]/5 to-[#0072C6]/5 p-4 py-8">
      <div className="mx-auto w-full max-w-[700px]">
        <div className="mb-6 flex justify-center">
          <Logo variant="icon-only" size="md" />
        </div>

        {/* Progress Stepper */}
        <div className="mb-8">
          <div className="mb-6 flex items-center justify-between">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all ${
                      step.number < currentStep
                        ? "border-[#1EB53A] bg-[#1EB53A] text-white"
                        : step.number === currentStep
                          ? "border-[#1EB53A] bg-white text-[#1EB53A]"
                          : "border-gray-300 bg-white text-gray-400"
                    }`}
                  >
                    {step.number < currentStep ? <Check className="h-6 w-6" /> : <step.icon className="h-6 w-6" />}
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium ${
                      step.number <= currentStep ? "text-[#1EB53A]" : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`mx-2 h-0.5 flex-1 transition-all ${
                      step.number < currentStep ? "bg-[#1EB53A]" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Auto-save indicator */}
        {lastSaved && (
          <div className="mb-4 text-center text-sm text-muted-foreground">
            Draft saved ✓ {lastSaved.toLocaleTimeString()}
          </div>
        )}

        {/* Step Content */}
        <Card>
          <CardContent className="p-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="mb-2 text-2xl font-bold">Personal Information</h2>
                  <p className="text-muted-foreground">Let's start with your basic information</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Profile Photo (optional)</Label>
                  {formData.profilePhoto ? (
                    <div className="relative">
                      <img
                        src={formData.profilePhoto || "/placeholder.svg"}
                        alt="Profile"
                        className="h-32 w-32 rounded-full object-cover"
                      />
                      <button
                        onClick={() => setFormData((prev) => ({ ...prev, profilePhoto: null }))}
                        className="absolute right-0 top-0 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
                      <Upload className="mb-2 h-8 w-8 text-gray-400" />
                      <span className="text-sm text-gray-500">Click to upload or drag and drop</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageUpload("profilePhoto", e.target.files?.[0] || null)}
                      />
                    </label>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Button variant="link" onClick={handleSkip}>
                    Skip for Now
                  </Button>
                  <Button onClick={() => setCurrentStep(2)} disabled={!formData.fullName}>
                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Location & ID */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="mb-2 text-2xl font-bold">Location & Identification</h2>
                  <p className="text-muted-foreground">Help us verify your identity and location</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district">District *</Label>
                  <Select
                    value={formData.district}
                    onValueChange={(val) => setFormData((prev) => ({ ...prev, district: val }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your district" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(DISTRICTS).map(([region, districts]) => (
                        <div key={region}>
                          <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">{region}</div>
                          {districts.map((district) => (
                            <SelectItem key={district} value={district}>
                              {district}
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address (optional)</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter your address"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nin">National Identification Number (optional)</Label>
                  <Input
                    id="nin"
                    value={formData.nin}
                    onChange={(e) => setFormData((prev) => ({ ...prev, nin: e.target.value }))}
                    placeholder="Enter your NIN"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>ID Front (optional)</Label>
                    {formData.idFront ? (
                      <div className="relative">
                        <img
                          src={formData.idFront || "/placeholder.svg"}
                          alt="ID Front"
                          className="h-24 w-full rounded object-cover"
                        />
                        <button
                          onClick={() => setFormData((prev) => ({ ...prev, idFront: null }))}
                          className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
                        <Upload className="h-6 w-6 text-gray-400" />
                        <span className="text-xs text-gray-500">Upload</span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleImageUpload("idFront", e.target.files?.[0] || null)}
                        />
                      </label>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>ID Back (optional)</Label>
                    {formData.idBack ? (
                      <div className="relative">
                        <img
                          src={formData.idBack || "/placeholder.svg"}
                          alt="ID Back"
                          className="h-24 w-full rounded object-cover"
                        />
                        <button
                          onClick={() => setFormData((prev) => ({ ...prev, idBack: null }))}
                          className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
                        <Upload className="h-6 w-6 text-gray-400" />
                        <span className="text-xs text-gray-500">Upload</span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleImageUpload("idBack", e.target.files?.[0] || null)}
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={() => setCurrentStep(3)} disabled={!formData.district}>
                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Interests & Education */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="mb-2 text-2xl font-bold">Interests & Education</h2>
                  <p className="text-muted-foreground">Tell us about your background and interests</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="education">Education Level *</Label>
                  <Select
                    value={formData.education}
                    onValueChange={(val) => setFormData((prev) => ({ ...prev, education: val }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your education level" />
                    </SelectTrigger>
                    <SelectContent>
                      {EDUCATION_LEVELS.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Areas of Interest *</Label>
                  <div className="flex flex-wrap gap-2">
                    {INTERESTS.map((interest) => (
                      <Badge
                        key={interest}
                        variant={formData.interests.includes(interest) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          formData.interests.includes(interest)
                            ? "bg-[#1EB53A] hover:bg-[#1EB53A]/90"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => toggleInterest(interest)}
                      >
                        {interest}
                        {formData.interests.includes(interest) && <Check className="ml-1 h-3 w-3" />}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="careerGoals">Career Goals (optional)</Label>
                  <Textarea
                    id="careerGoals"
                    value={formData.careerGoals}
                    onChange={(e) => setFormData((prev) => ({ ...prev, careerGoals: e.target.value }))}
                    placeholder="Tell us about your career aspirations..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language Preference *</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(val) => setFormData((prev) => ({ ...prev, language: val }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Krio">Krio</SelectItem>
                      <SelectItem value="Both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(4)}
                    disabled={!formData.education || formData.interests.length === 0}
                  >
                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="mb-2 text-2xl font-bold">Review Your Information</h2>
                  <p className="text-muted-foreground">Please review your details before completing</p>
                </div>

                {/* Personal Info Card */}
                <Card>
                  <CardContent className="space-y-3 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Personal Information</h3>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        {formData.profilePhoto && (
                          <img
                            src={formData.profilePhoto || "/placeholder.svg"}
                            alt="Profile"
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium">{formData.fullName}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Location Card */}
                <Card>
                  <CardContent className="space-y-3 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Location & ID</h3>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep(2)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">District:</span> {formData.district}
                      </p>
                      {formData.address && (
                        <p>
                          <span className="font-medium">Address:</span> {formData.address}
                        </p>
                      )}
                      {formData.nin && (
                        <p>
                          <span className="font-medium">NIN:</span> {formData.nin}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Education & Interests Card */}
                <Card>
                  <CardContent className="space-y-3 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Education & Interests</h3>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep(3)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Education:</span> {formData.education}
                      </p>
                      <p>
                        <span className="font-medium">Language:</span> {formData.language}
                      </p>
                      <div>
                        <p className="mb-1 font-medium">Interests:</p>
                        <div className="flex flex-wrap gap-1">
                          {formData.interests.map((interest) => (
                            <Badge key={interest} variant="secondary" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {formData.careerGoals && (
                        <p>
                          <span className="font-medium">Career Goals:</span> {formData.careerGoals}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Terms & Privacy */}
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, termsAccepted: checked as boolean }))
                    }
                  />
                  <label htmlFor="terms" className="cursor-pointer text-sm leading-tight">
                    I agree to the{" "}
                    <a href="#" className="text-[#1EB53A] hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[#1EB53A] hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Button variant="link" onClick={handleSkip}>
                    Skip and Complete Later
                  </Button>
                  <Button
                    onClick={handleComplete}
                    disabled={!formData.termsAccepted || isCompleting}
                    className="bg-[#1EB53A] hover:bg-[#1EB53A]/90"
                  >
                    {isCompleting ? "Completing..." : "Complete Profile"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
