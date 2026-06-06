"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Plus, X } from "lucide-react"

interface CVSkillsProps {
  data: any
  onUpdate: (field: string, value: any) => void
  onNext: () => void
}

const SKILL_SUGGESTIONS = [
  "JavaScript",
  "Python",
  "React",
  "Communication",
  "Leadership",
  "Problem Solving",
  "Project Management",
  "Microsoft Excel",
  "Customer Service",
  "Data Analysis",
]

const PROFICIENCY_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"]
const LANGUAGE_LEVELS = ["Basic", "Conversational", "Fluent", "Native"]

export function CVSkills({ data, onUpdate, onNext }: CVSkillsProps) {
  const skills = data.skills || { technical: [], soft: [], languages: [] }
  const [newSkill, setNewSkill] = useState("")
  const [skillLevel, setSkillLevel] = useState("Intermediate")
  const [newLanguage, setNewLanguage] = useState("")
  const [languageLevel, setLanguageLevel] = useState("Conversational")

  const addTechnicalSkill = () => {
    if (newSkill.trim()) {
      const updated = {
        ...skills,
        technical: [...skills.technical, { name: newSkill.trim(), level: skillLevel }],
      }
      onUpdate("skills", updated)
      setNewSkill("")
      setSkillLevel("Intermediate")
    }
  }

  const removeTechnicalSkill = (index: number) => {
    const updated = {
      ...skills,
      technical: skills.technical.filter((_: any, i: number) => i !== index),
    }
    onUpdate("skills", updated)
  }

  const addLanguage = () => {
    if (newLanguage.trim()) {
      const updated = {
        ...skills,
        languages: [...skills.languages, { name: newLanguage.trim(), level: languageLevel }],
      }
      onUpdate("skills", updated)
      setNewLanguage("")
      setLanguageLevel("Conversational")
    }
  }

  const removeLanguage = (index: number) => {
    const updated = {
      ...skills,
      languages: skills.languages.filter((_: any, i: number) => i !== index),
    }
    onUpdate("skills", updated)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Skills</h3>
        <p className="text-sm text-muted-foreground">Add your technical skills and languages</p>
      </div>

      {/* Technical Skills */}
      <Card className="p-6">
        <h4 className="mb-4 font-semibold">Technical & Professional Skills</h4>

        <div className="mb-4 flex gap-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill..."
            onKeyPress={(e) => e.key === "Enter" && addTechnicalSkill()}
          />
          <Select value={skillLevel} onValueChange={setSkillLevel}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PROFICIENCY_LEVELS.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={addTechnicalSkill}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {SKILL_SUGGESTIONS.length > 0 && (
          <div className="mb-4">
            <Label className="mb-2 block text-xs text-muted-foreground">Suggestions:</Label>
            <div className="flex flex-wrap gap-2">
              {SKILL_SUGGESTIONS.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="cursor-pointer hover:bg-[#1EB53A]/10"
                  onClick={() => setNewSkill(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          {skills.technical.map((skill: any, index: number) => (
            <div key={index} className="flex items-center justify-between rounded-lg border p-3">
              <span className="font-medium">{skill.name}</span>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {skill.level}
                </Badge>
                <Button variant="ghost" size="icon" onClick={() => removeTechnicalSkill(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {skills.technical.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">No skills added yet</p>
          )}
        </div>
      </Card>

      {/* Languages */}
      <Card className="p-6">
        <h4 className="mb-4 font-semibold">Languages</h4>

        <div className="mb-4 flex gap-2">
          <Input
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
            placeholder="Add a language..."
            onKeyPress={(e) => e.key === "Enter" && addLanguage()}
          />
          <Select value={languageLevel} onValueChange={setLanguageLevel}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGE_LEVELS.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={addLanguage}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          {skills.languages.map((language: any, index: number) => (
            <div key={index} className="flex items-center justify-between rounded-lg border p-3">
              <span className="font-medium">{language.name}</span>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {language.level}
                </Badge>
                <Button variant="ghost" size="icon" onClick={() => removeLanguage(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {skills.languages.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">No languages added yet</p>
          )}
        </div>
      </Card>
    </div>
  )
}
