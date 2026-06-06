"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import { Trash2, Loader2, AlertCircle } from "lucide-react"

export default function ImportedJobsPage() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)
  const [apiError, setApiError] = useState(false)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      console.log("[v0] Fetching jobs from admin panel...")
      const response = await fetch("/api/jobs/list")

      if (!response.ok) {
        console.log("[v0] API request failed with status:", response.status)
        setApiError(true)
        setJobs([])
        setLoading(false)
        return
      }

      const data = await response.json()
      console.log("[v0] Received data:", data)

      if (data.success) {
        const jobsArray = data.data || data.jobs || []
        console.log("[v0] Loaded", jobsArray.length, "jobs")
        setJobs(jobsArray)
        setApiError(false)
      } else {
        // Show specific error message
        console.log("[v0] API error:", data.error, data.message)
        setApiError(true)
        setJobs([])
      }
    } catch (error) {
      console.log("[v0] Failed to fetch jobs:", error)
      setApiError(true)
      setJobs([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (jobId: string, jobTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${jobTitle}"?`)) {
      return
    }

    console.log("[v0] Deleting job:", jobId, jobTitle)
    setDeleting(jobId)

    try {
      const response = await fetch("/api/jobs/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobIds: [jobId] }),
      })

      const data = await response.json()
      console.log("[v0] Delete response:", data)

      if (data.success) {
        alert("Job deleted successfully!")
        setJobs(jobs.filter((job) => job.id !== jobId))
      } else {
        throw new Error(data.error || "Delete failed")
      }
    } catch (error) {
      console.error("[v0] Delete error:", error)
      alert("Failed to delete job: " + error.message)
    } finally {
      setDeleting(null)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-[#1EB53A] mx-auto mb-4" />
            <p className="text-gray-600">Loading jobs...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Imported Jobs</h1>
          <p className="text-gray-600">Manage all jobs imported from various sources</p>
        </div>

        {apiError && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800 mb-1">Unable to Connect to Main App</h3>
                <p className="text-sm text-red-700 mb-2">
                  The admin panel cannot connect to your main SaloneAssist app at{" "}
                  <code className="bg-red-100 px-1 rounded">https://saloneassist.vercel.app</code>
                </p>
                <p className="text-sm text-red-700 mb-2 font-medium">Please check:</p>
                <ul className="text-sm text-red-700 list-disc list-inside space-y-1">
                  <li>The main app is deployed on Vercel</li>
                  <li>The deployment is accessible at the URL above</li>
                  <li>
                    The <code className="bg-red-100 px-1 rounded">/api/jobs/list</code> endpoint exists
                  </li>
                  <li>The API key in environment variables matches</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Job Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Posted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {jobs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      {apiError
                        ? "Unable to fetch jobs. Please deploy the API endpoint to your main app."
                        : "No jobs found. Import some jobs to get started."}
                    </td>
                  </tr>
                ) : (
                  jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{job.title}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{job.company}</td>
                      <td className="px-6 py-4 text-gray-500">{job.location}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">{job.type}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          {job.source || "manual"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {job.created_at ? new Date(job.created_at).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(job.id, job.title)}
                          disabled={deleting === job.id}
                          className="text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          title="Delete job"
                        >
                          {deleting === job.id ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <Trash2 className="h-5 w-5" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
