"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { ProfileWizard } from "@/components/profile-wizard"
import { useLanguage } from "@/contexts/language-context"

export default function ProfileSetupPage() {
  const { t } = useLanguage()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("common.back_to_dashboard")}
          </Button>
          <h1 className="text-2xl font-bold">{t("profile.complete_title")}</h1>
          <p className="text-sm text-muted-foreground">{t("profile.complete_subtitle")}</p>
        </div>
      </div>
      <ProfileWizard />
    </div>
  )
}
