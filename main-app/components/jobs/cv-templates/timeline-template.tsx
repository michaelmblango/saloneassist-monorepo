"use client"

import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Calendar } from "lucide-react"

interface TimelineTemplateProps {
  data: any
}

export function TimelineTemplate({ data }: TimelineTemplateProps) {
  return (
    <div className="min-h-[297mm] bg-white p-12">
      {/* Header */}
      <div className="mb-12 border-b-4 border-indigo-600 pb-6">
        <h1 className="text-5xl font-bold text-gray-900">{data.personalInfo?.fullName || "Your Name"}</h1>
        <p className="mt-2 text-2xl text-indigo-600">{data.personalInfo?.professionalTitle || "Professional Title"}</p>
        <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-600">
          {data.personalInfo?.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo?.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo?.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-12 rounded-lg bg-indigo-50 p-6">
          <h2 className="mb-3 text-xl font-bold text-indigo-900">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Timeline Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-12">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">Career Timeline</h2>
          <div className="relative border-l-4 border-indigo-600 pl-8">
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="relative mb-10 last:mb-0">
                <div className="absolute -left-[42px] flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-indigo-600 text-sm font-bold text-white">
                  {index + 1}
                </div>
                <div className="rounded-lg bg-gray-50 p-6 shadow">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{exp.title}</h3>
                      <p className="font-medium text-indigo-600">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                  </div>
                  {exp.description && <p className="mt-3 text-sm text-gray-700">{exp.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Timeline */}
      {data.education && data.education.length > 0 && (
        <div className="mb-12">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">Education</h2>
          <div className="space-y-6">
            {data.education.map((edu: any, index: number) => (
              <div key={index} className="flex items-start gap-6 rounded-lg bg-gray-50 p-6 shadow">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-2xl font-bold text-white">
                  {edu.graduationYear}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills?.technical?.length > 0 && (
        <div>
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Key Skills</h2>
          <div className="flex flex-wrap gap-3">
            {data.skills.technical.map((skill: any, index: number) => (
              <Badge key={index} className="bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
                {skill.name} - {skill.level}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
