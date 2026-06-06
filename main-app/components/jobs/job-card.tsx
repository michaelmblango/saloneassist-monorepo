"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Clock, Bookmark, Share2, CheckCircle2, DollarSign } from "lucide-react"
import type { Job } from "@/lib/jobs-data"
import { cn } from "@/lib/utils"

interface JobCardProps {
  job: Job
  viewMode: "list" | "grid"
  onViewDetails: () => void
}

export function JobCard({ job, viewMode, onViewDetails }: JobCardProps) {
  const getJobTypeBadgeColor = (type: string) => {
    switch (type) {
      case "Full-time":
        return "bg-blue-100 text-blue-700"
      case "Contract":
        return "bg-yellow-100 text-yellow-700"
      case "Internship":
        return "bg-green-100 text-green-700"
      case "Part-time":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return `${Math.floor(diffDays / 30)} months ago`
  }

  const isDeadlineUrgent = (deadlineString: string) => {
    const deadline = new Date(deadlineString)
    const now = new Date()
    const diffTime = deadline.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7
  }

  if (viewMode === "grid") {
    return (
      <Card className="group cursor-pointer p-4 transition-shadow hover:shadow-lg" onClick={onViewDetails}>
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-[#1EB53A]/10 text-sm font-semibold text-[#1EB53A]">
                {job.companyLogo}
              </AvatarFallback>
            </Avatar>
            {job.matchScore && <Badge className="bg-[#1EB53A]/10 text-[#1EB53A]">{job.matchScore}% match</Badge>}
          </div>

          <div>
            <h3 className="line-clamp-2 font-semibold group-hover:text-[#1EB53A]">{job.title}</h3>
            <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <span>{job.company}</span>
              {job.verified && <CheckCircle2 className="h-3 w-3 text-[#1EB53A]" />}
            </div>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{job.location}</span>
              {job.remote && (
                <Badge variant="outline" className="text-xs">
                  Remote
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="truncate">{job.salary}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge className={cn("text-xs", getJobTypeBadgeColor(job.jobType))}>{job.jobType}</Badge>
            {job.featured && (
              <Badge variant="outline" className="text-xs">
                Featured
              </Badge>
            )}
          </div>

          <Button className="w-full bg-[#1EB53A] hover:bg-[#1EB53A]/90" size="sm">
            View Details
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="flex gap-4">
        {/* Company Logo */}
        <Avatar className="h-14 w-14 shrink-0">
          <AvatarFallback className="bg-[#1EB53A]/10 text-lg font-semibold text-[#1EB53A]">
            {job.companyLogo}
          </AvatarFallback>
        </Avatar>

        {/* Main Content */}
        <div className="flex-1 space-y-3">
          {/* Title and Company */}
          <div>
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{job.company}</span>
              {job.verified && <CheckCircle2 className="h-4 w-4 text-[#1EB53A]" />}
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
              {job.remote && (
                <Badge variant="outline" className="ml-1 text-xs">
                  Remote
                </Badge>
              )}
            </div>
            <Badge className={getJobTypeBadgeColor(job.jobType)}>{job.jobType}</Badge>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span>{job.salary}</span>
            </div>
          </div>

          {/* Dates */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Posted {getDaysAgo(job.postedDate)}</span>
            </div>
            <div
              className={cn("font-medium", isDeadlineUrgent(job.deadline) ? "text-red-600" : "text-muted-foreground")}
            >
              Apply by: {new Date(job.deadline).toLocaleDateString()}
            </div>
            {job.urgent && (
              <Badge variant="destructive" className="text-xs">
                Urgent
              </Badge>
            )}
          </div>

          {/* Description */}
          <p className="line-clamp-2 text-sm text-muted-foreground">{job.description}</p>

          {/* Skills */}
          {job.requirements?.skills && Array.isArray(job.requirements.skills) && job.requirements.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {job.requirements.skills.slice(0, 5).map((skill) => (
                <Badge key={skill.name} variant="secondary" className="text-xs">
                  {skill.name}
                </Badge>
              ))}
              {job.requirements.skills.length > 5 && (
                <Badge variant="secondary" className="text-xs">
                  +{job.requirements.skills.length - 5} more
                </Badge>
              )}
            </div>
          )}

          {/* Match Score */}
          {job.matchScore && (
            <Badge className="bg-[#1EB53A]/10 text-[#1EB53A]">{job.matchScore}% match based on your profile</Badge>
          )}
        </div>

        {/* Actions */}
        <div className="flex shrink-0 flex-col gap-2">
          <Button variant="ghost" size="icon">
            <Bookmark className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
          <Button onClick={onViewDetails} variant="outline" className="mt-auto bg-transparent">
            View Details
          </Button>
          <Button className="bg-[#1EB53A] hover:bg-[#1EB53A]/90">Quick Apply</Button>
        </div>
      </div>
    </Card>
  )
}
