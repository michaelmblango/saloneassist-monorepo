"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, FileText, RefreshCw } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { ProfessionalTemplate } from "../cover-letter-templates/professional-template"
import { ModernTemplate } from "../cover-letter-templates/modern-template"
import { ElegantTemplate } from "../cover-letter-templates/elegant-template"
import { SimpleTemplate } from "../cover-letter-templates/simple-template"
import { BoldTemplate } from "../cover-letter-templates/bold-template"
import { MinimalTemplate } from "../cover-letter-templates/minimal-template"

interface CoverLetterPreviewProps {
  data: any
  onSuccess: () => void
  onChangeTemplate?: () => void
}

export function CoverLetterPreview({ data, onSuccess, onChangeTemplate }: CoverLetterPreviewProps) {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const templateComponents: { [key: string]: any } = {
    professional: ProfessionalTemplate,
    modern: ModernTemplate,
    elegant: ElegantTemplate,
    simple: SimpleTemplate,
    bold: BoldTemplate,
    minimal: MinimalTemplate,
  }

  const SelectedTemplateComponent = templateComponents[data.selectedTemplate] || ProfessionalTemplate

  const handleDownload = async () => {
    setIsGeneratingPDF(true)
    try {
      // Import jsPDF dynamically
      const { jsPDF } = await import("jspdf")
      const html2canvas = (await import("html2canvas")).default

      // Get the cover letter template element
      const letterElement = document.querySelector(".cover-letter-template-container")
      if (!letterElement) {
        throw new Error("Cover letter template not found")
      }

      // Convert HTML to canvas
      const canvas = await html2canvas(letterElement as HTMLElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      })

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const imgWidth = 210 // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // Add cover letter content
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, imgWidth, imgHeight)

      // Add watermark at the bottom
      pdf.setFontSize(8)
      pdf.setTextColor(30, 181, 58)
      pdf.text("SALONE", 85, imgHeight - 5)
      pdf.setTextColor(0, 114, 198)
      pdf.text(" ASSIST", 98, imgHeight - 5)

      // Save PDF
      pdf.save(`${data.personalInfo?.fullName || "Cover_Letter"}_${data.companyName || "Letter"}.pdf`)

      toast({
        title: "Cover Letter Downloaded!",
        description: "Your cover letter has been downloaded as PDF successfully.",
        action: (
          <Button variant="outline" size="sm">
            OK
          </Button>
        ),
      })
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const handleSave = () => {
    const coverLetter = {
      id: Date.now().toString(),
      jobTitle: data.jobTitle,
      companyName: data.companyName,
      template: data.selectedTemplate,
      lastUpdated: new Date().toISOString(),
      data,
    }

    const savedLetters = JSON.parse(localStorage.getItem("userCoverLetters") || "[]")
    savedLetters.push(coverLetter)
    localStorage.setItem("userCoverLetters", JSON.stringify(savedLetters))

    toast({
      title: "Cover Letter Saved!",
      description: "Your cover letter is ready to use for job applications.",
      action: (
        <Button variant="outline" size="sm" onClick={() => onSuccess()}>
          View Cover Letters
        </Button>
      ),
    })

    setTimeout(() => {
      onSuccess()
    }, 1500)
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-base sm:text-lg font-semibold">{t("cover_letter.preview_title")}</h3>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" size="sm" onClick={onChangeTemplate} className="text-xs sm:text-sm bg-transparent">
            <RefreshCw className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            {t("cv.change_template")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            disabled={isGeneratingPDF}
            className="text-xs sm:text-sm bg-transparent"
          >
            <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            {isGeneratingPDF ? "Generating..." : t("cv.download_pdf")}
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden shadow-lg">
        <div className="cover-letter-template-container max-h-[800px] overflow-y-auto">
          <SelectedTemplateComponent data={data} />
        </div>
      </Card>

      <div className="flex justify-center">
        <Button onClick={handleSave} className="w-full sm:w-auto bg-[#1EB53A] hover:bg-[#1EB53A]/90">
          <FileText className="mr-2 h-4 w-4" />
          {t("cv.save")}
        </Button>
      </div>
    </div>
  )
}
