import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Building2,
  Clock,
  DollarSign,
  CheckCircle2,
  BookOpen,
  Briefcase,
  Star,
  Share2,
  MessageCircle,
} from "lucide-react"

interface CourseDetailModalProps {
  course: any
  onClose: () => void
}

export function CourseDetailModal({ course, onClose }: CourseDetailModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl">{course.name}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">{course.faculty}</p>
            </div>
            <Badge className="bg-[#1EB53A]">{course.matchScore}% Match</Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{course.tuition}</span>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Course Description</h3>
            <p className="text-sm text-muted-foreground">
              {course.name} is a comprehensive program that equips students with in-depth knowledge and practical skills
              in their chosen field. This program combines theoretical foundations with hands-on experience to prepare
              graduates for successful careers.
            </p>
          </div>

          {/* Universities */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Building2 className="h-4 w-4" /> Universities Offering This Course
            </h3>
            <div className="flex flex-wrap gap-2">
              {course.universities.map((uni: string) => (
                <Badge key={uni} variant="outline">
                  {uni}
                </Badge>
              ))}
            </div>
          </div>

          {/* Entry Requirements */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> Entry Requirements
            </h3>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
                <span>Minimum aggregate: {course.minAggregate}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
                <span>Required subjects: Mathematics (C6 or better), English (C6 or better)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
                <span>WASSCE certificate with 5 credits minimum</span>
              </li>
            </ul>
          </div>

          {/* Career Opportunities */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Briefcase className="h-4 w-4" /> Career Opportunities
            </h3>
            <p className="text-sm text-muted-foreground">
              Graduates can work as specialists in their field, consultants, researchers, managers, and entrepreneurs.
              Many also pursue further studies or start their own businesses.
            </p>
          </div>

          {/* Course Structure */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> Course Structure
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <p className="font-medium">Year 1: Foundation</p>
                <p className="text-muted-foreground">Core concepts, introduction to field, basic skills</p>
              </div>
              <div>
                <p className="font-medium">Year 2-3: Advanced Studies</p>
                <p className="text-muted-foreground">Specialized topics, practical projects, internships</p>
              </div>
              <div>
                <p className="font-medium">Year 4: Final Project</p>
                <p className="text-muted-foreground">Capstone project, research, preparation for career</p>
              </div>
            </div>
          </div>

          {/* Skills Development */}
          <div>
            <h3 className="font-semibold mb-2">Skills You'll Develop</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Critical Thinking</Badge>
              <Badge variant="secondary">Problem Solving</Badge>
              <Badge variant="secondary">Research</Badge>
              <Badge variant="secondary">Communication</Badge>
              <Badge variant="secondary">Teamwork</Badge>
              <Badge variant="secondary">Leadership</Badge>
            </div>
          </div>

          {/* Application Info */}
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Application Requirements</h3>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
                <span>WASSCE result slip</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Birth certificate</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Two recommendation letters</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Completed application form</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Application fee receipt</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button className="flex-1 bg-[#1EB53A] hover:bg-[#1EB53A]/90">
              <Star className="mr-2 h-4 w-4" /> Save Course
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <MessageCircle className="mr-2 h-4 w-4" /> Talk to Counselor
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
