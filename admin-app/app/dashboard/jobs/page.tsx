"use client"

import type React from "react"

import { useState } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, AlertCircle, CheckCircle, Clock, Plus, List, ScrollText } from "lucide-react"
import Link from "next/link"

export default function JobImportDashboardPage() {
  const [jsonInput, setJsonInput] = useState("")
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [uploadMessage, setUploadMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleBulkImport = async () => {
    if (!jsonInput.trim()) {
      setUploadStatus("error")
      setUploadMessage("Please enter JSON data")
      return
    }

    setIsLoading(true)
    setUploadStatus("idle")

    try {
      // Validate JSON
      const parsedData = JSON.parse(jsonInput)

      let apiPayload
      if (parsedData.jobs && Array.isArray(parsedData.jobs)) {
        // Already in correct format
        apiPayload = {
          source: parsedData.source || "bulk-import",
          jobs: parsedData.jobs,
        }
      } else if (Array.isArray(parsedData)) {
        // Array of jobs without wrapper
        apiPayload = {
          source: "bulk-import",
          jobs: parsedData,
        }
      } else {
        // Single job object
        apiPayload = {
          source: "bulk-import",
          jobs: [parsedData],
        }
      }

      console.log("[v0] Submitting bulk import to SaloneAssist API:", apiPayload)

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
        setUploadStatus("success")
        setUploadMessage(
          `${responseData.summary?.imported || 0} job(s) imported successfully to SaloneAssist! ${
            responseData.summary?.failed ? `${responseData.summary.failed} failed.` : ""
          }`,
        )
        setJsonInput("")
      } else {
        setUploadStatus("error")
        setUploadMessage(responseData.error || "Failed to import jobs. Please check your data.")
      }
    } catch (error) {
      console.error("[v0] Error during bulk import:", error)
      setUploadStatus("error")
      if (error instanceof SyntaxError) {
        setUploadMessage("Invalid JSON format. Please check your input.")
      } else {
        setUploadMessage("An error occurred. Please check your connection.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setJsonInput(content)
    }
    reader.readAsText(file)
  }

  const stats = [
    {
      title: "Total Jobs Imported",
      value: "2",
      icon: CheckCircle,
      color: "from-[#1EB53A] to-[#17a333]",
    },
    {
      title: "Pending Jobs",
      value: "0",
      icon: Clock,
      color: "from-[#FF9800] to-[#F57C00]",
    },
    {
      title: "Failed Imports",
      value: "4",
      icon: AlertCircle,
      color: "from-[#F44336] to-[#D32F2F]",
    },
    {
      title: "Last Import",
      value: "2 hours ago",
      icon: FileText,
      color: "from-[#0072CE] to-[#005bb5]",
    },
  ]

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Import Dashboard</h1>
          <p className="text-gray-600">Manage and monitor job imports</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.title} className={`bg-gradient-to-br ${stat.color} text-white rounded-xl p-6 shadow-lg`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold opacity-90">{stat.title}</h3>
                  <Icon className="h-6 w-6 opacity-80" />
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Link
            href="/dashboard/jobs/add"
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-[#1EB53A]"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-[#1EB53A] to-[#17a333] p-3 rounded-lg">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Add New Job</h3>
                <p className="text-sm text-gray-600">Import a single job</p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/jobs/imported"
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-[#0072CE]"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-[#0072CE] to-[#005bb5] p-3 rounded-lg">
                <List className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">View Imported Jobs</h3>
                <p className="text-sm text-gray-600">Browse all jobs</p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/jobs/logs"
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-[#1EB53A]"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-[#1EB53A] to-[#0072CE] p-3 rounded-lg">
                <ScrollText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">System Logs</h3>
                <p className="text-sm text-gray-600">View activity logs</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Bulk Import Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Upload className="h-6 w-6 text-[#1EB53A]" />
            Quick Bulk Import
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload JSON File</label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer">
                <div className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-[#1EB53A] transition-colors">
                  <Upload className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Choose File</span>
                </div>
                <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
              </label>
              <span className="text-sm text-gray-500">or paste JSON below</span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Raw JSON Input</label>
            <Textarea
              placeholder='{"jobTitle": "Software Engineer", "company": "Tech Corp", ...}'
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
            />
          </div>

          {uploadStatus !== "idle" && (
            <div
              className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${
                uploadStatus === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {uploadStatus === "success" ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
              <span className="font-medium">{uploadMessage}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleBulkImport}
              disabled={isLoading || !jsonInput.trim()}
              className="bg-gradient-to-r from-[#1EB53A] to-[#0072CE] hover:opacity-90 text-white font-semibold px-6"
            >
              {isLoading ? "Submitting..." : "Submit to Import API"}
            </Button>
            <Button
              onClick={() => {
                setJsonInput("")
                setUploadStatus("idle")
              }}
              variant="outline"
              className="border-gray-300"
            >
              Clear
            </Button>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              <strong>API Endpoint:</strong>
            </p>
            <code className="text-sm bg-white px-3 py-2 rounded border border-gray-200 block">
              POST /api/jobs/import
            </code>
            <p className="text-sm text-gray-600 mt-4 mb-2">
              <strong>Expected Format:</strong>
            </p>
            <pre className="text-xs bg-white px-3 py-2 rounded border border-gray-200 overflow-x-auto">
              {`{
  "source": "bulk-import",
  "jobs": [
    {
      "title": "Software Developer",
      "company": "Tech Corp",
      "location": "Freetown",
      "type": "full-time",
      "description": "...",
      "requirements": ["JavaScript", "React"],
      "salary": "5000000 SLE",
      "deadline": "2025-03-31",
      "url": "https://example.com/job/1"
    }
  ]
}`}
            </pre>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
