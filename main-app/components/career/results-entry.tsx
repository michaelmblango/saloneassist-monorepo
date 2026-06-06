"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, Plus, Trash2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

type ExamType = "NPSE" | "BECE" | "WASSCE"

interface ResultsEntryProps {
  examType: ExamType
  onSubmit: (data: { subjects: Array<{ subject: string; grade: string }>; year: string }) => void
  onBack: () => void
}

const SUBJECTS = {
  NPSE: ["Mathematics", "English Language", "Science", "Social Studies", "Creative Arts", "Religious Studies"],
  BECE: [
    "Mathematics",
    "English Language",
    "Integrated Science",
    "Social Studies",
    "Agricultural Science",
    "Basic Technology",
    "Business Studies",
    "Home Economics",
    "Religious Studies",
  ],
  WASSCE: [
    "Mathematics",
    "English Language",
    "Physics",
    "Chemistry",
    "Biology",
    "Economics",
    "Government",
    "Literature in English",
    "Geography",
    "History",
    "Agricultural Science",
    "Technical Drawing",
    "Further Mathematics",
    "Computer Science",
    "French",
  ],
}

const GRADES = {
  NPSE: ["A", "B", "C", "D", "E", "F"],
  BECE: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  WASSCE: ["A1", "B2", "B3", "C4", "C5", "C6", "D7", "E8", "F9"],
}

const GRADE_VALUES: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  A1: 1,
  B2: 2,
  B3: 3,
  C4: 4,
  C5: 5,
  C6: 6,
  D7: 7,
  E8: 8,
  F9: 9,
}

const MIN_SUBJECTS = { NPSE: 5, BECE: 7, WASSCE: 8 }

export function ResultsEntry({ examType, onSubmit, onBack }: ResultsEntryProps) {
  const [subjects, setSubjects] = useState<Array<{ subject: string; grade: string }>>([{ subject: "", grade: "" }])
  const [examYear, setExamYear] = useState("")
  const [error, setError] = useState("")

  const addSubject = () => {
    setSubjects([...subjects, { subject: "", grade: "" }])
  }

  const removeSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index))
  }

  const updateSubject = (index: number, field: "subject" | "grade", value: string) => {
    const updated = [...subjects]
    updated[index][field] = value
    setSubjects(updated)
  }

  const calculateAggregate = () => {
    const validSubjects = subjects.filter((s) => s.subject && s.grade)
    if (validSubjects.length === 0) return 0
    return validSubjects.reduce((sum, s) => sum + (GRADE_VALUES[s.grade] || 0), 0)
  }

  const getAggregateLabel = (aggregate: number) => {
    if (examType === "WASSCE") {
      if (aggregate <= 12) return { label: "Excellent", color: "bg-green-500" }
      if (aggregate <= 18) return { label: "Good", color: "bg-blue-500" }
      if (aggregate <= 24) return { label: "Fair", color: "bg-yellow-500" }
      if (aggregate <= 36) return { label: "Pass", color: "bg-orange-500" }
    }
    return { label: "Calculating...", color: "bg-gray-500" }
  }

  const handleSubmit = () => {
    const validSubjects = subjects.filter((s) => s.subject && s.grade)
    const minRequired = MIN_SUBJECTS[examType]

    if (validSubjects.length < minRequired) {
      setError(`You need at least ${minRequired} subjects for ${examType}`)
      return
    }

    if (examType === "WASSCE") {
      const hasMath = validSubjects.some((s) => s.subject === "Mathematics")
      const hasEnglish = validSubjects.some((s) => s.subject === "English Language")
      if (!hasMath || !hasEnglish) {
        setError("WASSCE requires both Mathematics and English Language")
        return
      }
    }

    if (!examYear) {
      setError("Please enter the year you wrote the exam")
      return
    }

    setError("")
    onSubmit({ subjects: validSubjects, year: examYear })
  }

  const aggregate = calculateAggregate()
  const aggregateInfo = getAggregateLabel(aggregate)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enter Your {examType} Results</CardTitle>
          <CardDescription>Add your subjects and grades to get personalized recommendations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Subject Entries */}
          <div className="space-y-3">
            {subjects.map((subject, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-1">
                  <Select value={subject.subject} onValueChange={(value) => updateSubject(index, "subject", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {SUBJECTS[examType].map((subj) => (
                        <SelectItem key={subj} value={subj}>
                          {subj}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-32">
                  <Select value={subject.grade} onValueChange={(value) => updateSubject(index, "grade", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {GRADES[examType].map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {subjects.length > 1 && (
                  <Button variant="outline" size="icon" onClick={() => removeSubject(index)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button variant="outline" onClick={addSubject} className="w-full bg-transparent">
            <Plus className="mr-2 h-4 w-4" /> Add Another Subject
          </Button>

          {/* Aggregate Display */}
          {aggregate > 0 && (
            <Card className="border-[#1EB53A]">
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Your Aggregate</p>
                  <p className="text-3xl font-bold text-[#1EB53A]">{aggregate}</p>
                </div>
                <Badge className={`${aggregateInfo.color} text-white`}>{aggregateInfo.label}</Badge>
              </CardContent>
            </Card>
          )}

          {/* Year Input */}
          <div>
            <Label htmlFor="year">What year did you write this exam?</Label>
            <Input
              id="year"
              type="number"
              placeholder="e.g., 2024"
              value={examYear}
              onChange={(e) => setExamYear(e.target.value)}
              min="2000"
              max={new Date().getFullYear()}
            />
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleSubmit} className="bg-[#1EB53A] hover:bg-[#1EB53A]/90">
          Continue to Quiz <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
