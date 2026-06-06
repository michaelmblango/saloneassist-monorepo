# Job Import API Documentation

## Overview
Secure API endpoint for importing jobs from external sources (web scrapers, Apify, Zapier, etc.) into Salone Assist.

## Endpoint
\`\`\`
POST /api/jobs/import
\`\`\`

## Authentication
Add the following header to all requests:
\`\`\`
x-api-key: YOUR_API_KEY
\`\`\`

## Request Format
\`\`\`json
{
  "source": "linkedin",
  "jobs": [
    {
      "title": "Software Developer",
      "company": "Tech Company Ltd",
      "location": "Freetown, Sierra Leone",
      "description": "We are looking for an experienced software developer...",
      "type": "full-time",
      "requirements": "Bachelor's degree in Computer Science\n3+ years experience",
      "salary": "SLL 5,000,000 - 8,000,000",
      "deadline": "2024-03-31",
      "url": "https://example.com/job/123",
      "id": "linkedin_job_123"
    }
  ]
}
\`\`\`

## Field Mapping
The API accepts flexible field names and maps them automatically:

| Our Field | Accepted Alternatives |
|-----------|----------------------|
| title | position, job_title |
| company | employer, company_name |
| description | details, job_description |
| type | job_type, employment_type |
| requirements | qualifications |
| salary | compensation |
| deadline | closing_date, application_deadline |
| url | link, apply_url |
| id | job_id, external_id |

## Job Types
Supported values (automatically normalized):
- `full_time`, `full-time`, `Full Time`, `permanent`
- `part_time`, `part-time`, `Part Time`
- `contract`, `temporary`, `temp`
- `internship`, `intern`
- `volunteer`, `voluntary`

## Categories
Automatically inferred from title and description:
- Technology
- Healthcare
- Education
- Finance
- Sales
- Administration
- Engineering
- NGO
- Government
- Other

## Quality Scoring
Each job receives a quality score (0-100) based on:
- Title completeness (20 points)
- Company information (15 points)
- Description length (25 points)
- Requirements detail (15 points)
- Salary information (10 points)
- Location data (10 points)
- Source URL (5 points)

## Response Format
\`\`\`json
{
  "success": true,
  "results": {
    "total": 50,
    "imported": 45,
    "updated": 3,
    "skipped": 0,
    "failed": 2,
    "errors": [
      {
        "job": "Marketing Manager",
        "error": "Missing required field: company"
      }
    ]
  },
  "log_id": "uuid-of-import-log"
}
\`\`\`

## Rate Limits
- Maximum 1000 jobs per request
- Requests exceeding this limit will be rejected with a 400 error

## Error Responses

### 401 Unauthorized
\`\`\`json
{
  "error": "Unauthorized - Invalid API key"
}
\`\`\`

### 400 Bad Request
\`\`\`json
{
  "error": "Invalid request format. Expected: { source: string, jobs: array }"
}
\`\`\`

### 500 Internal Server Error
\`\`\`json
{
  "error": "Import failed",
  "details": "Error message here"
}
\`\`\`

## Duplicate Prevention
Jobs are identified by `source` + `external_id`. If a job with the same combination exists:
- The existing job is updated with new data
- Counted as "updated" in results
- Original creation date is preserved

## Import Logs
Every import creates a log entry in the `job_import_logs` table tracking:
- Source of import
- Start and completion times
- Number of jobs found, imported, updated, skipped, and failed
- Error details for failed imports

## Example Usage (cURL)
\`\`\`bash
curl -X POST https://your-domain.com/api/jobs/import \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-secret-api-key" \
  -d '{
    "source": "linkedin",
    "jobs": [
      {
        "title": "Software Developer",
        "company": "Tech Company",
        "location": "Freetown",
        "description": "Looking for a developer...",
        "type": "full-time"
      }
    ]
  }'
\`\`\`

## Setup Instructions

### 1. Add Environment Variable
Add to your Vercel project or `.env.local`:
\`\`\`
JOB_IMPORT_API_KEY=your-secret-api-key-here
\`\`\`

Generate a secure API key:
\`\`\`bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
\`\`\`

### 2. Deploy
The API endpoint will be available at `/api/jobs/import` after deployment.

### 3. Test
Use the example cURL command above to test the endpoint.

## Security Features
- API key authentication required
- Rate limiting (1000 jobs/request)
- Input sanitization (HTML removal, length limits)
- All imports logged with timestamps
- Service role access for secure database operations

## Best Practices
1. Use descriptive source names (e.g., "linkedin", "indeed", "company_website")
2. Include as much detail as possible for higher quality scores
3. Always include external IDs to prevent duplicates
4. Monitor import logs to track success rates
5. Handle errors gracefully and retry failed imports
