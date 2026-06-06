"use client"

interface MinimalTemplateProps {
  data: any
}

export function MinimalTemplate({ data }: MinimalTemplateProps) {
  return (
    <div className="space-y-8 bg-white p-8">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-light text-gray-900">{data.personalInfo?.fullName || "Your Name"}</h1>
        <p className="mt-2 text-lg text-[#1EB53A]">{data.personalInfo?.professionalTitle || "Professional Title"}</p>
        <div className="mt-4 space-y-1 text-sm text-gray-500">
          {data.personalInfo?.email && <p>{data.personalInfo.email}</p>}
          {data.personalInfo?.phone && <p>{data.personalInfo.phone}</p>}
          {data.personalInfo?.location && <p>{data.personalInfo.location}</p>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div>
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div>
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-400">Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp: any, index: number) => (
              <div key={index}>
                <div className="mb-1 flex items-baseline justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{exp.title}</h3>
                  <p className="text-sm text-gray-400">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </p>
                </div>
                <p className="text-sm text-gray-500">{exp.company}</p>
                {exp.description && <p className="mt-2 text-sm text-gray-600">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div>
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-400">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu: any, index: number) => (
              <div key={index}>
                <div className="mb-1 flex items-baseline justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-sm text-gray-400">{edu.graduationYear}</p>
                </div>
                <p className="text-sm text-gray-500">{edu.institution}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills?.technical?.length > 0 && (
        <div>
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-400">Skills</h2>
          <div className="grid grid-cols-3 gap-4">
            {data.skills.technical.map((skill: any, index: number) => (
              <div key={index}>
                <p className="text-sm font-medium text-gray-900">{skill.name}</p>
                <p className="text-xs text-gray-500">{skill.level}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
