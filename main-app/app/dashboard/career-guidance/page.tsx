"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, BookOpen, Award, Trophy, Check, MessageCircle, ArrowLeft } from "lucide-react"
import { ExamSelection } from "@/components/career/exam-selection"
import { ResultsEntry } from "@/components/career/results-entry"
import { AptitudeQuiz } from "@/components/career/aptitude-quiz"
import { CareerResults } from "@/components/career/career-results"
import { AICounselor } from "@/components/career/ai-counselor"
import { useLanguage } from "@/contexts/language-context"

type ExamType = "NPSE" | "BECE" | "WASSCE" | null

export default function CareerGuidancePage() {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)
  const [examType, setExamType] = useState<ExamType>(null)
  const [subjects, setSubjects] = useState<Array<{ subject: string; grade: string }>>([])
  const [examYear, setExamYear] = useState("")
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({})
  const [showChat, setShowChat] = useState(false)
  const router = useRouter()

  const steps = [
    { number: 1, title: t("career.steps.exam_type"), icon: GraduationCap },
    { number: 2, title: t("career.steps.results"), icon: BookOpen },
    { number: 3, title: t("career.steps.quiz"), icon: Award },
    { number: 4, title: t("career.steps.recommendations"), icon: Trophy },
  ]

  const handleExamSelect = (type: ExamType) => {
    setExamType(type)
    setCurrentStep(2)
  }

  const handleResultsSubmit = (data: { subjects: Array<{ subject: string; grade: string }>; year: string }) => {
    setSubjects(data.subjects)
    setExamYear(data.year)
    setCurrentStep(3)
  }

  const handleQuizComplete = (answers: Record<number, string>) => {
    setQuizAnswers(answers)
    setCurrentStep(4)
  }

  const handleSkipQuiz = () => {
    setCurrentStep(4)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("common.back_to_dashboard")}
          </Button>
          <div className="mb-2 text-xs sm:text-sm text-muted-foreground">
            {t("common.dashboard")} &gt; {t("career.title")}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">{t("career.title")}</h1>
          <p className="mt-1 text-sm sm:text-base text-muted-foreground">{t("career.subtitle")}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <Card className="mb-6 sm:mb-8">
          <CardContent className="pt-4 sm:pt-6 px-2 sm:px-6">
            <div className="flex items-center justify-between overflow-x-auto">
              {steps.map((step, index) => (
                <div key={step.number} className="flex flex-1 items-center min-w-0">
                  <div className="flex flex-col items-center gap-2 px-1 sm:px-2">
                    <div
                      className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 ${
                        currentStep >= step.number
                          ? "border-[#1EB53A] bg-[#1EB53A] text-white"
                          : "border-gray-300 bg-white text-gray-400"
                      }`}
                    >
                      {currentStep > step.number ? (
                        <Check className="h-5 w-5 sm:h-6 sm:w-6" />
                      ) : (
                        <step.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] sm:text-xs font-medium text-muted-foreground hidden sm:block">
                        Step {step.number}
                      </p>
                      <p
                        className={`text-[10px] sm:text-sm font-semibold truncate max-w-[80px] sm:max-w-none ${currentStep >= step.number ? "text-[#1EB53A]" : "text-gray-400"}`}
                      >
                        {step.title}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="mx-2 sm:mx-4 flex-1 min-w-[20px] sm:min-w-[40px]">
                      <div className={`h-1 rounded ${currentStep > step.number ? "bg-[#1EB53A]" : "bg-gray-200"}`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        {currentStep === 1 && <ExamSelection onSelect={handleExamSelect} />}
        {currentStep === 2 && examType && (
          <ResultsEntry examType={examType} onSubmit={handleResultsSubmit} onBack={() => setCurrentStep(1)} />
        )}
        {currentStep === 3 && (
          <AptitudeQuiz onComplete={handleQuizComplete} onSkip={handleSkipQuiz} onBack={() => setCurrentStep(2)} />
        )}
        {currentStep === 4 && (
          <CareerResults
            examType={examType!}
            subjects={subjects}
            examYear={examYear}
            quizAnswers={quizAnswers}
            onStartOver={() => {
              setCurrentStep(1)
              setExamType(null)
              setSubjects([])
              setExamYear("")
              setQuizAnswers({})
            }}
          />
        )}
      </div>

      {/* AI Counselor Chat Button */}
      {currentStep === 4 && (
        <Button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#1EB53A] shadow-lg hover:bg-[#1EB53A]/90"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* AI Counselor Modal */}
      {showChat && <AICounselor onClose={() => setShowChat(false)} />}
    </div>
  )
}
