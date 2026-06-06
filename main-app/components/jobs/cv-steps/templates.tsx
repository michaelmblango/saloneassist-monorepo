"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Camera } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface CVTemplatesProps {
  data: any
  onUpdate: (field: string, value: any) => void
  onNext?: () => void
}

export function CVTemplates({ data, onUpdate, onNext }: CVTemplatesProps) {
  const { t } = useLanguage()
  const [selectedTemplate, setSelectedTemplate] = useState(data.selectedTemplate || "modern")
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null)

  const templates = [
    {
      id: "modern",
      name: "Modern Professional",
      description: "Clean and contemporary design with bold headings",
      preview: "bg-gradient-to-br from-blue-50 to-white",
      accent: "border-blue-500",
      supportsPhoto: false,
    },
    {
      id: "classic",
      name: "Classic Traditional",
      description: "Timeless layout perfect for corporate roles",
      preview: "bg-gradient-to-br from-gray-50 to-white",
      accent: "border-gray-700",
      supportsPhoto: false,
    },
    {
      id: "creative",
      name: "Creative Bold",
      description: "Eye-catching design for creative industries",
      preview: "bg-gradient-to-br from-purple-50 to-white",
      accent: "border-purple-500",
      supportsPhoto: false,
    },
    {
      id: "minimal",
      name: "Minimal Clean",
      description: "Simple and elegant with maximum readability",
      preview: "bg-gradient-to-br from-green-50 to-white",
      accent: "border-[#1EB53A]",
      supportsPhoto: false,
    },
    {
      id: "executive",
      name: "Executive Premium",
      description: "Sophisticated design for senior positions",
      preview: "bg-gradient-to-br from-amber-50 to-white",
      accent: "border-amber-600",
      supportsPhoto: false,
    },
    {
      id: "technical",
      name: "Technical Structured",
      description: "Data-focused layout for technical roles",
      preview: "bg-gradient-to-br from-cyan-50 to-white",
      accent: "border-cyan-600",
      supportsPhoto: false,
    },
    {
      id: "corporate",
      name: "Corporate Professional",
      description: "Traditional corporate style with photo",
      preview: "bg-gradient-to-br from-slate-50 to-white",
      accent: "border-slate-700",
      supportsPhoto: true,
    },
    {
      id: "elegant",
      name: "Elegant Centered",
      description: "Sophisticated centered layout with photo",
      preview: "bg-gradient-to-br from-rose-50 to-white",
      accent: "border-rose-500",
      supportsPhoto: true,
    },
    {
      id: "sidebar",
      name: "Sidebar Layout",
      description: "Modern two-column design with photo",
      preview: "bg-gradient-to-br from-emerald-50 to-white",
      accent: "border-emerald-600",
      supportsPhoto: true,
    },
    {
      id: "bold",
      name: "Bold Impact",
      description: "High-impact design with large photo",
      preview: "bg-gradient-to-br from-orange-50 to-white",
      accent: "border-orange-600",
      supportsPhoto: true,
    },
    {
      id: "infographic",
      name: "Infographic Style",
      description: "Visual-heavy design with icons and colors",
      preview: "bg-gradient-to-br from-cyan-50 via-purple-50 to-white",
      accent: "border-purple-500",
      supportsPhoto: false,
    },
    {
      id: "timeline",
      name: "Timeline Format",
      description: "Chronological timeline layout",
      preview: "bg-gradient-to-br from-indigo-50 to-white",
      accent: "border-indigo-600",
      supportsPhoto: false,
    },
  ]

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId)
    onUpdate("selectedTemplate", templateId)
    if (onNext) {
      setTimeout(() => onNext(), 300)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold">Choose Your CV Template</h3>
        <p className="text-sm text-muted-foreground">
          Select a template that best represents your professional style.{" "}
          {data.photo && (
            <span className="font-medium text-[#1EB53A]">
              Templates marked with a camera icon support your uploaded photo.
            </span>
          )}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => {
          const isSelected = selectedTemplate === template.id
          const isHovered = hoveredTemplate === template.id

          return (
            <Card
              key={template.id}
              className={`relative cursor-pointer overflow-hidden transition-all ${
                isSelected ? `ring-2 ${template.accent} ring-offset-2` : "hover:shadow-lg"
              }`}
              onClick={() => handleSelectTemplate(template.id)}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              {isSelected && (
                <div className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#1EB53A] text-white">
                  <Check className="h-4 w-4" />
                </div>
              )}

              {template.supportsPhoto && (
                <div className="absolute left-2 top-2 z-10">
                  <Badge variant="secondary" className="bg-white/90">
                    <Camera className="mr-1 h-3 w-3" />
                    Photo
                  </Badge>
                </div>
              )}

              {/* Template Preview */}
              <div className={`h-64 p-6 ${template.preview}`}>
                <div className="space-y-4">
                  {/* Header */}
                  <div className={`h-16 rounded ${isHovered ? "animate-pulse" : ""}`}>
                    <div className="mb-2 h-4 w-32 rounded bg-gray-800/20" />
                    <div className="h-2 w-24 rounded bg-gray-600/20" />
                  </div>

                  {/* Summary */}
                  <div className="space-y-2">
                    <div className={`h-3 w-20 rounded ${template.accent.replace("border", "bg")}/30`} />
                    <div className="h-2 w-full rounded bg-gray-400/20" />
                    <div className="h-2 w-full rounded bg-gray-400/20" />
                    <div className="h-2 w-3/4 rounded bg-gray-400/20" />
                  </div>

                  {/* Experience */}
                  <div className="space-y-2">
                    <div className={`h-3 w-24 rounded ${template.accent.replace("border", "bg")}/30`} />
                    <div className="space-y-1">
                      <div className="h-2 w-28 rounded bg-gray-600/20" />
                      <div className="h-2 w-full rounded bg-gray-400/20" />
                      <div className="h-2 w-2/3 rounded bg-gray-400/20" />
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="space-y-2">
                    <div className={`h-3 w-16 rounded ${template.accent.replace("border", "bg")}/30`} />
                    <div className="flex gap-2">
                      <div className="h-6 w-16 rounded-full bg-gray-400/20" />
                      <div className="h-6 w-20 rounded-full bg-gray-400/20" />
                      <div className="h-6 w-16 rounded-full bg-gray-400/20" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Template Info */}
              <div className="border-t p-4">
                <h4 className="font-semibold">{template.name}</h4>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
