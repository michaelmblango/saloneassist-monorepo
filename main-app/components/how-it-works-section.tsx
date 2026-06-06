"use client"

import { User, Grid, Zap } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function HowItWorksSection() {
  const { t } = useLanguage()

  const steps = [
    {
      icon: User,
      title: t("landing.how_it_works.step1_title"),
      description: t("landing.how_it_works.step1_desc"),
      step: "01",
    },
    {
      icon: Grid,
      title: t("landing.how_it_works.step2_title"),
      description: t("landing.how_it_works.step2_desc"),
      step: "02",
    },
    {
      icon: Zap,
      title: t("landing.how_it_works.step3_title"),
      description: t("landing.how_it_works.step3_desc"),
      step: "03",
    },
  ]

  return (
    <section className="bg-muted/30 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl text-balance">{t("landing.how_it_works.title")}</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-balance">
            {t("landing.how_it_works.subtitle")}
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute left-[50%] top-0 hidden h-full w-0.5 -translate-x-1/2 bg-border md:block" />

          <div className="grid gap-12 md:gap-20">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col items-center gap-6 md:flex-row ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <h3 className="mb-2 text-2xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>

                <div className="relative z-10 flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-[#1EB53A] text-white shadow-lg">
                  <step.icon className="h-8 w-8" />
                  <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#0072C6] text-xs font-bold">
                    {step.step}
                  </div>
                </div>

                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
