"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, ArrowLeft } from "lucide-react"
import { ClinicFinder } from "@/components/health/clinic-finder"
import { ChatInterface } from "@/components/chatbot/chat-interface"
import { HealthAlerts } from "@/components/health/health-alerts"
import { EmergencyModal } from "@/components/health/emergency-modal"
import { useLanguage } from "@/contexts/language-context"

export default function HealthPage() {
  const { t } = useLanguage()
  const [showEmergency, setShowEmergency] = useState(false)
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 border-b bg-background p-4 sm:p-6">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("common.back")}
            </Button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{t("health.title")}</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">{t("health.subtitle")}</p>
          </div>
          <Button
            size="lg"
            className="bg-red-600 text-white hover:bg-red-700 w-full sm:w-auto text-sm sm:text-base"
            onClick={() => setShowEmergency(true)}
          >
            <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-bold">{t("health.emergency_call")}</span>
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl p-4 sm:p-6">
        <Tabs defaultValue="clinics" className="w-full">
          <div className="w-full overflow-x-auto mb-6">
            <TabsList className="inline-flex w-full min-w-max sm:min-w-0 grid-cols-3">
              <TabsTrigger value="clinics" className="text-xs sm:text-sm px-3 sm:px-4">
                {t("health.tabs.find_clinic")}
              </TabsTrigger>
              <TabsTrigger value="chatbot" className="text-xs sm:text-sm px-3 sm:px-4">
                {t("health.tabs.chatbot")}
              </TabsTrigger>
              <TabsTrigger value="alerts" className="text-xs sm:text-sm px-3 sm:px-4">
                {t("health.tabs.alerts")}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="clinics" className="space-y-6">
            <ClinicFinder onEmergency={() => setShowEmergency(true)} />
          </TabsContent>

          <TabsContent value="chatbot" className="space-y-6">
            <div className="mx-auto max-w-4xl">
              <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-4">
                <p className="text-sm text-red-800 font-medium">
                  ⚠️ For medical emergencies, call <strong>117</strong> immediately. This chatbot provides general health
                  information only.
                </p>
              </div>
              <ChatInterface
                serviceContext="healthcare"
                initialMessage="Hello! I'm your Health Directory assistant. I can help you find hospitals, clinics, pharmacies, and provide general health information for Sierra Leone. For emergencies, please call 117. What can I help you with?"
                embedded
              />
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <HealthAlerts />
          </TabsContent>
        </Tabs>
      </div>

      <EmergencyModal isOpen={showEmergency} onClose={() => setShowEmergency(false)} />
    </div>
  )
}
