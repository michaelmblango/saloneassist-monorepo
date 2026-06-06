"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, Share2, CheckCircle2, FileText, Edit } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ModernTemplate } from "../cv-templates/modern-template"
import { ClassicTemplate } from "../cv-templates/classic-template"
import { CreativeTemplate } from "../cv-templates/creative-template"
import { MinimalTemplate } from "../cv-templates/minimal-template"
import { ExecutiveTemplate } from "../cv-templates/executive-template"
import { TechnicalTemplate } from "../cv-templates/technical-template"
import { CorporateTemplate } from "../cv-templates/corporate-template"
import { ElegantTemplate } from "../cv-templates/elegant-template"
import { SidebarTemplate } from "../cv-templates/sidebar-template"
import { BoldTemplate } from "../cv-templates/bold-template"
import { InfographicTemplate } from "../cv-templates/infographic-template"
import { TimelineTemplate } from "../cv-templates/timeline-template"

interface CVPreviewProps {
  data: any
  onUpdate: (field: string, value: any) => void
  onSuccess: () => void
  onChangeTemplate?: () => void
}

export function CVPreview({ data, onUpdate, onSuccess, onChangeTemplate }: CVPreviewProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(data.selectedTemplate || "modern")
  const { toast } = useToast()
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const calculateScore = () => {
    let score = 0
    const checks = {
      hasPersonalInfo: data.personalInfo?.fullName && data.personalInfo?.email && data.personalInfo?.phone,
      hasSummary: data.summary && data.summary.length > 50,
      hasExperience: data.experience && data.experience.length > 0,
      hasEducation: data.education && data.education.length > 0,
      hasSkills: data.skills?.technical?.length > 3,
    }

    if (checks.hasPersonalInfo) score += 20
    if (checks.hasSummary) score += 20
    if (checks.hasExperience) score += 20
    if (checks.hasEducation) score += 20
    if (checks.hasSkills) score += 20

    return { score, checks }
  }

  const { score, checks } = calculateScore()

  const generatePDF = async () => {
    setIsGeneratingPDF(true)
    try {
      // Import jsPDF dynamically
      const { jsPDF } = await import("jspdf")
      const html2canvas = (await import("html2canvas")).default

      // Get the CV template element
      const cvElement = document.querySelector(".cv-template-container")
      if (!cvElement) {
        throw new Error("CV template not found")
      }

      // Convert HTML to canvas
      const canvas = await html2canvas(cvElement as HTMLElement, {
        scale: 2,
        useCORS: true,
        logging: false,
      })

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const imgWidth = 210 // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // Add CV content
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, imgWidth, imgHeight)

      // Add watermark at the bottom (subtle)
      pdf.setFontSize(8)
      pdf.setTextColor(30, 181, 58) // Green color
      pdf.text("SALONE", 85, imgHeight - 5)
      pdf.setTextColor(0, 114, 198) // Blue color
      pdf.text(" ASSIST", 98, imgHeight - 5)

      // Save PDF
      pdf.save(`${data.personalInfo?.fullName || "CV"}_${selectedTemplate}.pdf`)

      toast({
        title: "CV Downloaded!",
        description: "Your CV has been downloaded as PDF successfully.",
        action: (
          <Button variant="outline" size="sm" onClick={() => {}}>
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

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${data.personalInfo?.fullName}'s CV`,
          text: `Check out my professional CV - ${data.personalInfo?.professionalTitle || "Professional"}`,
          url: window.location.href,
        })
        toast({
          title: "CV Shared!",
          description: "CV link shared successfully.",
        })
      } else {
        // Fallback: Copy link to clipboard
        await navigator.clipboard.writeText(window.location.href)
        toast({
          title: "Link Copied!",
          description: "CV link copied to clipboard.",
          action: (
            <Button variant="outline" size="sm" onClick={() => {}}>
              OK
            </Button>
          ),
        })
      }
    } catch (error) {
      toast({
        title: "Share Failed",
        description: "Failed to share CV. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSave = () => {
    const cv = {
      id: Date.now().toString(),
      name: `${data.personalInfo?.professionalTitle || "Untitled"} CV`,
      lastUpdated: new Date().toISOString(),
      score,
      template: selectedTemplate,
      isPrimary: false,
      data,
    }

    const savedCVs = JSON.parse(localStorage.getItem("userCVs") || "[]")
    savedCVs.push(cv)
    localStorage.setItem("userCVs", JSON.stringify(savedCVs))

    toast({
      title: "CV Saved Successfully!",
      description: "Your CV is ready to use for job applications.",
      action: (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            onSuccess()
          }}
        >
          View CVs
        </Button>
      ),
    })

    setTimeout(() => {
      onSuccess()
    }, 1500)
  }

  const templateComponents: { [key: string]: any } = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    creative: CreativeTemplate,
    minimal: MinimalTemplate,
    executive: ExecutiveTemplate,
    technical: TechnicalTemplate,
    corporate: CorporateTemplate,
    elegant: ElegantTemplate,
    sidebar: SidebarTemplate,
    bold: BoldTemplate,
    infographic: InfographicTemplate,
    timeline: TimelineTemplate,
  }

  const SelectedTemplateComponent = templateComponents[selectedTemplate] || ModernTemplate

  const templateNames: { [key: string]: string } = {
    modern: "Modern Professional",
    classic: "Classic Traditional",
    creative: "Creative Bold",
    minimal: "Minimal Clean",
    executive: "Executive Premium",
    technical: "Technical Structured",
    corporate: "Corporate Professional",
    elegant: "Elegant Centered",
    sidebar: "Sidebar Layout",
    bold: "Bold Impact",
    infographic: "Infographic Style",
    timeline: "Timeline Format",
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Preview & Download</h3>
        <p className="text-sm text-muted-foreground">Review your CV and download when ready</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - CV Score & Suggestions */}
        <div className="space-y-6">
          <Card className="p-6">
            <h4 className="mb-4 font-semibold">CV Score</h4>
            <div className="flex flex-col items-center gap-4">
              <div className="relative h-32 w-32">
                <svg className="h-32 w-32 -rotate-90 transform">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-muted"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - score / 100)}`}
                    className="text-[#1EB53A]"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-[#1EB53A]">{score}</span>
                  <span className="text-xs text-muted-foreground">/100</span>
                </div>
              </div>

              <div className="w-full space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Completeness:</span>
                  <span className="font-medium text-[#1EB53A]">
                    {checks.hasPersonalInfo && checks.hasSummary && checks.hasExperience ? "90%" : "60%"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Keywords:</span>
                  <span className="font-medium text-[#1EB53A]">{checks.hasSkills ? "85%" : "40%"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Formatting:</span>
                  <span className="font-medium text-[#1EB53A]">95%</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="mb-3 font-semibold">AI Suggestions</h4>
            <div className="space-y-3 text-sm">
              {!checks.hasSkills && (
                <div className="flex gap-2 text-muted-foreground">
                  <span>•</span>
                  <span>Add 2 more skills to increase match rate</span>
                </div>
              )}
              {!checks.hasExperience && (
                <div className="flex gap-2 text-muted-foreground">
                  <span>•</span>
                  <span>Add work experience for better results</span>
                </div>
              )}
              {score === 100 && (
                <div className="flex gap-2 text-[#1EB53A]">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Your CV looks great!</span>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="font-semibold">Selected Template</h4>
              {onChangeTemplate && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onChangeTemplate}
                  className="h-8 text-[#1EB53A] hover:text-[#1EB53A]/90"
                >
                  <Edit className="mr-1 h-3 w-3" />
                  Change
                </Button>
              )}
            </div>
            <div className="rounded-lg bg-muted p-3">
              <p className="font-medium">{templateNames[selectedTemplate] || "Modern Professional"}</p>
              <p className="text-sm text-muted-foreground">
                {selectedTemplate === "modern" && "Clean and contemporary design"}
                {selectedTemplate === "classic" && "Traditional format"}
                {selectedTemplate === "creative" && "Stand out design"}
                {selectedTemplate === "minimal" && "Simple and elegant"}
                {selectedTemplate === "executive" && "Sophisticated design"}
                {selectedTemplate === "technical" && "Data-focused layout"}
                {selectedTemplate === "corporate" && "Traditional corporate style"}
                {selectedTemplate === "elegant" && "Sophisticated centered layout"}
                {selectedTemplate === "sidebar" && "Modern two-column design"}
                {selectedTemplate === "bold" && "High-impact design"}
                {selectedTemplate === "infographic" && "Visual-heavy with icons"}
                {selectedTemplate === "timeline" && "Chronological timeline layout"}
              </p>
            </div>
          </Card>
        </div>

        {/* Right Column - CV Preview with Multi-page Support */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="cv-template-container max-h-[800px] overflow-y-auto">
              <SelectedTemplateComponent data={data} />
            </div>
          </Card>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={handleSave} className="flex-1 bg-[#1EB53A] hover:bg-[#1EB53A]/90">
              <FileText className="mr-2 h-4 w-4" />
              Save CV
            </Button>
            <Button variant="outline" onClick={generatePDF} disabled={isGeneratingPDF}>
              <Download className="mr-2 h-4 w-4" />
              {isGeneratingPDF ? "Generating..." : "Download PDF"}
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
