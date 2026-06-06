import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// Initialize Supabase with service role key (has admin access)

async function getSupabaseClient() {
  return await createClient()
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-api-key",
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  })
}

export async function POST(request: NextRequest) {
  try {
    // 1. AUTHENTICATION
    const apiKey = request.headers.get("x-api-key")
    if (apiKey !== process.env.JOB_IMPORT_API_KEY) {
      return NextResponse.json({ error: "Unauthorized - Invalid API key" }, { status: 401, headers: corsHeaders })
    }

    // 2. PARSE REQUEST
    const body = await request.json()
    const { source, jobs } = body

    if (!source || !jobs || !Array.isArray(jobs)) {
      return NextResponse.json(
        { error: "Invalid request format. Expected: { source: string, jobs: array }" },
        { status: 400, headers: corsHeaders },
      )
    }

    // Rate limit check
    if (jobs.length > 1000) {
      return NextResponse.json(
        { error: "Too many jobs. Maximum 1000 per request." },
        { status: 400, headers: corsHeaders },
      )
    }

    const supabase = await getSupabaseClient()

    // 3. CREATE IMPORT LOG
    const { data: importLog, error: logError } = await supabase
      .from("job_import_logs")
      .insert({
        source,
        status: "running",
        jobs_found: jobs.length,
        import_config: { timestamp: new Date().toISOString() },
      })
      .select()
      .single()

    if (logError) {
      console.error("Failed to create import log:", logError)
    }

    // 4. PROCESS EACH JOB
    const results = {
      total: jobs.length,
      imported: 0,
      updated: 0,
      skipped: 0,
      failed: 0,
      errors: [] as any[],
    }

    for (const rawJob of jobs) {
      try {
        // Process and clean job data
        const processedJob = processJobData(rawJob, source)

        // Calculate quality score
        processedJob.quality_score = calculateQualityScore(processedJob)

        // Check if job already exists
        const { data: existing } = await supabase
          .from("jobs")
          .select("id")
          .eq("source", source)
          .eq("external_id", processedJob.external_id)
          .single()

        if (existing) {
          // Update existing job
          const { error: updateError } = await supabase
            .from("jobs")
            .update({
              ...processedJob,
              updated_at: new Date().toISOString(),
              last_checked_at: new Date().toISOString(),
            })
            .eq("id", existing.id)

          if (updateError) {
            results.failed++
            results.errors.push({
              job: rawJob.title,
              error: updateError.message,
            })
          } else {
            results.updated++
          }
        } else {
          // Insert new job
          const { error: insertError } = await supabase.from("jobs").insert(processedJob)

          if (insertError) {
            results.failed++
            results.errors.push({
              job: rawJob.title,
              error: insertError.message,
            })
          } else {
            results.imported++
          }
        }
      } catch (err: any) {
        results.failed++
        results.errors.push({
          job: rawJob?.title || "Unknown",
          error: err.message,
        })
      }
    }

    results.skipped = results.total - results.imported - results.updated - results.failed

    // 5. UPDATE IMPORT LOG
    if (importLog) {
      await supabase
        .from("job_import_logs")
        .update({
          status: results.failed > 0 ? "partial" : "completed",
          completed_at: new Date().toISOString(),
          jobs_new: results.imported,
          jobs_updated: results.updated,
          jobs_skipped: results.skipped,
          jobs_failed: results.failed,
          error_details: results.errors.length > 0 ? results.errors : null,
        })
        .eq("id", importLog.id)
    }

    // 6. RETURN RESULTS
    return NextResponse.json(
      {
        success: true,
        results,
        log_id: importLog?.id,
      },
      { headers: corsHeaders },
    )
  } catch (error: any) {
    console.error("Job import error:", error)
    return NextResponse.json({ error: "Import failed", details: error.message }, { status: 500, headers: corsHeaders })
  }
}

// HELPER FUNCTIONS

