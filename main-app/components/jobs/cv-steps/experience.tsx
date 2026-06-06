"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Plus, Trash2, Sparkles } from "lucide-react"

interface CVExperienceProps {
  data: any
  onUpdate: (field: string, value: any) => void
  onNext: () => void
}

export function CVExperience({ data, onUpdate, onNext }: CVExperienceProps) {
  const experience = data.experience || []
  const [enhancing, setEnhancing] = useState<number | null>(null)

  const addExperience = () => {
    onUpdate("experience", [
      ...experience,
      {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
        achievements: [],
      },
    ])
  }

  const removeExperience = (index: number) => {
    onUpdate(
      "experience",
      experience.filter((_: any, i: number) => i !== index),
    )
  }

  const updateExperience = (index: number, field: string, value: any) => {
    const updated = [...experience]
    updated[index] = { ...updated[index], [field]: value }
    onUpdate("experience", updated)
  }

  const enhanceDescription = (index: number) => {
    setEnhancing(index)
    setTimeout(() => {
      const enhanced =
        "Led a high-performing team of 8 professionals, achieving 120% of quarterly targets through strategic coaching, performance optimization, and innovative process improvements."
      updateExperience(index, "description", enhanced)
      setEnhancing(null)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Work Experience</h3>
          <p className="text-sm text-muted-foreground">Add your work history</p>
        </div>
        <Button onClick={addExperience} variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Job
        </Button>
      </div>

      {experience.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-sm text-muted-foreground">No work experience added yet</p>
          <Button onClick={addExperience} className="mt-4" size="sm">
            Add Your First Job
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          {experience.map((exp: any, index: number) => (
            <Card key={index} className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-semibold">Job {index + 1}</h4>
                <Button variant="ghost" size="icon" onClick={() => removeExperience(index)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Job Title *</Label>
                  <Input
                    value={exp.title}
                    onChange={(e) => updateExperience(index, "title", e.target.value)}
                    placeholder="e.g., Software Developer"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Company Name *</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                    placeholder="e.g., Tech Company"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={exp.location}
                    onChange={(e) => updateExperience(index, "location", e.target.value)}
                    placeholder="e.g., Freetown"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                    disabled={exp.current}
                  />
                </div>

                <div className="flex items-center space-x-2 pt-8">
                  <Checkbox
                    id={`current-${index}`}
                    checked={exp.current}
                    onCheckedChange={(checked) => updateExperience(index, "current", checked)}
                  />
                  <Label htmlFor={`current-${index}`}>I currently work here</Label>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <Label>Job Description</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(index, "description", e.target.value)}
                  placeholder="Describe your responsibilities and what you did..."
                  className="min-h-[100px]"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => enhanceDescription(index)}
                  disabled={enhancing === index}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  {enhancing === index ? "Enhancing..." : "AI Enhance"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
