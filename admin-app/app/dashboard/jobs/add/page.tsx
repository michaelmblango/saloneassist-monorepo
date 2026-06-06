"use client"

import type React from "react"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, X, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AddNewJobPage() {
  const router = useRouter()
  const [role, setRole] = useState("")
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    jobType: "",
    salary: "",
    deadline: "",
    jobUrl: "",
    description: "",
  })
  const [requirements, setRequirements] = useState<string[]>([""])
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const adminRole = localStorage.getItem("admin_role") || ""
    setRole(adminRole)
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleRequirementChange = (index: number, value: string) => {
    const newRequirements = [...requirements]
    newRequirements[index] = value
    setRequirements(newRequirements)
  }

  const addRequirement = () => {
    setRequirements([...requirements, ""])
  }

  const removeRequirement = (index: number) => {
    if (requirements.length > 1) {
      setRequirements(requirements.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSubmitStatus("idle")

    if (role === "viewer") {
      setSubmitStatus("error")
      setSubmitMessage("Viewers cannot submit job imports. Contact a SuperAdmin.")
      setIsLoading(false)
      return
    }

    if (!formData.jobTitle || !formData.companyName || !formData.location) {
      setSubmitStatus("error")
      setSubmitMessage("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    try {
      const apiPayload = {
        source: "admin-panel",
        jobs: [
          {
            title: formData.jobTitle,
            company: formData.companyName,
            location: formData.location,
            type: formData.jobType || "full-time",
            description: formData.description,
            requirements: requirements.filter((req) => req.trim() !== ""),
            salary: formData.salary,
            deadline: formData.deadline,
            url: formData.jobUrl,
          },
        ],
      }

      console.log("[v0] Submitting job to SaloneAssist API:", apiPayload)

      const response = await fetch("/api/jobs/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiPayload),
      })

      const responseData = await response.json()
      console.log("[v0] API Response:", responseData)

      if (response.ok && responseData.success) {
        setSubmitStatus("success")
        setSubmitMessage(
          `Job imported successfully! ${responseData.summary?.imported || 1} job(s) added to SaloneAssist.`,
        )

        setFormData({
          jobTitle: "",
          companyName: "",
          location: "",
          jobType: "",
          salary: "",
          deadline: "",
          jobUrl: "",
          description: "",
        })
        setRequirements([""])
      } else {
        setSubmitStatus("error")
        setSubmitMessage(responseData.error || "Failed to import job. Please try again.")
      }
    } catch (error) {
      console.error("[v0] Error submitting job:", error)
      setSubmitStatus("error")
      setSubmitMessage("An error occurred. Please check your connection.")
    } finally {
      setIsLoading(false)
    }
  }

  if (role === "viewer") {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          <Button onClick={() => router.push("/dashboard")} variant="outline" className="mb-4 border-gray-300">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-8 text-center">
            <AlertCircle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Read-Only Access</h2>
            <p className="text-gray-700">
              You are logged in as a <strong>Viewer</strong> and cannot submit job imports.
            </p>
            <p className="text-gray-600 mt-2">Please contact a SuperAdmin for write access.</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <Button onClick={() => router.push("/dashboard")} variant="outline" className="mb-4 border-gray-300">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Job</h1>
          <p className="text-gray-600">Fill in the form to import a new job posting</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-6">
          <div>
            <Label htmlFor="jobTitle" className="text-gray-700 font-medium">
              Job Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="jobTitle"
              type="text"
              placeholder="e.g. Senior Software Engineer"
              value={formData.jobTitle}
              onChange={(e) => handleInputChange("jobTitle", e.target.value)}
              required
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="companyName" className="text-gray-700 font-medium">
              Company Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="companyName"
              type="text"
              placeholder="e.g. Tech Corporation"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              required
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="location" className="text-gray-700 font-medium">
              Location <span className="text-red-500">*</span>
            </Label>
            <Input
              id="location"
              type="text"
              placeholder="e.g. Freetown, Sierra Leone"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              required
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="jobType" className="text-gray-700 font-medium">
              Job Type
            </Label>
            <Select value={formData.jobType} onValueChange={(value) => handleInputChange("jobType", value)}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-Time</SelectItem>
                <SelectItem value="part-time">Part-Time</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="salary" className="text-gray-700 font-medium">
              Salary
            </Label>
            <Input
              id="salary"
              type="text"
              placeholder="e.g. $50,000 - $70,000"
              value={formData.salary}
              onChange={(e) => handleInputChange("salary", e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="deadline" className="text-gray-700 font-medium">
              Application Deadline
            </Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => handleInputChange("deadline", e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="jobUrl" className="text-gray-700 font-medium">
              Job URL
            </Label>
            <Input
              id="jobUrl"
              type="url"
              placeholder="https://example.com/jobs/123"
              value={formData.jobUrl}
              onChange={(e) => handleInputChange("jobUrl", e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-gray-700 font-medium">
              Job Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter the full job description..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="mt-2 min-h-[150px]"
            />
          </div>

          <div>
            <Label className="text-gray-700 font-medium mb-2 block">Requirements</Label>
            <div className="space-y-3">
              {requirements.map((req, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder={`Requirement ${index + 1}`}
                    value={req}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                    className="flex-1"
                  />
                  {requirements.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeRequirement(index)}
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addRequirement}
                className="w-full border-[#1EB53A] text-[#1EB53A] hover:bg-green-50 bg-transparent"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Requirement
              </Button>
            </div>
          </div>

          {submitStatus !== "idle" && (
            <div
              className={`p-4 rounded-lg flex items-center gap-2 ${
                submitStatus === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {submitStatus === "success" ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
              <span className="font-medium">{submitMessage}</span>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-[#1EB53A] to-[#0072CE] hover:opacity-90 text-white font-semibold px-8"
            >
              {isLoading ? "Submitting..." : "Submit Job"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormData({
                  jobTitle: "",
                  companyName: "",
                  location: "",
                  jobType: "",
                  salary: "",
                  deadline: "",
                  jobUrl: "",
                  description: "",
                })
                setRequirements([""])
                setSubmitStatus("idle")
              }}
              className="border-gray-300"
            >
              Clear Form
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
