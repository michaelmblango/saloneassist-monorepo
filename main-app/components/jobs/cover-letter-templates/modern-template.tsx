"use client"

import { Mail, Phone, MapPin } from "lucide-react"

interface ModernTemplateProps {
  data: any
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="mx-auto max-w-3xl space-y-6 bg-white p-12">
      {/* Header with accent */}
      <div className="border-l-4 border-green-500 pl-6">
        <h1 className="text-2xl font-bold text-gray-900">{data.personalInfo?.fullName || "[Your Name]"}</h1>
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-600">
          {data.personalInfo?.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
        </div>
      </div>

      <div className="text-sm text-gray-600">{currentDate}</div>

      {/* Recipient */}
      <div className="text-sm text-gray-700">
        <p className="font-semibold text-green-600">{data.hiringManager || "[Hiring Manager Name]"}</p>
        <p className="font-medium">{data.companyName || "[Company Name]"}</p>
        <p className="text-xs text-gray-500">Re: {data.jobTitle || "[Position Title]"}</p>
      </div>

      {/* Salutation */}
      <p className="text-sm font-medium">Dear {data.hiringManager || "[Hiring Manager]"},</p>

      {/* Content */}
      <div className="space-y-4 text-sm leading-relaxed text-gray-700">
        <p>{data.introduction || "[Introduction paragraph - Express your interest in the position...]"}</p>
        <p>{data.body || "[Body paragraphs - Highlight your qualifications and experience...]"}</p>
        <p>{data.closing || "[Closing paragraph - Express enthusiasm and next steps...]"}</p>
      </div>

      {/* Signature */}
      <div className="text-sm">
        <p>Best regards,</p>
        <p className="mt-4 text-lg font-bold text-green-600">{data.personalInfo?.fullName || "[Your Name]"}</p>
      </div>
    </div>
  )
}
