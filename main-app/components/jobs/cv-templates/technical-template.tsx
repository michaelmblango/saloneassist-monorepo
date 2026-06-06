"use client"

interface TechnicalTemplateProps {
  data: any
}

export function TechnicalTemplate({ data }: TechnicalTemplateProps) {
  return (
    <div className="bg-slate-50 p-8 font-mono">
      {/* Header */}
      <div className="rounded-lg border-2 border-cyan-600 bg-slate-900 p-6 text-cyan-400">
        <p className="text-sm opacity-70">// Developer Profile</p>
        <h1 className="mt-2 text-3xl font-bold">{data.personalInfo?.fullName || "Your Name"}</h1>
        <p className="mt-1 text-lg text-cyan-300">{data.personalInfo?.professionalTitle || "Professional Title"}</p>
        <div className="mt-4 space-y-1 text-sm">
          {data.personalInfo?.email && <p>email: {data.personalInfo.email}</p>}
          {data.personalInfo?.phone && <p>phone: {data.personalInfo.phone}</p>}
          {data.personalInfo?.location && <p>location: {data.personalInfo.location}</p>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mt-6 rounded-lg border-l-4 border-cyan-600 bg-white p-6">
          <p className="mb-2 text-sm font-bold text-cyan-600">{"/* Summary */"}</p>
          <p className="text-sm text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mt-6 rounded-lg border-l-4 border-cyan-600 bg-white p-6">
          <p className="mb-4 text-sm font-bold text-cyan-600">{"/* Experience */"}</p>
          <div className="space-y-4">
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="rounded bg-slate-50 p-4">
                <div className="mb-2 flex items-baseline justify-between">
                  <p className="font-bold text-gray-900">const position = "{exp.title}"</p>
                  <p className="text-sm text-gray-500">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </p>
                </div>
                <p className="text-sm text-cyan-600">company: {exp.company}</p>
                {exp.description && <p className="mt-2 text-sm text-gray-600">// {exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mt-6 rounded-lg border-l-4 border-cyan-600 bg-white p-6">
          <p className="mb-4 text-sm font-bold text-cyan-600">{"/* Education */"}</p>
          <div className="space-y-3">
            {data.education.map((edu: any, index: number) => (
              <div key={index} className="text-sm">
                <p className="font-bold text-gray-900">
                  {edu.degree} in {edu.field}
                </p>
                <p className="text-gray-600">
                  {edu.institution} - {edu.graduationYear}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills?.technical?.length > 0 && (
        <div className="mt-6 rounded-lg border-l-4 border-cyan-600 bg-white p-6">
          <p className="mb-4 text-sm font-bold text-cyan-600">{"/* Technical Stack */"}</p>
          <div className="grid grid-cols-2 gap-3">
            {data.skills.technical.map((skill: any, index: number) => (
              <div key={index} className="rounded bg-slate-900 p-3 text-cyan-400">
                <p className="text-sm">
                  {skill.name}: <span className="text-cyan-300">{skill.level}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
