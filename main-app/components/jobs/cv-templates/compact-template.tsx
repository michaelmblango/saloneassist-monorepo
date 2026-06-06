"use client"

import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin } from "lucide-react"

interface CompactTemplateProps {
  data: any
}

export function CompactTemplate({ data }: CompactTemplateProps) {
  return (
    <div className="min-h-[297mm] bg-white p-8 text-sm">
      {/* Header - Compact */}
      <div className="mb-6 border-b-2 border-gray-900 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">{data.personalInfo?.fullName || "Your Name"}</h1>
        <p className="mt-1 text-base font-medium text-gray-600">
          {data.personalInfo?.professionalTitle || "Professional Title"}
        </p>
        <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-600">
          {data.personalInfo?.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary - Compact */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="mb-2 text-base font-bold uppercase text-gray-900">Summary</h2>
          <p className="text-xs leading-relaxed text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Two Column Layout for Space Efficiency */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Experience - Compact */}
          {data.experience && data.experience.length > 0 && (
            <div>
              <h2 className="mb-3 text-base font-bold uppercase text-gray-900">Experience</h2>
              <div className="space-y-4">
                {data.experience.map((exp: any, index: number) => (
                  <div key={index}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900">{exp.title}</h3>
                        <p className="text-xs text-gray-600">{exp.company}</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </p>
                    </div>
                    {exp.description && <p className="mt-1 text-xs text-gray-700">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Education - Compact */}
          {data.education && data.education.length > 0 && (
            <div>
              <h2 className="mb-3 text-base font-bold uppercase text-gray-900">Education</h2>
              <div className="space-y-3">
                {data.education.map((edu: any, index: number) => (
                  <div key={index}>
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-xs text-gray-600">
                      {edu.field} - {edu.institution}
                    </p>
                    <p className="text-xs text-gray-500">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills - Compact */}
          {data.skills?.technical?.length > 0 && (
            <div>
              <h2 className="mb-3 text-base font-bold uppercase text-gray-900">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.technical.map((skill: any, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Certifications - Compact */}
          {data.certifications && data.certifications.length > 0 && (
            <div>
              <h2 className="mb-3 text-base font-bold uppercase text-gray-900">Certifications</h2>
              <div className="space-y-2">
                {data.certifications.map((cert: any, index: number) => (
                  <div key={index}>
                    <p className="font-medium text-gray-900">{cert.name}</p>
                    <p className="text-xs text-gray-600">
                      {cert.issuer} - {cert.year}
                    </p>
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
