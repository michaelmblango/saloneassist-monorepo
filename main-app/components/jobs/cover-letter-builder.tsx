"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { CoverLetterWizard } from "./cover-letter-wizard"
import { useLanguage } from "@/contexts/language-context"

interface CoverLetterBuilderProps {
  onSuccess: () => void
}

export function CoverLetterBuilder({ onSuccess }: CoverLetterBuilderProps) {
  const { t } = useLanguage()
  const [started, setStarted] = useState(false)

  if (!started) {
    return (
      <div className="flex min-h-[600px] items-center justify-center">
        <div className="max-w-md space-y-6 text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-[#1EB53A]/10 p-6">
              <FileText className="h-16 w-16 text-[#1EB53A]" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold">{t("cover_letter.build.title")}</h2>
            <p className="mt-2 text-muted-foreground">{t("cover_letter.build.subtitle")}</p>
          </div>
          <div className="space-y-3">
            <Button onClick={() => setStarted(true)} className="w-full bg-[#1EB53A] hover:bg-[#1EB53A]/90">
              {t("cover_letter.build.start")}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return <CoverLetterWizard onSuccess={onSuccess} onBack={() => setStarted(false)} />
}
