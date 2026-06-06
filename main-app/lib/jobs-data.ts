export interface Job {
  id: string
  title: string
  company: string
  companyLogo: string
  verified: boolean
  location: string
  district: string
  remote: boolean
  jobType: "Full-time" | "Part-time" | "Contract" | "Internship" | "Volunteer"
  salary: string
  salaryMin?: number
  salaryMax?: number
  postedDate: string
  deadline: string
  description: string
  responsibilities: string[]
  requirements: {
    education: string
    experience: string
    skills: { name: string; level: string }[]
    languages: { name: string; level: string }[]
  }
  benefits: string[]
  industry: string
  experienceLevel: string
  featured: boolean
  urgent: boolean
  matchScore?: number
}

export const DISTRICTS = [
  "Western Area Urban",
  "Western Area Rural",
  "Bo",
  "Kenema",
  "Makeni",
  "Freetown",
  "Port Loko",
  "Kailahun",
  "Kono",
  "Bombali",
  "Tonkolili",
  "Kambia",
  "Moyamba",
  "Pujehun",
  "Bonthe",
  "Koinadugu",
  "Falaba",
]

export const INDUSTRIES = [
  { value: "technology", label: "Technology", count: 234 },
  { value: "healthcare", label: "Healthcare", count: 189 },
  { value: "education", label: "Education", count: 156 },
  { value: "finance", label: "Finance", count: 143 },
  { value: "ngo", label: "NGO/Non-Profit", count: 198 },
  { value: "government", label: "Government", count: 87 },
  { value: "hospitality", label: "Hospitality", count: 76 },
  { value: "agriculture", label: "Agriculture", count: 92 },
  { value: "construction", label: "Construction", count: 54 },
  { value: "other", label: "Other", count: 271 },
]

