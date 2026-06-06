"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLanguage } from "@/contexts/language-context"

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { t } = useLanguage()

  const testimonials = [
    {
      quote:
        "Salone Assist has transformed how I handle my business registration. What used to take days in waiting lines now takes just a few clicks. It's incredibly efficient!",
      name: "Aminata Kamara",
      role: "Business Owner, Freetown",
      avatar: "/african-woman-student.jpg",
      initials: "AK",
    },
    {
      quote:
        "Renewing my passport was such a hassle. With the platform, I submitted my application from home. The process was straightforward and I got updates via email. A huge step forward!",
      name: "Mohamed Sesay",
      role: "Student, Bo",
      avatar: "/african-businessman.png",
      initials: "MS",
    },
    {
      quote:
        "As a driver, keeping my license updated is crucial. The online renewal service saved me a full day. I am very impressed with the convenience and simplicity.",
      name: "Fatmata Bangura",
      role: "Commercial Driver, Kenema",
      avatar: "/african-woman-professional.jpg",
      initials: "FB",
    },
  ]

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 sm:py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-balance leading-tight tracking-tight">
            {t("landing.testimonials.title")}
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg text-muted-foreground text-balance">
            Hear from Sierra Leoneans who are already using Salone Assist
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <Card className="border-2">
            <CardContent className="p-6 sm:p-8 md:p-12">
              <Quote className="mb-4 sm:mb-6 h-10 w-10 sm:h-12 sm:w-12 text-[#1EB53A] opacity-50" />

              <p className="mb-6 sm:mb-8 text-base sm:text-lg md:text-xl leading-normal sm:leading-relaxed">
                "{testimonials[currentIndex].quote}"
              </p>

              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 sm:h-14 sm:w-14">
                  <AvatarImage
                    src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                  />
                  <AvatarFallback className="bg-[#1EB53A] text-white">
                    {testimonials[currentIndex].initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm sm:text-base font-semibold">{testimonials[currentIndex].name}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{testimonials[currentIndex].role}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex items-center justify-center gap-4">
            <Button variant="outline" size="icon" onClick={prev}>
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentIndex ? "w-8 bg-[#1EB53A]" : "bg-border"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button variant="outline" size="icon" onClick={next}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
