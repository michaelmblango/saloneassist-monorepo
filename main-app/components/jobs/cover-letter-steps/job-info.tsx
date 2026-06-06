"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/language-context"

interface CoverLetterJobInfoProps {
  data: any
  onUpdate: (field: string, value: any) => void
}

export function CoverLetterJobInfo({ data, onUpdate }: CoverLetterJobInfoProps) {
  const { t } = useLanguage()

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">{t("cover_letter.job_info_title")}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">{t("cover_letter.job_info_subtitle")}</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="jobTitle" className="text-sm sm:text-base">
            {t("cover_letter.field.job_title")}
          </Label>
          <Input
            id="jobTitle"
            value={data.jobTitle || ""}
            onChange={(e) => onUpdate("jobTitle", e.target.value)}
            placeholder={t("cover_letter.field.job_title_placeholder")}
            className="text-sm sm:text-base"
          />
        </div>

        <div>
          <Label htmlFor="companyName" className="text-sm sm:text-base">
            {t("cover_letter.field.company")}
          </Label>
          <Input
            id="companyName"
            value={data.companyName || ""}
            onChange={(e) => onUpdate("companyName", e.target.value)}
            placeholder={t("cover_letter.field.company_placeholder")}
            className="text-sm sm:text-base"
          />
        </div>

        <div>
          <Label htmlFor="hiringManager" className="text-sm sm:text-base">
            {t("cover_letter.field.hiring_manager")}
          </Label>
          <Input
            id="hiringManager"
            value={data.hiringManager || ""}
            onChange={(e) => onUpdate("hiringManager", e.target.value)}
            placeholder={t("cover_letter.field.hiring_manager_placeholder")}
            className="text-sm sm:text-base"
          />
        </div>
      </div>
    </div>
  )
}
