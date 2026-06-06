import { CreditCard, Briefcase, GraduationCap, HeartPulse, Handshake, Scale, Home, Car } from "lucide-react"

export const aiResponses = {
  businessRegistration: `I can help you with business registration! Here's the process:

**Steps to Register a Business:**

1️⃣ **Choose Business Type**
   - Sole Proprietorship
   - Partnership
   - Limited Liability Company (LLC)

2️⃣ **Required Documents:**
   - Valid ID (NIN or Passport)
   - Proof of address
   - Business name search certificate
   - Passport photos

3️⃣ **Visit Registration Office:**
   - Office of the Administrator and Registrar General (OARG)
   - Address: Lamina Sankoh Street, Freetown
   - Hours: Mon-Fri, 9am-4pm

4️⃣ **Fees:**
   - Business Name: SLL 100,000
   - Company Registration: SLL 500,000 - 2M (varies by type)

📍 Would you like me to:
- Show you registered businesses for reference?
- Find business consultants in your area?
- Provide detailed requirements for a specific business type?

Need more help?`,

  careerGuidance: `Excellent results! 🎉 With aggregate 14, you have many great options.

**Top Course Recommendations for You:**

🎓 **Computer Science**
- Universities: FBC, UNIMAK, Njala
- Entry requirement: Agg 18 or better ✅
- Career paths: Software Developer (SLL 5M-15M/year)

🎓 **Accounting & Finance**
- Universities: FBC, IPAM, Njala
- Entry requirement: Agg 15 or better ✅
- Career paths: Accountant (SLL 4M-12M/year)

🎓 **Medicine & Surgery** (if you have sciences)
- Universities: FBC, COMAHS
- Entry requirement: Agg 12-15 ✅
- Career paths: Doctor (SLL 8M-20M+/year)

📊 Based on your results, I found **24 courses** you qualify for.

Would you like me to:
- Show all eligible courses?
- Open the Career Guidance tool for detailed analysis?
- Compare universities?
- Find scholarships?`,

  jobSearch: `I can help you find healthcare jobs in Bo! 🏥

**Current Healthcare Openings in Bo District:**

💼 **Nurse - Mercy Hospital Bo**
- Salary: SLL 3.5M - 5M/month
- Type: Full-time
- Experience: 2+ years
- Deadline: Jan 31, 2025
- Match: 85% ✓

💼 **Lab Technician - Bo Government Hospital**
- Salary: SLL 3M - 4.5M/month
- Type: Contract (1 year)
- Experience: Entry level
- Deadline: Feb 15, 2025
- Match: 78%

I found **12 healthcare jobs** in Bo district.

📊 **Quick CV Check:**
- You don't have a saved CV yet
- Would you like me to help you build one?

📍 **Next Steps:**
- View all healthcare jobs in Bo?
- Build your CV now (10 minutes)?
- Find healthcare training programs?`,

  verification: `Let me analyze this message for you... 🔍

⚠️ **This appears to be a SCAM. Here's why:**

🚩 **Red Flags Detected:**
1. Requests personal banking information via WhatsApp
2. Claims to be from "Ministry of Finance" but uses personal number
3. Creates urgency ("respond within 24 hours")
4. Grammatical errors in official communication
5. Unverified sender (not official government channel)

✅ **Official Government Communication:**
- Uses official websites (.gov.sl domains)
- Never asks for banking details via WhatsApp
- Announced through official channels (SLBC, newspapers)
- Has verification codes you can check

🛡️ **What to do:**
1. ❌ Do NOT respond or share personal information
2. ❌ Do NOT click any links
3. ✅ Block the number
4. ✅ Report this scam

📍 Would you like to:
- Report this scam officially?
- Learn how to spot scams?
- Check if there's a real government program?`,

  ninApplication: `To apply for NIN:

**Required Documents:**
- Birth certificate or affidavit
- Proof of address
- Two passport photos

**Process:**
1. Visit your nearest NRA office
2. Fill application form
3. Pay application fee: SLL 50,000
4. Biometric capture (fingerprints, photo)
5. Receive acknowledgment slip
6. Collection: 2-4 weeks

**NRA Offices:**
- Freetown: Tower Hill
- Bo: Reservation Road
- Makeni: Magburaka Road

Helpline: 117

📍 Would you like me to:
- Find NRA offices near you?
- Download NIN application form?
- Check NIN application status?`,

  healthServices: `I can help you find nearby health clinics!

**Clinics Near You:**

🏥 **Connaught Hospital**
- Location: Freetown
- Services: Emergency, Surgery, Maternity
- Hours: 24/7
- Phone: 076-123-456

🏥 **Ola During Children's Hospital**
- Location: Freetown
- Services: Pediatric care, Vaccinations
- Hours: Mon-Sat, 8am-6pm
- Phone: 076-234-567

📍 Would you like me to:
- Show more clinics in your area?
- Find specialists?
- Check vaccination schedules?
- Get directions?`,

  default: `I'm here to help! I can assist you with:

✅ Government Services (NIN, business registration, passports)
✅ Career Guidance (courses, universities, scholarships)
✅ Jobs & Employment (job search, CV building, interview tips)
✅ Health Services (find clinics, health information)
✅ Verify Information (check suspicious messages)
✅ Business Directory (find registered businesses)

What would you like help with today?`,
}

