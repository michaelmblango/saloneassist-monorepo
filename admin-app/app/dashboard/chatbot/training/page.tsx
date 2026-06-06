"use client"

import type React from "react"

import { useEffect, useState } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Upload, Download } from "lucide-react"

interface TrainingItem {
  id: string
  question: string
  answer: string
  category: string
}

export default function TrainingData() {
  const [trainingData, setTrainingData] = useState<TrainingItem[]>([])
  const [newQuestion, setNewQuestion] = useState("")
  const [newAnswer, setNewAnswer] = useState("")
  const [newCategory, setNewCategory] = useState("general")
  const [role, setRole] = useState("")

  useEffect(() => {
    setRole(localStorage.getItem("admin_role") || "")
    loadTrainingData()
  }, [])

  const loadTrainingData = () => {
    const saved = localStorage.getItem("chatbot_training_data")
    if (saved) {
      setTrainingData(JSON.parse(saved))
    }
  }

  const saveTrainingData = (data: TrainingItem[]) => {
    localStorage.setItem("chatbot_training_data", JSON.stringify(data))
    setTrainingData(data)
  }

  const handleAddItem = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) {
      alert("Please fill in both question and answer")
      return
    }

    const newItem: TrainingItem = {
      id: Date.now().toString(),
      question: newQuestion,
      answer: newAnswer,
      category: newCategory,
    }

    const updated = [...trainingData, newItem]
    saveTrainingData(updated)

    setNewQuestion("")
    setNewAnswer("")
    setNewCategory("general")
  }

  const handleDeleteItem = (id: string) => {
    if (confirm("Are you sure you want to delete this training item?")) {
      const updated = trainingData.filter((item) => item.id !== id)
      saveTrainingData(updated)
    }
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(trainingData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "chatbot-training-data.json"
    link.click()
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string)
        saveTrainingData(imported)
        alert("Training data imported successfully!")
      } catch (error) {
        alert("Failed to import training data. Please check the file format.")
      }
    }
    reader.readAsText(file)
  }

  const isViewerRole = role === "viewer"

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Training Data Management</h1>
            <p className="text-gray-600">Teach your AI assistant with questions and answers</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport} disabled={trainingData.length === 0}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <label>
              <input type="file" accept=".json" onChange={handleImport} className="hidden" disabled={isViewerRole} />
              <Button variant="outline" disabled={isViewerRole} asChild>
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </span>
              </Button>
            </label>
          </div>
        </div>

        {/* Add New Training Item */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Training Item</CardTitle>
            <CardDescription>Create question-answer pairs to train your chatbot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                disabled={isViewerRole}
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1EB53A]"
              >
                <option value="general">General</option>
                <option value="jobs">Jobs</option>
                <option value="government">Government Services</option>
                <option value="business">Business</option>
                <option value="health">Health</option>
                <option value="education">Education</option>
              </select>
            </div>

            <div>
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="What question might users ask?"
                disabled={isViewerRole}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="answer">Answer</Label>
              <Textarea
                id="answer"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="How should the AI respond?"
                disabled={isViewerRole}
                rows={4}
                className="mt-2"
              />
            </div>

            <Button
              onClick={handleAddItem}
              disabled={isViewerRole}
              className="bg-gradient-to-r from-[#1EB53A] to-[#0072CE]"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Training Item
            </Button>
          </CardContent>
        </Card>

        {/* Training Data List */}
        <Card>
          <CardHeader>
            <CardTitle>Training Data ({trainingData.length} items)</CardTitle>
            <CardDescription>All questions and answers in your knowledge base</CardDescription>
          </CardHeader>
          <CardContent>
            {trainingData.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="mb-2">No training data yet</p>
                <p className="text-sm">Add your first question-answer pair above</p>
              </div>
            ) : (
              <div className="space-y-4">
                {trainingData.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-semibold text-[#1EB53A] bg-green-50 px-2 py-1 rounded">
                        {item.category}
                      </span>
                      {!isViewerRole && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="mb-2">
                      <p className="font-semibold text-gray-900 mb-1">Q: {item.question}</p>
                      <p className="text-gray-700">A: {item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
