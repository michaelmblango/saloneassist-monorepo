"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { MapPin, Briefcase, Clock, CheckCircle2, Bookmark, Share2, Building2 } from "lucide-react"
import type { Job } from "@/lib/jobs-data"
import { ApplicationModal } from "./application-modal"

interface JobDetailModalProps {
  job: Job
  isOpen: boolean
  onClose: () => void
  onBuildCV: () => void
}

export function JobDetailModal({ job, isOpen, onClose, onBuildCV }: JobDetailModalProps) {
  const [showApplicationModal, setShowApplicationModal] = useState(false)

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    return `${Math.floor(diffDays / 7)} weeks ago`
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
          <DialogHeader>
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-[#1EB53A]/10 text-xl font-semibold text-[#1EB53A]">
                  {job.companyLogo}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <DialogTitle className="text-2xl">{job.title}</DialogTitle>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-medium">{job.company}</span>
                  {job.verified && <CheckCircle2 className="h-4 w-4 text-[#1EB53A]" />}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                    {job.remote && (
                      <Badge variant="outline" className="ml-1">
                        Remote
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    <span>{job.jobType}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Posted {getDaysAgo(job.postedDate)}</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-lg font-semibold text-[#1EB53A]">{job.salary}</span>
                  <span className="text-sm text-muted-foreground">
                    • Deadline: {new Date(job.deadline).toLocaleDateString()}
                  </span>
                  {job.matchScore && <Badge className="bg-[#1EB53A]/10 text-[#1EB53A]">{job.matchScore}% match</Badge>}
                </div>
              </div>
            </div>
          </DialogHeader>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button onClick={() => setShowApplicationModal(true)} className="flex-1 bg-[#1EB53A] hover:bg-[#1EB53A]/90">
              Apply Now
            </Button>
            <Button variant="outline">
              <Bookmark className="mr-2 h-4 w-4" />
              Save Job
            </Button>
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>

          <Separator />

          {/* Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="company">Company</TabsTrigger>
              <TabsTrigger value="similar">Similar Jobs</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div>
                <h3 className="mb-2 font-semibold">About this job</h3>
                <p className="text-sm text-muted-foreground">{job.description}</p>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">Key Responsibilities</h3>
                <ul className="space-y-2">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index} className="flex gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1EB53A]" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">Benefits</h3>
                <div className="flex flex-wrap gap-2">
                  {job.benefits.map((benefit, index) => (
                    <Badge key={index} variant="secondary">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="requirements" className="space-y-6">
              <div>
                <h3 className="mb-2 font-semibold">Education</h3>
                <p className="text-sm text-muted-foreground">{job.requirements.education}</p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Experience</h3>
                <p className="text-sm text-muted-foreground">{job.requirements.experience}</p>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">Required Skills</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {job.requirements.skills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {skill.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">Language Requirements</h3>
                <div className="space-y-2">
                  {job.requirements.languages.map((lang, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                      <span className="text-sm font-medium">{lang.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {lang.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="company" className="space-y-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-[#1EB53A]/10 text-xl font-semibold text-[#1EB53A]">
                    {job.companyLogo}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{job.company}</h3>
                  <p className="text-sm text-muted-foreground">
                    {job.industry.charAt(0).toUpperCase() + job.industry.slice(1)} • 50-200 employees
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">About the company</h3>
                <p className="text-sm text-muted-foreground">
                  {job.company} is a leading organization in the {job.industry} sector, committed to excellence and
                  innovation. We provide cutting-edge solutions and services to our clients across Sierra Leone.
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Location</h3>
                <p className="text-sm text-muted-foreground">{job.location}, Sierra Leone</p>
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                <Building2 className="mr-2 h-4 w-4" />
                View all jobs from this company
              </Button>
            </TabsContent>

            <TabsContent value="similar">
              <p className="text-center text-sm text-muted-foreground">Similar jobs coming soon...</p>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <ApplicationModal
        job={job}
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        onBuildCV={onBuildCV}
      />
    </>
  )
}
