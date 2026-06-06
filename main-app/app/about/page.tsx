"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Heart, Shield, Briefcase, GraduationCap, MapPin, Mail, Phone } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-balance sm:text-5xl lg:text-6xl">
            About <span className="text-[#1EB53A]">Salone</span> <span className="text-[#0072C6]">Assist</span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground text-pretty">
            Empowering Sierra Leoneans with AI-powered tools for business discovery, career development, job
            opportunities, healthcare access, and verified information.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-[#1EB53A]/20">
              <CardContent className="p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#1EB53A]/10">
                  <Target className="h-6 w-6 text-[#1EB53A]" />
                </div>
                <h2 className="mb-3 text-2xl font-bold">Our Mission</h2>
                <p className="text-muted-foreground text-pretty">
                  To democratize access to essential services and information across Sierra Leone through innovative AI
                  technology, making it easier for every citizen to find businesses, advance their careers, access
                  healthcare, and verify information.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#0072C6]/20">
              <CardContent className="p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#0072C6]/10">
                  <Users className="h-6 w-6 text-[#0072C6]" />
                </div>
                <h2 className="mb-3 text-2xl font-bold">Our Vision</h2>
                <p className="text-muted-foreground text-pretty">
                  A digitally empowered Sierra Leone where every citizen has instant access to verified information,
                  quality healthcare, meaningful employment opportunities, and business connections that drive economic
                  growth and social development.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Core Features */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold">What We Offer</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="transition-shadow hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#1EB53A]/10">
                  <Briefcase className="h-6 w-6 text-[#1EB53A]" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Business Directory</h3>
                <p className="text-sm text-muted-foreground">
                  Discover verified businesses across all 16 districts with detailed information, reviews, and direct
                  contact options.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-shadow hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#0072C6]/10">
                  <GraduationCap className="h-6 w-6 text-[#0072C6]" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Career Development</h3>
                <p className="text-sm text-muted-foreground">
                  Access AI-powered career counseling, skill assessments, and personalized learning paths to advance
                  your professional journey.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-shadow hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#1EB53A]/10">
                  <Briefcase className="h-6 w-6 text-[#1EB53A]" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Job Opportunities</h3>
                <p className="text-sm text-muted-foreground">
                  Browse verified job listings from across Sierra Leone with advanced filtering and one-click
                  applications.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-shadow hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#0072C6]/10">
                  <Heart className="h-6 w-6 text-[#0072C6]" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Healthcare Access</h3>
                <p className="text-sm text-muted-foreground">
                  Find nearby clinics, hospitals, and pharmacies. Get health information and emergency assistance
                  through our AI health assistant.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-shadow hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#1EB53A]/10">
                  <Shield className="h-6 w-6 text-[#1EB53A]" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Truth Engine</h3>
                <p className="text-sm text-muted-foreground">
                  Verify information, check for scams, and access verified government services information to combat
                  misinformation.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-shadow hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#0072C6]/10">
                  <MapPin className="h-6 w-6 text-[#0072C6]" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Nationwide Coverage</h3>
                <p className="text-sm text-muted-foreground">
                  Serving all 16 districts of Sierra Leone with localized content and multilingual support (English &
                  Krio).
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Technology */}
        <section className="mb-16">
          <Card className="overflow-hidden border-2 border-[#1EB53A]/20">
            <CardContent className="p-8 md:p-12">
              <h2 className="mb-4 text-3xl font-bold">Powered by Advanced AI</h2>
              <p className="mb-6 text-lg text-muted-foreground text-pretty">
                Salone Assist leverages cutting-edge artificial intelligence technology to provide personalized
                recommendations, instant assistance, and verified information. Our AI-powered chatbots are specifically
                trained to understand Sierra Leone's unique context, languages, and needs.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-muted/50 p-4 text-center">
                  <p className="text-2xl font-bold text-[#1EB53A]">24/7</p>
                  <p className="text-sm text-muted-foreground">AI Assistance</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-4 text-center">
                  <p className="text-2xl font-bold text-[#0072C6]">2</p>
                  <p className="text-sm text-muted-foreground">Languages Supported</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-4 text-center">
                  <p className="text-2xl font-bold text-[#1EB53A]">16</p>
                  <p className="text-sm text-muted-foreground">Districts Covered</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="mb-4 text-center text-3xl font-bold">Built by Spark Team</h2>
          <p className="mb-8 text-center text-muted-foreground">
            A dedicated team of innovators committed to digital transformation in Sierra Leone
          </p>
          <Card className="mx-auto max-w-2xl">
            <CardContent className="p-8 text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#1EB53A] to-[#0072C6]">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Spark Team</h3>
              <p className="mb-4 text-muted-foreground">
                We're passionate about leveraging technology to solve real problems and create meaningful impact in
                Sierra Leone's digital ecosystem.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Contact */}
        <section className="mb-16">
          <Card className="overflow-hidden border-2 border-[#0072C6]/20">
            <CardContent className="p-8 md:p-12">
              <h2 className="mb-6 text-center text-3xl font-bold">Get in Touch</h2>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#1EB53A]/10">
                    <MapPin className="h-6 w-6 text-[#1EB53A]" />
                  </div>
                  <h3 className="mb-1 font-semibold">Location</h3>
                  <p className="text-sm text-muted-foreground">Freetown, Sierra Leone</p>
                </div>
                <div className="text-center">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#0072C6]/10">
                    <Mail className="h-6 w-6 text-[#0072C6]" />
                  </div>
                  <h3 className="mb-1 font-semibold">Email</h3>
                  <a href="mailto:saloneassist@gmail.com" className="text-sm text-[#0072C6] hover:underline">
                    saloneassist@gmail.com
                  </a>
                </div>
                <div className="text-center">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#1EB53A]/10">
                    <Phone className="h-6 w-6 text-[#1EB53A]" />
                  </div>
                  <h3 className="mb-1 font-semibold">Support</h3>
                  <p className="text-sm text-muted-foreground">Coming Soon</p>
                </div>
              </div>
              <div className="mt-8 text-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#1EB53A] to-[#0072C6] text-white hover:from-[#1EB53A]/90 hover:to-[#0072C6]/90"
                  onClick={() => (window.location.href = "/#home")}
                >
                  Start Using Salone Assist
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}
