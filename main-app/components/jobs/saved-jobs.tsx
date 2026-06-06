"use client"

import { Card } from "@/components/ui/card"
import { Bookmark } from "lucide-react"

export function SavedJobs() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Saved Jobs</h2>
        <p className="text-muted-foreground">Jobs you've bookmarked</p>
      </div>

      <Card className="p-12 text-center">
        <Bookmark className="mx-auto h-16 w-16 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No saved jobs yet</h3>
        <p className="text-muted-foreground">Bookmark jobs to save them for later</p>
      </Card>
    </div>
  )
}
