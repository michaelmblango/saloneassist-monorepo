"use client"
import { Mail, Phone, MapPin, Award, Briefcase, GraduationCap } from "lucide-react"

interface InfographicTemplateProps {
  data: any
}

export function InfographicTemplate({ data }: InfographicTemplateProps) {
  return (
    <div className="min-h-[297mm] bg-gradient-to-br from-cyan-50 via-white to-purple-50 p-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-4 inline-block rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 p-1">
          <div className="rounded-full bg-white px-8 py-4">
            <h1 className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-5xl font-bold text-transparent">
              {data.personalInfo?.fullName || "Your Name"}
            </h1>
          </div>
        </div>
        <p className="text-xl font-medium text-gray-700">
          {data.personalInfo?.professionalTitle || "Professional Title"}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          {data.personalInfo?.email && (
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow">
              <Mail className="h-4 w-4 text-cyan-500" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo?.phone && (
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow">
              <Phone className="h-4 w-4 text-purple-500" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo?.location && (
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow">
              <MapPin className="h-4 w-4 text-cyan-500" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-cyan-100 to-purple-100 p-6 shadow-lg">
          <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
            <Award className="h-6 w-6 text-purple-600" />
            About Me
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Experience with Icons */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-900">
            <Briefcase className="h-7 w-7 text-cyan-600" />
            Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="rounded-2xl bg-white p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{exp.title}</h3>
                        <p className="font-medium text-cyan-600">{exp.company}</p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </p>
                    </div>
                    {exp.description && <p className="mt-2 text-sm text-gray-700">{exp.description}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education with Icons */}
      {data.education && data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-900">
            <GraduationCap className="h-7 w-7 text-purple-600" />
            Education
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {data.education.map((edu: any, index: number) => (
              <div key={index} className="rounded-2xl bg-white p-6 shadow-lg">
                <h3 className="font-bold text-gray-900">
                  {edu.degree} in {edu.field}
                </h3>
                <p className="mt-1 text-sm text-gray-600">{edu.institution}</p>
                <p className="mt-2 text-sm font-medium text-purple-600">{edu.graduationYear}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills with Progress Bars */}
      {data.skills?.technical?.length > 0 && (
        <div>
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Skills</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {data.skills.technical.map((skill: any, index: number) => (
              <div key={index} className="rounded-xl bg-white p-4 shadow">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium text-gray-900">{skill.name}</span>
                  <span className="text-sm text-gray-500">{skill.level}</span>
                </div>
                <div className="h-2 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
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
    </div>
  )
}
