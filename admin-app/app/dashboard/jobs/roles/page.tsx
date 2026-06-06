"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import RolesManager from "@/components/RolesManager"
import { AlertCircle, ShieldAlert } from "lucide-react"

export default function AdminRolesPage() {
  const [role, setRole] = useState("")
  const [username, setUsername] = useState("")

  useEffect(() => {
    const adminRole = localStorage.getItem("admin_role") || ""
    const adminUsername = localStorage.getItem("admin_username") || ""
    setRole(adminRole)
    setUsername(adminUsername)
  }, [])

  // Only SuperAdmins can access this page
  if (role && role !== "superadmin") {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center">
            <ShieldAlert className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-700">
              You must be a <strong>SuperAdmin</strong> to access role management.
            </p>
            <p className="text-gray-600 mt-2">
              Current role: <span className="font-semibold capitalize text-red-600">{role}</span>
            </p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Roles Manager</h1>
          <p className="text-gray-600">Manage access levels for all administrators</p>
        </div>

        {/* Warning Banner */}
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-yellow-900 mb-1">Important</h3>
            <p className="text-sm text-yellow-800">
              Changes to admin roles will affect their access immediately. You cannot change your own role for security
              reasons.
            </p>
          </div>
        </div>

        {/* Roles Manager Component */}
        <RolesManager currentUsername={username} currentUserRole={role} />
      </div>
    </DashboardLayout>
  )
}
