"use client"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin } from "lucide-react"

interface ModernTemplateProps {
  data: any
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  return (
    <div className="space-y-6 bg-white p-8">
      {/* Header */}
      <div className="border-l-4 border-blue-500 pl-6">
        <h1 className="text-4xl font-bold text-gray-900">{data.personalInfo?.fullName || "Your Name"}</h1>
        <p className="mt-2 text-xl font-medium text-blue-600">
          {data.personalInfo?.professionalTitle || "Professional Title"}
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
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
        <>
          <Separator />
          <div>
            <h2 className="mb-3 text-xl font-bold text-blue-600">Professional Summary</h2>
            <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
          </div>
        </>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <>
          <Separator />
          <div>
            <h2 className="mb-4 text-xl font-bold text-blue-600">Work Experience</h2>
            <div className="space-y-5">
              {data.experience.map((exp: any, index: number) => (
                <div
                  key={index}
                  className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-3 before:w-3 before:rounded-full before:bg-blue-500"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">{exp.title}</h3>
                      <p className="text-sm font-medium text-gray-600">{exp.company}</p>
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
        </>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <>
          <Separator />
          <div>
            <h2 className="mb-4 text-xl font-bold text-blue-600">Education</h2>
            <div className="space-y-4">
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
        </>
      )}

      {/* Skills */}
      {data.skills?.technical?.length > 0 && (
        <>
          <Separator />
          <div>
            <h2 className="mb-4 text-xl font-bold text-blue-600">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.technical.map((skill: any, index: number) => (
                <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-700">
                  {skill.name} • {skill.level}
                </Badge>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
