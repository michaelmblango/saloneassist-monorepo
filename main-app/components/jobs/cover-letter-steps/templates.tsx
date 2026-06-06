"use client"

import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useState } from "react"

interface CoverLetterTemplatesProps {
  data: any
  onUpdate: (field: string, value: any) => void
  onNext?: () => void
}

export function CoverLetterTemplates({ data, onUpdate, onNext }: CoverLetterTemplatesProps) {
  const { t } = useLanguage()
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null)

  const templates = [
    {
      id: "professional",
      name: t("cover_letter.template.professional"),
      description: "Traditional business letter format",
      preview: "bg-gradient-to-br from-blue-50 to-white",
      accent: "border-blue-500",
    },
    {
      id: "modern",
      name: t("cover_letter.template.modern"),
      description: "Contemporary design with accent colors",
      preview: "bg-gradient-to-br from-green-50 to-white",
      accent: "border-green-500",
    },
    {
      id: "elegant",
      name: t("cover_letter.template.elegant"),
      description: "Centered layout with serif typography",
      preview: "bg-gradient-to-br from-purple-50 to-white",
      accent: "border-purple-500",
    },
    {
      id: "simple",
      name: t("cover_letter.template.simple"),
      description: "Clean and straightforward format",
      preview: "bg-gradient-to-br from-gray-50 to-white",
      accent: "border-gray-500",
    },
    {
      id: "bold",
      name: t("cover_letter.template.bold"),
      description: "Eye-catching header design",
      preview: "bg-gradient-to-br from-red-50 to-white",
      accent: "border-red-500",
    },
    {
      id: "minimal",
      name: t("cover_letter.template.minimal"),
      description: "Minimalist and modern spacing",
      preview: "bg-gradient-to-br from-slate-50 to-white",
      accent: "border-slate-500",
    },
  ]

  const handleSelectTemplate = (templateId: string) => {
    onUpdate("selectedTemplate", templateId)
    if (onNext) {
      setTimeout(onNext, 300)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h3 className="text-base sm:text-lg font-semibold mb-2">{t("cover_letter.choose_template")}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground">{t("cover_letter.template_subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {templates.map((template) => {
          const isSelected = data.selectedTemplate === template.id
          const isHovered = hoveredTemplate === template.id

          return (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all overflow-hidden ${
                isSelected ? `ring-2 ${template.accent} ring-offset-2` : "hover:shadow-lg"
              }`}
              onClick={() => handleSelectTemplate(template.id)}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              {/* Preview section */}
              <div className={`h-48 p-6 ${template.preview}`}>
                <div className="space-y-3">
                  {/* Header mockup */}
                  <div className={`space-y-1 ${isHovered ? "animate-pulse" : ""}`}>
                    <div className={`h-3 w-24 rounded ${template.accent.replace("border", "bg")}`} />
                    <div className="h-2 w-32 rounded bg-gray-300/50" />
                  </div>

                  {/* Date */}
                  <div className="h-2 w-20 rounded bg-gray-200/50" />

                  {/* Recipient */}
                  <div className="space-y-1">
                    <div className="h-2 w-28 rounded bg-gray-300/50" />
                    <div className="h-2 w-24 rounded bg-gray-200/50" />
                  </div>

                  {/* Content lines */}
                  <div className="space-y-2 pt-2">
                    <div className="h-1.5 w-full rounded bg-gray-200/50" />
                    <div className="h-1.5 w-full rounded bg-gray-200/50" />
                    <div className="h-1.5 w-full rounded bg-gray-200/50" />
                    <div className="h-1.5 w-3/4 rounded bg-gray-200/50" />
                  </div>

                  {/* Signature */}
                  <div className="pt-3 space-y-1">
                    <div className="h-2 w-16 rounded bg-gray-200/50" />
                    <div className={`h-2 w-20 rounded ${template.accent.replace("border", "bg")}/50`} />
                  </div>
                </div>
              </div>

              {/* Template info */}
              <div className="border-t p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold">{template.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                  </div>
                  {isSelected && (
                    <div className="rounded-full bg-[#1EB53A] p-1 flex-shrink-0">
                      <Check className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
