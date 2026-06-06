"use client"

import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

interface ElegantTemplateProps {
  data: any
}

export function ElegantTemplate({ data }: ElegantTemplateProps) {
  return (
    <div className="min-h-[297mm] bg-gradient-to-br from-gray-50 to-white p-12">
      {/* Header with Photo */}
      <div className="mb-8 flex flex-col items-center border-b border-gray-300 pb-6 text-center">
        {data.photo && (
          <div className="mb-4 h-40 w-40 overflow-hidden rounded-full border-4 border-white shadow-lg">
            <Image
              src={data.photo || "/placeholder.svg"}
              alt="Profile"
              width={160}
              height={160}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <h1 className="font-serif text-5xl font-bold text-gray-900">{data.personalInfo?.fullName || "Your Name"}</h1>
        <p className="mt-2 font-serif text-xl italic text-gray-600">
          {data.personalInfo?.professionalTitle || "Professional Title"}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
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
        <div className="mb-8">
          <h2 className="mb-3 font-serif text-2xl font-bold text-gray-900">About Me</h2>
          <p className="text-center text-sm italic leading-relaxed text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 font-serif text-2xl font-bold text-gray-900">Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="rounded-lg bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-gray-900">{exp.title}</h3>
                    <p className="font-medium text-gray-600">{exp.company}</p>
                  </div>
                  <p className="text-sm italic text-gray-500">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </p>
                </div>
                {exp.description && <p className="mt-2 text-sm text-gray-700">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education & Skills in two columns */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div>
            <h2 className="mb-4 font-serif text-2xl font-bold text-gray-900">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu: any, index: number) => (
                <div key={index} className="rounded-lg bg-white p-3 shadow-sm">
                  <h3 className="font-bold text-gray-900">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                  <p className="text-sm italic text-gray-500">{edu.graduationYear}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills?.technical?.length > 0 && (
          <div>
            <h2 className="mb-4 font-serif text-2xl font-bold text-gray-900">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.technical.map((skill: any, index: number) => (
                <Badge key={index} className="bg-gray-800 text-white hover:bg-gray-700">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
