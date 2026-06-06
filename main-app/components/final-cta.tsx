"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { SimpleAuthModal } from "@/components/simple-auth-modal"

export function FinalCTA() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  return (
    <>
      <section className="bg-gradient-to-br from-[#1EB53A] to-[#0072C6] py-20 text-white md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl text-balance">Ready to Get Started?</h2>
          <p className="mb-8 text-lg text-white/90 md:text-xl text-balance">
            Join thousands of Sierra Leoneans using Salone Assist
          </p>

          <Button
            size="lg"
            className="mb-4 bg-white text-[#1EB53A] hover:bg-white/90 text-lg h-12 px-8"
            onClick={() => setIsAuthModalOpen(true)}
          >
            Get Started Free
          </Button>

          <div className="flex flex-col items-center gap-2 text-sm text-white/80 sm:flex-row sm:justify-center">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>No credit card required</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Works on any device</span>
            </div>
          </div>
        </div>
      </section>

      <SimpleAuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}
