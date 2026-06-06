"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, CheckCircle } from "lucide-react"
import { SimpleAuthModal } from "@/components/simple-auth-modal"
import { useLanguage } from "@/contexts/language-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"

export function HeroSection() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()

  const handleGuestMode = () => {
    const guestName = "Guest User"
    const guestEmail = "guest@saloneassist.sl"

    localStorage.setItem("userName", guestName)
    localStorage.setItem("userEmail", guestEmail)
    localStorage.setItem("isAuthenticated", "true")
    localStorage.setItem("isGuestMode", "true")

    toast({
      title: t("auth.welcome", { name: guestName }),
      description: t("auth.guest_mode_message"),
      action: (
        <ToastAction altText={t("common.close")} onClick={() => {}}>
          {t("common.close")}
        </ToastAction>
      ),
    })

    setTimeout(() => {
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <>
      <section
        id="home"
        className="relative overflow-hidden min-h-[80vh] sm:min-h-screen flex items-center justify-center py-12 sm:py-16 lg:py-20"
      >
        {/* Gradient background with exact Sierra Leone colors */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1EB53A] via-[#17a2a2] to-[#0072C6] rounded-[20px] sm:rounded-[32px] mx-2 sm:mx-4 my-2 sm:my-4" />

        {/* Optional overlay pattern */}
        <div className="absolute inset-0 bg-[url('/abstract-gradient-pattern.png')] opacity-5" />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1000px] text-center">
            <div className="mb-4 sm:mb-6 inline-block">
              <div className="relative px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl animate-fade-in-up">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1EB53A]/20 via-purple-500/10 to-[#0072C6]/20 rounded-xl sm:rounded-2xl animate-pulse -z-10" />

                <h2 className="relative text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight">
                  <span className="inline-block text-[#1EB53A] drop-shadow-[0_2px_8px_rgba(30,181,58,0.3)] animate-slide-in-left">
                    SALONE
                  </span>{" "}
                  <span className="inline-block text-[#0072C6] drop-shadow-[0_2px_8px_rgba(0,114,198,0.3)] animate-slide-in-right">
                    ASSIST
                  </span>
                </h2>

                {/* Enhanced shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shine rounded-xl sm:rounded-2xl pointer-events-none" />
              </div>
            </div>

            <h1 className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white text-balance px-2">
              {t("landing.hero.title")}
            </h1>

            <p className="mb-6 sm:mb-8 text-sm sm:text-base md:text-lg lg:text-xl text-white/90 text-balance max-w-[700px] mx-auto px-4">
              {t("landing.hero.subtitle")}
            </p>

            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white dark:bg-gray-900 text-[#1EB53A] dark:text-[#1EB53A] hover:bg-white/90 dark:hover:bg-gray-800 hover:scale-105 transition-transform text-sm sm:text-base lg:text-lg font-bold h-12 sm:h-13 lg:h-14 px-6 sm:px-8 rounded-full min-w-[200px] shadow-lg"
                onClick={() => setIsAuthModalOpen(true)}
              >
                {t("landing.hero.get_started")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto gap-2 text-sm sm:text-base lg:text-lg font-bold h-12 sm:h-13 lg:h-14 px-6 sm:px-8 bg-transparent border-2 border-white dark:border-gray-300 text-white dark:text-gray-300 hover:bg-white hover:text-[#1EB53A] dark:hover:bg-gray-900 dark:hover:text-[#1EB53A] dark:hover:border-[#1EB53A] transition-colors rounded-full min-w-[200px]"
                onClick={handleGuestMode}
              >
                <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                {t("landing.hero.guest_mode")}
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-white/80 px-4">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-white flex-shrink-0" />
              <span className="font-medium">{t("landing.hero.trusted")}</span>
            </div>
          </div>
        </div>
      </section>

      <SimpleAuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}
