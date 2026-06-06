"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JobListings } from "@/components/jobs/job-listings"
import { CVBuilder } from "@/components/jobs/cv-builder"
import { CoverLetterBuilder } from "@/components/jobs/cover-letter-builder"
import { MyCVs } from "@/components/jobs/my-cvs"
import { MyApplications } from "@/components/jobs/my-applications"
import { SavedJobs } from "@/components/jobs/saved-jobs"
import { useLanguage } from "@/contexts/language-context"

export default function JobsPage() {
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("listings")
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [router])

  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1EB53A] border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("common.back_to_dashboard")}
        </Button>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{t("jobs.title")}</h1>
        <p className="text-sm sm:text-base text-muted-foreground">{t("jobs.subtitle")}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
        <div className="w-full overflow-x-auto">
          <TabsList className="inline-flex w-full min-w-max sm:min-w-0 h-auto flex-wrap sm:flex-nowrap gap-1 p-1">
            <TabsTrigger value="listings" className="text-xs sm:text-sm px-2 sm:px-3 py-2">
              {t("jobs.tabs.listings")}
            </TabsTrigger>
            <TabsTrigger value="cv-builder" className="text-xs sm:text-sm px-2 sm:px-3 py-2">
              {t("jobs.tabs.cv_builder")}
            </TabsTrigger>
            <TabsTrigger value="cover-letter" className="text-xs sm:text-sm px-2 sm:px-3 py-2">
              {t("jobs.tabs.cover_letter")}
            </TabsTrigger>
            <TabsTrigger value="my-cvs" className="text-xs sm:text-sm px-2 sm:px-3 py-2">
              {t("jobs.tabs.my_cvs")}
            </TabsTrigger>
            <TabsTrigger value="applications" className="text-xs sm:text-sm px-2 sm:px-3 py-2">
              {t("jobs.tabs.applications")}
            </TabsTrigger>
            <TabsTrigger value="saved" className="text-xs sm:text-sm px-2 sm:px-3 py-2">
              {t("jobs.tabs.saved")}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="listings" className="space-y-6">
          <JobListings onBuildCV={() => setActiveTab("cv-builder")} />
        </TabsContent>

        <TabsContent value="cv-builder" className="space-y-6">
          <CVBuilder onSuccess={() => setActiveTab("my-cvs")} />
        </TabsContent>

        <TabsContent value="cover-letter" className="space-y-6">
          <CoverLetterBuilder onSuccess={() => setActiveTab("my-cvs")} />
        </TabsContent>

        <TabsContent value="my-cvs" className="space-y-6">
          <MyCVs />
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <MyApplications />
        </TabsContent>

        <TabsContent value="saved" className="space-y-6">
          <SavedJobs />
        </TabsContent>
      </Tabs>
    </div>
  )
}
