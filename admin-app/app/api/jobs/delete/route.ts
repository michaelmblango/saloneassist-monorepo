import { type NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()

    console.log("[v0] Deleting jobs from SaloneAssist API:", body)

    const response = await fetch("https://saloneassist.vercel.app/api/jobs/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          process.env.JOB_IMPORT_API_KEY || "sk_salone_2024_8f7d9c2a1b4e6f3g5h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    console.log("[v0] Delete response from SaloneAssist API:", data)

    return NextResponse.json(data)
  } catch (error: any) {
    console.error("[v0] Error deleting jobs:", error)
    return NextResponse.json({ success: false, error: "Delete failed", details: error.message }, { status: 500 })
  }
}
