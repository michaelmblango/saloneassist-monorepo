"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"

interface CVEducationProps {
  data: any
  onUpdate: (field: string, value: any) => void
  onNext: () => void
}

const DEGREE_TYPES = [
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Diploma",
  "Certificate",
  "Secondary School",
  "Other",
]

export function CVEducation({ data, onUpdate, onNext }: CVEducationProps) {
  const education = data.education || []

  const addEducation = () => {
    onUpdate("education", [
      ...education,
      {
        degree: "",
        field: "",
        institution: "",
        location: "",
        graduationYear: "",
        grade: "",
      },
    ])
  }

  const removeEducation = (index: number) => {
    onUpdate(
      "education",
      education.filter((_: any, i: number) => i !== index),
    )
  }

  const updateEducation = (index: number, field: string, value: any) => {
    const updated = [...education]
    updated[index] = { ...updated[index], [field]: value }
    onUpdate("education", updated)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Education</h3>
          <p className="text-sm text-muted-foreground">Add your educational background</p>
        </div>
        <Button onClick={addEducation} variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Education
        </Button>
      </div>

      {education.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-sm text-muted-foreground">No education added yet</p>
          <Button onClick={addEducation} className="mt-4" size="sm">
            Add Your Education
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          {education.map((edu: any, index: number) => (
            <Card key={index} className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-semibold">Education {index + 1}</h4>
                <Button variant="ghost" size="icon" onClick={() => removeEducation(index)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Degree/Qualification *</Label>
                  <Select value={edu.degree} onValueChange={(value) => updateEducation(index, "degree", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select degree" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEGREE_TYPES.map((degree) => (
                        <SelectItem key={degree} value={degree}>
                          {degree}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Field of Study *</Label>
                  <Input
                    value={edu.field}
                    onChange={(e) => updateEducation(index, "field", e.target.value)}
                    placeholder="e.g., Computer Science"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Institution Name *</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                    placeholder="e.g., Fourah Bay College"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={edu.location}
                    onChange={(e) => updateEducation(index, "location", e.target.value)}
                    placeholder="e.g., Freetown"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Graduation Year *</Label>
                  <Input
                    type="number"
                    value={edu.graduationYear}
                    onChange={(e) => updateEducation(index, "graduationYear", e.target.value)}
                    placeholder="2020"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Grade/GPA (Optional)</Label>
                  <Input
                    value={edu.grade}
                    onChange={(e) => updateEducation(index, "grade", e.target.value)}
                    placeholder="e.g., First Class Honours"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
