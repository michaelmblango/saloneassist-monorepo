# Testing Job Import API

## Quick Start

### 1. Using the Test Script

Run the JavaScript test file:

\`\`\`bash
node scripts/test-job-import.js
\`\`\`

This will:
- Test the GET endpoint for sample data
- Test authentication (should fail without API key)
- Import 3 test jobs with the API key
- Display detailed results

### 2. Using curl Commands

**Get sample jobs:**
\`\`\`bash
curl https://your-app.vercel.app/api/jobs/import/test
\`\`\`

**Import jobs:**
\`\`\`bash
curl -X POST https://your-app.vercel.app/api/jobs/import \
  -H "Content-Type: application/json" \
  -H "x-api-key: sk_salone_2024_8f7d9c2a1b4e6f3g5h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6" \
  -d @test-job-data.json
\`\`\`

### 3. Create Test Data File

**test-job-data.json:**
\`\`\`json
{
  "source": "manual-test",
  "jobs": [
    {
      "title": "Software Developer",
      "company": "Tech Solutions SL",
      "location": "Freetown",
      "type": "full-time",
      "description": "Looking for experienced developer...",
      "requirements": ["JavaScript", "React", "Node.js"],
      "salary": "5000000 SLE",
      "deadline": "2025-03-31",
      "url": "https://example.com/job/1"
    }
  ]
}
\`\`\`

## Expected Response

**Success (200):**
\`\`\`json
{
  "success": true,
  "summary": {
    "total": 3,
    "imported": 3,
    "skipped": 0,
    "failed": 0
  },
  "import_log_id": "uuid-here",
  "jobs": [...]
}
\`\`\`

**Authentication Error (401):**
\`\`\`json
{
  "error": "Unauthorized"
}
\`\`\`

**Validation Error (400):**
\`\`\`json
{
  "error": "Invalid request data",
  "details": "..."
}
\`\`\`

## Environment Setup

Make sure `JOB_IMPORT_API_KEY` is set in your Vercel environment variables or `.env.local` file for local testing.
