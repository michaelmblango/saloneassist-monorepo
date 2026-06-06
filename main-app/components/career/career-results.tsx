"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  GraduationCap,
  Briefcase,
  Award,
  TrendingUp,
  MapPin,
  DollarSign,
  Star,
  Share2,
  Download,
  Mail,
  BookOpen,
  Users,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
} from "lucide-react"
import { CourseDetailModal } from "./course-detail-modal"
import { DEMO_UNIVERSITIES, DEMO_COURSES, DEMO_CAREERS } from "@/lib/career-data"

type ExamType = "NPSE" | "BECE" | "WASSCE"

interface CareerResultsProps {
  examType: ExamType
  subjects: Array<{ subject: string; grade: string }>
  examYear: string
  quizAnswers: Record<number, string>
  onStartOver: () => void
}

export function CareerResults({ examType, subjects, examYear, quizAnswers, onStartOver }: CareerResultsProps) {
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [bookmarkedCourses, setBookmarkedCourses] = useState<string[]>([])

  // Calculate aggregate
  const GRADE_VALUES: Record<string, number> = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    A1: 1,
    B2: 2,
    B3: 3,
    C4: 4,
    C5: 5,
    C6: 6,
    D7: 7,
    E8: 8,
    F9: 9,
  }
  const aggregate = subjects.reduce((sum, s) => sum + (GRADE_VALUES[s.grade] || 0), 0)

  // Get top subjects
  const topSubjects = subjects
    .sort((a, b) => (GRADE_VALUES[a.grade] || 0) - (GRADE_VALUES[b.grade] || 0))
    .slice(0, 3)
    .map((s) => s.subject)

  const toggleBookmark = (courseId: string) => {
    setBookmarkedCourses((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId],
    )
  }

  return (
    <div className="space-y-8">
      {/* Profile Card */}
      <Card className="border-[#1EB53A] bg-gradient-to-br from-[#1EB53A]/5 to-[#0072C6]/5">
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm text-muted-foreground">Exam Type</p>
              <p className="text-xl font-bold">{examType}</p>
              <p className="text-xs text-muted-foreground">Year {examYear}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Your Aggregate</p>
              <p className="text-xl font-bold text-[#1EB53A]">{aggregate}</p>
              <Badge className="mt-1 bg-green-500">Excellent Performance</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Top Subjects</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {topSubjects.map((subject) => (
                  <Badge key={subject} variant="secondary" className="text-xs">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Strengths</p>
              <p className="text-sm font-medium">Critical thinking, Problem-solving</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="universities">Universities</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="careers">Careers</TabsTrigger>
        </TabsList>

        {/* Universities Tab */}
        <TabsContent value="universities" className="space-y-4">
          <h2 className="text-2xl font-bold">Recommended Universities</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {DEMO_UNIVERSITIES.map((uni) => (
              <Card key={uni.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{uni.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 text-xs">
                        <MapPin className="h-3 w-3" /> {uni.location}
                        <Badge variant="outline" className="ml-2">
                          {uni.type}
                        </Badge>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-muted-foreground">You qualify with aggregate of {aggregate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>{uni.tuition}</span>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    <GraduationCap className="mr-2 h-4 w-4" /> View {uni.coursesCount} Courses
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recommended Courses</h2>
            <p className="text-sm text-muted-foreground">{bookmarkedCourses.length} bookmarked</p>
          </div>
          <div className="grid gap-4">
            {DEMO_COURSES.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{course.name}</CardTitle>
                        <Badge className="bg-[#1EB53A]">{course.matchScore}% Match</Badge>
                      </div>
                      <CardDescription>
                        {course.faculty} • {course.duration}
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => toggleBookmark(course.id)}>
                      <Star
                        className={`h-5 w-5 ${bookmarkedCourses.includes(course.id) ? "fill-yellow-400 text-yellow-400" : ""}`}
                      />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{course.whyRecommended}</p>
                  <div className="grid gap-2 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
                      <span>Min aggregate: {course.minAggregate}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Building2 className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                      <span>{course.universities.join(", ")}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <DollarSign className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                      <span>{course.tuition}</span>
                    </div>
                  </div>
                  <Button onClick={() => setSelectedCourse(course)} variant="outline" className="w-full">
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Careers Tab */}
        <TabsContent value="careers" className="space-y-4">
          <h2 className="text-2xl font-bold">Career Pathways</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {DEMO_CAREERS.map((career) => (
              <Card key={career.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-[#1EB53A]" />
                        <CardTitle className="text-lg">{career.title}</CardTitle>
                      </div>
                      <Badge className="mt-2 bg-[#1EB53A]">{career.matchScore}% Match</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Salary Range</span>
                    <span className="font-semibold">{career.salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    <Badge variant={career.outlook === "High demand" ? "default" : "secondary"}>{career.outlook}</Badge>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Related Courses</p>
                    <div className="flex flex-wrap gap-1">
                      {career.relatedCourses.slice(0, 2).map((course) => (
                        <Badge key={course} variant="outline" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Skills Needed</p>
                    <p className="text-xs">{career.skills.slice(0, 3).join(", ")}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Actions Section */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Save My Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Download className="mr-2 h-4 w-4" /> Download as PDF
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Mail className="mr-2 h-4 w-4" /> Email to myself
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Share2 className="mr-2 h-4 w-4" /> Share with guardian
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Explore More</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Building2 className="mr-2 h-4 w-4" /> Compare Universities
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <BookOpen className="mr-2 h-4 w-4" /> View All Courses
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Award className="mr-2 h-4 w-4" /> Browse Scholarships
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Get Help</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Users className="mr-2 h-4 w-4" /> Join Student Forum
            </Button>
            <Button onClick={onStartOver} variant="outline" className="w-full justify-start bg-transparent">
              <RotateCcw className="mr-2 h-4 w-4" /> Start Over
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && <CourseDetailModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />}
    </div>
  )
}
