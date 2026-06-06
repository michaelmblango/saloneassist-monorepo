"use client"

interface BoldTemplateProps {
  data: any
}

export function BoldTemplate({ data }: BoldTemplateProps) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="mx-auto max-w-3xl space-y-6 bg-white p-12">
      {/* Bold header with background */}
      <div className="bg-red-600 p-6 text-white">
        <h1 className="text-3xl font-bold">{data.personalInfo?.fullName || "[Your Name]"}</h1>
        <p className="mt-2 text-sm opacity-90">
          {data.personalInfo?.email} • {data.personalInfo?.phone} • {data.personalInfo?.location}
        </p>
      </div>

      <div className="text-sm font-medium text-gray-600">{currentDate}</div>

      {/* Recipient */}
      <div className="text-sm text-gray-700">
        <p className="text-base font-bold text-red-600">{data.hiringManager || "[Hiring Manager Name]"}</p>
        <p className="font-semibold">{data.companyName || "[Company Name]"}</p>
        {data.jobTitle && (
          <p className="mt-1 text-xs font-medium text-gray-500">APPLICATION FOR: {data.jobTitle.toUpperCase()}</p>
        )}
      </div>

      {/* Salutation */}
      <p className="text-sm font-bold">Dear {data.hiringManager || "[Hiring Manager]"},</p>

      {/* Content */}
      <div className="space-y-4 text-sm leading-relaxed text-gray-700">
        <p>{data.introduction || "[Introduction paragraph - Express your interest in the position...]"}</p>
        <p>{data.body || "[Body paragraphs - Highlight your qualifications and experience...]"}</p>
        <p>{data.closing || "[Closing paragraph - Express enthusiasm and next steps...]"}</p>
      </div>

      {/* Signature */}
      <div className="text-sm">
        <p className="font-medium">Best regards,</p>
        <p className="mt-4 text-xl font-bold text-red-600">{data.personalInfo?.fullName || "[Your Name]"}</p>
      </div>
    </div>
  )
}
