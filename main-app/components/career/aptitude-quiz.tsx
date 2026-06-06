"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, ArrowLeft, SkipForward } from "lucide-react"

interface AptitudeQuizProps {
  onComplete: (answers: Record<number, string>) => void
  onSkip: () => void
  onBack: () => void
}

const QUIZ_QUESTIONS = [
  {
    question: "Which activities do you enjoy most?",
    options: [
      "Working with numbers and data",
      "Helping people solve problems",
      "Creating and designing things",
      "Conducting experiments and research",
    ],
  },
  {
    question: "What's your preferred learning style?",
    options: ["Visual (diagrams, videos)", "Hands-on (practical work)", "Reading and writing", "Group discussions"],
  },
  {
    question: "Which environment appeals to you?",
    options: ["Office/corporate setting", "Hospital/clinic", "Laboratory/research facility", "Outdoor/fieldwork"],
  },
  {
    question: "Your greatest strength is:",
    options: ["Analytical thinking", "Communication", "Creativity", "Leadership"],
  },
  {
    question: "Which type of problems do you prefer solving?",
    options: [
      "Technical and logical challenges",
      "People-related issues",
      "Design and aesthetic problems",
      "Scientific mysteries",
    ],
  },
  {
    question: "What motivates you most?",
    options: ["Financial success", "Making a difference", "Innovation and creativity", "Discovery and knowledge"],
  },
  {
    question: "How do you handle pressure?",
    options: [
      "Stay calm and analytical",
      "Seek support from others",
      "Think creatively for solutions",
      "Use systematic approaches",
    ],
  },
  {
    question: "Which subjects interest you most?",
    options: ["Mathematics and Statistics", "Social Sciences", "Arts and Design", "Natural Sciences"],
  },
  {
    question: "Your ideal work involves:",
    options: [
      "Data analysis and planning",
      "Working directly with people",
      "Creative expression",
      "Research and experimentation",
    ],
  },
  {
    question: "Which career path appeals to you?",
    options: ["Business and Finance", "Healthcare and Social Work", "Arts and Media", "Science and Technology"],
  },
]

export function AptitudeQuiz({ onComplete, onSkip, onBack }: AptitudeQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [currentQuestion]: answer }
    setAnswers(newAnswers)

    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300)
    }
  }

  const handleNext = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      onComplete(answers)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Quick Aptitude Assessment</CardTitle>
              <CardDescription>Help us understand your strengths and interests (2 minutes)</CardDescription>
            </div>
            <Button variant="ghost" onClick={onSkip} className="text-muted-foreground">
              <SkipForward className="mr-2 h-4 w-4" /> Skip Quiz
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
              </span>
              <span className="font-medium text-[#1EB53A]">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{QUIZ_QUESTIONS[currentQuestion].question}</h3>
            <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswer}>
              {QUIZ_QUESTIONS[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={currentQuestion === 0 ? onBack : handlePrevious}>
          <ArrowLeft className="mr-2 h-4 w-4" /> {currentQuestion === 0 ? "Back to Results" : "Previous"}
        </Button>
        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion]}
          className="bg-[#1EB53A] hover:bg-[#1EB53A]/90"
        >
          {currentQuestion === QUIZ_QUESTIONS.length - 1 ? "View Recommendations" : "Next"}{" "}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
