"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Job } from "@/lib/jobs-data"
import { CheckCircle2, Upload } from "lucide-react"

interface ApplicationModalProps {
  job: Job
  isOpen: boolean
  onClose: () => void
  onBuildCV: () => void
}

export function ApplicationModal({ job, isOpen, onClose, onBuildCV }: ApplicationModalProps) {
  const [hasCVs, setHasCVs] = useState(false)
  const [selectedCV, setSelectedCV] = useState("")
  const [coverLetter, setCoverLetter] = useState("")
  const [consent, setConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    // Check if user has CVs saved
    const savedCVs = localStorage.getItem("userCVs")
    setHasCVs(!!savedCVs)
  }, [])

  const handleSubmit = () => {
    // Save application
    const applications = JSON.parse(localStorage.getItem("jobApplications") || "[]")
    applications.push({
      id: Date.now().toString(),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      appliedDate: new Date().toISOString(),
      status: "Pending",
      cvUsed: selectedCV,
    })
    localStorage.setItem("jobApplications", JSON.stringify(applications))

    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onClose()
    }, 3000)
  }

  if (submitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogDescription className="sr-only">Application submission confirmation</DialogDescription>
          <div className="space-y-6 py-8 text-center">
            <div className="flex justify-center">
              <div className="rounded-full bg-[#1EB53A]/10 p-4">
                <CheckCircle2 className="h-12 w-12 text-[#1EB53A]" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Application Submitted Successfully!</h2>
              <p className="mt-2 text-muted-foreground">We've notified {job.company}</p>
            </div>
            <p className="text-sm text-muted-foreground">Track your application in the 'My Applications' tab</p>
            <Button onClick={onClose} className="w-full bg-[#1EB53A] hover:bg-[#1EB53A]/90">
              Apply to more jobs
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (!hasCVs) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>CV Required</DialogTitle>
            <DialogDescription>You need to create or upload a CV to apply for this job</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <p className="text-sm text-muted-foreground">
              You need a CV to apply for this job. Build your professional CV in minutes with our AI-powered CV builder.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => {
                  onClose()
                  onBuildCV()
                }}
                className="w-full bg-[#1EB53A] hover:bg-[#1EB53A]/90"
              >
                Build CV Now
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Upload className="mr-2 h-4 w-4" />
                Upload Existing CV
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Apply for {job.title}</DialogTitle>
          <DialogDescription>Submit your application to {job.company}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div>
            <Label>Select CV to submit *</Label>
            <Select value={selectedCV} onValueChange={setSelectedCV}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Choose your CV" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cv1">Software Developer CV (Primary)</SelectItem>
                <SelectItem value="cv2">General CV</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Cover Letter (Optional)</Label>
            <Textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Write a brief cover letter to introduce yourself..."
              className="mt-2 min-h-[150px]"
            />
            <p className="mt-1 text-xs text-muted-foreground">{coverLetter.length}/500 characters</p>
          </div>

          <div>
            <Label>Additional Documents (Optional)</Label>
            <Button variant="outline" className="mt-2 w-full bg-transparent">
              <Upload className="mr-2 h-4 w-4" />
              Attach documents
            </Button>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox id="consent" checked={consent} onCheckedChange={(checked) => setConsent(checked as boolean)} />
            <Label htmlFor="consent" className="text-sm font-normal leading-relaxed">
              I confirm that the information provided is accurate and I authorize {job.company} to contact me regarding
              this application.
            </Label>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!selectedCV || !consent}
              className="flex-1 bg-[#1EB53A] hover:bg-[#1EB53A]/90"
            >
              Submit Application
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
