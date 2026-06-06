"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CoverLetterJobInfo } from "./cover-letter-steps/job-info"
import { CoverLetterContent } from "./cover-letter-steps/content"
import { CoverLetterTemplates } from "./cover-letter-steps/templates"
import { CoverLetterPreview } from "./cover-letter-steps/preview"
import { useLanguage } from "@/contexts/language-context"

interface CoverLetterWizardProps {
  onSuccess: () => void
  onBack?: () => void
}

export function CoverLetterWizard({ onSuccess, onBack }: CoverLetterWizardProps) {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)
  const [letterData, setLetterData] = useState<any>(() => {
    const savedProfile = localStorage.getItem("userProfile")
    const personalInfo = savedProfile ? JSON.parse(savedProfile) : {}

    return {
      jobTitle: "",
      companyName: "",
      hiringManager: "",
      introduction: "",
      body: "",
      closing: "",
      selectedTemplate: "professional",
      personalInfo,
    }
  })

  const steps = [
    { number: 1, title: t("cover_letter.step.job_info"), component: CoverLetterJobInfo },
    { number: 2, title: t("cover_letter.step.content"), component: CoverLetterContent },
    { number: 3, title: t("cover_letter.step.template"), component: CoverLetterTemplates },
    { number: 4, title: t("cover_letter.step.preview"), component: CoverLetterPreview },
  ]

  const CurrentStepComponent = steps[currentStep - 1].component

  const updateLetterData = (field: string, value: any) => {
    setLetterData((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep === 1 && onBack) {
      onBack()
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleChangeTemplate = () => {
    setCurrentStep(3)
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
            {t("cv.step_num", { current: currentStep.toString(), total: steps.length.toString() })}:{" "}
            {steps[currentStep - 1].title}
          </h2>
          <span className="text-xs sm:text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="p-4 sm:p-6">
        <CurrentStepComponent
          data={letterData}
          onUpdate={updateLetterData}
          onNext={handleNext}
          onSuccess={onSuccess}
          onChangeTemplate={currentStep === 4 ? handleChangeTemplate : undefined}
        />
      </Card>

      {currentStep < steps.length && (
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
          <Button variant="outline" onClick={handleBack} className="w-full sm:w-auto bg-transparent">
            <ChevronLeft className="mr-2 h-4 w-4" />
            {currentStep === 1 ? t("common.cancel") : t("common.back")}
          </Button>
          <Button onClick={handleNext} className="w-full sm:w-auto bg-[#1EB53A] hover:bg-[#1EB53A]/90">
            {t("common.continue")}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
