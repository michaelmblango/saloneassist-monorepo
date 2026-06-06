import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// CORS headers for admin app access
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-api-key",
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const source = searchParams.get("source") // Optional filter by source
    const offset = (page - 1) * limit

    const supabase = await createClient()

    // Build query
    let query = supabase
      .from("jobs")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    // Filter by source if provided
    if (source) {
      query = query.eq("source", source)
    }

    const { data: jobs, error, count } = await query

    if (error) {
      console.error("[v0] Error fetching jobs:", error)
      return NextResponse.json(
        { error: "Failed to fetch jobs", details: error.message },
        { status: 500, headers: corsHeaders },
      )
    }

    // Transform jobs to match admin panel expectations
    const transformedJobs =
      jobs?.map((job) => ({
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        type: job.type,
        category: job.category,
        description: job.description,
        requirements: job.requirements,
        salary_range: job.salary_range,
        deadline: job.deadline,
        contact_email: job.contact_email,
        contact_phone: job.contact_phone,
        is_active: job.is_active,
        source: job.source,
        source_url: job.source_url,
        external_id: job.external_id,
        is_external: job.is_external,
        auto_imported: job.auto_imported,
        verification_status: job.verification_status,
        quality_score: job.quality_score,
        view_count: job.view_count,
        application_count: job.application_count,
        created_at: job.created_at,
        updated_at: job.updated_at,
        scraped_at: job.scraped_at,
        last_checked_at: job.last_checked_at,
      })) || []

    return NextResponse.json(
      {
        success: true,
        data: transformedJobs,
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit),
        },
      },
      { headers: corsHeaders },
    )
  } catch (error) {
    console.error("[v0] Unexpected error in jobs list API:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500, headers: corsHeaders },
    )
  }
}
