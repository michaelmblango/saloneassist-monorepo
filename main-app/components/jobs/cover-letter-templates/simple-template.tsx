"use client"

interface SimpleTemplateProps {
  data: any
}

export function SimpleTemplate({ data }: SimpleTemplateProps) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="mx-auto max-w-3xl space-y-5 bg-white p-12">
      {/* Simple header */}
      <div>
        <p className="text-xl font-bold text-gray-900">{data.personalInfo?.fullName || "[Your Name]"}</p>
        <p className="text-sm text-gray-600">
          {data.personalInfo?.email} | {data.personalInfo?.phone}
        </p>
        {data.personalInfo?.location && <p className="text-sm text-gray-600">{data.personalInfo.location}</p>}
      </div>

      <div className="text-sm text-gray-600">{currentDate}</div>

      {/* Recipient */}
      <div className="text-sm text-gray-700">
        <p>{data.hiringManager || "[Hiring Manager Name]"}</p>
        <p>{data.companyName || "[Company Name]"}</p>
      </div>

      {/* Salutation */}
      <p className="text-sm">Dear {data.hiringManager || "[Hiring Manager]"},</p>

      {/* Content */}
      <div className="space-y-4 text-sm leading-relaxed text-gray-700">
        <p>{data.introduction || "[Introduction paragraph - Express your interest in the position...]"}</p>
        <p>{data.body || "[Body paragraphs - Highlight your qualifications and experience...]"}</p>
        <p>{data.closing || "[Closing paragraph - Express enthusiasm and next steps...]"}</p>
      </div>

      {/* Signature */}
      <div className="text-sm">
        <p>Sincerely,</p>
        <p className="mt-3 font-medium">{data.personalInfo?.fullName || "[Your Name]"}</p>
      </div>
    </div>
  )
}
