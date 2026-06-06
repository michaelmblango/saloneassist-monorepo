import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const apiKey =
      process.env.JOB_IMPORT_API_KEY || "sk_salone_2024_8f7d9c2a1b4e6f3g5h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6"

    console.log("[v0] Fetching jobs from SaloneAssist API...")

    const response = await fetch("https://saloneassist.vercel.app/api/jobs/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    })

    console.log("[v0] Response status:", response.status)

    if (response.status === 404 || response.status === 500) {
      const text = await response.text()
      console.log("[v0] Error response:", text.substring(0, 200))

      // Check if it's a deployment not found error
      if (text.includes("deployment") || text.includes("Deployment") || text.includes("not found")) {
        console.log("[v0] Deployment not found - main app is not deployed")
        return NextResponse.json({
          success: false,
          error: "deployment_not_found",
          message: "The main SaloneAssist app is not deployed or not accessible at https://saloneassist.vercel.app",
          total: 0,
          jobs: [],
        })
      }

      return NextResponse.json({
        success: false,
        error: "endpoint_not_found",
        message: "The /api/jobs/list endpoint needs to be deployed",
        total: 0,
        jobs: [],
      })
    }

    if (!response.ok) {
      console.log("[v0] Response not OK:", response.statusText)
      return NextResponse.json({
        success: false,
        error: "api_error",
        message: `API returned error: ${response.statusText}`,
        total: 0,
        jobs: [],
      })
    }

    const data = await response.json()
    console.log("[v0] Full response data structure:", JSON.stringify(data, null, 2))

    // Try multiple possible response structures
    const jobsArray = data.jobs || data.data || []
    console.log("[v0] Final jobs array length:", jobsArray.length)

    return NextResponse.json({
      success: true,
      total: jobsArray.length,
      data: jobsArray,
      jobs: jobsArray,
    })
  } catch (error: any) {
    console.error("[v0] Error fetching jobs:", error.message)
    return NextResponse.json({
      success: false,
      error: "network_error",
      message: "Failed to connect to SaloneAssist API",
      total: 0,
      jobs: [],
    })
  }
}
