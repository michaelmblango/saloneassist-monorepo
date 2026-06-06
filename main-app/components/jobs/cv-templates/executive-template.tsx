"use client"

interface ExecutiveTemplateProps {
  data: any
}

export function ExecutiveTemplate({ data }: ExecutiveTemplateProps) {
  return (
    <div className="bg-white">
      {/* Header with gold accent */}
      <div className="border-b-4 border-amber-600 bg-gray-50 p-8">
        <h1 className="text-4xl font-bold text-gray-900">{data.personalInfo?.fullName || "Your Name"}</h1>
        <p className="mt-2 text-xl text-amber-700">{data.personalInfo?.professionalTitle || "Professional Title"}</p>
      </div>

      <div className="grid gap-8 p-8 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Contact */}
          <div>
            <h3 className="mb-3 border-b border-amber-600 pb-2 text-sm font-bold uppercase tracking-wide text-gray-700">
              Contact
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              {data.personalInfo?.email && <p>{data.personalInfo.email}</p>}
              {data.personalInfo?.phone && <p>{data.personalInfo.phone}</p>}
              {data.personalInfo?.location && <p>{data.personalInfo.location}</p>}
            </div>
          </div>

          {/* Skills */}
          {data.skills?.technical?.length > 0 && (
            <div>
              <h3 className="mb-3 border-b border-amber-600 pb-2 text-sm font-bold uppercase tracking-wide text-gray-700">
                Core Competencies
              </h3>
              <div className="space-y-2">
                {data.skills.technical.map((skill: any, index: number) => (
                  <div key={index} className="text-sm">
                    <p className="font-medium text-gray-900">{skill.name}</p>
                    <p className="text-xs text-gray-500">{skill.level}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Summary */}
          {data.summary && (
            <div>
              <h3 className="mb-3 border-b border-amber-600 pb-2 text-sm font-bold uppercase tracking-wide text-gray-700">
                Executive Profile
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <div>
              <h3 className="mb-4 border-b border-amber-600 pb-2 text-sm font-bold uppercase tracking-wide text-gray-700">
                Professional Experience
              </h3>
              <div className="space-y-5">
                {data.experience.map((exp: any, index: number) => (
                  <div key={index}>
                    <div className="mb-1 flex items-baseline justify-between">
                      <h4 className="text-lg font-bold text-gray-900">{exp.title}</h4>
                      <p className="text-sm text-gray-500">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </p>
                    </div>
                    <p className="mb-2 text-sm font-medium text-amber-700">{exp.company}</p>
                    {exp.description && <p className="text-sm text-gray-600">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div>
              <h3 className="mb-4 border-b border-amber-600 pb-2 text-sm font-bold uppercase tracking-wide text-gray-700">
                Education
              </h3>
              <div className="space-y-3">
                {data.education.map((edu: any, index: number) => (
                  <div key={index}>
                    <div className="flex items-baseline justify-between">
                      <h4 className="font-bold text-gray-900">
                        {edu.degree} in {edu.field}
                      </h4>
                      <p className="text-sm text-gray-500">{edu.graduationYear}</p>
                    </div>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
