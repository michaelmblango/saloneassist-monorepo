"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"
import { useState } from "react"
import { DISTRICTS } from "@/lib/jobs-data"
import { useLanguage } from "@/contexts/language-context"

interface CVPersonalInfoProps {
  data: any
  onUpdate: (field: string, value: any) => void
  onNext: () => void
}

export function CVPersonalInfo({ data, onUpdate, onNext }: CVPersonalInfoProps) {
  const { t } = useLanguage()
  const personalInfo = data.personalInfo || {}
  const [photoPreview, setPhotoPreview] = useState<string | null>(data.photo || null)

  const handleChange = (field: string, value: string) => {
    onUpdate("personalInfo", { ...personalInfo, [field]: value })
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPhotoPreview(result)
        onUpdate("photo", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = () => {
    setPhotoPreview(null)
    onUpdate("photo", null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">{t("cv.personal_info_title")}</h3>
        <p className="text-sm text-muted-foreground">Let's start with your basic information</p>
      </div>

      {/* Photo Upload */}
      <div className="flex items-center gap-6">
        <div>
          <Label>{t("cv.field.photo")} (Optional)</Label>
          <p className="text-xs text-muted-foreground">Some templates support profile photos</p>
        </div>
        <div className="flex items-center gap-4">
          {photoPreview ? (
            <div className="relative">
              <img
                src={photoPreview || "/placeholder.svg"}
                alt="Profile"
                className="h-24 w-24 rounded-full object-cover"
              />
              <Button
                size="sm"
                variant="destructive"
                className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-0"
                onClick={handleRemovePhoto}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div>
              <input type="file" id="photo-upload" accept="image/*" onChange={handlePhotoUpload} className="sr-only" />
              <label htmlFor="photo-upload">
                <Button variant="outline" size="sm" asChild className="cursor-pointer bg-transparent">
                  <span>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photo
                  </span>
                </Button>
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">{t("cv.field.full_name")} *</Label>
          <Input
            id="fullName"
            value={personalInfo.fullName || ""}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="e.g., John Doe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="professionalTitle">{t("cv.field.title")} *</Label>
          <Input
            id="professionalTitle"
            value={personalInfo.professionalTitle || ""}
            onChange={(e) => handleChange("professionalTitle", e.target.value)}
            placeholder="e.g., Software Developer"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{t("cv.field.email")} *</Label>
          <Input
            id="email"
            type="email"
            value={personalInfo.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="email@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">{t("settings.phone")} *</Label>
          <Input
            id="phone"
            type="tel"
            value={personalInfo.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+232 XX XXX XXXX"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">{t("cv.field.location")} *</Label>
          <Select value={personalInfo.location || ""} onValueChange={(value) => handleChange("location", value)}>
            <SelectTrigger id="location">
              <SelectValue placeholder="Select district" />
            </SelectTrigger>
            <SelectContent>
              {DISTRICTS.map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn URL (Optional)</Label>
          <Input
            id="linkedin"
            value={personalInfo.linkedin || ""}
            onChange={(e) => handleChange("linkedin", e.target.value)}
            placeholder="linkedin.com/in/yourname"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="portfolio">Portfolio/Website (Optional)</Label>
          <Input
            id="portfolio"
            value={personalInfo.portfolio || ""}
            onChange={(e) => handleChange("portfolio", e.target.value)}
            placeholder="yourwebsite.com"
          />
        </div>
      </div>
    </div>
  )
}