function processJobData(rawJob: any, source: string) {
  // Extract and clean required fields
  const title = cleanText(rawJob.title || rawJob.position || rawJob.job_title)
  const company = cleanText(rawJob.company || rawJob.employer || rawJob.company_name)
  const description = cleanText(rawJob.description || rawJob.details || rawJob.job_description || "")
  const location = cleanText(rawJob.location || "")

  // Generate external_id if not provided
  const external_id =
    rawJob.id ||
    rawJob.job_id ||
    rawJob.external_id ||
    `${source}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  // Extract requirements - convert to array if string
  const requirementsText = cleanText(rawJob.requirements || rawJob.qualifications || extractRequirements(description))
  const requirements = requirementsText ? requirementsText.split("\n").filter((r) => r.trim()) : []

  return {
    // Required fields
    title,
    company,
    description,
    location,

    // Map job type
    type: mapJobType(rawJob.type || rawJob.job_type || rawJob.employment_type),

    // Infer category
    category: inferCategory(title, description),

    // Requirements as array
    requirements,

    // Salary
    salary_range: extractSalary(rawJob.salary || rawJob.compensation || description),

    // Deadline
    deadline: parseDate(rawJob.deadline || rawJob.closing_date || rawJob.application_deadline),

    // Source tracking
    source,
    source_url: rawJob.url || rawJob.link || rawJob.apply_url,
    external_id,
    is_external: true,
    auto_imported: true,
    scraped_at: new Date().toISOString(),
    verification_status: "active",
    is_active: true,

    // Store raw data
    raw_json: rawJob,
  }
}

function cleanText(text: any): string {
  if (!text) return ""
  return String(text)
    .trim()
    .replace(/\s+/g, " ")
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .substring(0, 5000) // Limit length
}

function mapJobType(type: any): string {
  if (!type) return "full_time"

  const typeStr = String(type).toLowerCase().trim()

  const typeMap: Record<string, string> = {
    "full-time": "full_time",
    "full time": "full_time",
    fulltime: "full_time",
    permanent: "full_time",

    "part-time": "part_time",
    "part time": "part_time",
    parttime: "part_time",

    contract: "contract",
    contractor: "contract",
    temporary: "contract",
    temp: "contract",

    internship: "internship",
    intern: "internship",

    volunteer: "volunteer",
    voluntary: "volunteer",
  }

  return typeMap[typeStr] || "full_time"
}

function inferCategory(title: string, description: string): string {
  const text = (title + " " + description).toLowerCase()

  const categories: Record<string, string[]> = {
    Technology: ["software", "developer", "programmer", "IT", "tech", "engineer", "data", "web"],
    Healthcare: ["doctor", "nurse", "medical", "health", "hospital", "clinic", "pharmacy"],
    Education: ["teacher", "professor", "tutor", "education", "school", "university", "training"],
    Finance: ["accountant", "finance", "banking", "auditor", "financial", "economist"],
    Sales: ["sales", "marketing", "business development", "account manager"],
    Administration: ["admin", "secretary", "assistant", "coordinator", "receptionist"],
    Engineering: ["civil engineer", "mechanical", "electrical", "construction"],
    NGO: ["ngo", "non-profit", "humanitarian", "development", "advocacy"],
    Government: ["government", "public sector", "ministry", "civil service"],
    Other: [],
  }

  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some((keyword) => text.includes(keyword))) {
      return category
    }
  }

  return "Other"
}

function extractRequirements(description: string): string {
  if (!description) return ""

  // Look for requirements section
  const patterns = [
    /requirements?:(.+?)(?=responsibilities|duties|about|$)/is,
    /qualifications?:(.+?)(?=responsibilities|duties|about|$)/is,
    /you (?:must|should) have:(.+?)(?=responsibilities|duties|about|$)/is,
  ]

  for (const pattern of patterns) {
    const match = description.match(pattern)
    if (match) {
      return cleanText(match[1])
    }
  }

  // Fallback: extract bullet points
  const bullets = description.match(/[•\-*]\s*(.+)/g)
  if (bullets && bullets.length > 0) {
    return bullets.slice(0, 10).join("\n")
  }

  return ""
}

function extractSalary(salaryOrText: any): string | null {
  if (!salaryOrText) return null

  const text = String(salaryOrText)

  // Look for salary patterns
  const patterns = [
    /(?:SLL|Le|Leones?)\s*[\d,]+(?:\s*-\s*[\d,]+)?/i,
    /\$\s*[\d,]+(?:\s*-\s*[\d,]+)?/i,
    /[\d,]+\s*(?:SLL|Le|Leones?|USD)/i,
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match) {
      return match[0].trim()
    }
  }

  // Check for "competitive", "negotiable", etc.
  if (/competitive|negotiable|attractive/i.test(text)) {
    return "Competitive"
  }

  return null
}

function parseDate(dateStr: any): string | null {
  if (!dateStr) return null

  try {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return null
    return date.toISOString().split("T")[0] // Return YYYY-MM-DD format for DATE column
  } catch {
    return null
  }
}

function calculateQualityScore(job: any): number {
  let score = 0

  // Title (20 points)
  if (job.title && job.title.length >= 5) score += 20

  // Company (15 points)
  if (job.company && job.company.length >= 3) score += 15

  // Description (25 points)
  if (job.description) {
    if (job.description.length >= 100) score += 10
    if (job.description.length >= 300) score += 10
    if (job.description.length >= 500) score += 5
  }

  // Requirements (15 points)
  if (job.requirements && job.requirements.length > 0) score += 15

  // Salary (10 points)
  if (job.salary_range) score += 10

  // Location (10 points)
  if (job.location) score += 10

  // Source URL (5 points)
  if (job.source_url) score += 5

  return Math.min(score, 100)
}
