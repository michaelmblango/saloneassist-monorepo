"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Briefcase } from "lucide-react"

export function MyApplications() {
  const [applications, setApplications] = useState<any[]>([])

  useEffect(() => {
    const savedApplications = JSON.parse(localStorage.getItem("jobApplications") || "[]")
    setApplications(savedApplications)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700"
      case "Reviewed":
        return "bg-blue-100 text-blue-700"
      case "Interview":
        return "bg-green-100 text-green-700"
      case "Rejected":
        return "bg-red-100 text-red-700"
      case "Accepted":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">My Applications</h2>
        <p className="text-muted-foreground">Track your job applications</p>
      </div>

      {applications.length === 0 ? (
        <Card className="p-12 text-center">
          <Briefcase className="mx-auto h-16 w-16 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No applications yet</h3>
          <p className="text-muted-foreground">Start applying to jobs to see them here</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <Card key={app.id} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{app.jobTitle}</h3>
                  <p className="text-sm text-muted-foreground">{app.company}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Applied: {new Date(app.appliedDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
