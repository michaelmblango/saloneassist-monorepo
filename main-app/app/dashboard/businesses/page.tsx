"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  Search,
  Building2,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ChevronDown,
  Grid3x3,
  List,
  Filter,
  Bookmark,
  Share2,
  FileDown,
  AlertCircle,
  Globe,
  Clock,
  Users,
  History,
  Facebook,
  Twitter,
  Linkedin,
  ArrowLeft,
} from "lucide-react"
import { DEMO_BUSINESSES, BUSINESS_TYPES, DISTRICTS, type Business } from "@/lib/business-data"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

export default function BusinessDirectoryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [sortBy, setSortBy] = useState("relevance")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null)
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { t } = useLanguage()

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated")
    if (!isAuth) {
      router.push("/")
    } else {
      setTimeout(() => setIsLoading(false), 500)
    }
  }, [router])

  const [debouncedSearch, setDebouncedSearch] = useState("")
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const filteredBusinesses = useMemo(() => {
    let results = DEMO_BUSINESSES

    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase()
      results = results.filter(
        (b) =>
          b.name.toLowerCase().includes(query) ||
          b.registrationNumber.toLowerCase().includes(query) ||
          b.description.toLowerCase().includes(query),
      )
    }

    if (selectedType !== "all") {
      results = results.filter((b) => b.type === selectedType)
    }

    if (selectedDistricts.length > 0) {
      results = results.filter((b) => selectedDistricts.includes(b.district))
    }

    if (selectedStatus !== "all") {
      results = results.filter((b) => b.status === selectedStatus)
    }

    if (sortBy === "name") {
      results.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === "recent") {
      results.sort((a, b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime())
    }

    return results
  }, [debouncedSearch, selectedType, selectedDistricts, selectedStatus, sortBy])

  const highlightText = (text: string, query: string) => {
    if (!query) return text
    const parts = text.split(new RegExp(`(${query})`, "gi"))
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-yellow-200">
              {part}
            </mark>
          ) : (
            part
          ),
        )}
      </>
    )
  }

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const applyQuickFilter = (filter: string) => {
    switch (filter) {
      case "active":
        setSelectedStatus("Active")
        break
      case "ngo":
        setSelectedType("NGO")
        break
      case "recent":
        setSortBy("recent")
        break
    }
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedType("all")
    setSelectedDistricts([])
    setSelectedStatus("all")
  }

  if (isLoading) {
    return (
      <div className="flex h-screen overflow-hidden bg-background">
        <aside className="hidden lg:block">
          <DashboardSidebar />
        </aside>
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="container mx-auto space-y-6">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-64 w-full" />
              <div className="grid gap-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-48 w-full" />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <aside className="hidden lg:block">
        <DashboardSidebar />
      </aside>
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-[280px] p-0">
          <DashboardSidebar />
        </SheetContent>
      </Sheet>
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mb-2 sm:mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("common.back_to_dashboard")}
              </Button>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">{t("business.title")}</h1>
              <p className="text-sm sm:text-base text-muted-foreground">{t("business.subtitle")}</p>
            </div>
            <Card>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder={t("business.active.search_placeholder")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 sm:pl-10 h-10 sm:h-12 text-sm sm:text-base"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex-1 sm:flex-none text-xs sm:text-sm"
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">{t("common.filter")}</span>
                      <ChevronDown className={cn("ml-2 h-4 w-4 transition-transform", showFilters && "rotate-180")} />
                    </Button>
                    <Button variant="outline" className="flex-1 sm:flex-none text-xs sm:text-sm bg-transparent">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">{t("common.report")}</span>
                    </Button>
                  </div>
                </div>
                {showFilters && (
                  <div className="grid gap-4 pt-4 border-t sm:grid-cols-2 md:grid-cols-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium mb-2 block">{t("business.business_type")}</label>
                      <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{t("business.all_types")}</SelectItem>
                          {BUSINESS_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium mb-2 block">{t("business.district")}</label>
                      <Select
                        value={selectedDistricts[0] || "all"}
                        onValueChange={(val) => setSelectedDistricts(val === "all" ? [] : [val])}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{t("business.all_districts")}</SelectItem>
                          {DISTRICTS.map((district) => (
                            <SelectItem key={district} value={district}>
                              {district}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium mb-2 block">{t("business.status")}</label>
                      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{t("business.all_statuses")}</SelectItem>
                          <SelectItem value="Active">{t("business.status_active")}</SelectItem>
                          <SelectItem value="Suspended">{t("business.status_suspended")}</SelectItem>
                          <SelectItem value="Dissolved">{t("business.status_dissolved")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium mb-2 block">{t("common.sort")}</label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relevance">{t("business.sort_relevance")}</SelectItem>
                          <SelectItem value="name">{t("business.sort_name")}</SelectItem>
                          <SelectItem value="recent">{t("business.sort_recent")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => applyQuickFilter("active")}>
                    {t("business.active_businesses")}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => applyQuickFilter("ngo")}>
                    {t("business.ngos")}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => applyQuickFilter("recent")}>
                    {t("business.recently_registered")}
                  </Button>
                </div>
              </CardContent>
            </Card>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-muted-foreground">
                {t("business.showing_results", { count: filteredBusinesses.length, total: DEMO_BUSINESSES.length })}
              </p>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="h-9 w-9"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="h-9 w-9"
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-xs sm:text-sm flex-1 sm:flex-none bg-transparent">
                  <FileDown className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">{t("common.export")}</span>
                </Button>
              </div>
            </div>
            <div className={cn("grid gap-4", viewMode === "grid" && "md:grid-cols-2")}>
              {filteredBusinesses.map((business) => (
                <Card key={business.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#1EB53A]/10">
                          <Building2 className="h-6 w-6 text-[#1EB53A]" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start gap-2">
                            <h3 className="font-semibold text-lg leading-tight">
                              {highlightText(business.name, debouncedSearch)}
                            </h3>
                            {business.verified && (
                              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#1EB53A]" title="Verified Business" />
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-sm">
                            <code className="px-2 py-1 bg-muted rounded text-xs font-mono">
                              {business.registrationNumber}
                            </code>
                            <Badge variant="secondary">{business.type}</Badge>
                            <Badge
                              variant={
                                business.status === "Active"
                                  ? "default"
                                  : business.status === "Suspended"
                                    ? "secondary"
                                    : "outline"
                              }
                              className={cn(
                                business.status === "Active" && "bg-[#1EB53A] hover:bg-[#1EB53A]/90",
                                business.status === "Suspended" && "bg-yellow-500 hover:bg-yellow-600",
                                business.status === "Dissolved" && "bg-red-500 hover:bg-red-600",
                              )}
                            >
                              {business.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{business.description}</p>
                          <div className="grid gap-1.5 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="h-4 w-4 shrink-0" />
                              <span>
                                {business.address}, {business.district}
                              </span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="h-4 w-4 shrink-0" />
                                <span>{business.phone}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="h-4 w-4 shrink-0" />
                                <span>{business.email}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="h-4 w-4 shrink-0" />
                              <span>
                                {t("business.registered")}: {new Date(business.registrationDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        <Button size="sm" onClick={() => setSelectedBusiness(business)}>
                          {t("business.view_details")}
                        </Button>
                        <div className="flex gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => toggleBookmark(business.id)}
                          >
                            <Bookmark
                              className={cn("h-4 w-4", bookmarkedIds.includes(business.id) && "fill-current")}
                            />
                          </Button>
                          <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredBusinesses.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <Building2 className="h-16 w-16 text-muted-foreground/50 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{t("business.no_businesses_found")}</h3>
                  <p className="text-sm text-muted-foreground mb-4 max-w-md">{t("business.no_results_message")}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={clearAllFilters}>
                      {t("business.clear_filters")}
                    </Button>
                    <Button onClick={() => setSearchQuery("")}>{t("business.new_search")}</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
      <Dialog open={!!selectedBusiness} onOpenChange={() => setSelectedBusiness(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1.5">
                <DialogTitle className="text-2xl flex items-center gap-2">
                  {selectedBusiness?.name}
                  {selectedBusiness?.verified && <CheckCircle2 className="h-6 w-6 text-[#1EB53A]" />}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-2">
                  <code className="px-2 py-1 bg-muted rounded text-xs font-mono">
                    {selectedBusiness?.registrationNumber}
                  </code>
                  <Badge
                    variant={
                      selectedBusiness?.status === "Active"
                        ? "default"
                        : selectedBusiness?.status === "Suspended"
                          ? "secondary"
                          : "outline"
                    }
                    className={cn(
                      selectedBusiness?.status === "Active" && "bg-[#1EB53A] hover:bg-[#1EB53A]/90",
                      selectedBusiness?.status === "Suspended" && "bg-yellow-500 hover:bg-yellow-600",
                      selectedBusiness?.status === "Dissolved" && "bg-red-500 hover:bg-red-600",
                    )}
                  >
                    {selectedBusiness?.status}
                  </Badge>
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <Tabs defaultValue="overview" className="mt-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">{t("business.overview")}</TabsTrigger>
              <TabsTrigger value="contact">{t("business.contact")}</TabsTrigger>
              <TabsTrigger value="history">{t("business.history")}</TabsTrigger>
              <TabsTrigger value="related">{t("business.related")}</TabsTrigger>
            </TabsList>
            <ScrollArea className="h-[500px] mt-4">
              <TabsContent value="overview" className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">{t("business.registration_details")}</h4>
                  <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("business.registration_number")}</span>
                      <span className="font-medium">{selectedBusiness?.registrationNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("business.business_type")}</span>
                      <span className="font-medium">{selectedBusiness?.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("business.registration_date")}</span>
                      <span className="font-medium">
                        {selectedBusiness && new Date(selectedBusiness.registrationDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("business.status")}</span>
                      <span className="font-medium">{selectedBusiness?.status}</span>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-semibold mb-2">{t("business.business_information")}</h4>
                  <div className="grid gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">{t("business.description")}</span>
                      <p className="mt-1">{selectedBusiness?.description}</p>
                    </div>
                    {selectedBusiness?.employees && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {selectedBusiness.employees} {t("business.employees")}
                        </span>
                      </div>
                    )}
                    {selectedBusiness?.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={selectedBusiness.website}
                          className="text-[#1EB53A] hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {selectedBusiness.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-semibold mb-2">{t("business.location")}</h4>
                  <div className="grid gap-2 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <p>{selectedBusiness?.address}</p>
                        <p className="text-muted-foreground">{selectedBusiness?.district}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="contact" className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-3">{t("business.contact_information")}</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1EB53A]/10">
                        <Phone className="h-5 w-5 text-[#1EB53A]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{t("business.phone")}</p>
                        <a href={`tel:${selectedBusiness?.phone}`} className="text-sm text-[#1EB53A] hover:underline">
                          {selectedBusiness?.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1EB53A]/10">
                        <Mail className="h-5 w-5 text-[#1EB53A]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{t("business.email")}</p>
                        <a
                          href={`mailto:${selectedBusiness?.email}`}
                          className="text-sm text-[#1EB53A] hover:underline"
                        >
                          {selectedBusiness?.email}
                        </a>
                      </div>
                    </div>
                    {selectedBusiness?.website && (
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1EB53A]/10">
                          <Globe className="h-5 w-5 text-[#1EB53A]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{t("business.website")}</p>
                          <a
                            href={selectedBusiness.website}
                            className="text-sm text-[#1EB53A] hover:underline"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {selectedBusiness.website}
                          </a>
                        </div>
                      </div>
                    )}
                    {selectedBusiness?.businessHours && (
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1EB53A]/10">
                          <Clock className="h-5 w-5 text-[#1EB53A]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{t("business.business_hours")}</p>
                          <p className="text-sm text-muted-foreground">{selectedBusiness.businessHours}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {selectedBusiness?.socialMedia && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-semibold mb-3">{t("business.social_media")}</h4>
                      <div className="flex gap-2">
                        {selectedBusiness.socialMedia.facebook && (
                          <Button variant="outline" size="icon">
                            <Facebook className="h-4 w-4" />
                          </Button>
                        )}
                        {selectedBusiness.socialMedia.twitter && (
                          <Button variant="outline" size="icon">
                            <Twitter className="h-4 w-4" />
                          </Button>
                        )}
                        {selectedBusiness.socialMedia.linkedin && (
                          <Button variant="outline" size="icon">
                            <Linkedin className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </TabsContent>
              <TabsContent value="history" className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-3">{t("business.registration_timeline")}</h4>
                  {selectedBusiness?.history && selectedBusiness.history.length > 0 ? (
                    <div className="space-y-4">
                      {selectedBusiness.history.map((item, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1EB53A]/10">
                              <History className="h-4 w-4 text-[#1EB53A]" />
                            </div>
                            {index < selectedBusiness.history!.length - 1 && (
                              <div className="w-px flex-1 bg-border mt-2" />
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <p className="text-sm font-medium">{item.event}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {new Date(item.date).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">{t("business.no_history_available")}</p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="related" className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-3">{t("business.related_businesses")}</h4>
                  <p className="text-sm text-muted-foreground">{t("business.no_related_businesses")}</p>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}
