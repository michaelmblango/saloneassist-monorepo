"use client"
import { Mail, Phone, MapPin, Linkedin } from "lucide-react"
import Image from "next/image"

interface SidebarTemplateProps {
  data: any
}

export function SidebarTemplate({ data }: SidebarTemplateProps) {
  return (
    <div className="flex min-h-[297mm] bg-white">
      {/* Sidebar */}
      <div className="w-1/3 bg-gradient-to-b from-[#1EB53A] to-[#16a832] p-8 text-white">
        {/* Photo */}
        {data.photo && (
          <div className="mb-6 overflow-hidden rounded-lg border-4 border-white shadow-lg">
            <Image
              src={data.photo || "/placeholder.svg"}
              alt="Profile"
              width={200}
              height={200}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Contact Info */}
        <div className="mb-8">
          <h3 className="mb-4 border-b-2 border-white pb-2 text-lg font-bold">Contact</h3>
          <div className="space-y-3 text-sm">
            {data.personalInfo?.email && (
              <div className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span className="break-all">{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo?.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo?.location && (
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>{data.personalInfo.location}</span>
              </div>
            )}
            {data.personalInfo?.linkedin && (
              <div className="flex items-start gap-2">
                <Linkedin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span className="break-all text-xs">{data.personalInfo.linkedin}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {data.skills?.technical?.length > 0 && (
          <div className="mb-8">
            <h3 className="mb-4 border-b-2 border-white pb-2 text-lg font-bold">Skills</h3>
            <div className="space-y-3">
              {data.skills.technical.map((skill: any, index: number) => (
                <div key={index}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span>{skill.name}</span>
                    <span>{skill.level}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/30">
                    <div
                      className="h-2 rounded-full bg-white"
                      style={{
                        width:
                          skill.level === "Expert"
                            ? "100%"
                            : skill.level === "Advanced"
                              ? "75%"
                              : skill.level === "Intermediate"
                                ? "50%"
                                : "25%",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.skills?.languages?.length > 0 && (
          <div>
            <h3 className="mb-4 border-b-2 border-white pb-2 text-lg font-bold">Languages</h3>
            <div className="space-y-2 text-sm">
              {data.skills.languages.map((lang: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <span>{lang.name}</span>
                  <span className="text-xs">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">{data.personalInfo?.fullName || "Your Name"}</h1>
          <p className="mt-2 text-xl text-[#1EB53A]">{data.personalInfo?.professionalTitle || "Professional Title"}</p>
        </div>

        {/* Summary */}
        {data.summary && (
          <div className="mb-8">
            <h2 className="mb-3 text-xl font-bold text-gray-900">Professional Summary</h2>
            <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Work Experience</h2>
            <div className="space-y-6">
              {data.experience.map((exp: any, index: number) => (
                <div key={index}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">{exp.title}</h3>
                      <p className="text-sm font-medium text-[#1EB53A]">{exp.company}</p>
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
          <div>
            <h2 className="mb-4 text-xl font-bold text-gray-900">Education</h2>
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
        )}
      </div>
    </div>
  )
}
