"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { User, Bell, Shield, Palette, Globe, Lock, Trash2, Upload, Check, Download, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

const SIERRA_LEONE_DISTRICTS = {
  "Eastern Province": ["Kailahun", "Kenema", "Kono"],
  "Northern Province": ["Bombali", "Kambia", "Koinadugu", "Port Loko", "Tonkolili"],
  "Southern Province": ["Bo", "Bonthe", "Moyamba", "Pujehun"],
  "Western Area": ["Western Area Rural", "Western Area Urban"],
  "North West Province": ["Karene", "Falaba"],
}

const ALL_DISTRICTS = Object.values(SIERRA_LEONE_DISTRICTS).flat()

const INDUSTRIES = [
  "Agriculture",
  "Education",
  "Healthcare",
  "Technology",
  "Finance",
  "Retail",
  "Construction",
  "Transportation",
  "Hospitality",
  "Other",
]

const SKILLS_OPTIONS = [
  "Communication",
  "Leadership",
  "Problem Solving",
  "Teamwork",
  "Time Management",
  "Microsoft Office",
  "Customer Service",
  "Sales",
  "Marketing",
  "Data Analysis",
  "Project Management",
  "Teaching",
  "Driving",
  "Accounting",
  "Cooking",
]

export function SettingsContent() {
  const [activeTab, setActiveTab] = useState("profile")
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { t } = useLanguage()

  // Profile state
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [district, setDistrict] = useState("")
  const [address, setAddress] = useState("")
  const [currentStatus, setCurrentStatus] = useState("")
  const [industry, setIndustry] = useState("")
  const [skills, setSkills] = useState<string[]>([])

  // Account state
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Notifications state
  const [notificationSettings, setNotificationSettings] = useState({
    emailJobRecs: true,
    emailBusinesses: true,
    emailHealthAlerts: true,
    emailCareerUpdates: false,
    emailWeeklyDigest: true,
    pushRealTime: true,
    pushMessages: true,
    pushSystemUpdates: false,
    frequency: "real-time",
  })

  // Privacy state
  const [privacySettings, setPrivacySettings] = useState({
    shareWithEmployers: true,
    showActivityStatus: true,
    allowSearchEngines: false,
    shareForResearch: false,
    profileVisibility: "public",
    savedItemsVisibility: "private",
  })

  // Appearance state
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "system",
    fontSize: 1,
    compactView: false,
    showAnimations: true,
    highContrast: false,
    accentColor: "#1EB53A",
  })

  // Language state
  const [languageSettings, setLanguageSettings] = useState({
    language: "english",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "12",
  })

  useEffect(() => {
    // Load settings from localStorage
    const name = localStorage.getItem("userName") || ""
    const userEmail = localStorage.getItem("userEmail") || ""
    const savedPhone = localStorage.getItem("userPhone") || ""
    const savedDistrict = localStorage.getItem("userDistrict") || ""
    const savedAddress = localStorage.getItem("userAddress") || ""
    const savedStatus = localStorage.getItem("userStatus") || ""
    const savedIndustry = localStorage.getItem("userIndustry") || ""
    const savedSkills = localStorage.getItem("userSkills")
    const savedPhoto = localStorage.getItem("userPhoto")
    const savedNotifications = localStorage.getItem("notificationSettings")
    const savedPrivacy = localStorage.getItem("privacySettings")
    const savedAppearance = localStorage.getItem("appearanceSettings")
    const savedLanguage = localStorage.getItem("languageSettings")

    setFullName(name)
    setEmail(userEmail)
    setPhone(savedPhone)
    setDistrict(savedDistrict)
    setAddress(savedAddress)
    setCurrentStatus(savedStatus)
    setIndustry(savedIndustry)
    if (savedSkills) setSkills(JSON.parse(savedSkills))
    if (savedPhoto) setProfilePhoto(savedPhoto)
    if (savedNotifications) setNotificationSettings(JSON.parse(savedNotifications))
    if (savedPrivacy) setPrivacySettings(JSON.parse(savedPrivacy))
    if (savedAppearance) setAppearanceSettings(JSON.parse(savedAppearance))
    if (savedLanguage) setLanguageSettings(JSON.parse(savedLanguage))
  }, [])

  // Auto-save draft every 30 seconds
  useEffect(() => {
    if (!hasUnsavedChanges) return

    const interval = setInterval(() => {
      console.log("[v0] Auto-saving draft...")
      toast({
        title: "Draft saved",
        description: "Your changes have been auto-saved.",
        duration: 2000,
      })
    }, 30000)

    return () => clearInterval(interval)
  }, [hasUnsavedChanges, toast])

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string)
        setHasUnsavedChanges(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = () => {
    setProfilePhoto(null)
    localStorage.removeItem("userPhoto")
    toast({
      title: "Photo removed",
      description: "Your profile photo has been removed.",
    })
  }

  const handleSaveProfile = () => {
    setIsLoading(true)
    setTimeout(() => {
      localStorage.setItem("userName", fullName)
      localStorage.setItem("userEmail", email)
      localStorage.setItem("userPhone", phone)
      localStorage.setItem("userDistrict", district)
      localStorage.setItem("userAddress", address)
      localStorage.setItem("userStatus", currentStatus)
      localStorage.setItem("userIndustry", industry)
      localStorage.setItem("userSkills", JSON.stringify(skills))
      if (profilePhoto) localStorage.setItem("userPhoto", profilePhoto)

      setIsLoading(false)
      setHasUnsavedChanges(false)
      toast({
        title: "Settings updated successfully",
        description: "Your profile has been saved.",
      })
    }, 1000)
  }

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all password fields.",
        variant: "destructive",
      })
      return
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      })
      return
    }

    if (newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setIsLoading(false)
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      })
    }, 1000)
  }

  const handleDeleteAccount = () => {
    localStorage.clear()
    toast({
      title: "Account deleted",
      description: "Your account has been permanently deleted.",
    })
    router.push("/")
  }

  const handleSaveNotifications = () => {
    setIsLoading(true)
    setTimeout(() => {
      localStorage.setItem("notificationSettings", JSON.stringify(notificationSettings))
      setIsLoading(false)
      setHasUnsavedChanges(false)
      toast({
        title: "Settings updated successfully",
        description: "Your notification preferences have been saved.",
      })
    }, 1000)
  }

  const handleSavePrivacy = () => {
    setIsLoading(true)
    setTimeout(() => {
      localStorage.setItem("privacySettings", JSON.stringify(privacySettings))
      setIsLoading(false)
      setHasUnsavedChanges(false)
      toast({
        title: "Settings updated successfully",
        description: "Your privacy settings have been saved.",
      })
    }, 1000)
  }

  const handleSaveAppearance = () => {
    setIsLoading(true)
    setTimeout(() => {
      localStorage.setItem("appearanceSettings", JSON.stringify(appearanceSettings))
      setIsLoading(false)
      setHasUnsavedChanges(false)
      toast({
        title: "Settings updated successfully",
        description: "Your appearance settings have been applied.",
      })
    }, 1000)
  }

  const handleSaveLanguage = () => {
    setIsLoading(true)
    setTimeout(() => {
      localStorage.setItem("languageSettings", JSON.stringify(languageSettings))
      setIsLoading(false)
      setHasUnsavedChanges(false)
      toast({
        title: "Settings updated successfully",
        description: "Your language settings have been saved.",
      })
    }, 1000)
  }

  const handleRequestDataExport = () => {
    toast({
      title: "Export requested",
      description: "Your data export will be ready in a few minutes. Check your email.",
    })
  }

  const toggleSkill = (skill: string) => {
    setSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
    setHasUnsavedChanges(true)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="container mx-auto max-w-7xl p-6">
      {/* Header */}
      <div className="mb-6 space-y-6">
        <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("common.back_to_dashboard")}
        </Button>

        <div>
          <h1 className="text-3xl font-bold">{t("settings.title")}</h1>
          <p className="text-muted-foreground">{t("settings.subtitle")}</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        {/* Desktop Sidebar Navigation */}
        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="hidden lg:block lg:w-56 lg:shrink-0">
            <nav className="sticky top-6 space-y-1">
              <Button
                variant={activeTab === "profile" ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  activeTab === "profile" && "bg-[#1EB53A]/10 text-[#1EB53A] hover:bg-[#1EB53A]/20",
                )}
                onClick={() => setActiveTab("profile")}
              >
                <User className="mr-2 h-4 w-4" />
                {t("settings.profile")}
              </Button>
              <Button
                variant={activeTab === "account" ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  activeTab === "account" && "bg-[#1EB53A]/10 text-[#1EB53A] hover:bg-[#1EB53A]/20",
                )}
                onClick={() => setActiveTab("account")}
              >
                <Lock className="mr-2 h-4 w-4" />
                {t("settings.account")}
              </Button>
              <Button
                variant={activeTab === "notifications" ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  activeTab === "notifications" && "bg-[#1EB53A]/10 text-[#1EB53A] hover:bg-[#1EB53A]/20",
                )}
                onClick={() => setActiveTab("notifications")}
              >
                <Bell className="mr-2 h-4 w-4" />
                {t("settings.notifications")}
              </Button>
              <Button
                variant={activeTab === "privacy" ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  activeTab === "privacy" && "bg-[#1EB53A]/10 text-[#1EB53A] hover:bg-[#1EB53A]/20",
                )}
                onClick={() => setActiveTab("privacy")}
              >
                <Shield className="mr-2 h-4 w-4" />
                {t("settings.privacy")}
              </Button>
              <Button
                variant={activeTab === "appearance" ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  activeTab === "appearance" && "bg-[#1EB53A]/10 text-[#1EB53A] hover:bg-[#1EB53A]/20",
                )}
                onClick={() => setActiveTab("appearance")}
              >
                <Palette className="mr-2 h-4 w-4" />
                {t("settings.appearance")}
              </Button>
              <Button
                variant={activeTab === "language" ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  activeTab === "language" && "bg-[#1EB53A]/10 text-[#1EB53A] hover:bg-[#1EB53A]/20",
                )}
                onClick={() => setActiveTab("language")}
              >
                <Globe className="mr-2 h-4 w-4" />
                {t("settings.language")}
              </Button>
            </nav>
          </aside>

          {/* Mobile Tabs */}
          <TabsList className="grid w-full grid-cols-3 lg:hidden">
            <TabsTrigger value="profile">{t("settings.profile")}</TabsTrigger>
            <TabsTrigger value="account">{t("settings.account")}</TabsTrigger>
            <TabsTrigger value="notifications">{t("settings.notifications")}</TabsTrigger>
          </TabsList>
          <TabsList className="grid w-full grid-cols-3 lg:hidden">
            <TabsTrigger value="privacy">{t("settings.privacy")}</TabsTrigger>
            <TabsTrigger value="appearance">{t("settings.appearance")}</TabsTrigger>
            <TabsTrigger value="language">{t("settings.language")}</TabsTrigger>
          </TabsList>

          {/* Main Content */}
          <div className="flex-1">
            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-0 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("settings.personal_info")}</CardTitle>
                  <CardDescription>{t("settings.personal_info_desc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Photo */}
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      {profilePhoto ? (
                        <AvatarImage src={profilePhoto || "/placeholder.svg"} alt={fullName} />
                      ) : (
                        <AvatarFallback className="bg-[#1EB53A] text-2xl text-white">
                          {getInitials(fullName || "U")}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <label htmlFor="photo-upload" className="cursor-pointer">
                            <Upload className="mr-2 h-4 w-4" />
                            {t("settings.upload_photo")}
                            <input
                              id="photo-upload"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={handlePhotoUpload}
                            />
                          </label>
                        </Button>
                        {profilePhoto && (
                          <Button variant="outline" size="sm" onClick={handleRemovePhoto}>
                            {t("common.delete")}
                          </Button>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{t("settings.photo_hint")}</p>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">{t("settings.full_name")}</Label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value)
                          setHasUnsavedChanges(true)
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("settings.email")}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          setHasUnsavedChanges(true)
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t("settings.phone")}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value)
                          setHasUnsavedChanges(true)
                        }}
                        placeholder={t("settings.phone_placeholder")}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                    className="bg-[#1EB53A] hover:bg-[#1EB53A]/90"
                  >
                    {isLoading ? t("common.loading") : t("common.save")}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("settings.location")}</CardTitle>
                  <CardDescription>{t("settings.location_desc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="district">{t("settings.district")}</Label>
                    <Select
                      value={district}
                      onValueChange={(value) => {
                        setDistrict(value)
                        setHasUnsavedChanges(true)
                      }}
                    >
                      <SelectTrigger id="district">
                        <SelectValue placeholder={t("settings.select_district")} />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(SIERRA_LEONE_DISTRICTS).map(([region, districts]) => (
                          <div key={region}>
                            <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">{region}</div>
                            {districts.map((dist) => (
                              <SelectItem key={dist} value={dist}>
                                {dist}
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">{t("settings.address")}</Label>
                    <Textarea
                      id="address"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value)
                        setHasUnsavedChanges(true)
                      }}
                      placeholder={t("settings.address_placeholder")}
                      rows={3}
                    />
                  </div>

                  <Button
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                    className="bg-[#1EB53A] hover:bg-[#1EB53A]/90"
                  >
                    {isLoading ? t("common.updating") : t("settings.update_location")}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("settings.professional_info")}</CardTitle>
                  <CardDescription>{t("settings.professional_info_desc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="status">{t("settings.current_status")}</Label>
                      <Select
                        value={currentStatus}
                        onValueChange={(value) => {
                          setCurrentStatus(value)
                          setHasUnsavedChanges(true)
                        }}
                      >
                        <SelectTrigger id="status">
                          <SelectValue placeholder={t("settings.select_status")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">{t("settings.student")}</SelectItem>
                          <SelectItem value="job-seeker">{t("settings.job_seeker")}</SelectItem>
                          <SelectItem value="employed">{t("settings.employed")}</SelectItem>
                          <SelectItem value="self-employed">{t("settings.self_employed")}</SelectItem>
                          <SelectItem value="other">{t("settings.other")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="industry">{t("settings.industry")}</Label>
                      <Select
                        value={industry}
                        onValueChange={(value) => {
                          setIndustry(value)
                          setHasUnsavedChanges(true)
                        }}
                      >
                        <SelectTrigger id="industry">
                          <SelectValue placeholder={t("settings.select_industry")} />
                        </SelectTrigger>
                        <SelectContent>
                          {INDUSTRIES.map((ind) => (
                            <SelectItem key={ind} value={ind.toLowerCase()}>
                              {ind}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>{t("settings.skills")}</Label>
                    <div className="flex flex-wrap gap-2">
                      {SKILLS_OPTIONS.map((skill) => (
                        <Badge
                          key={skill}
                          variant={skills.includes(skill) ? "default" : "outline"}
                          className={cn(
                            "cursor-pointer",
                            skills.includes(skill) ? "bg-[#1EB53A] hover:bg-[#1EB53A]/90" : "hover:bg-[#1EB53A]/10",
                          )}
                          onClick={() => toggleSkill(skill)}
                        >
                          {skill}
                          {skills.includes(skill) && <Check className="ml-1 h-3 w-3" />}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                    className="bg-[#1EB53A] hover:bg-[#1EB53A]/90"
                  >
                    {isLoading ? t("common.saving") : t("common.save")}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Account Tab */}
            <TabsContent value="account" className="mt-0 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("settings.account_details")}</CardTitle>
                  <CardDescription>{t("settings.account_details_desc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="text-sm font-medium">{t("settings.account_created")}</p>
                      <p className="text-sm text-muted-foreground">November 30, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="text-sm font-medium">{t("settings.account_type")}</p>
                      <p className="text-sm text-muted-foreground">Demo User</p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <p className="mb-2 text-sm font-medium">{t("settings.upgrade_account")}</p>
                    <p className="mb-3 text-sm text-muted-foreground">{t("settings.upgrade_account_desc")}</p>
                    <Button variant="outline" size="sm">
                      {t("settings.upgrade_account_button")}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("settings.change_password")}</CardTitle>
                  <CardDescription>{t("settings.change_password_desc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">{t("settings.current_password")}</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">{t("settings.new_password")}</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t("settings.confirm_new_password")}</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <div className="rounded-lg border p-4">
                    <p className="mb-2 text-sm font-medium">{t("settings.password_requirements")}:</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Check className={cn("h-4 w-4", newPassword.length >= 8 && "text-green-600")} />
                        {t("settings.min_characters")}
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className={cn("h-4 w-4", /[A-Z]/.test(newPassword) && "text-green-600")} />
                        {t("settings.one_uppercase")}
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className={cn("h-4 w-4", /[0-9]/.test(newPassword) && "text-green-600")} />
                        {t("settings.one_number")}
                      </li>
                    </ul>
                  </div>

                  <Button
                    onClick={handlePasswordChange}
                    disabled={isLoading}
                    className="bg-[#1EB53A] hover:bg-[#1EB53A]/90"
                  >
                    {isLoading ? t("common.updating") : t("settings.update_password")}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600">{t("settings.delete_account")}</CardTitle>
                  <CardDescription>{t("settings.delete_account_desc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    {t("settings.delete_my_account")}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="mt-0 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("settings.email_notifications")}</CardTitle>
                  <CardDescription>{t("settings.email_notifications_desc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{t("settings.email_job_recs")}</Label>
                      <p className="text-sm text-muted-foreground">{t("settings.email_job_recs_desc")}</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailJobRecs}
                      onCheckedChange={(checked) => {
                        setNotificationSettings({ ...notificationSettings, emailJobRecs: checked })
                        setHasUnsavedChanges(true)
                      }}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{t("settings.email_businesses")}</Label>
                      <p className="text-sm text-muted-foreground">{t("settings.email_businesses_desc")}</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailBusinesses}
                      onCheckedChange={(checked) => {
                        setNotificationSettings({ ...notificationSettings, emailBusinesses: checked })
                        setHasUnsavedChanges(true)
                      }}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{t("settings.email_health_alerts")}</Label>
                      <p className="text-sm text-muted-foreground">{t("settings.email_health_alerts_desc")}</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailHealthAlerts}
                      onCheckedChange={(checked) => {
                        setNotificationSettings({ ...notificationSettings, emailHealthAlerts: checked })
                        setHasUnsavedChanges(true)
                      }}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{t("settings.email_career_updates")}</Label>
                      <p className="text-sm text-muted-foreground">{t("settings.email_career_updates_desc")}</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailCareerUpdates}
                      onCheckedChange={(checked) => {
                        setNotificationSettings({ ...notificationSettings, emailCareerUpdates: checked })
                        setHasUnsavedChanges(true)
                      }}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{t("settings.email_weekly_digest")}</Label>
                      <p className="text-sm text-muted-foreground">{t("settings.email_weekly_digest_desc")}</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailWeeklyDigest}
                      onCheckedChange={(checked) => {
                        setNotificationSettings({ ...notificationSettings, emailWeeklyDigest: checked })
                        setHasUnsavedChanges(true)
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("settings.push_notifications")}</CardTitle>
                  <CardDescription>{t("settings.push_notifications_desc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{t("settings.push_real_time")}</Label>
                      <p className="text-sm text-muted-foreground">{t("settings.push_real_time_desc")}</p>
                    </div>
                    <Switch
                      checked={notificationSettings.pushRealTime}
                      onCheckedChange={(checked) => {
                        setNotificationSettings({ ...notificationSettings, pushRealTime: checked })
                        setHasUnsavedChanges(true)
                      }}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{t("settings.push_messages")}</Label>
                      <p className="text-sm text-muted-foreground">{t("settings.push_messages_desc")}</p>
                    </div>
                    <Switch
                      checked={notificationSettings.pushMessages}
                      onCheckedChange={(checked) => {
                        setNotificationSettings({ ...notificationSettings, pushMessages: checked })
                        setHasUnsavedChanges(true)
                      }}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{t("settings.push_system_updates")}</Label>
                      <p className="text-sm text-muted-foreground">{t("settings.push_system_updates_desc")}</p>
                    </div>
                    <Switch
                      checked={notificationSettings.pushSystemUpdates}
                      onCheckedChange={(checked) => {
                        setNotificationSettings({ ...notificationSettings, pushSystemUpdates: checked })
                        setHasUnsavedChanges(true)
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("settings.notification_frequency")}</CardTitle>
                  <CardDescription>{t("settings.notification_frequency_desc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={notificationSettings.frequency}
                    onValueChange={(value) => {
                      setNotificationSettings({ ...notificationSettings, frequency: value })
                      setHasUnsavedChanges(true)
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="real-time" id="real-time" />
                      <Label htmlFor="real-time">{t("settings.frequency_real_time")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="daily" id="daily" />
                      <Label htmlFor="daily">{t("settings.frequency_daily")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekly" id="weekly" />
                      <Label htmlFor="weekly">{t("settings.frequency_weekly")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="off" id="off" />
                      <Label htmlFor="off">{t("settings.frequency_off")}</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Button
                onClick={handleSaveNotifications}
                disabled={isLoading}
                className="bg-[#1EB53A] hover:bg-[#1EB53A]/90"
              >
                {isLoading ? t("common.saving") : t("settings.save_preferences")}
              </Button>
            </TabsContent>

            {/* Privacy Tab */}
            <TabsContent value="privacy" className="mt-0 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("settings.data_sharing")}</CardTitle>
                  <CardDescription>{t("settings.data_sharing_desc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{t("settings.share_with_employers")}</Label>
                      <p className="text-sm text-muted-foreground">{t("settings.share_with_employers_desc")}</p>
                    </div>
                    <Switch
                      checked={privacySettings.shareWithEmployers}
                      onCheckedChange={(checked) => {
                        setPrivacySettings({ ...privacySettings, shareWithEmployers: checked })
                        setHasUnsavedChanges(true)
                      }}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{t("settings.show_activity_status")}</Label>
                      <p className="text-sm text-muted-foreground">{t("settings.show_activity_status_desc")}</p>
                    </div>
                    <Switch
                      checked={privacySettings.showActivityStatus}
                      onCheckedChange={(checked) => {
                        setPrivacySettings({ ...privacySettings, showActivityStatus: checked })
                        setHasUnsavedChanges(true)
                      }}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{t("settings.allow_search_engines")}</Label>
                      <p className="text-sm text-muted-foreground">{t("settings.allow_search_engines_desc")}</p>
                    </div>
                    <Switch
                      checked={privacySettings.allowSearchEngines}
                      onCheckedChange={(checked) => {
                        setPrivacySettings({ ...privacySettings, allowSearchEngines: checked })
                        setHasUnsavedChanges(true)
                      }}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{t("settings.share_for_research")}</Label>
                      <p className="text-sm text-muted-foreground">{t("settings.share_for_research_desc")}</p>
                    </div>
                    <Switch
                      checked={privacySettings.shareForResearch}
                      onCheckedChange={(checked) => {
                        setPrivacySettings({ ...privacySettings, shareForResearch: checked })
                        setHasUnsavedChanges(true)
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("settings.profile_visibility")}</CardTitle>
                  <CardDescription>{t("settings.profile_visibility_desc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>{t("settings.profile_visibility")}</Label>
                    <RadioGroup
                      value={privacySettings.profileVisibility}
                      onValueChange={(value) => {
                        setPrivacySettings({ ...privacySettings, profileVisibility: value })
                        setHasUnsavedChanges(true)
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="public" id="public" />
                        <Label htmlFor="public">{t("settings.visibility_public")}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="friends" id="friends" />
                        <Label htmlFor="friends">{t("settings.visibility_friends")}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="private" id="private" />
                        <Label htmlFor="private">{t("settings.visibility_private")}</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="savedItems">{t("settings.saved_items_visibility")}</Label>
                    <Select
                      value={privacySettings.savedItemsVisibility}
                      onValueChange={(value) => {
                        setPrivacySettings({ ...privacySettings, savedItemsVisibility: value })
                        setHasUnsavedChanges(true)
                      }}
                    >
                      <SelectTrigger id="savedItems">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">{t("settings.visibility_public")}</SelectItem>
                        <SelectItem value="friends">{t("settings.visibility_friends")}</SelectItem>
                        <SelectItem value="private">{t("settings.visibility_private")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("settings.download_data")}</CardTitle>
                  <CardDescription>{t("settings.download_data_desc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{t("settings.download_data_hint")}</p>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="text-sm font-medium">{t("settings.last_export")}</p>
                      <p className="text-sm text-muted-foreground">Never</p>
                    </div>
                  </div>
                  <Button variant="outline" onClick={handleRequestDataExport}>
                    <Download className="mr-2 h-4 w-4" />
                    {t("settings.request_data_export")}
                  </Button>
                </CardContent>
              </Card>

              <Button onClick={handleSavePrivacy} disabled={isLoading} className="bg-[#1EB53A] hover:bg-[#1EB53A]/90">
                {isLoading ? t("common.saving") : t("settings.save_privacy_settings")}
              </Button>
            </TabsContent>

            {/* Appearance Tab */}
            <TabsContent value="appearance" className="mt-0 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("settings.theme")}</CardTitle>
                  <CardDescription>{t("settings.theme_desc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={appearanceSettings.theme}
                    onValueChange={(value) => {
                      setAppearanceSettings({ ...appearanceSettings, theme: value })
                      setHasUnsavedChanges(true)
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light">{t("settings.theme_light")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark">{t("settings.theme_dark")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="system" />
                      <Label htmlFor="system">{t("settings.theme_system")}</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("settings.display_preferences")}</CardTitle>
                  <CardDescription>{t("settings.display_preferences_desc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="fontSize">{t("settings.font_size")}</Label>
                      <span className="text-sm text-muted-foreground">
                        {appearanceSettings.fontSize === 0
                          ? t("settings.font_size_small")
                          : appearanceSettings.fontSize === 1
                            ? t("settings.font_size_medium")
                            : t("settings.font_size_large")}
                      </span>
                    </div>
                    <Slider
                      id="fontSize"
                      value={[appearanceSettings.fontSize]}
                      onValueChange={([value]) => {
                        setAppearanceSettings({ ...appearanceSettings, fontSize: value })
                        setHasUnsavedChanges(true)
                      }}
                      max={2}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{t("settings.compact_view")}</Label>
                      <p className="text-sm text-muted-foreground">{t("settings.compact_view_desc")}</p>
                    </div>
                    <Switch
                      checked={appearanceSettings.compactView}
                      onCheckedChange={(checked) => {
                        setAppearanceSettings({ ...appearanceSettings, compactView: checked })
                        setHasUnsavedChanges(true)
                      }}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{t("settings.show_animations")}</Label>
                      <p className="text-sm text-muted-foreground">{t("settings.show_animations_desc")}</p>
                    </div>
                    <Switch
                      checked={appearanceSettings.showAnimations}
                      onCheckedChange={(checked) => {
                        setAppearanceSettings({ ...appearanceSettings, showAnimations: checked })
                        setHasUnsavedChanges(true)
                      }}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{t("settings.high_contrast_mode")}</Label>
                      <p className="text-sm text-muted-foreground">{t("settings.high_contrast_mode_desc")}</p>
                    </div>
                    <Switch
                      checked={appearanceSettings.highContrast}
                      onCheckedChange={(checked) => {
                        setAppearanceSettings({ ...appearanceSettings, highContrast: checked })
                        setHasUnsavedChanges(true)
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("settings.color_accent")}</CardTitle>
                  <CardDescription>{t("settings.color_accent_desc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="h-12 w-12 rounded-full border-2 border-border"
                      style={{ backgroundColor: appearanceSettings.accentColor }}
                    />
                    <div className="flex-1">
                      <Input
                        type="color"
                        value={appearanceSettings.accentColor}
                        onChange={(e) => {
                          setAppearanceSettings({ ...appearanceSettings, accentColor: e.target.value })
                          setHasUnsavedChanges(true)
                        }}
                        className="h-10 w-full"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setAppearanceSettings({ ...appearanceSettings, accentColor: "#1EB53A" })
                        setHasUnsavedChanges(true)
                      }}
                    >
                      {t("common.reset")}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={handleSaveAppearance}
                disabled={isLoading}
                className="bg-[#1EB53A] hover:bg-[#1EB53A]/90"
              >
                {isLoading ? t("common.applying") : t("settings.apply_changes")}
              </Button>
            </TabsContent>

            {/* Language Tab */}
            <TabsContent value="language" className="mt-0 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("settings.language_selection")}</CardTitle>
                  <CardDescription>{t("settings.language_selection_desc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup
                    value={languageSettings.language}
                    onValueChange={(value) => {
                      setLanguageSettings({ ...languageSettings, language: value })
                      setHasUnsavedChanges(true)
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="english" id="english" />
                      <Label htmlFor="english">{t("settings.language_english")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="krio" id="krio" />
                      <Label htmlFor="krio">{t("settings.language_krio")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="both" />
                      <Label htmlFor="both">{t("settings.language_both")}</Label>
                    </div>
                  </RadioGroup>

                  <div className="mt-4 rounded-lg border bg-muted/50 p-4">
                    <p className="text-sm font-medium">{t("settings.sample_text")}:</p>
                    <p className="mt-2 text-sm">
                      {languageSettings.language === "english" && "Welcome to Salone Assist"}
                      {languageSettings.language === "krio" && "Welkom to Salone Assist"}
                      {languageSettings.language === "both" && "Welcome to Salone Assist / Welkom to Salone Assist"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("settings.regional_settings")}</CardTitle>
                  <CardDescription>{t("settings.regional_settings_desc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">{t("settings.date_format")}</Label>
                    <Select
                      value={languageSettings.dateFormat}
                      onValueChange={(value) => {
                        setLanguageSettings({ ...languageSettings, dateFormat: value })
                        setHasUnsavedChanges(true)
                      }}
                    >
                      <SelectTrigger id="dateFormat">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY (30/11/2024)</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY (11/30/2024)</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD (2024-11-30)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{t("settings.time_format")}</Label>
                    <RadioGroup
                      value={languageSettings.timeFormat}
                      onValueChange={(value) => {
                        setLanguageSettings({ ...languageSettings, timeFormat: value })
                        setHasUnsavedChanges(true)
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="12" id="12hour" />
                        <Label htmlFor="12hour">{t("settings.time_format_12hr")}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="24" id="24hour" />
                        <Label htmlFor="24hour">{t("settings.time_format_24hr")}</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="text-sm font-medium">{t("settings.currency")}</p>
                      <p className="text-sm text-muted-foreground">SLL (Sierra Leonean Leone)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button onClick={handleSaveLanguage} disabled={isLoading} className="bg-[#1EB53A] hover:bg-[#1EB53A]/90">
                {isLoading ? t("common.saving") : t("settings.save_language_settings")}
              </Button>
            </TabsContent>
          </div>
        </div>
      </Tabs>

      {/* Delete Account Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("settings.confirm_delete_title")}</AlertDialogTitle>
            <AlertDialogDescription>{t("settings.confirm_delete_desc")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
              {t("settings.delete_account_button")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
