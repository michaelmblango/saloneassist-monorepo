"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Edit, Copy, Star } from "lucide-react"

export function MyCVs() {
  const [cvs, setCVs] = useState<any[]>([])

  useEffect(() => {
    const savedCVs = JSON.parse(localStorage.getItem("userCVs") || "[]")
    setCVs(savedCVs)
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">My CVs</h2>
        <p className="text-muted-foreground">Manage your saved CVs</p>
      </div>

      {cvs.length === 0 ? (
        <Card className="p-12 text-center">
          <FileText className="mx-auto h-16 w-16 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No CVs yet</h3>
          <p className="text-muted-foreground">Create your first CV to get started</p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {cvs.map((cv) => (
            <Card key={cv.id} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{cv.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Last updated: {new Date(cv.lastUpdated).toLocaleDateString()}
                  </p>
                  <Badge className="mt-2 bg-[#1EB53A]/10 text-[#1EB53A]">Score: {cv.score}/100</Badge>
                </div>
                {cv.isPrimary && <Star className="h-5 w-5 fill-[#1EB53A] text-[#1EB53A]" />}
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
