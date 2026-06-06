"use client"

import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

interface BoldTemplateProps {
  data: any
}

export function BoldTemplate({ data }: BoldTemplateProps) {
  return (
    <div className="min-h-[297mm] bg-white">
      {/* Bold Header with Photo */}
      <div className="bg-gradient-to-r from-rose-600 to-orange-600 p-12 text-white">
        <div className="flex items-center gap-8">
          {data.photo && (
            <div className="h-48 w-48 flex-shrink-0 overflow-hidden rounded-full border-8 border-white shadow-2xl">
              <Image
                src={data.photo || "/placeholder.svg"}
                alt="Profile"
                width={192}
                height={192}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-6xl font-black">{data.personalInfo?.fullName || "YOUR NAME"}</h1>
            <p className="mt-3 text-2xl font-bold">{data.personalInfo?.professionalTitle || "Professional Title"}</p>
            <div className="mt-6 flex flex-wrap gap-6">
              {data.personalInfo?.email && (
                <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur">
                  <Mail className="h-5 w-5" />
                  <span>{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo?.phone && (
                <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur">
                  <Phone className="h-5 w-5" />
                  <span>{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo?.location && (
                <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur">
                  <MapPin className="h-5 w-5" />
                  <span>{data.personalInfo.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-12">
        {/* Summary with Bold Styling */}
        {data.summary && (
          <div className="mb-10 border-l-8 border-rose-600 bg-rose-50 p-8">
            <h2 className="mb-4 text-3xl font-black text-gray-900">WHO I AM</h2>
            <p className="text-lg leading-relaxed text-gray-700">{data.summary}</p>
          </div>
        )}

        {/* Experience with Bold Design */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-10">
            <h2 className="mb-6 text-3xl font-black text-gray-900">EXPERIENCE</h2>
            <div className="space-y-8">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="border-l-8 border-orange-600 bg-orange-50 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{exp.title}</h3>
                      <p className="mt-1 text-lg font-semibold text-orange-600">{exp.company}</p>
                    </div>
                    <p className="rounded-full bg-orange-600 px-4 py-2 text-sm font-bold text-white">
                      {exp.startDate} - {exp.current ? "NOW" : exp.endDate}
                    </p>
                  </div>
                  {exp.description && <p className="mt-4 text-sm text-gray-700">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Skills Grid */}
        <div className="grid gap-10 md:grid-cols-2">
          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div>
              <h2 className="mb-6 text-3xl font-black text-gray-900">EDUCATION</h2>
              <div className="space-y-6">
                {data.education.map((edu: any, index: number) => (
                  <div key={index} className="rounded-2xl bg-gradient-to-br from-rose-100 to-orange-100 p-6">
                    <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
                    <p className="mt-1 font-semibold text-rose-600">{edu.field}</p>
                    <p className="mt-2 text-sm text-gray-600">{edu.institution}</p>
                    <p className="mt-1 font-bold text-orange-600">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {data.skills?.technical?.length > 0 && (
            <div>
              <h2 className="mb-6 text-3xl font-black text-gray-900">SKILLS</h2>
              <div className="flex flex-wrap gap-3">
                {data.skills.technical.map((skill: any, index: number) => (
                  <Badge
                    key={index}
                    className="bg-gradient-to-r from-rose-600 to-orange-600 px-6 py-3 text-base font-bold text-white hover:from-rose-700 hover:to-orange-700"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
