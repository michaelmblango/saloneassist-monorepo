"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useLanguage } from "@/contexts/language-context"

interface SimpleAuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SimpleAuthModal({ isOpen, onClose }: SimpleAuthModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault()

    if (name.trim().length < 2) {
      toast({
        title: t("auth.name_required"),
        description: t("auth.name_min_length"),
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    localStorage.setItem("userName", name)
    localStorage.setItem("userEmail", email)
    localStorage.setItem("isAuthenticated", "true")

    toast({
      title: t("auth.welcome", { name }),
      description: t("auth.welcome_message"),
      action: (
        <ToastAction altText={t("common.close")} onClick={() => {}}>
          {t("common.close")}
        </ToastAction>
      ),
    })

    setTimeout(() => {
      onClose()
      router.push("/dashboard")
    }, 500)
  }

  const handleDemoAccount = () => {
    const demoName = "Demo User"
    const demoEmail = "demo@saloneassist.sl"

    localStorage.setItem("userName", demoName)
    localStorage.setItem("userEmail", demoEmail)
    localStorage.setItem("isAuthenticated", "true")

    toast({
      title: t("auth.welcome", { name: demoName }),
      description: t("auth.demo_account_message"),
      action: (
        <ToastAction altText={t("common.close")} onClick={() => {}}>
          {t("common.close")}
        </ToastAction>
      ),
    })

    onClose()
    router.push("/dashboard")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && name.trim().length >= 2) {
      handleContinue(e as any)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="flex justify-center pb-2">
          <div className="text-3xl font-bold">
            <span className="text-[#1EB53A]">SALONE</span> <span className="text-[#0072C6]">ASSIST</span>
          </div>
        </div>

        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{t("auth.get_started_title")}</DialogTitle>
          <DialogDescription className="text-base">{t("auth.get_started_subtitle")}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleContinue} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("auth.name_label")}</Label>
            <Input
              id="name"
              placeholder={t("auth.name_placeholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("auth.email_label")}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t("auth.email_placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <p className="text-xs text-muted-foreground">{t("auth.email_hint")}</p>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#1EB53A] text-white hover:bg-[#1EB53A]/90"
            disabled={name.trim().length < 2 || isSubmitting}
          >
            {t("common.continue")}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">{t("common.or")}</span>
            </div>
          </div>

          <Button type="button" variant="outline" className="w-full bg-transparent" onClick={handleDemoAccount}>
            {t("auth.use_demo")}
          </Button>

          <p className="text-center text-xs text-muted-foreground">{t("auth.no_password")}</p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
