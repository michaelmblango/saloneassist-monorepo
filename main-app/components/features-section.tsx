"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, Compass, Briefcase, Heart, Search } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function FeaturesSection() {
  const { t } = useLanguage()

  const features = [
    {
      icon: ShieldCheck,
      title: t("landing.features.business.title"),
      description: t("landing.features.business.desc"),
      color: "text-[#1EB53A]",
    },
    {
      icon: Compass,
      title: t("landing.features.career.title"),
      description: t("landing.features.career.desc"),
      color: "text-[#0072C6]",
    },
    {
      icon: Briefcase,
      title: t("landing.features.jobs.title"),
      description: t("landing.features.jobs.desc"),
      color: "text-[#1EB53A]",
    },
    {
      icon: Heart,
      title: t("landing.features.health.title"),
      description: t("landing.features.health.desc"),
      color: "text-[#0072C6]",
    },
    {
      icon: Search,
      title: t("landing.features.truth.title"),
      description: t("landing.features.truth.desc"),
      color: "text-[#1EB53A]",
    },
  ]

  return (
    <section id="services" className="py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 sm:mb-14 lg:mb-16 text-center">
          <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance leading-tight tracking-tight">
            {t("landing.features.title")}
          </h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg lg:text-xl text-muted-foreground text-balance">
            {t("landing.hero.subtitle")}
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="flex flex-col border-2 transition-all duration-300 hover:border-[#1EB53A]/50 hover:shadow-lg hover:scale-105"
            >
              <CardHeader>
                <div className={`mb-4 inline-flex rounded-lg bg-muted p-3 sm:p-4 ${feature.color}`}>
                  <feature.icon className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
                </div>
                <CardTitle className="text-xl sm:text-2xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-sm sm:text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
