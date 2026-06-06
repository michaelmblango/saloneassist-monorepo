import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log("[v0] Admin app: Forwarding jobs to main app")
    console.log("[v0] Number of jobs:", body.jobs?.length)

    const response = await fetch("https://saloneassist.vercel.app/api/jobs/import", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          process.env.JOB_IMPORT_API_KEY || "sk_salone_2024_8f7d9c2a1b4e6f3g5h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6",
      },
      body: JSON.stringify({
        source: "admin_panel",
        jobs: body.jobs || body,
      }),
    })

    const data = await response.json()

    console.log("[v0] Main app response:", data)

    if (!response.ok) {
      throw new Error(data.error || "Import failed")
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error("[v0] Admin proxy error:", error)
    return NextResponse.json(
      {
        error: "Failed to import jobs",
        details: error.message,
        success: false,
      },
      { status: 500 },
    )
  }
}
