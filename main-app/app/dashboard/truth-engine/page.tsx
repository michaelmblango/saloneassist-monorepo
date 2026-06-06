"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatInterface } from "@/components/chatbot/chat-interface"
import { VerifyInfoTab } from "@/components/truth-engine/verify-info-tab"
import { ReportScamTab } from "@/components/truth-engine/report-scam-tab"
import { GovernmentFAQTab } from "@/components/truth-engine/government-faq-tab"
import { useLanguage } from "@/contexts/language-context"

export default function TruthEnginePage() {
  const { t } = useLanguage()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    if (!auth) {
      router.push("/")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block">
        <DashboardSidebar />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-[280px] p-0">
          <DashboardSidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto max-w-7xl p-6">
            <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("common.back_to_dashboard")}
            </Button>

            <div className="mb-6">
              <h1 className="text-3xl font-bold text-foreground">{t("truth_engine.title")}</h1>
              <p className="mt-2 text-muted-foreground">{t("truth_engine.subtitle")}</p>
            </div>

            <Tabs defaultValue="assistant" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                <TabsTrigger value="assistant">{t("truth_engine.tabs.assistant")}</TabsTrigger>
                <TabsTrigger value="verify">{t("truth_engine.tabs.verify")}</TabsTrigger>
                <TabsTrigger value="report">{t("truth_engine.tabs.report")}</TabsTrigger>
                <TabsTrigger value="faq">{t("truth_engine.tabs.faq")}</TabsTrigger>
              </TabsList>

              <TabsContent value="assistant">
                <ChatInterface
                  serviceContext="truth_engine"
                  initialMessage="Welcome to Truth Engine! I'm your AI fact-checker and government services assistant. I can help you verify information, check for scams, and answer questions about Sierra Leone government services. What would you like to know?"
                  embedded
                />
              </TabsContent>

              <TabsContent value="verify">
                <VerifyInfoTab />
              </TabsContent>

              <TabsContent value="report">
                <ReportScamTab />
              </TabsContent>

              <TabsContent value="faq">
                <GovernmentFAQTab />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
