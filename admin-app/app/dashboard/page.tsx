"use client"

import { useEffect, useState } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import { Users, Activity, CheckCircle, Clock, AlertCircle } from "lucide-react"

export default function DashboardPage() {
  const [username, setUsername] = useState("")
  const [role, setRole] = useState("")
  const [jobCount, setJobCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState(false)

  useEffect(() => {
    setUsername(localStorage.getItem("admin_username") || "")
    setRole(localStorage.getItem("admin_role") || "")
    fetchJobStats()
  }, [])

  const fetchJobStats = async () => {
    try {
      const response = await fetch("/api/jobs/list")

      // Check if response is ok first
      if (!response.ok) {
        console.log("[v0] API request failed with status:", response.status)
        setApiError(true)
        setJobCount(0)
        setLoading(false)
        return
      }

      const data = await response.json()

      if (data.success && data.jobs) {
        setJobCount(data.jobs.length)
        setApiError(data.message?.includes("endpoint") || data.message?.includes("not deployed"))
      } else {
        setApiError(true)
        setJobCount(0)
      }
    } catch (error) {
      console.log("[v0] Failed to fetch job stats:", error)
      setApiError(true)
      setJobCount(0)
    } finally {
      setLoading(false)
    }
  }

  const stats = [
    {
      title: "Total Jobs Imported",
      value: loading ? "..." : jobCount.toString(),
      icon: CheckCircle,
      gradient: "from-[#1EB53A] to-[#17a333]",
    },
    {
      title: "Pending Jobs",
      value: "0",
      icon: Clock,
      gradient: "from-[#0072CE] to-[#005bb5]",
    },
    {
      title: "Active Admins",
      value: "3",
      icon: Users,
      gradient: "from-[#1EB53A] to-[#0072CE]",
    },
    {
      title: "System Status",
      value: apiError ? "Offline" : "Online",
      icon: Activity,
      gradient: apiError ? "from-red-500 to-red-600" : "from-[#17a333] to-[#1EB53A]",
    },
  ]

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-white rounded-[20px] shadow-lg p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            Welcome back, <span className="text-[#1EB53A] capitalize">{username}</span>!
          </h2>
          <p className="text-gray-600 text-lg">
            You are logged in as <span className="font-semibold text-[#0072CE] capitalize">{role}</span>
          </p>
        </div>

        {apiError && (
          <div className="mb-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-800 mb-1">API Connection Issue</h3>
                <p className="text-sm text-amber-700">
                  Unable to connect to the main SaloneAssist API. The{" "}
                  <code className="bg-amber-100 px-1 rounded">/api/jobs/list</code> endpoint needs to be deployed to
                  your main app at <code className="bg-amber-100 px-1 rounded">https://saloneassist.vercel.app</code> to
                  display real job data.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.title}
                className={`bg-gradient-to-br ${stat.gradient} text-white rounded-xl p-6 shadow-lg`}
              >
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
        <div className="mt-8 bg-white rounded-[20px] shadow-lg p-6 sm:p-8">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="/dashboard/jobs/add"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#1EB53A] hover:bg-green-50 transition-colors"
            >
              <h4 className="font-semibold text-lg text-gray-800 mb-1">Add New Job</h4>
              <p className="text-sm text-gray-600">Import a new job posting</p>
            </a>
            <a
              href="/dashboard/jobs/imported"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#0072CE] hover:bg-blue-50 transition-colors"
            >
              <h4 className="font-semibold text-lg text-gray-800 mb-1">View Imported Jobs</h4>
              <p className="text-sm text-gray-600">Browse all job postings</p>
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
