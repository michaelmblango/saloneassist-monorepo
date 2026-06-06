"use client"

import { Separator } from "@/components/ui/separator"

interface ClassicTemplateProps {
  data: any
}

export function ClassicTemplate({ data }: ClassicTemplateProps) {
  return (
    <div className="space-y-4 bg-white p-8 font-serif">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold uppercase tracking-wide text-gray-900">
          {data.personalInfo?.fullName || "Your Name"}
        </h1>
        <p className="mt-2 text-lg text-gray-700">{data.personalInfo?.professionalTitle || "Professional Title"}</p>
        <div className="mt-3 flex flex-wrap justify-center gap-2 text-sm text-gray-600">
          {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span>•</span>}
          {data.personalInfo?.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo?.location && <span>•</span>}
          {data.personalInfo?.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>

      <Separator className="my-4" />

      {/* Summary */}
      {data.summary && (
        <div>
          <h2 className="mb-2 border-b-2 border-gray-800 pb-1 text-lg font-bold uppercase text-gray-900">Summary</h2>
          <p className="text-sm text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div>
          <h2 className="mb-3 border-b-2 border-gray-800 pb-1 text-lg font-bold uppercase text-gray-900">
            Professional Experience
          </h2>
          <div className="space-y-3">
            {data.experience.map((exp: any, index: number) => (
              <div key={index}>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-bold text-gray-900">{exp.title}</h3>
                  <p className="text-sm text-gray-600">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </p>
                </div>
                <p className="text-sm italic text-gray-700">{exp.company}</p>
                {exp.description && <p className="mt-1 text-sm text-gray-600">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div>
          <h2 className="mb-3 border-b-2 border-gray-800 pb-1 text-lg font-bold uppercase text-gray-900">Education</h2>
          <div className="space-y-2">
            {data.education.map((edu: any, index: number) => (
              <div key={index}>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-bold text-gray-900">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-sm text-gray-600">{edu.graduationYear}</p>
                </div>
                <p className="text-sm text-gray-700">{edu.institution}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills?.technical?.length > 0 && (
        <div>
          <h2 className="mb-3 border-b-2 border-gray-800 pb-1 text-lg font-bold uppercase text-gray-900">Skills</h2>
          <p className="text-sm text-gray-700">
            {data.skills.technical.map((skill: any, index: number) => (
              <span key={index}>
                {skill.name} ({skill.level}){index < data.skills.technical.length - 1 ? " • " : ""}
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  )
}
