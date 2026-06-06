"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, List, Grid, MapIcon, Phone, Mail, Navigation, Bookmark, Star } from "lucide-react"
import { demoHealthClinics, sierraLeoneDistricts, clinicServices, type Clinic } from "@/lib/health-data"
import { ClinicDetailModal } from "./clinic-detail-modal"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface ClinicFinderProps {
  onEmergency: () => void
}

export function ClinicFinder({ onEmergency }: ClinicFinderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [operatingHours, setOperatingHours] = useState<string>("any")
  const [viewMode, setViewMode] = useState<"list" | "grid" | "map">("list")
  const [sortBy, setSortBy] = useState("name")
  const [filteredClinics, setFilteredClinics] = useState<Clinic[]>(demoHealthClinics)
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null)
  const [userDistrict, setUserDistrict] = useState<string>("")

  useEffect(() => {
    const district = localStorage.getItem("userDistrict") || ""
    setUserDistrict(district)
  }, [])

  useEffect(() => {
    let results = demoHealthClinics

    // Search filter
    if (searchQuery) {
      results = results.filter(
        (clinic) =>
          clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          clinic.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          clinic.district.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // District filter
    if (selectedDistrict !== "all") {
      results = results.filter((clinic) => clinic.district === selectedDistrict)
    }

    // Type filter
    if (selectedTypes.length > 0) {
      results = results.filter((clinic) => selectedTypes.includes(clinic.type))
    }

    // Services filter
    if (selectedServices.length > 0) {
      results = results.filter((clinic) => selectedServices.every((service) => clinic.services.includes(service)))
    }

    // Operating hours filter
    if (operatingHours === "open-now") {
      results = results.filter((clinic) => clinic.isOpenNow)
    } else if (operatingHours === "24-7") {
      results = results.filter((clinic) => clinic.is24Hours)
    }

    // Sorting
    results.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "type") return a.type.localeCompare(b.type)
      return 0
    })

    setFilteredClinics(results)
  }, [searchQuery, selectedDistrict, selectedTypes, selectedServices, operatingHours, sortBy])

  const handleNearMe = () => {
    if (userDistrict) {
      setSelectedDistrict(userDistrict)
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedDistrict("all")
    setSelectedTypes([])
    setSelectedServices([])
    setOperatingHours("any")
  }

  const clinicTypes = [
    { value: "Hospital", count: demoHealthClinics.filter((c) => c.type === "Hospital").length },
    { value: "Health Center", count: demoHealthClinics.filter((c) => c.type === "Health Center").length },
    { value: "Clinic", count: demoHealthClinics.filter((c) => c.type === "Clinic").length },
    { value: "Pharmacy", count: demoHealthClinics.filter((c) => c.type === "Pharmacy").length },
    { value: "Laboratory", count: demoHealthClinics.filter((c) => c.type === "Laboratory").length },
    { value: "Maternity Center", count: demoHealthClinics.filter((c) => c.type === "Maternity Center").length },
  ]

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by clinic name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        {userDistrict && (
          <Button variant="outline" onClick={handleNearMe}>
            <MapPin className="mr-2 h-4 w-4" />
            Near Me
          </Button>
        )}
      </div>

      <div className="flex gap-6">
        {/* Filter Panel - Desktop */}
        <Card className="hidden h-fit w-[280px] p-6 lg:block">
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 font-semibold">Location</h3>
              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger>
                  <SelectValue placeholder="All Districts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  {sierraLeoneDistricts.map((district) => (
                    <SelectItem key={district.name} value={district.name}>
                      {district.name} ({district.clinicCount})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="mb-3 font-semibold">Clinic Type</h3>
              <div className="space-y-2">
                {clinicTypes.map((type) => (
                  <label key={type.value} className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedTypes.includes(type.value)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedTypes([...selectedTypes, type.value])
                        } else {
                          setSelectedTypes(selectedTypes.filter((t) => t !== type.value))
                        }
                      }}
                    />
                    <span className="text-sm">
                      {type.value} ({type.count})
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-semibold">Services Offered</h3>
              <div className="space-y-2">
                {clinicServices.slice(0, 8).map((service) => (
                  <label key={service} className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedServices.includes(service)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedServices([...selectedServices, service])
                        } else {
                          setSelectedServices(selectedServices.filter((s) => s !== service))
                        }
                      }}
                    />
                    <span className="text-sm">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-semibold">Operating Hours</h3>
              <Select value={operatingHours} onValueChange={setOperatingHours}>
                <SelectTrigger>
                  <SelectValue placeholder="Any Hours" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Hours</SelectItem>
                  <SelectItem value="open-now">Open Now</SelectItem>
                  <SelectItem value="24-7">24/7 Clinics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={clearFilters} variant="outline" className="w-full bg-transparent">
              Clear All Filters
            </Button>
          </div>
        </Card>

        {/* Filter Panel - Mobile */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Filters</Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="mb-3 font-semibold">Location</h3>
                  <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Districts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Districts</SelectItem>
                      {sierraLeoneDistricts.map((district) => (
                        <SelectItem key={district.name} value={district.name}>
                          {district.name} ({district.clinicCount})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="mb-3 font-semibold">Clinic Type</h3>
                  <div className="space-y-2">
                    {clinicTypes.map((type) => (
                      <label key={type.value} className="flex items-center gap-2">
                        <Checkbox
                          checked={selectedTypes.includes(type.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedTypes([...selectedTypes, type.value])
                            } else {
                              setSelectedTypes(selectedTypes.filter((t) => t !== type.value))
                            }
                          }}
                        />
                        <span className="text-sm">
                          {type.value} ({type.count})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button onClick={clearFilters} variant="outline" className="w-full bg-transparent">
                  Clear All Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Results Area */}
        <div className="flex-1 space-y-4">
          {/* Results Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredClinics.length} clinic{filteredClinics.length !== 1 ? "s" : ""}
              {selectedDistrict !== "all" && ` in ${selectedDistrict}`}
            </p>

            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="rating">Rating (High to Low)</SelectItem>
                  <SelectItem value="type">Type</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-1">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("map")}
                >
                  <MapIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Clinic Cards */}
          {viewMode === "map" ? (
            <Card className="flex h-[600px] items-center justify-center p-12">
              <div className="text-center">
                <MapIcon className="mx-auto h-16 w-16 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Map View</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Interactive map showing {filteredClinics.length} clinics in selected area
                </p>
                <Button className="mt-4 bg-transparent" variant="outline" onClick={() => setViewMode("list")}>
                  <List className="mr-2 h-4 w-4" />
                  View as List
                </Button>
              </div>
            </Card>
          ) : (
            <div className={viewMode === "grid" ? "grid gap-4 md:grid-cols-2" : "space-y-4"}>
              {filteredClinics.map((clinic) => (
                <Card key={clinic.id} className="p-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{clinic.name}</h3>
                          {clinic.verified && (
                            <Badge variant="secondary" className="bg-[#1EB53A] text-white">
                              ✓ Verified
                            </Badge>
                          )}
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <Badge variant="outline">
                            {clinic.category} {clinic.type}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{clinic.rating}</span>
                            <span className="text-xs text-muted-foreground">({clinic.reviewCount})</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Bookmark className="h-5 w-5" />
                      </Button>
                    </div>

                    {/* Main Info */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                        <span>
                          {clinic.address}, {clinic.district}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={clinic.isOpenNow ? "text-[#1EB53A]" : "text-muted-foreground"}>
                          {clinic.hours}
                        </span>
                        {clinic.is24Hours && (
                          <Badge variant="secondary" className="bg-[#1EB53A] text-white">
                            Open 24/7
                          </Badge>
                        )}
                      </div>
                      <div>
                        Emergency Services:{" "}
                        <span className={clinic.emergency ? "text-[#1EB53A]" : "text-muted-foreground"}>
                          {clinic.emergency ? "✓ Available" : "✗ Not Available"}
                        </span>
                      </div>
                    </div>

                    {/* Services */}
                    <div className="flex flex-wrap gap-2">
                      {clinic.services.slice(0, 6).map((service) => (
                        <Badge key={service} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {clinic.services.length > 6 && (
                        <Badge variant="outline" className="text-xs">
                          +{clinic.services.length - 6} more
                        </Badge>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <Button asChild size="sm" variant="outline">
                        <a href={`tel:${clinic.phone}`}>
                          <Phone className="mr-2 h-4 w-4" />
                          {clinic.phone}
                        </a>
                      </Button>
                      {clinic.email && (
                        <Button asChild size="sm" variant="outline">
                          <a href={`mailto:${clinic.email}`}>
                            <Mail className="mr-2 h-4 w-4" />
                            Email
                          </a>
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Navigation className="mr-2 h-4 w-4" />
                        Directions
                      </Button>
                      <Button size="sm" onClick={() => setSelectedClinic(clinic)}>
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {filteredClinics.length === 0 && (
            <Card className="flex h-[300px] items-center justify-center p-12">
              <div className="text-center">
                <p className="text-lg font-semibold">No clinics found</p>
                <p className="mt-2 text-sm text-muted-foreground">Try adjusting your filters</p>
                <Button className="mt-4" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>

      {selectedClinic && (
        <ClinicDetailModal clinic={selectedClinic} isOpen={!!selectedClinic} onClose={() => setSelectedClinic(null)} />
      )}
    </div>
  )
}
