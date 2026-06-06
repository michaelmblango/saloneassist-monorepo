"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, ThumbsUp, ThumbsDown, Share2, Printer } from "lucide-react"
import { governmentFAQs, faqCategories } from "@/lib/truth-engine-data"

export function GovernmentFAQTab() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFAQs = selectedCategory
    ? governmentFAQs.filter((faq) => faq.category === selectedCategory)
    : governmentFAQs

  const searchedFAQs = searchQuery
    ? filteredFAQs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : filteredFAQs

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6">
        <h2 className="mb-2 text-2xl font-bold">Government Services FAQ</h2>
        <p className="mb-4 text-muted-foreground">Quick answers to common questions</p>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search frequently asked questions..."
            className="pl-10"
          />
        </div>
      </Card>

      {/* Categories or FAQ List */}
      {!selectedCategory ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {faqCategories.map((category) => (
            <Card
              key={category.value}
              className="cursor-pointer p-6 transition-all hover:border-[#1EB53A] hover:shadow-md"
              onClick={() => setSelectedCategory(category.value)}
            >
              <category.icon className="mb-3 h-8 w-8 text-[#1EB53A]" />
              <h3 className="mb-1 font-semibold">{category.label}</h3>
              <p className="mb-3 text-xs text-muted-foreground">{category.desc}</p>
              <Badge variant="secondary">{category.count} questions</Badge>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{faqCategories.find((c) => c.value === selectedCategory)?.label}</h3>
            <Button variant="outline" onClick={() => setSelectedCategory(null)}>
              Back to Categories
            </Button>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {searchedFAQs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="rounded-lg border bg-card px-6">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-start gap-3 text-left">
                    <span className="font-semibold">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="whitespace-pre-wrap text-sm text-muted-foreground">{faq.answer}</div>

                  {faq.relatedLinks && faq.relatedLinks.length > 0 && (
                    <div className="space-y-2 rounded-lg bg-muted p-4">
                      <p className="text-sm font-semibold">Related:</p>
                      {faq.relatedLinks.map((link, index) => (
                        <Button key={index} variant="link" className="h-auto p-0 text-[#1EB53A]" size="sm">
                          {link}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <span className="text-xs text-muted-foreground">Was this helpful?</span>
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="mr-1 h-3 w-3" />
                      Yes
                    </Button>
                    <Button variant="outline" size="sm">
                      <ThumbsDown className="mr-1 h-3 w-3" />
                      No
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="mr-1 h-3 w-3" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <Printer className="mr-1 h-3 w-3" />
                      Print
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {searchedFAQs.length === 0 && (
            <Card className="p-8 text-center">
              <p className="mb-4 text-muted-foreground">No FAQs found matching your search.</p>
              <Button className="bg-[#1EB53A] hover:bg-[#1EB53A]/90">Ask our AI Assistant</Button>
            </Card>
          )}
        </div>
      )}

      {/* Popular Searches */}
      {!selectedCategory && (
        <Card className="p-6">
          <h3 className="mb-4 font-semibold">Popular Searches</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "NIN application",
              "Business registration",
              "Passport application",
              "Driver's license",
              "Birth certificate",
              "University admission",
            ].map((term) => (
              <Button key={term} variant="outline" size="sm" onClick={() => setSearchQuery(term)}>
                {term}
              </Button>
            ))}
          </div>
        </Card>
      )}

      {/* CTA */}
      <Card className="bg-[#1EB53A]/10 p-6 text-center">
        <h3 className="mb-2 text-lg font-semibold">Can't find your answer?</h3>
        <p className="mb-4 text-sm text-muted-foreground">Ask our AI Assistant for personalized help</p>
        <Button className="bg-[#1EB53A] hover:bg-[#1EB53A]/90">Ask AI Assistant</Button>
      </Card>
    </div>
  )
}
