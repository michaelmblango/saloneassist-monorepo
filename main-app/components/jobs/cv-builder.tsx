"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Upload, X } from "lucide-react"
import { CVWizard } from "./cv-wizard"
import { useLanguage } from "@/contexts/language-context"

interface CVBuilderProps {
  onSuccess: () => void
}

export function CVBuilder({ onSuccess }: CVBuilderProps) {
  const { t } = useLanguage()
  const [started, setStarted] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [parsedCVData, setParsedCVData] = useState<any>(null)

  const handleFileUpload = useCallback((file: File) => {
    if (
      file.type === "application/pdf" ||
      file.type === "application/msword" ||
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setUploadedFile(file)
      console.log("[v0] CV uploaded:", file.name)

      // In a real app, you would parse the CV here and extract data
      // For now, we'll simulate parsed data
      const mockParsedData = {
        personalInfo: {
          fullName: "Sample Name",
          email: "sample@email.com",
          phone: "+232 XX XXX XXX",
          location: "Freetown, Sierra Leone",
        },
        summary: "Experienced professional with demonstrated skills...",
        experience: [],
        education: [],
        skills: { technical: [], soft: [], languages: [] },
      }
      setParsedCVData(mockParsedData)
    } else {
      alert("Please upload a PDF or Word document")
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) {
        handleFileUpload(file)
      }
    },
    [handleFileUpload],
  )

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
    setParsedCVData(null)
  }

  const handleEditUploadedCV = () => {
    setStarted(true)
  }

  if (!started) {
    return (
      <div className="flex min-h-[600px] items-center justify-center">
        <div className="max-w-md space-y-6 text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-[#1EB53A]/10 p-6">
              <FileText className="h-16 w-16 text-[#1EB53A]" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold">{t("cv.build.title")}</h2>
            <p className="mt-2 text-muted-foreground">{t("cv.build.subtitle")}</p>
          </div>
          <div className="space-y-3">
            <Button onClick={() => setStarted(true)} className="w-full bg-[#1EB53A] hover:bg-[#1EB53A]/90">
              {t("cv.build.start")}
            </Button>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative rounded-lg border-2 border-dashed p-6 transition-colors ${
                isDragging ? "border-[#1EB53A] bg-[#1EB53A]/5" : "border-gray-300 hover:border-[#1EB53A]/50"
              }`}
            >
              <input
                type="file"
                id="cv-upload"
                accept=".pdf,.doc,.docx"
                onChange={handleFileInputChange}
                className="sr-only"
              />
              <label htmlFor="cv-upload" className="cursor-pointer">
                {uploadedFile ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-[#1EB53A]" />
                        <span className="text-sm font-medium">{uploadedFile.name}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.preventDefault()
                          handleRemoveFile()
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      onClick={(e) => {
                        e.preventDefault()
                        handleEditUploadedCV()
                      }}
                      className="w-full bg-[#1EB53A] hover:bg-[#1EB53A]/90"
                    >
                      {t("cv.edit_and_choose_template")}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="text-sm font-medium">{t("cv.build.upload")}</p>
                    <p className="text-xs text-muted-foreground">Drag and drop or click to browse</p>
                    <p className="text-xs text-muted-foreground">PDF, DOC, DOCX (Max 5MB)</p>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <CVWizard onSuccess={onSuccess} onBack={() => setStarted(false)} initialData={parsedCVData} />
}
