"use client"

import type React from "react"
import { Mail, Phone, MapPin, Linkedin } from "lucide-react"
import Image from "next/image"

interface CorporateTemplateProps {
  data: any
}

export function CorporateTemplate({ data }: CorporateTemplateProps) {
  const renderPage = (content: React.ReactNode, pageNumber: number) => (
    <div key={pageNumber} className="min-h-[297mm] bg-white p-12 shadow-lg" style={{ pageBreakAfter: "always" }}>
      {pageNumber === 1 && (
        <>
          {/* Header with Photo */}
          <div className="mb-8 flex items-start gap-6 border-b-2 border-gray-800 pb-6">
            {data.photo && (
              <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg border-2 border-gray-800">
                <Image
                  src={data.photo || "/placeholder.svg"}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900">{data.personalInfo?.fullName || "Your Name"}</h1>
              <p className="mt-2 text-lg font-medium text-gray-600">
                {data.personalInfo?.professionalTitle || "Professional Title"}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600">
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
                {data.personalInfo?.linkedin && (
                  <div className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4" />
                    <span className="truncate">{data.personalInfo.linkedin}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      {content}
      {/* Page Number */}
      <div className="absolute bottom-8 right-12 text-sm text-gray-400">Page {pageNumber}</div>
    </div>
  )

  return (
    <div className="space-y-0">
      {renderPage(
        <>
          {/* Summary */}
          {data.summary && (
            <div className="mb-6">
              <h2 className="mb-3 border-l-4 border-gray-800 pl-3 text-xl font-bold uppercase text-gray-900">
                Professional Summary
              </h2>
              <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="mb-4 border-l-4 border-gray-800 pl-3 text-xl font-bold uppercase text-gray-900">
                Work Experience
              </h2>
              <div className="space-y-5">
                {data.experience.slice(0, 2).map((exp: any, index: number) => (
                  <div key={index}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{exp.title}</h3>
                        <p className="font-medium text-gray-600">{exp.company}</p>
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
        </>,
        1,
      )}
    </div>
  )
}