export const DEMO_JOBS: Job[] = [
  {
    id: "1",
    title: "Senior Software Developer",
    company: "Sierra Digital",
    companyLogo: "SD",
    verified: true,
    location: "Freetown",
    district: "Western Area Urban",
    remote: true,
    jobType: "Full-time",
    salary: "SLL 5M - 8M per month",
    salaryMin: 5000000,
    salaryMax: 8000000,
    postedDate: "2024-01-15",
    deadline: "2024-12-31",
    description:
      "We are seeking an experienced Senior Software Developer to join our growing team. You will be responsible for designing, developing, and maintaining web applications using modern technologies.",
    responsibilities: [
      "Lead development of web applications using React and Node.js",
      "Mentor junior developers and conduct code reviews",
      "Collaborate with cross-functional teams to define and implement new features",
      "Optimize applications for maximum speed and scalability",
      "Participate in agile development processes",
    ],
    requirements: {
      education: "Bachelor's degree in Computer Science or related field",
      experience: "5+ years in software development",
      skills: [
        { name: "JavaScript", level: "Advanced" },
        { name: "React", level: "Advanced" },
        { name: "Node.js", level: "Intermediate" },
        { name: "Git", level: "Intermediate" },
        { name: "TypeScript", level: "Intermediate" },
      ],
      languages: [
        { name: "English", level: "Fluent" },
        { name: "Krio", level: "Preferred" },
      ],
    },
    benefits: ["Health insurance", "Paid leave", "Training opportunities", "Performance bonuses", "Remote work"],
    industry: "technology",
    experienceLevel: "Senior Level",
    featured: true,
    urgent: false,
    matchScore: 92,
  },
  {
    id: "2",
    title: "Registered Nurse",
    company: "Freetown Medical Center",
    companyLogo: "FM",
    verified: true,
    location: "Freetown",
    district: "Western Area Urban",
    remote: false,
    jobType: "Full-time",
    salary: "SLL 3.5M - 5M per month",
    salaryMin: 3500000,
    salaryMax: 5000000,
    postedDate: "2024-01-18",
    deadline: "2024-02-28",
    description:
      "Join our dedicated healthcare team as a Registered Nurse. Provide high-quality patient care in a fast-paced hospital environment.",
    responsibilities: [
      "Assess patient health problems and needs",
      "Administer nursing care to ill, injured, or disabled patients",
      "Monitor and record patient vital signs",
      "Collaborate with physicians and other healthcare professionals",
      "Educate patients and families about health conditions",
    ],
    requirements: {
      education: "Bachelor of Science in Nursing (BSN) required",
      experience: "2-3 years of clinical experience",
      skills: [
        { name: "Patient Care", level: "Advanced" },
        { name: "Medical Procedures", level: "Advanced" },
        { name: "Emergency Response", level: "Intermediate" },
        { name: "Patient Assessment", level: "Advanced" },
      ],
      languages: [
        { name: "English", level: "Fluent" },
        { name: "Krio", level: "Fluent" },
      ],
    },
    benefits: ["Health insurance", "Retirement plan", "Continuing education", "Shift allowances"],
    industry: "healthcare",
    experienceLevel: "Mid Level",
    featured: false,
    urgent: true,
    matchScore: 78,
  },
  {
    id: "3",
    title: "Secondary School Teacher - Mathematics",
    company: "St. Joseph's Secondary School",
    companyLogo: "SJ",
    verified: true,
    location: "Bo",
    district: "Bo",
    remote: false,
    jobType: "Full-time",
    salary: "SLL 2.5M - 3.5M per month",
    salaryMin: 2500000,
    salaryMax: 3500000,
    postedDate: "2024-01-10",
    deadline: "2024-02-15",
    description:
      "Teach mathematics to secondary school students in forms 1-5. Create engaging lesson plans and foster a positive learning environment.",
    responsibilities: [
      "Plan and deliver mathematics lessons aligned with the national curriculum",
      "Assess and track student progress",
      "Prepare students for BECE and WASSCE examinations",
      "Participate in school activities and parent-teacher meetings",
      "Maintain classroom discipline",
    ],
    requirements: {
      education: "Bachelor's degree in Mathematics or Education",
      experience: "2+ years of teaching experience",
      skills: [
        { name: "Curriculum Development", level: "Intermediate" },
        { name: "Classroom Management", level: "Advanced" },
        { name: "Student Assessment", level: "Intermediate" },
      ],
      languages: [
        { name: "English", level: "Fluent" },
        { name: "Krio", level: "Fluent" },
      ],
    },
    benefits: ["Housing allowance", "End of year bonus", "Professional development"],
    industry: "education",
    experienceLevel: "Mid Level",
    featured: false,
    urgent: false,
    matchScore: 85,
  },
  {
    id: "4",
    title: "Financial Analyst",
    company: "Sierra Leone Commercial Bank",
    companyLogo: "SL",
    verified: true,
    location: "Freetown",
    district: "Western Area Urban",
    remote: false,
    jobType: "Full-time",
    salary: "SLL 4M - 6M per month",
    salaryMin: 4000000,
    salaryMax: 6000000,
    postedDate: "2024-01-20",
    deadline: "2024-03-01",
    description:
      "Analyze financial data, prepare reports, and provide recommendations to support strategic business decisions.",
    responsibilities: [
      "Conduct financial analysis and forecasting",
      "Prepare monthly and quarterly financial reports",
      "Identify trends and recommend improvements",
      "Support budgeting and planning processes",
      "Collaborate with senior management on financial strategy",
    ],
    requirements: {
      education: "Bachelor's degree in Finance, Accounting, or Economics",
      experience: "3-5 years in financial analysis",
      skills: [
        { name: "Financial Modeling", level: "Advanced" },
        { name: "Excel", level: "Advanced" },
        { name: "Data Analysis", level: "Advanced" },
        { name: "Report Writing", level: "Intermediate" },
      ],
      languages: [{ name: "English", level: "Fluent" }],
    },
    benefits: ["Health insurance", "Pension scheme", "Annual bonus", "Training opportunities"],
    industry: "finance",
    experienceLevel: "Mid Level",
    featured: true,
    urgent: false,
    matchScore: 88,
  },
  {
    id: "5",
    title: "Program Officer - Community Development",
    company: "World Vision Sierra Leone",
    companyLogo: "WV",
    verified: true,
    location: "Kenema",
    district: "Kenema",
    remote: false,
    jobType: "Full-time",
    salary: "SLL 4.5M - 6.5M per month",
    salaryMin: 4500000,
    salaryMax: 6500000,
    postedDate: "2024-01-22",
    deadline: "2024-02-20",
    description:
      "Support community development programs focusing on education, health, and livelihoods in rural communities.",
    responsibilities: [
      "Implement community development projects",
      "Conduct needs assessments and baseline surveys",
      "Build partnerships with local stakeholders",
      "Monitor and evaluate program outcomes",
      "Prepare reports and funding proposals",
    ],
    requirements: {
      education: "Bachelor's degree in Social Sciences, Development Studies, or related field",
      experience: "3+ years in NGO or community development",
      skills: [
        { name: "Project Management", level: "Advanced" },
        { name: "Community Engagement", level: "Advanced" },
        { name: "Report Writing", level: "Advanced" },
        { name: "M&E", level: "Intermediate" },
      ],
      languages: [
        { name: "English", level: "Fluent" },
        { name: "Krio", level: "Fluent" },
        { name: "Mende", level: "Preferred" },
      ],
    },
    benefits: ["Health insurance", "Housing", "Vehicle allowance", "Annual leave"],
    industry: "ngo",
    experienceLevel: "Mid Level",
    featured: false,
    urgent: false,
    matchScore: 81,
  },
  // Add more jobs to reach 50+
  {
    id: "6",
    title: "Junior Web Developer",
    company: "AfroTech Solutions",
    companyLogo: "AT",
    verified: false,
    location: "Freetown",
    district: "Western Area Urban",
    remote: true,
    jobType: "Full-time",
    salary: "SLL 2M - 3.5M per month",
    salaryMin: 2000000,
    salaryMax: 3500000,
    postedDate: "2024-01-25",
    deadline: "2024-03-15",
    description: "Entry-level position for passionate web developers. Learn and grow with our team.",
    responsibilities: [
      "Develop and maintain websites",
      "Write clean, maintainable code",
      "Collaborate with designers",
      "Test and debug applications",
    ],
    requirements: {
      education: "Diploma or Bachelor's in Computer Science",
      experience: "0-2 years",
      skills: [
        { name: "HTML/CSS", level: "Intermediate" },
        { name: "JavaScript", level: "Basic" },
        { name: "React", level: "Basic" },
      ],
      languages: [{ name: "English", level: "Fluent" }],
    },
    benefits: ["Training", "Career growth", "Flexible hours"],
    industry: "technology",
    experienceLevel: "Entry Level",
    featured: false,
    urgent: false,
    matchScore: 95,
  },
  {
    id: "7",
    title: "Marketing Manager",
    company: "Rokel Commercial Bank",
    companyLogo: "RC",
    verified: true,
    location: "Freetown",
    district: "Western Area Urban",
    remote: false,
    jobType: "Full-time",
    salary: "SLL 6M - 9M per month",
    salaryMin: 6000000,
    salaryMax: 9000000,
    postedDate: "2024-01-12",
    deadline: "2024-02-28",
    description: "Lead marketing strategy and campaigns to grow our customer base and brand presence.",
    responsibilities: [
      "Develop and execute marketing strategies",
      "Manage marketing team and budget",
      "Analyze market trends and customer insights",
      "Coordinate digital and traditional campaigns",
    ],
    requirements: {
      education: "Bachelor's or Master's in Marketing or Business",
      experience: "5+ years in marketing, 2+ in management",
      skills: [
        { name: "Marketing Strategy", level: "Advanced" },
        { name: "Digital Marketing", level: "Advanced" },
        { name: "Team Leadership", level: "Advanced" },
        { name: "Analytics", level: "Intermediate" },
      ],
      languages: [{ name: "English", level: "Fluent" }],
    },
    benefits: ["Health insurance", "Car allowance", "Performance bonus", "Pension"],
    industry: "finance",
    experienceLevel: "Senior Level",
    featured: true,
    urgent: false,
    matchScore: 72,
  },
  {
    id: "8",
    title: "Data Entry Clerk",
    company: "Ministry of Health and Sanitation",
    companyLogo: "MH",
    verified: true,
    location: "Freetown",
    district: "Western Area Urban",
    remote: false,
    jobType: "Contract",
    salary: "SLL 1.5M - 2M per month",
    salaryMin: 1500000,
    salaryMax: 2000000,
    postedDate: "2024-01-28",
    deadline: "2024-02-10",
    description: "Enter and manage health data in government database systems.",
    responsibilities: [
      "Input data accurately into systems",
      "Verify data for completeness",
      "Maintain filing systems",
      "Generate reports as needed",
    ],
    requirements: {
      education: "Secondary school certificate or higher",
      experience: "1+ year in data entry",
      skills: [
        { name: "Computer Skills", level: "Intermediate" },
        { name: "MS Excel", level: "Intermediate" },
        { name: "Typing Speed", level: "Advanced" },
      ],
      languages: [
        { name: "English", level: "Fluent" },
        { name: "Krio", level: "Fluent" },
      ],
    },
    benefits: ["Contract completion bonus"],
    industry: "government",
    experienceLevel: "Entry Level",
    featured: false,
    urgent: true,
    matchScore: 90,
  },
]

export interface CV {
  id: string
  name: string
  lastUpdated: string
  score: number
  template: string
  isPrimary: boolean
  data: {
    personalInfo: {
      fullName: string
      professionalTitle: string
      email: string
      phone: string
      location: string
      linkedin?: string
      portfolio?: string
    }
    summary: string
    experience: Array<{
      title: string
      company: string
      location: string
      startDate: string
      endDate: string
      current: boolean
      description: string
      achievements: string[]
    }>
    education: Array<{
      degree: string
      field: string
      institution: string
      location: string
      graduationYear: string
      grade?: string
    }>
    skills: {
      technical: Array<{ name: string; level: string }>
      soft: string[]
      languages: Array<{ name: string; level: string }>
    }
    certifications: Array<{
      name: string
      organization: string
      issueDate: string
      expiryDate?: string
    }>
    awards: Array<{
      name: string
      organization: string
      date: string
      description: string
    }>
  }
}

export interface Application {
  id: string
  jobId: string
  jobTitle: string
  company: string
  appliedDate: string
  status: "Pending" | "Reviewed" | "Interview" | "Rejected" | "Accepted"
  cvUsed: string
}
