"use client"

interface ElegantTemplateProps {
  data: any
}

export function ElegantTemplate({ data }: ElegantTemplateProps) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="mx-auto max-w-3xl space-y-6 bg-white p-12">
      {/* Centered header */}
      <div className="text-center">
        <h1 className="text-3xl font-serif font-bold text-purple-900">
          {data.personalInfo?.fullName || "[Your Name]"}
        </h1>
        <div className="mx-auto mt-2 h-0.5 w-20 bg-purple-300" />
        <p className="mt-2 text-xs text-gray-600">
          {data.personalInfo?.email} • {data.personalInfo?.phone} • {data.personalInfo?.location}
        </p>
      </div>

      <div className="text-center text-xs text-gray-500">{currentDate}</div>

      {/* Recipient */}
      <div className="text-center text-sm text-gray-700">
        <p className="font-semibold">{data.hiringManager || "[Hiring Manager Name]"}</p>
        <p className="italic">{data.companyName || "[Company Name]"}</p>
      </div>

      <div className="mx-auto h-px w-32 bg-purple-200" />

      {/* Salutation */}
      <p className="text-center text-sm font-medium">Dear {data.hiringManager || "[Hiring Manager]"},</p>

      {/* Content */}
      <div className="space-y-4 text-sm leading-loose text-gray-700">
        <p className="text-justify">
          {data.introduction || "[Introduction paragraph - Express your interest in the position...]"}
        </p>
        <p className="text-justify">
          {data.body || "[Body paragraphs - Highlight your qualifications and experience...]"}
        </p>
        <p className="text-justify">{data.closing || "[Closing paragraph - Express enthusiasm and next steps...]"}</p>
      </div>

      {/* Signature */}
      <div className="text-center text-sm">
        <p className="italic">Sincerely,</p>
        <p className="mt-4 font-serif text-lg font-bold text-purple-900">
          {data.personalInfo?.fullName || "[Your Name]"}
        </p>
      </div>
    </div>
  )
}
