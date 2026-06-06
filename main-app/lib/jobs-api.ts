import { createClient } from "@/lib/supabase/client"
import type { Job } from "./jobs-data"

export interface JobSource {
  id: string
  name: string
  apiUrl: string
  enabled: boolean
}

export interface AdminJob {
  id: string
  title: string
  company: string
  description: string
  district: string
  jobType: string
  experienceLevel: string
  industry: string
  salaryMin?: number
  salaryMax?: number
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
  applicationUrl: string
  applicationEmail: string
  postedDate: string
  expiryDate: string
  remote: boolean
  featured: boolean
  status: "active" | "paused" | "expired"
}

// External job sources configuration
const JOB_SOURCES: JobSource[] = [
  {
    id: "jobsearch_sl",
    name: "JobSearch Sierra Leone",
    apiUrl: "/api/jobs/external/jobsearch",
    enabled: true,
  },
  {
    id: "sl_careers",
    name: "SL Careers Portal",
    apiUrl: "/api/jobs/external/slcareers",
    enabled: true,
  },
  {
    id: "freetown_jobs",
    name: "Freetown Jobs Board",
    apiUrl: "/api/jobs/external/freetown",
    enabled: true,
  },
]

// Fetch jobs from all enabled external sources
export async function fetchExternalJobs() {
  try {
    const jobPromises = JOB_SOURCES.filter((source) => source.enabled).map(async (source) => {
      try {
        const res = await fetch(source.apiUrl)

        if (!res.ok) {
          return []
        }

        const contentType = res.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          return []
        }

        const data = await res.json()
        return Array.isArray(data) ? data : []
      } catch (error) {
        return []
      }
    })

    const results = await Promise.all(jobPromises)
    return results.flat()
  } catch (error) {
    return []
  }
}

export async function fetchAdminJobs() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching jobs from Supabase:", error)
      return []
    }

    return (data || []).map((job): Job => {
      // Format salary display
      let salaryDisplay = "Competitive"
      if (job.salary_range) {
        salaryDisplay = job.salary_range
      } else if (job.salary_min && job.salary_max) {
        salaryDisplay = `SLL ${(job.salary_min / 1000000).toFixed(1)}M - ${(job.salary_max / 1000000).toFixed(1)}M per month`
      } else if (job.salary_min) {
        salaryDisplay = `From SLL ${(job.salary_min / 1000000).toFixed(1)}M per month`
      }

      // Use created_at as postedDate if posted_date is not available
      const postedDate = job.posted_date || job.created_at || new Date().toISOString()

      // Get company initials for logo
      const companyInitials = job.company
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)

      return {
        id: job.id,
        title: job.title,
        company: job.company,
        companyLogo: companyInitials,
        verified: job.is_external || false,
        location: job.location || "Not specified",
        district: job.location || "Not specified",
        remote: job.is_remote || false,
        jobType: formatJobType(job.type),
        salary: salaryDisplay,
        salaryMin: job.salary_min,
        salaryMax: job.salary_max,
        postedDate: postedDate,
        deadline: job.deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        description: job.description || "",
        responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities : [],
        requirements: {
          education: job.requirements?.[0] || "Not specified",
          experience: job.experience_level || "Not specified",
          skills: Array.isArray(job.requirements)
            ? job.requirements.slice(0, 5).map((req: string) => ({ name: req, level: "Required" }))
            : [],
          languages: [{ name: "English", level: "Fluent" }],
        },
        benefits: Array.isArray(job.benefits) ? job.benefits : [],
        industry: job.category || "other",
        experienceLevel: formatExperienceLevel(job.experience_level),
        featured: job.is_featured || false,
        urgent: false,
        matchScore: undefined,
      }
    })
  } catch (error) {
    console.error("[v0] Error in fetchAdminJobs:", error)
    return []
  }
}

function formatJobType(
  type: string | null | undefined,
): "Full-time" | "Part-time" | "Contract" | "Internship" | "Volunteer" {
  const typeMap: Record<string, "Full-time" | "Part-time" | "Contract" | "Internship" | "Volunteer"> = {
    "full-time": "Full-time",
    full_time: "Full-time",
    fulltime: "Full-time",
    "part-time": "Part-time",
    part_time: "Part-time",
    parttime: "Part-time",
    contract: "Contract",
    internship: "Internship",
    volunteer: "Volunteer",
  }

  return typeMap[type?.toLowerCase() || ""] || "Full-time"
}

function formatExperienceLevel(level: string | null | undefined): string {
  const levelMap: Record<string, string> = {
    entry: "Entry Level",
    junior: "Entry Level",
    mid: "Mid Level",
    intermediate: "Mid Level",
    senior: "Senior Level",
    lead: "Senior Level",
    expert: "Senior Level",
  }

  return levelMap[level?.toLowerCase() || ""] || "Entry Level"
}

// Combine all job sources
export async function fetchAllJobs(): Promise<Job[]> {
  const [externalJobs, adminJobs] = await Promise.all([fetchExternalJobs(), fetchAdminJobs()])

  return [...adminJobs, ...externalJobs].sort(
    (a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime(),
  )
}

export async function createAdminJob(jobData: Omit<AdminJob, "id" | "postedDate">) {
  try {
    const response = await fetch("/api/jobs/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData),
    })
    return await response.json()
  } catch (error) {
    throw error
  }
}

export async function updateAdminJob(jobId: string, jobData: Partial<AdminJob>) {
  try {
    const response = await fetch(`/api/jobs/admin/${jobId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData),
    })
    return await response.json()
  } catch (error) {
    throw error
  }
}

export async function deleteAdminJob(jobId: string) {
  try {
    const response = await fetch(`/api/jobs/admin/${jobId}`, {
      method: "DELETE",
    })
    return await response.json()
  } catch (error) {
    throw error
  }
}
