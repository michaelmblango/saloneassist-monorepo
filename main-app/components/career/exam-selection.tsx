"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Award, Trophy, GraduationCap } from "lucide-react"

type ExamType = "NPSE" | "BECE" | "WASSCE"

interface ExamSelectionProps {
  onSelect: (type: ExamType) => void
}

export function ExamSelection({ onSelect }: ExamSelectionProps) {
  const exams = [
    {
      type: "NPSE" as ExamType,
      icon: BookOpen,
      title: "NPSE",
      fullName: "National Primary School Examination",
      description: "For students completing primary school",
      color: "bg-blue-500",
    },
    {
      type: "BECE" as ExamType,
      icon: Award,
      title: "BECE",
      fullName: "Basic Education Certificate Examination",
      description: "For students completing junior secondary",
      color: "bg-purple-500",
    },
    {
      type: "WASSCE" as ExamType,
      icon: Trophy,
      title: "WASSCE",
      fullName: "West African Senior School Certificate",
      description: "For students completing senior secondary",
      color: "bg-amber-500",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <Card className="border-[#1EB53A] bg-gradient-to-br from-[#1EB53A]/5 to-[#0072C6]/5">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1EB53A]">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Let's Find Your Perfect Path</CardTitle>
          <CardDescription className="text-base">
            Answer a few questions and get personalized recommendations for university courses and careers
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Exam Selection Cards */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Select Your Exam Type</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {exams.map((exam) => (
            <Card key={exam.type} className="group transition-all hover:shadow-lg">
              <CardHeader>
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-lg ${exam.color}`}>
                  <exam.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">{exam.title}</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">{exam.fullName}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">{exam.description}</p>
                <Button onClick={() => onSelect(exam.type)} className="w-full bg-[#1EB53A] hover:bg-[#1EB53A]/90">
                  Select {exam.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
