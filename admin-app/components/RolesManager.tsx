"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle, Shield } from "lucide-react"

interface AdminUser {
  username: string
  currentRole: "superadmin" | "admin" | "viewer"
}

interface RolesManagerProps {
  currentUsername: string
  currentUserRole: string
}

export default function RolesManager({ currentUsername, currentUserRole }: RolesManagerProps) {
  const [admins, setAdmins] = useState<AdminUser[]>([
    { username: "michael", currentRole: "superadmin" },
    { username: "mocti", currentRole: "admin" },
    { username: "michaella", currentRole: "viewer" },
  ])
  const [pendingChanges, setPendingChanges] = useState<Map<string, string>>(new Map())
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleRoleChange = (username: string, newRole: string) => {
    const newChanges = new Map(pendingChanges)
    newChanges.set(username, newRole)
    setPendingChanges(newChanges)
  }

  const handleSave = () => {
    // Check if trying to change own role
    if (pendingChanges.has(currentUsername)) {
      setSaveMessage({
        type: "error",
        text: "You cannot change your own role",
      })
      setTimeout(() => setSaveMessage(null), 3000)
      return
    }

    if (pendingChanges.size === 0) {
      setSaveMessage({
        type: "error",
        text: "No changes to save",
      })
      setTimeout(() => setSaveMessage(null), 3000)
      return
    }

    if (confirm("Are you sure you want to save these role changes?")) {
      // Apply changes
      const updatedAdmins = admins.map((admin) => {
        if (pendingChanges.has(admin.username)) {
          return { ...admin, currentRole: pendingChanges.get(admin.username) as any }
        }
        return admin
      })
      setAdmins(updatedAdmins)

      // Update localStorage
      const rolesMap: { [key: string]: string } = {}
      updatedAdmins.forEach((admin) => {
        rolesMap[admin.username] = admin.currentRole
      })
      localStorage.setItem("admin_roles", JSON.stringify(rolesMap))

      // Clear pending changes
      setPendingChanges(new Map())

      setSaveMessage({
        type: "success",
        text: "Role changes saved successfully",
      })
      setTimeout(() => setSaveMessage(null), 3000)
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "superadmin":
        return "bg-gradient-to-r from-[#1EB53A] to-[#0072CE] text-white"
      case "admin":
        return "bg-blue-100 text-blue-800"
      case "viewer":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-blue-900 mb-1">Role Management Guidelines</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• SuperAdmin: Full access to all features and role management</li>
            <li>• Admin: Can import and manage jobs only</li>
            <li>• Viewer: Read-only access to all tables and logs</li>
          </ul>
        </div>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div
          className={`p-4 rounded-lg flex items-center gap-2 ${
            saveMessage.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {saveMessage.type === "success" ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          <span className="font-medium">{saveMessage.text}</span>
        </div>
      )}

      {/* Roles Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-[#1EB53A] to-[#0072CE] text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Username</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Current Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Change Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {admins.map((admin) => {
                const hasPendingChange = pendingChanges.has(admin.username)
                const isCurrentUser = admin.username === currentUsername
                const displayRole = hasPendingChange ? pendingChanges.get(admin.username)! : admin.currentRole

                return (
                  <tr key={admin.username} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 capitalize">{admin.username}</span>
                        {isCurrentUser && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                            YOU
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${getRoleBadgeColor(
                          admin.currentRole,
                        )}`}
                      >
                        {admin.currentRole}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Select
                        value={displayRole}
                        onValueChange={(value) => handleRoleChange(admin.username, value)}
                        disabled={isCurrentUser}
                      >
                        <SelectTrigger className="w-48" disabled={isCurrentUser}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="superadmin">Super Admin</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-6 py-4">
                      {isCurrentUser ? (
                        <span className="text-sm text-gray-500 italic">Cannot edit own role</span>
                      ) : hasPendingChange ? (
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                          PENDING
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">No changes</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={pendingChanges.size === 0}
          className="bg-gradient-to-r from-[#1EB53A] to-[#0072CE] hover:opacity-90 text-white font-semibold px-8"
        >
          Save Changes
        </Button>
      </div>
    </div>
  )
}
