"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, Grid3x3, List, SlidersHorizontal, RefreshCw } from "lucide-react"
import { DEMO_JOBS, type Job } from "@/lib/jobs-data"
import { fetchAllJobs } from "@/lib/jobs-api"
import { JobFilters } from "./job-filters"
import { JobCard } from "./job-card"
import { JobDetailModal } from "./job-detail-modal"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface JobListingsProps {
  onBuildCV: () => void
}

export function JobListings({ onBuildCV }: JobListingsProps) {
  const { toast } = useToast()
  const [jobs, setJobs] = useState<Job[]>(DEMO_JOBS)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [sortBy, setSortBy] = useState("recent")
  const [filters, setFilters] = useState({
    districts: [] as string[],
    jobTypes: [] as string[],
    experienceLevel: "",
    industries: [] as string[],
    salaryRange: [0, 20000000] as [number, number],
    postedDate: "any",
    remote: false,
  })

  useEffect(() => {
    loadLiveJobs()
  }, [])

  const loadLiveJobs = async () => {
    setLoading(true)
    try {
      const liveJobs = await fetchAllJobs()
      if (liveJobs.length > 0) {
        setJobs(liveJobs)
        toast({
          title: "Jobs Updated",
          description: `Loaded ${liveJobs.length} live job listings`,
        })
      } else {
        // Fallback to demo jobs if no live jobs available
        setJobs(DEMO_JOBS)
        toast({
          title: "Showing Demo Jobs",
          description: "No live jobs available at the moment.",
        })
      }
    } catch (error) {
      console.error("[v0] Error loading jobs:", error)
      setJobs(DEMO_JOBS)
      toast({
        title: "Using Demo Jobs",
        description: "Could not connect to database. Showing demo listings.",
        variant: "default",
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredJobs = useMemo(() => {
    const filtered = jobs.filter((job) => {
      // Search query
      const matchesSearch =
        searchQuery === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())

      // Districts
      const matchesDistrict = filters.districts.length === 0 || filters.districts.includes(job.district)

      // Job types
      const matchesJobType = filters.jobTypes.length === 0 || filters.jobTypes.includes(job.jobType)

      // Experience level
      const matchesExperience = !filters.experienceLevel || job.experienceLevel === filters.experienceLevel

      // Industry
      const matchesIndustry = filters.industries.length === 0 || filters.industries.includes(job.industry)

      // Salary range
      const matchesSalary =
        !job.salaryMin || (job.salaryMin >= filters.salaryRange[0] && job.salaryMax! <= filters.salaryRange[1])

      // Posted date
      const matchesPostedDate = () => {
        if (filters.postedDate === "any") return true
        const postedDate = new Date(job.postedDate)
        const now = new Date()
        const diffTime = Math.abs(now.getTime() - postedDate.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (filters.postedDate === "24h") return diffDays <= 1
        if (filters.postedDate === "7d") return diffDays <= 7
        if (filters.postedDate === "30d") return diffDays <= 30
        return true
      }

      // Remote
      const matchesRemote = !filters.remote || job.remote

      return (
        matchesSearch &&
        matchesDistrict &&
        matchesJobType &&
        matchesExperience &&
        matchesIndustry &&
        matchesSalary &&
        matchesPostedDate() &&
        matchesRemote
      )
    })

    // Sort
    if (sortBy === "recent") {
      filtered.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
    } else if (sortBy === "relevant") {
      filtered.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
    } else if (sortBy === "salary-high") {
      filtered.sort((a, b) => (b.salaryMax || 0) - (a.salaryMin || 0))
    } else if (sortBy === "salary-low") {
      filtered.sort((a, b) => (a.salaryMin || 0) - (b.salaryMax || 0))
    } else if (sortBy === "company") {
      filtered.sort((a, b) => a.company.localeCompare(b.company))
    }

    return filtered
  }, [jobs, searchQuery, filters, sortBy])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Dashboard &gt; Jobs &amp; CV Builder</p>
          <h1 className="mt-1 text-3xl font-bold">Find Your Next Opportunity</h1>
          <p className="text-muted-foreground">Browse live jobs across Sierra Leone</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadLiveJobs} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button onClick={onBuildCV} className="bg-[#1EB53A] hover:bg-[#1EB53A]/90">
            Build Your CV
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="p-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search jobs by title, company, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button className="bg-[#1EB53A] hover:bg-[#1EB53A]/90">Search</Button>
        </div>
      </Card>

      <div className="flex gap-6">
        {/* Filters - Desktop Sidebar */}
        <div className="hidden w-[280px] shrink-0 lg:block">
          <JobFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-4">
          {/* Results Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <p className="text-sm font-medium">
                Showing <span className="font-bold text-[#1EB53A]">{filteredJobs.length}</span> jobs
              </p>
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] overflow-y-auto">
                  <JobFilters filters={filters} onFiltersChange={setFilters} />
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="relevant">Most Relevant</SelectItem>
                  <SelectItem value="salary-high">Salary: High to Low</SelectItem>
                  <SelectItem value="salary-low">Salary: Low to High</SelectItem>
                  <SelectItem value="company">Company A-Z</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-1 rounded-md border p-1">
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className={viewMode === "list" ? "bg-[#1EB53A] hover:bg-[#1EB53A]/90" : ""}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className={viewMode === "grid" ? "bg-[#1EB53A] hover:bg-[#1EB53A]/90" : ""}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Job Cards */}
          <div className={viewMode === "grid" ? "grid gap-4 sm:grid-cols-2 xl:grid-cols-3" : "space-y-4"}>
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} viewMode={viewMode} onViewDetails={() => setSelectedJob(job)} />
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-lg font-medium">No jobs found</p>
              <p className="mt-2 text-muted-foreground">Try adjusting your filters or search query</p>
            </Card>
          )}
        </div>
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
          onBuildCV={onBuildCV}
        />
      )}
    </div>
  )
}