export const faqCategories = [
  {
    value: "id",
    label: "Identification & Registration",
    icon: CreditCard,
    desc: "NIN, Passport, Birth Certificate, etc.",
    count: 156,
  },
  {
    value: "business",
    label: "Business & Trade",
    icon: Briefcase,
    desc: "Business registration, licenses, taxes",
    count: 98,
  },
  {
    value: "education",
    label: "Education",
    icon: GraduationCap,
    desc: "Schools, universities, scholarships",
    count: 143,
  },
  { value: "health", label: "Healthcare", icon: HeartPulse, desc: "Hospitals, insurance, vaccinations", count: 87 },
  { value: "employment", label: "Employment", icon: Handshake, desc: "Jobs, labor laws, workplace rights", count: 76 },
  { value: "legal", label: "Legal & Justice", icon: Scale, desc: "Courts, legal aid, rights", count: 62 },
  { value: "housing", label: "Housing & Property", icon: Home, desc: "Land, property, housing programs", count: 54 },
  { value: "transport", label: "Transportation", icon: Car, desc: "Driver's license, vehicle registration", count: 45 },
]

export const governmentFAQs = [
  {
    id: "faq-1",
    category: "id",
    question: "How do I apply for a National ID (NIN)?",
    answer: `To apply for NIN:

1. Visit your nearest NRA office
2. Bring required documents:
   - Birth certificate or affidavit
   - Proof of address
   - Two passport photos
3. Fill application form
4. Pay application fee: SLL 50,000
5. Biometric capture (fingerprints, photo)
6. Receive acknowledgment slip
7. Collection: 2-4 weeks

NRA Offices:
- Freetown: Tower Hill
- Bo: Reservation Road
- Makeni: Magburaka Road
- Kenema: Hangha Road

Helpline: 117`,
    relatedLinks: ["Find NRA offices near you", "Download NIN application form", "Check NIN application status"],
    lastUpdated: "Dec 15, 2024",
    views: 15420,
  },
  {
    id: "faq-2",
    category: "business",
    question: "How much does business registration cost?",
    answer: `Business registration fees:

**Business Name:**
- Registration: SLL 100,000
- Annual renewal: SLL 50,000

**Limited Company:**
- Local: SLL 500,000
- Foreign: SLL 2,000,000

**Partnership:**
- Registration: SLL 200,000

**Additional Costs:**
- Name search: SLL 25,000
- Certified certificates: SLL 50,000 each

Payment Methods:
- Cash at OARG office
- Bank transfer

Office: Lamina Sankoh Street, Freetown
Hours: Mon-Fri, 9am-4pm`,
    relatedLinks: ["Start business registration", "Find registered businesses", "Business registration requirements"],
    lastUpdated: "Dec 20, 2024",
    views: 12380,
  },
  {
    id: "faq-3",
    category: "id",
    question: "What documents do I need for a passport?",
    answer: `Required documents for Sierra Leone passport:

**For First-Time Applicants:**
- Valid National ID (NIN)
- Birth certificate
- Two passport-size photos
- Proof of citizenship
- Application form (completed online)

**For Renewal:**
- Old passport
- Valid NIN
- Two passport-size photos
- Application form

**Fees:**
- 32-page passport: SLL 500,000
- 64-page passport: SLL 750,000

**Processing Time:**
- Standard: 6-8 weeks
- Express: 2-3 weeks (additional fee)

Apply at: Immigration Department, Tower Hill, Freetown`,
    relatedLinks: ["Apply for passport online", "Check passport status", "Find Immigration offices"],
    lastUpdated: "Dec 10, 2024",
    views: 18250,
  },
  {
    id: "faq-4",
    category: "education",
    question: "How do I apply for university admission?",
    answer: `University admission process:

**Requirements:**
- WASSCE results (aggregate 18 or better for most courses)
- Completed application form
- Birth certificate
- Recommendation letters (2)
- Passport photos

**Application Process:**
1. Visit university website or admission office
2. Purchase application form (SLL 50,000 - 100,000)
3. Submit completed form with documents
4. Attend entrance exam (if required)
5. Check admission list
6. Pay acceptance fee

**Major Universities:**
- Fourah Bay College (FBC)
- Njala University
- University of Makeni (UNIMAK)
- Ernest Bai Koroma University (EBKU)

**Deadlines:** Usually June-August for September intake`,
    relatedLinks: ["Compare universities", "Check course requirements", "Find scholarships"],
    lastUpdated: "Nov 30, 2024",
    views: 22100,
  },
  {
    id: "faq-5",
    category: "transport",
    question: "How do I get a driver's license?",
    answer: `Steps to obtain a driver's license:

**Requirements:**
- Must be 18 years or older
- Valid National ID (NIN)
- Medical fitness certificate
- Passport photos (4)

**Process:**
1. Enroll in accredited driving school
2. Complete training (minimum 3 months)
3. Pass driving school test
4. Apply at Sierra Leone Road Transport Authority
5. Pass written test
6. Pass practical driving test
7. Pay license fee: SLL 200,000

**License Classes:**
- Class A: Motorcycles
- Class B: Private cars
- Class C: Commercial vehicles
- Class D: Heavy vehicles

**Validity:** 3 years (renewable)

Office: SLRTA, Kissy Road, Freetown`,
    relatedLinks: ["Find driving schools", "Book driving test", "Renew driver's license"],
    lastUpdated: "Dec 5, 2024",
    views: 9840,
  },
  {
    id: "faq-6",
    category: "health",
    question: "Where can I get vaccinations in Freetown?",
    answer: `Vaccination centers in Freetown:

**Major Facilities:**

1. **Connaught Hospital**
   - Location: Central Freetown
   - Hours: Mon-Fri, 8am-4pm
   - Services: All routine vaccinations
   - Phone: 076-123-456

2. **Ola During Children's Hospital**
   - Location: Lumley
   - Hours: Mon-Sat, 8am-6pm
   - Services: Child vaccinations, immunization cards
   - Phone: 076-234-567

3. **Princess Christian Maternity Hospital**
   - Location: Brookfields
   - Hours: Mon-Fri, 9am-5pm
   - Services: Maternal & child health
   - Phone: 076-345-678

**Available Vaccines:**
- Routine childhood immunizations (free)
- COVID-19 vaccines (free)
- Yellow fever
- Typhoid
- Hepatitis

**Bring:** Health card, child's birth certificate`,
    relatedLinks: ["Find nearest clinic", "Vaccination schedule", "Health alerts"],
    lastUpdated: "Dec 18, 2024",
    views: 7650,
  },
  {
    id: "faq-7",
    category: "business",
    question: "What are the steps to register a business name?",
    answer: `Steps to register a business name in Sierra Leone:

**Step 1: Name Search**
- Visit OARG office or website
- Search if business name is available
- Cost: SLL 25,000
- Get name reservation certificate

**Step 2: Prepare Documents**
- Completed application form (Form BN1)
- Valid NIN or passport
- Proof of address
- Two passport photos
- Business plan (optional but recommended)

**Step 3: Submit Application**
- Visit OARG, Lamina Sankoh Street, Freetown
- Submit form and documents
- Pay registration fee: SLL 100,000

**Step 4: Collection**
- Processing time: 5-7 working days
- Collect business certificate
- Register for tax with NRA

**Annual Renewal:**
- Due every year
- Cost: SLL 50,000
- Penalty for late renewal

Contact: +232-76-XXX-XXX`,
    relatedLinks: ["Check business name availability", "Download Form BN1", "Find business support services"],
    lastUpdated: "Dec 22, 2024",
    views: 11200,
  },
  {
    id: "faq-8",
    category: "employment",
    question: "What are my rights as an employee?",
    answer: `Employee rights in Sierra Leone:

**Basic Rights:**

1. **Fair Wages**
   - Minimum wage: SLL 600,000/month (2024)
   - Payment must be regular and on time
   - Equal pay for equal work

2. **Working Hours**
   - Maximum: 8 hours/day, 48 hours/week
   - Overtime must be compensated
   - Rest periods required

3. **Leave Entitlements**
   - Annual leave: 15 working days minimum
   - Sick leave: With medical certificate
   - Maternity leave: 14 weeks
   - Public holidays: Paid

4. **Safe Workplace**
   - Employer must provide safe environment
   - Protective equipment where necessary
   - Health and safety training

5. **Job Security**
   - Cannot be fired without cause
   - Notice period or payment in lieu required
   - Severance pay for redundancy

**Report Violations:**
Ministry of Labour, Freetown
Phone: 076-XXX-XXX`,
    relatedLinks: ["File labor complaint", "Find legal aid", "Employment contracts guide"],
    lastUpdated: "Dec 1, 2024",
    views: 6890,
  },
]
