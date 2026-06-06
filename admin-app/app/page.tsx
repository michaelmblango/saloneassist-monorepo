"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const VALID_USERNAMES = ["mocti", "michael", "michaella"]
const VALID_PASSCODES = ["12345678", "87654321"]

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [passcode, setPasscode] = useState("")
  const [role, setRole] = useState<"superadmin" | "admin" | "viewer">("admin")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validate username
    if (!VALID_USERNAMES.includes(username.toLowerCase())) {
      setError("Invalid admin username")
      setIsLoading(false)
      return
    }

    // Validate passcode
    if (!VALID_PASSCODES.includes(passcode)) {
      setError("Incorrect passcode")
      setIsLoading(false)
      return
    }

    localStorage.setItem("admin_auth", "true")
    localStorage.setItem("admin_username", username.toLowerCase())
    localStorage.setItem("admin_role", role)

    setTimeout(() => {
      router.push("/dashboard")
    }, 300)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1EB53A] to-[#0072CE] p-4 animate-fade-in">
      <div className="w-full max-w-md animate-slide-up">
        <div className="bg-white rounded-[20px] shadow-2xl p-8 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="text-[#1EB53A]">SALONE</span> <span className="text-[#0072CE]">ASSIST</span>
            </h1>
            <p className="text-gray-600 font-semibold text-lg">ADMIN ACCESS</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700 font-medium">
                Admin Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="h-12 border-[#CCCCCC] focus:border-[#1EB53A] focus:ring-[#1EB53A]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passcode" className="text-gray-700 font-medium">
                Admin Passcode
              </Label>
              <Input
                id="passcode"
                type="password"
                placeholder="Enter passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                required
                className="h-12 border-[#CCCCCC] focus:border-[#0072CE] focus:ring-[#0072CE]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-gray-700 font-medium">
                Access Role
              </Label>
              <Select value={role} onValueChange={(value: any) => setRole(value)}>
                <SelectTrigger className="h-12 border-[#CCCCCC]">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="superadmin">Super Admin (Full Access)</SelectItem>
                  <SelectItem value="admin">Admin (Import Jobs Only)</SelectItem>
                  <SelectItem value="viewer">Viewer (Read-Only)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-[#D00000] px-4 py-3 rounded-lg text-sm font-medium">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-lg font-bold bg-gradient-to-r from-[#1EB53A] to-[#0072CE] hover:opacity-90 transition-opacity"
            >
              {isLoading ? "Verifying..." : "Access Admin Panel"}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-500">Restricted access only • Salone Assist Admin</div>
        </div>
      </div>
    </div>
  )
}
