"use client"

import { useLanguage } from "@/contexts/language-context"

export function StatsSection() {
  const { t } = useLanguage()

  const stats = [
    { value: "15,000+", label: t("landing.stats.businesses") },
    { value: "5,000+", label: t("landing.stats.students") },
    { value: "2,500+", label: t("landing.stats.jobs") },
    { value: "500+", label: t("landing.stats.clinics") },
  ]

  return (
    <section className="border-y bg-muted/30 py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1EB53A]">{stat.value}</div>
              <div className="text-sm sm:text-base text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
