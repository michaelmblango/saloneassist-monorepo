"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Home, Building2, GraduationCap, Briefcase, HeartPulse, Shield, Settings, LogOut, Edit2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Logo } from "@/components/logo"
import { useLanguage } from "@/contexts/language-context"

export function DashboardSidebar() {
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const { t } = useLanguage()

  useEffect(() => {
    const name = localStorage.getItem("userName") || "User"
    const email = localStorage.getItem("userEmail") || ""
    setUserName(name)
    setUserEmail(email)
  }, [])

  const menuItems = [
    { icon: Home, label: t("nav.dashboard"), href: "/dashboard" },
    { icon: Building2, label: t("nav.business"), href: "/dashboard/businesses" },
    { icon: GraduationCap, label: t("nav.career"), href: "/dashboard/career-guidance" },
    { icon: Briefcase, label: t("nav.jobs"), href: "/dashboard/jobs" },
    { icon: HeartPulse, label: t("nav.health"), href: "/dashboard/health" },
    { icon: Shield, label: t("nav.truth"), href: "/dashboard/truth-engine" },
    { icon: Settings, label: t("nav.settings"), href: "/dashboard/settings" },
  ]

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const handleSignOut = () => {
    localStorage.removeItem("userName")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("isAuthenticated")
    toast({
      title: t("auth.signout_success"),
      description: t("auth.signout_desc"),
    })
    router.push("/")
  }

  return (
    <div className="flex h-full w-[280px] flex-col border-r bg-background">
      <div className="flex h-16 items-center justify-center border-b px-6">
        <Logo variant="icon-only" size="sm" />
      </div>

      {/* User Profile Card */}
      <div className="p-6">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-[#1EB53A] text-lg text-white">{getInitials(userName)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold">{t("dashboard.welcome_short")}</p>
            <p className="truncate font-bold text-foreground">{userName}</p>
            {userEmail && <p className="truncate text-xs text-muted-foreground">{userEmail}</p>}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => router.push("/dashboard/settings")}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Separator />

      {/* Navigation Menu */}
      <ScrollArea className="flex-1 px-3">
        <nav className="space-y-1 py-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Button
                key={item.href}
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 px-3 py-2.5",
                  isActive
                    ? "bg-[#1EB53A] text-white hover:bg-[#1EB53A]/90 hover:text-white"
                    : "text-foreground hover:bg-[#1EB53A]/10 hover:text-[#1EB53A]",
                )}
                onClick={() => router.push(item.href)}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </Button>
            )
          })}
        </nav>
      </ScrollArea>

      <Separator />

      {/* Sign Out Button */}
      <div className="p-3">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-3 py-2.5 text-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
          onClick={handleSignOut}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <span className="text-sm font-medium">{t("nav.signout")}</span>
        </Button>
      </div>
    </div>
  )
}
