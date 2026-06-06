"use client"

interface MinimalTemplateProps {
  data: any
}

export function MinimalTemplate({ data }: MinimalTemplateProps) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="mx-auto max-w-3xl space-y-8 bg-white p-12 font-light">
      {/* Minimal header */}
      <div className="space-y-1">
        <p className="text-2xl tracking-wide">{data.personalInfo?.fullName || "[Your Name]"}</p>
        <p className="text-xs tracking-wider text-gray-500">
          {[data.personalInfo?.email, data.personalInfo?.phone, data.personalInfo?.location]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>

      <div className="text-xs text-gray-500">{currentDate}</div>

      {/* Recipient */}
      <div className="space-y-0.5 text-sm text-gray-700">
        <p>{data.hiringManager || "[Hiring Manager Name]"}</p>
        <p>{data.companyName || "[Company Name]"}</p>
      </div>

      {/* Salutation */}
      <p className="text-sm">Dear {data.hiringManager || "[Hiring Manager]"},</p>

      {/* Content */}
      <div className="space-y-5 text-sm leading-loose text-gray-700">
        <p>{data.introduction || "[Introduction paragraph - Express your interest in the position...]"}</p>
        <p>{data.body || "[Body paragraphs - Highlight your qualifications and experience...]"}</p>
        <p>{data.closing || "[Closing paragraph - Express enthusiasm and next steps...]"}</p>
      </div>

      {/* Signature */}
      <div className="text-sm">
        <p>Sincerely,</p>
        <p className="mt-6 tracking-wide">{data.personalInfo?.fullName || "[Your Name]"}</p>
      </div>
    </div>
  )
}
