"use client"

import DashboardLayout from "@/components/DashboardLayout"
import LogsTable from "@/components/LogsTable"

// Sample log data - in production this would come from an API
const sampleLogs = [
  {
    id: "1",
    timestamp: "2024-12-04 14:23:45",
    action: "job_import",
    performedBy: "michael",
    details: {
      jobTitle: "Senior Software Engineer",
      company: "Tech Corp",
      importMethod: "form",
    },
    status: "success" as const,
  },
  {
    id: "2",
    timestamp: "2024-12-04 14:15:32",
    action: "login",
    performedBy: "mocti",
    details: {
      role: "admin",
      ipAddress: "192.168.1.100",
    },
    status: "success" as const,
  },
  {
    id: "3",
    timestamp: "2024-12-04 13:45:18",
    action: "job_delete",
    performedBy: "michael",
    details: {
      jobId: "job-567",
      jobTitle: "Marketing Manager",
      reason: "duplicate entry",
    },
    status: "success" as const,
  },
  {
    id: "4",
    timestamp: "2024-12-04 13:30:05",
    action: "role_change",
    performedBy: "michael",
    details: {
      targetUser: "michaella",
      previousRole: "viewer",
      newRole: "admin",
    },
    status: "success" as const,
  },
  {
    id: "5",
    timestamp: "2024-12-04 12:58:42",
    action: "api_error",
    performedBy: "mocti",
    details: {
      endpoint: "/api/jobs/import",
      errorMessage: "Invalid JSON format",
      statusCode: 400,
    },
    status: "failure" as const,
  },
  {
    id: "6",
    timestamp: "2024-12-04 12:30:15",
    action: "job_import",
    performedBy: "mocti",
    details: {
      jobTitle: "Data Analyst",
      company: "Data Insights",
      importMethod: "bulk",
      jobsCount: 5,
    },
    status: "success" as const,
  },
  {
    id: "7",
    timestamp: "2024-12-04 11:45:29",
    action: "login",
    performedBy: "michaella",
    details: {
      role: "viewer",
      ipAddress: "192.168.1.105",
    },
    status: "success" as const,
  },
  {
    id: "8",
    timestamp: "2024-12-04 11:20:33",
    action: "job_import",
    performedBy: "michael",
    details: {
      jobTitle: "Product Designer",
      company: "Design Studio",
      importMethod: "form",
    },
    status: "failure" as const,
  },
]

export default function SystemLogsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">System Logs</h1>
          <p className="text-gray-600">Monitor all system activities and events</p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-sm text-gray-600 mb-1">Total Logs</p>
            <p className="text-2xl font-bold text-gray-900">{sampleLogs.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-sm text-gray-600 mb-1">Success</p>
            <p className="text-2xl font-bold text-green-600">
              {sampleLogs.filter((log) => log.status === "success").length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-sm text-gray-600 mb-1">Failures</p>
            <p className="text-2xl font-bold text-red-600">
              {sampleLogs.filter((log) => log.status === "failure").length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-sm text-gray-600 mb-1">Today</p>
            <p className="text-2xl font-bold text-blue-600">{sampleLogs.length}</p>
          </div>
        </div>

        {/* Logs Table */}
        <LogsTable logs={sampleLogs} />
      </div>
    </DashboardLayout>
  )
}
