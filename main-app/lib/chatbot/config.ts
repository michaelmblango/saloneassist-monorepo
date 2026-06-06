export const CHATBOT_CONFIG = {
  // Service-specific greetings
  greetings: {
    general: "Kushe! Welcome to Salone Assist. How can I help you today?",
    truth_engine:
      "Welcome to Truth Engine! Ask me anything about Sierra Leone government services and verified information.",
    healthcare:
      "Hello! I'm your Health Directory assistant. I can help you find hospitals, clinics, and health services in Sierra Leone.",
    jobs: "Hi! Looking for a job? I can help you find opportunities, build your CV, and prepare for interviews!",
    business: "Need to verify a business or get information about business registration? I'm here to help!",
    career:
      "Welcome! I can guide you through career options, courses, and educational paths based on your qualifications.",
  },

  // Quick action suggestions per service
  quickActions: {
    general: [
      "Find a job",
      "Verify a business",
      "Locate a hospital",
      "Career guidance",
      "Government info",
      "Register a business",
    ],
    healthcare: [
      "Find hospital near me",
      "Emergency services",
      "Pharmacies",
      "Clinics",
      "Health centers",
      "Vaccination schedule",
    ],
    jobs: ["Browse jobs", "Create CV", "Career advice", "Interview tips", "Salary information", "Job application help"],
    business: [
      "Verify business",
      "Register business",
      "Business requirements",
      "Tax information",
      "Business licenses",
      "Find businesses",
    ],
    career: [
      "Check course eligibility",
      "Find universities",
      "Scholarship opportunities",
      "Career paths",
      "Study abroad",
      "Vocational training",
    ],
    truth_engine: [
      "Verify this message",
      "Government services",
      "NIN application",
      "Passport info",
      "Business registration",
      "Report a scam",
    ],
  },

  // Krio translations for common phrases
  krioTranslations: {
    Hello: "Kushe",
    "Thank you": "Tenki",
    "How can I help?": "Wetin a go du fo yu?",
    "I don't understand": "A nɔ ɔndastand",
    "Please wait": "Ol yu yon",
    Yes: "Yes",
    No: "No",
    "Good morning": "Gud mɔnin",
    "Good afternoon": "Gud aftanun",
    "Good evening": "Gud ivintɛm",
    Goodbye: "Baybay",
    "You're welcome": "Yu wɛlkɔm",
  },

  // Rate limiting (aligned with Gemini free tier)
  rateLimits: {
    requestsPerDay: 250,
    requestsPerMinute: 10,
    warningThreshold: 200, // warn at 200/250 usage
  },

  // Intent keywords for classification
  intentKeywords: {
    business_verification: ["business", "company", "verify", "registration", "register", "enterprise", "trade"],
    job_search: ["job", "work", "employment", "hiring", "cv", "resume", "career", "salary", "interview"],
    healthcare: ["hospital", "clinic", "health", "doctor", "medical", "pharmacy", "emergency", "vaccination"],
    career_guidance: ["study", "course", "education", "university", "college", "scholarship", "aggregate", "exam"],
    government_services: ["nin", "passport", "id", "license", "government", "official", "permit", "certificate"],
    scam_verification: ["scam", "fraud", "suspicious", "verify message", "legitimate", "fake", "trust"],
  },

  // Model configuration
  model: {
    name: "gemini-2.0-flash-exp",
    temperature: 0.7,
    maxTokens: 1024,
    topP: 0.95,
  },
} as const

export type ServiceContext = "general" | "truth_engine" | "healthcare" | "jobs" | "business" | "career"
export type Platform = "web" | "whatsapp"
export type Intent =
  | "business_verification"
  | "job_search"
  | "healthcare"
  | "career_guidance"
  | "government_services"
  | "scam_verification"
  | "general_inquiry"
