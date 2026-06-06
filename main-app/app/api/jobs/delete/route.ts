import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function DELETE(request: NextRequest) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-api-key",
  }

  try {
    // Authentication
    const apiKey = request.headers.get("x-api-key")
    if (apiKey !== process.env.JOB_IMPORT_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers })
    }

    // Get job IDs to delete
    const { jobIds } = await request.json()

    if (!jobIds || !Array.isArray(jobIds) || jobIds.length === 0) {
      return NextResponse.json({ error: "Invalid job IDs" }, { status: 400, headers })
    }

    const supabase = await createClient()

    // Delete jobs
    const { data, error } = await supabase.from("jobs").delete().in("id", jobIds).select()

    if (error) {
      throw error
    }

    return NextResponse.json(
      {
        success: true,
        deleted: data?.length || 0,
        message: `Successfully deleted ${data?.length} job(s)`,
      },
      { status: 200, headers },
    )
  } catch (error: any) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: "Delete failed", details: error.message }, { status: 500, headers })
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, x-api-key",
    },
  })
}
