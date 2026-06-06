import { NextResponse } from "next/server"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  })
}

export async function GET() {
  // Return sample job data format
  return NextResponse.json(
    {
      message: "Job Import API Test Endpoint",
      sampleRequest: {
        source: "linkedin",
        jobs: [
          {
            title: "Software Developer",
            company: "Tech Company SL",
            description: "We are looking for a talented software developer...",
            location: "Freetown, Sierra Leone",
            type: "full-time",
            salary: "SLL 5,000,000 - 8,000,000",
            url: "https://linkedin.com/jobs/12345",
            id: "linkedin_12345",
          },
        ],
      },
      usage: {
        endpoint: "POST /api/jobs/import",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "your_api_key_here",
        },
      },
    },
    { headers: corsHeaders },
  )
}
