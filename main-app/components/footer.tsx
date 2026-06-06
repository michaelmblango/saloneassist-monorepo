"use client"

import { Facebook, Twitter, Linkedin, MessageCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer id="contact" className="border-t bg-muted/30 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 text-xl font-bold">
              <span className="text-[#1EB53A]">SALONE</span> <span className="text-[#0072C6]">ASSIST</span>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">{t("landing.footer.tagline")}</p>
            <div className="flex gap-3">
              <a href="#" className="rounded-full bg-[#1EB53A] p-2 text-white transition-colors hover:bg-[#1EB53A]/90">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full bg-[#0072C6] p-2 text-white transition-colors hover:bg-[#0072C6]/90">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full bg-[#1EB53A] p-2 text-white transition-colors hover:bg-[#1EB53A]/90">
                <MessageCircle className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full bg-[#0072C6] p-2 text-white transition-colors hover:bg-[#0072C6]/90">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">{t("common.services")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="text-muted-foreground transition-colors hover:text-[#1EB53A]">
                  {t("common.about")}
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground transition-colors hover:text-[#1EB53A]">
                  {t("common.services")}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-[#1EB53A]">
                  {t("landing.footer.privacy")}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-[#1EB53A]">
                  {t("landing.footer.terms")}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground transition-colors hover:text-[#1EB53A]">
                  {t("common.contact")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">{t("common.services")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-[#1EB53A]">
                  {t("nav.business")}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-[#1EB53A]">
                  {t("nav.career")}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-[#1EB53A]">
                  {t("nav.jobs")}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-[#1EB53A]">
                  {t("nav.health")}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-[#1EB53A]">
                  {t("nav.truth")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">{t("common.contact")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Freetown, Sierra Leone</li>
              <li>
                <a href="mailto:saloneassist@gmail.com" className="text-[#0072C6] hover:underline">
                  saloneassist@gmail.com
                </a>
              </li>
              <li className="text-xs italic">by Spark Team</li>
              <li className="pt-2">
                <a
                  href="https://v0-saloneassistadmin.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0072C6] transition-colors hover:text-[#1EB53A] hover:underline"
                >
                  Admin Panel
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          © 2025 Salone Assist by Spark Team. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
