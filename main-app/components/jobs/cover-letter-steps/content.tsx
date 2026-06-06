"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface CoverLetterContentProps {
  data: any
  onUpdate: (field: string, value: any) => void
}

export function CoverLetterContent({ data, onUpdate }: CoverLetterContentProps) {
  const { t } = useLanguage()

  const handleAIAssist = (field: string) => {
    console.log("[v0] AI assist for field:", field)
    // AI integration would go here
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">{t("cover_letter.content_title")}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">{t("cover_letter.content_subtitle")}</p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-2">
            <Label htmlFor="introduction" className="text-sm sm:text-base">
              {t("cover_letter.field.introduction")}
            </Label>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAIAssist("introduction")}
              className="text-xs sm:text-sm"
            >
              <Sparkles className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              {t("cv.ai_help")}
            </Button>
          </div>
          <Textarea
            id="introduction"
            value={data.introduction || ""}
            onChange={(e) => onUpdate("introduction", e.target.value)}
            placeholder={t("cover_letter.field.introduction_placeholder")}
            rows={4}
            className="text-sm sm:text-base"
          />
        </div>

        <div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-2">
            <Label htmlFor="body" className="text-sm sm:text-base">
              {t("cover_letter.field.body")}
            </Label>
            <Button size="sm" variant="outline" onClick={() => handleAIAssist("body")} className="text-xs sm:text-sm">
              <Sparkles className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              {t("cv.ai_help")}
            </Button>
          </div>
          <Textarea
            id="body"
            value={data.body || ""}
            onChange={(e) => onUpdate("body", e.target.value)}
            placeholder={t("cover_letter.field.body_placeholder")}
            rows={8}
            className="text-sm sm:text-base"
          />
        </div>

        <div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-2">
            <Label htmlFor="closing" className="text-sm sm:text-base">
              {t("cover_letter.field.closing")}
            </Label>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAIAssist("closing")}
              className="text-xs sm:text-sm"
            >
              <Sparkles className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              {t("cv.ai_help")}
            </Button>
          </div>
          <Textarea
            id="closing"
            value={data.closing || ""}
            onChange={(e) => onUpdate("closing", e.target.value)}
            placeholder={t("cover_letter.field.closing_placeholder")}
            rows={3}
            className="text-sm sm:text-base"
          />
        </div>
      </div>
    </div>
  )
}
