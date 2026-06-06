"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { Globe } from "lucide-react"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button variant="ghost" size="sm" onClick={() => setLanguage(language === "en" ? "krio" : "en")} className="gap-1">
      <Globe className="h-4 w-4" />
      <span className="font-medium">{language === "en" ? "EN" : "KRIO"}</span>
    </Button>
  )
}
