"use client"

import { Badge } from "@/components/ui/badge"

interface CreativeTemplateProps {
  data: any
}

export function CreativeTemplate({ data }: CreativeTemplateProps) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-white p-8">
      {/* Header with colored background */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="relative z-10">
          <h1 className="text-4xl font-bold">{data.personalInfo?.fullName || "Your Name"}</h1>
          <p className="mt-2 text-xl font-medium opacity-90">
            {data.personalInfo?.professionalTitle || "Professional Title"}
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo?.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo?.location && <span>{data.personalInfo.location}</span>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-bold text-purple-600">About Me</h2>
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-purple-600">Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.title}</h3>
                    <p className="text-sm font-medium text-purple-600">{exp.company}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </p>
                </div>
                {exp.description && <p className="mt-2 text-sm text-gray-700">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-purple-600">Education</h2>
          <div className="space-y-3">
            {data.education.map((edu: any, index: number) => (
              <div key={index} className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-900">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                </div>
                <p className="text-sm text-gray-500">{edu.graduationYear}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills?.technical?.length > 0 && (
        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-purple-600">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.technical.map((skill: any, index: number) => (
              <Badge key={index} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
