"use client"

interface ProfessionalTemplateProps {
  data: any
}

export function ProfessionalTemplate({ data }: ProfessionalTemplateProps) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="mx-auto max-w-3xl space-y-6 bg-white p-12">
      {/* Header with contact info */}
      <div className="text-right text-sm text-gray-600">
        <p className="font-medium">{data.personalInfo?.fullName || "[Your Name]"}</p>
        <p>{data.personalInfo?.email || "[Your Email]"}</p>
        <p>{data.personalInfo?.phone || "[Your Phone]"}</p>
        <p>{data.personalInfo?.location || "[Your Location]"}</p>
      </div>

      <div className="text-sm text-gray-600">
        <p>{currentDate}</p>
      </div>

      {/* Recipient info */}
      <div className="text-sm text-gray-700">
        <p className="font-medium">{data.hiringManager || "[Hiring Manager Name]"}</p>
        <p>{data.companyName || "[Company Name]"}</p>
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
        <p>Sincerely,</p>
        <p className="mt-4 font-medium">{data.personalInfo?.fullName || "[Your Name]"}</p>
      </div>
    </div>
  )
}
