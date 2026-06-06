"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

interface CVSummaryProps {
  data: any
  onUpdate: (field: string, value: any) => void
  onNext: () => void
}

const AI_SUGGESTIONS = [
  "Results-driven professional with 5+ years of experience delivering exceptional outcomes. Proven track record of exceeding targets and driving organizational success through strategic thinking and collaborative leadership.",
  "Passionate and detail-oriented specialist committed to excellence. Skilled in leveraging innovative solutions to solve complex problems and deliver measurable results in fast-paced environments.",
  "Dynamic professional with strong analytical abilities and a commitment to continuous improvement. Experienced in building productive relationships with stakeholders and driving impactful initiatives.",
]

export function CVSummary({ data, onUpdate, onNext }: CVSummaryProps) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const summary = data.summary || ""

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Professional Summary</h3>
        <p className="text-sm text-muted-foreground">Tell us about yourself and your career goals</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Your Professional Summary</Label>
        <Textarea
          id="summary"
          value={summary}
          onChange={(e) => onUpdate("summary", e.target.value)}
          placeholder="Write a brief professional summary highlighting your experience, skills, and career objectives..."
          className="min-h-[150px]"
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{summary.length}/500 characters</p>
          <Button variant="outline" size="sm" onClick={() => setShowSuggestions(!showSuggestions)}>
            <Sparkles className="mr-2 h-4 w-4" />
            Get AI Help
          </Button>
        </div>
      </div>

      {showSuggestions && (
        <div className="space-y-3">
          <Label>AI Suggestions</Label>
          {AI_SUGGESTIONS.map((suggestion, index) => (
            <Card key={index} className="p-4">
              <p className="text-sm text-muted-foreground">{suggestion}</p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2"
                onClick={() => {
                  onUpdate("summary", suggestion)
                  setShowSuggestions(false)
                }}
              >
                Use This
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
