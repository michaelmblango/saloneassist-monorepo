import { NextResponse } from "next/server"

// This would connect to your database in production
const adminJobs: any[] = []

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const jobData = await request.json()
    const jobIndex = adminJobs.findIndex((job) => job.id === params.id)

    if (jobIndex === -1) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    adminJobs[jobIndex] = { ...adminJobs[jobIndex], ...jobData }
    return NextResponse.json(adminJobs[jobIndex])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const jobIndex = adminJobs.findIndex((job) => job.id === params.id)

    if (jobIndex === -1) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    adminJobs.splice(jobIndex, 1)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 })
  }
}
