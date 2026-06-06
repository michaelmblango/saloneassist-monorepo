"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CVPersonalInfo } from "./cv-steps/personal-info"
import { CVSummary } from "./cv-steps/summary"
import { CVExperience } from "./cv-steps/experience"
import { CVEducation } from "./cv-steps/education"
import { CVSkills } from "./cv-steps/skills"
import { CVCertifications } from "./cv-steps/certifications"
import { CVPreview } from "./cv-steps/preview"
import { CVTemplates } from "./cv-steps/templates"
import { useLanguage } from "@/contexts/language-context"

interface CVWizardProps {
  onSuccess: () => void
  onBack?: () => void
  initialData?: any
}

export function CVWizard({ onSuccess, onBack, initialData }: CVWizardProps) {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)
  const [cvData, setCVData] = useState<any>(
    initialData || {
      personalInfo: {},
      summary: "",
      experience: [],
      education: [],
      skills: { technical: [], soft: [], languages: [] },
      certifications: [],
      awards: [],
      selectedTemplate: "modern",
      photo: null,
    },
  )

  const steps = [
    { number: 1, title: t("cv.step.personal"), component: CVPersonalInfo },
    { number: 2, title: t("cv.step.summary"), component: CVSummary },
    { number: 3, title: t("cv.step.experience"), component: CVExperience },
    { number: 4, title: t("cv.step.education"), component: CVEducation },
    { number: 5, title: t("cv.step.skills"), component: CVSkills },
    { number: 6, title: "Certifications", component: CVCertifications },
    { number: 7, title: "Choose Template", component: CVTemplates },
    { number: 8, title: t("cv.step.preview"), component: CVPreview },
  ]

  const CurrentStepComponent = steps[currentStep - 1].component

  const updateCVData = (field: string, value: any) => {
    setCVData((prev: any) => ({ ...prev, [field]: value }))
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
    setCurrentStep(7)
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {t("cv.step_num", { current: currentStep.toString(), total: steps.length.toString() })}:{" "}
            {steps[currentStep - 1].title}
          </h2>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />

        <div className="flex justify-between">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center gap-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                  step.number < currentStep
                    ? "bg-[#1EB53A] text-white"
                    : step.number === currentStep
                      ? "bg-[#1EB53A]/20 text-[#1EB53A] ring-2 ring-[#1EB53A]"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {step.number}
              </div>
              <span className="hidden text-xs text-muted-foreground sm:block">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      <Card className="p-6">
        <CurrentStepComponent
          data={cvData}
          onUpdate={updateCVData}
          onNext={handleNext}
          onSuccess={onSuccess}
          onChangeTemplate={currentStep === 8 ? handleChangeTemplate : undefined}
        />
      </Card>

      {currentStep < steps.length && (
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            {currentStep === 1 ? t("common.cancel") : t("common.back")}
          </Button>
          <Button onClick={handleNext} className="bg-[#1EB53A] hover:bg-[#1EB53A]/90">
            {t("common.continue")}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
