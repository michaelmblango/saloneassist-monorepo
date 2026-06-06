"use client"

import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { DISTRICTS, INDUSTRIES } from "@/lib/jobs-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface JobFiltersProps {
  filters: {
    districts: string[]
    jobTypes: string[]
    experienceLevel: string
    industries: string[]
    salaryRange: [number, number]
    postedDate: string
    remote: boolean
  }
  onFiltersChange: (filters: any) => void
}

export function JobFilters({ filters, onFiltersChange }: JobFiltersProps) {
  const jobTypes = [
    { value: "Full-time", count: 542 },
    { value: "Part-time", count: 128 },
    { value: "Contract", count: 312 },
    { value: "Internship", count: 89 },
    { value: "Volunteer", count: 45 },
  ]

  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const toggleArrayFilter = (key: string, value: string) => {
    const currentArray = filters[key as keyof typeof filters] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    updateFilter(key, newArray)
  }

  const clearFilters = () => {
    onFiltersChange({
      districts: [],
      jobTypes: [],
      experienceLevel: "",
      industries: [],
      salaryRange: [0, 20000000],
      postedDate: "any",
      remote: false,
    })
  }

  const formatSalary = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    }
    return `${(value / 1000).toFixed(0)}K`
  }

  return (
    <Card className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      <div className="space-y-6">
        {/* Location */}
        <div>
          <Label className="mb-3 block font-semibold">Location</Label>
          <Select
            value={filters.districts[0] || "all"}
            onValueChange={(value) => updateFilter("districts", value === "all" ? [] : [value])}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Districts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Districts</SelectItem>
              {DISTRICTS.map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="mt-2 flex items-center space-x-2">
            <Checkbox
              id="remote"
              checked={filters.remote}
              onCheckedChange={(checked) => updateFilter("remote", checked)}
            />
            <Label htmlFor="remote" className="text-sm font-normal">
              Remote only
            </Label>
          </div>
        </div>

        <Separator />

        {/* Job Type */}
        <div>
          <Label className="mb-3 block font-semibold">Job Type</Label>
          <div className="space-y-2">
            {jobTypes.map((type) => (
              <div key={type.value} className="flex items-center space-x-2">
                <Checkbox
                  id={type.value}
                  checked={filters.jobTypes.includes(type.value)}
                  onCheckedChange={() => toggleArrayFilter("jobTypes", type.value)}
                />
                <Label htmlFor={type.value} className="flex-1 text-sm font-normal">
                  {type.value}
                </Label>
                <span className="text-xs text-muted-foreground">({type.count})</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Experience Level */}
        <div>
          <Label className="mb-3 block font-semibold">Experience Level</Label>
          <RadioGroup value={filters.experienceLevel} onValueChange={(value) => updateFilter("experienceLevel", value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="exp-all" />
              <Label htmlFor="exp-all" className="text-sm font-normal">
                All Levels
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Entry Level" id="exp-entry" />
              <Label htmlFor="exp-entry" className="text-sm font-normal">
                Entry Level (0-2 years)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Mid Level" id="exp-mid" />
              <Label htmlFor="exp-mid" className="text-sm font-normal">
                Mid Level (3-5 years)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Senior Level" id="exp-senior" />
              <Label htmlFor="exp-senior" className="text-sm font-normal">
                Senior Level (5+ years)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Executive" id="exp-exec" />
              <Label htmlFor="exp-exec" className="text-sm font-normal">
                Executive
              </Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        {/* Industry */}
        <div>
          <Label className="mb-3 block font-semibold">Industry</Label>
          <Select
            value={filters.industries[0] || "all"}
            onValueChange={(value) => updateFilter("industries", value === "all" ? [] : [value])}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Industries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              {INDUSTRIES.map((industry) => (
                <SelectItem key={industry.value} value={industry.value}>
                  {industry.label} ({industry.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Salary Range */}
        <div>
          <Label className="mb-3 block font-semibold">Salary Range (SLL/month)</Label>
          <div className="space-y-4">
            <Slider
              min={0}
              max={20000000}
              step={500000}
              value={filters.salaryRange}
              onValueChange={(value) => updateFilter("salaryRange", value as [number, number])}
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>SLL {formatSalary(filters.salaryRange[0])}</span>
              <span>SLL {formatSalary(filters.salaryRange[1])}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Posted Date */}
        <div>
          <Label className="mb-3 block font-semibold">Posted Date</Label>
          <RadioGroup value={filters.postedDate} onValueChange={(value) => updateFilter("postedDate", value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="any" id="date-any" />
              <Label htmlFor="date-any" className="text-sm font-normal">
                Any time
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="24h" id="date-24h" />
              <Label htmlFor="date-24h" className="text-sm font-normal">
                Last 24 hours
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="7d" id="date-7d" />
              <Label htmlFor="date-7d" className="text-sm font-normal">
                Last 7 days
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="30d" id="date-30d" />
              <Label htmlFor="date-30d" className="text-sm font-normal">
                Last 30 days
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </Card>
  )
}
