"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Briefcase, Compass, MapPin, TrendingUp, ArrowRight, Clock } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function DashboardContent() {
  const { t } = useLanguage()
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [currentDate, setCurrentDate] = useState("")
  const [profileCompleted, setProfileCompleted] = useState(false)

  useEffect(() => {
    const name = localStorage.getItem("userName") || "User"
    setUserName(name)

    const completed = localStorage.getItem("profileCompleted") === "true"
    setProfileCompleted(completed)

    const date = new Date()
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    setCurrentDate(date.toLocaleDateString("en-US", options))
  }, [])

  const stats = [
    {
      title: t("dashboard.stats.businesses_verified"),
      value: "15,247",
      change: t("dashboard.stats.this_week", { count: 234 }),
      trend: "up",
    },
    {
      title: t("dashboard.stats.active_jobs"),
      value: "2,458",
      change: t("dashboard.stats.today", { count: 42 }),
      trend: "up",
    },
    {
      title: t("dashboard.stats.saved_items"),
      value: "12",
      change: t("dashboard.stats.view_all"),
      trend: "neutral",
    },
    {
      title: t("dashboard.stats.profile_completion"),
      value: profileCompleted ? 100 : 85,
      change: profileCompleted ? t("dashboard.profile_complete") : t("dashboard.complete_now"),
      trend: "progress",
    },
  ]

  const quickActions = [
    {
      icon: Search,
      title: t("dashboard.quick_actions.verify_business"),
      description: t("dashboard.quick_actions.check_credentials"),
      color: "bg-[#1EB53A]/10 text-[#1EB53A]",
      href: "/dashboard/businesses",
    },
    {
      icon: FileText,
      title: t("dashboard.quick_actions.build_cv"),
      description: t("dashboard.quick_actions.create_resume"),
      color: "bg-[#0072C6]/10 text-[#0072C6]",
      href: "/dashboard/jobs",
    },
    {
      icon: Briefcase,
      title: t("dashboard.quick_actions.find_job"),
      description: t("dashboard.quick_actions.browse_opportunities"),
      color: "bg-amber-500/10 text-amber-600",
      href: "/dashboard/jobs",
    },
    {
      icon: Compass,
      title: t("dashboard.quick_actions.get_advice"),
      description: t("dashboard.quick_actions.professional_guidance"),
      color: "bg-purple-500/10 text-purple-600",
      href: "/dashboard/career-guidance",
    },
    {
      icon: MapPin,
      title: t("dashboard.quick_actions.locate_clinic"),
      description: t("dashboard.quick_actions.find_healthcare"),
      color: "bg-rose-500/10 text-rose-600",
      href: "/dashboard/health",
    },
  ]

  const recentActivity = [
    { text: t("dashboard.activity.verified_company"), time: t("dashboard.activity.hours_ago", { count: 2 }) },
    { text: t("dashboard.activity.saved_job"), time: t("dashboard.activity.hours_ago", { count: 5 }) },
    { text: t("dashboard.activity.updated_profile"), time: t("dashboard.activity.days_ago", { count: 1 }) },
  ]

  const recommendations = [
    {
      title: t("dashboard.recommendations.software_dev"),
      type: t("dashboard.recommendations.job_match"),
      description: t("dashboard.recommendations.fulltime_position"),
      badge: t("dashboard.recommendations.new"),
    },
    {
      title: t("dashboard.recommendations.marketing_course"),
      type: t("dashboard.recommendations.course_suggestion"),
      description: t("dashboard.recommendations.free_course"),
      badge: t("dashboard.recommendations.popular"),
    },
    {
      title: t("dashboard.recommendations.health_checkup"),
      type: t("dashboard.recommendations.health_tip"),
      description: t("dashboard.recommendations.schedule_checkup"),
      badge: t("dashboard.recommendations.important"),
    },
  ]

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6">
      <div className="rounded-lg bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 p-6 sm:p-8">
        <div className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4">
          {/* Text-only logo - responsive sizing */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            <span className="text-[#1EB53A]">SALONE</span> <span className="text-[#0072C6]">ASSIST</span>
          </h1>

          {/* Tagline - responsive */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground">
            {t("landing.hero.subtitle")}
          </p>

          {/* Welcome message - responsive */}
          <p className="text-base sm:text-lg font-medium">{t("dashboard.welcome", { name: userName })} 👋</p>

          {/* Date - responsive */}
          <p className="text-xs sm:text-sm text-muted-foreground">{currentDate}</p>
        </div>
      </div>

      {!profileCompleted && (
        <Card className="border-[#1EB53A]/20 bg-[#1EB53A]/5">
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6">
            <div className="flex-1">
              <h3 className="mb-1 text-sm sm:text-base font-semibold">{t("dashboard.complete_profile_title")}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{t("dashboard.complete_profile_desc")}</p>
            </div>
            <Button
              onClick={() => router.push("/profile/setup")}
              className="bg-[#1EB53A] hover:bg-[#1EB53A]/90 w-full sm:w-auto"
            >
              {t("dashboard.complete_profile")}
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="pb-3">
              {/* Responsive stat title */}
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {stat.trend === "progress" ? (
                <div className="space-y-2">
                  {/* Responsive stat value */}
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold">{stat.value}%</div>
                  <Progress value={stat.value as number} className="h-2" />
                  {!profileCompleted ? (
                    <Button
                      variant="link"
                      className="h-auto p-0 text-[#1EB53A] text-xs sm:text-sm"
                      onClick={() => router.push("/profile/setup")}
                    >
                      {stat.change} <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  ) : (
                    <p className="text-xs sm:text-sm text-green-600">{stat.change}</p>
                  )}
                </div>
              ) : (
                <div className="space-y-1">
                  {/* Responsive stat value */}
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold">{stat.value}</div>
                  <div className="flex items-center gap-1 text-xs sm:text-sm">
                    {stat.trend === "up" && <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />}
                    <span className={stat.trend === "up" ? "text-green-600" : "text-muted-foreground"}>
                      {stat.change}
                    </span>
                    {stat.trend === "neutral" && <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="mb-4 text-xl sm:text-2xl md:text-3xl font-semibold">{t("dashboard.quick_actions_title")}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {quickActions.map((action) => (
            <Card
              key={action.title}
              className="cursor-pointer transition-shadow hover:shadow-lg"
              onClick={() => router.push(action.href)}
            >
              <CardContent className="flex flex-col items-center p-4 sm:p-6 text-center">
                <div
                  className={`mb-3 sm:mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full ${action.color}`}
                >
                  <action.icon className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                {/* Responsive action title */}
                <h3 className="mb-1 text-sm sm:text-base font-semibold">{action.title}</h3>
                {/* Responsive action description */}
                <p className="text-xs sm:text-sm text-muted-foreground">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity & Recommendations */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.recent_activity")}</CardTitle>
            <CardDescription>{t("dashboard.recent_activity_desc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
              <Button variant="link" className="h-auto p-0 text-[#1EB53A]">
                {t("dashboard.view_all_activity")} <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.recommended_title")}</CardTitle>
            <CardDescription>{t("dashboard.recommended_desc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((item, index) => (
                <div key={index} className="flex items-start gap-3 rounded-lg border p-3">
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h4 className="font-semibold">{item.title}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    </div>
                    <p className="mb-1 text-xs text-muted-foreground">{item.type}</p>
                    <p className="text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
