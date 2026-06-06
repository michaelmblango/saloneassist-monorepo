"use client"

import { useEffect, useState, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut, LayoutDashboard, FolderKanban, PlusCircle, FileText, ScrollText, Users, Bot } from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [role, setRole] = useState("")

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem("admin_auth")
    const adminUsername = localStorage.getItem("admin_username")
    const adminRole = localStorage.getItem("admin_role")

    if (authStatus !== "true") {
      router.push("/")
      return
    }

    setIsAuthenticated(true)
    setUsername(adminUsername || "")
    setRole(adminRole || "")
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("admin_auth")
    localStorage.removeItem("admin_username")
    localStorage.removeItem("admin_role")
    router.push("/")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1EB53A] to-[#0072CE]">
        <div className="text-white text-xl">Verifying access...</div>
      </div>
    )
  }

  const navItems = [
    { href: "/dashboard", label: "Dashboard Home", icon: LayoutDashboard },
    { href: "/dashboard/chatbot", label: "AI Chatbot", icon: Bot },
    { href: "/dashboard/jobs", label: "Job Import Dashboard", icon: FolderKanban },
    { href: "/dashboard/jobs/add", label: "Add New Job", icon: PlusCircle },
    { href: "/dashboard/jobs/imported", label: "Imported Jobs", icon: FileText },
    { href: "/dashboard/jobs/logs", label: "System Logs", icon: ScrollText },
    { href: "/dashboard/jobs/roles", label: "Admin Roles", icon: Users },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="text-[#1EB53A]">SALONE</span> <span className="text-[#0072CE]">ASSIST</span>{" "}
            <span className="text-gray-600">ADMIN</span>
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600 hidden sm:block">
              <span className="font-semibold">{username}</span>
              <span className="mx-2">•</span>
              <span className="capitalize text-[#1EB53A]">{role}</span>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2 border-gray-300 hover:bg-red-50 hover:text-red-600 hover:border-red-300 bg-transparent"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-[calc(100vh-73px)] sticky top-[73px] hidden lg:block">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium",
                    isActive
                      ? "bg-gradient-to-r from-[#1EB53A] to-[#0072CE] text-white"
                      : "text-gray-700 hover:bg-gray-100",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Mobile Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
          <nav className="flex overflow-x-auto pb-safe">
            {navItems.slice(0, 5).map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center gap-1 px-3 py-2 min-w-[80px] text-xs",
                    isActive ? "text-[#1EB53A] font-semibold" : "text-gray-600",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-center leading-tight truncate max-w-full">{item.label.split(" ")[0]}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">{children}</main>
      </div>
    </div>
  )
}
