"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Phone, Mail, Globe, MapPin, Star, Bookmark, Share2, Clock } from "lucide-react"
import type { Clinic } from "@/lib/health-data"

interface ClinicDetailModalProps {
  clinic: Clinic
  isOpen: boolean
  onClose: () => void
}

export function ClinicDetailModal({ clinic, isOpen, onClose }: ClinicDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl">{clinic.name}</DialogTitle>
              <DialogDescription className="sr-only">
                Detailed information about {clinic.name} including services, contact information, and operating hours
              </DialogDescription>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge variant="outline">
                  {clinic.category} {clinic.type}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{clinic.rating}</span>
                  <span className="text-xs text-muted-foreground">({clinic.reviewCount} reviews)</span>
                </div>
                {clinic.verified && <Badge className="bg-[#1EB53A] text-white">✓ Verified</Badge>}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Contact & Location */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-muted-foreground" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">{clinic.address}</p>
                  <p className="text-sm text-muted-foreground">
                    {clinic.district}, {clinic.region}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 shrink-0 text-muted-foreground" />
                <div>
                  <p className="font-medium">Operating Hours</p>
                  <p className="text-sm text-muted-foreground">{clinic.hours}</p>
                  {clinic.isOpenNow && (
                    <Badge variant="secondary" className="mt-1 bg-[#1EB53A] text-white">
                      Open Now
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-muted-foreground" />
                  <a href={`tel:${clinic.phone}`} className="text-sm text-[#0072C6] hover:underline">
                    {clinic.phone}
                  </a>
                </div>
                {clinic.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 shrink-0 text-muted-foreground" />
                    <a href={`mailto:${clinic.email}`} className="text-sm text-[#0072C6] hover:underline">
                      {clinic.email}
                    </a>
                  </div>
                )}
                {clinic.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 shrink-0 text-muted-foreground" />
                    <a
                      href={`https://${clinic.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#0072C6] hover:underline"
                    >
                      {clinic.website}
                    </a>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* About */}
            <div>
              <h3 className="mb-2 font-semibold">About</h3>
              <p className="text-sm text-muted-foreground">{clinic.about}</p>
            </div>

            <Separator />

            {/* Facilities */}
            <div>
              <h3 className="mb-2 font-semibold">Facilities</h3>
              <div className="flex flex-wrap gap-2">
                {clinic.facilities.map((facility) => (
                  <Badge key={facility} variant="outline">
                    {facility}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Payment Methods */}
            <div>
              <h3 className="mb-2 font-semibold">Payment Methods</h3>
              <div className="flex flex-wrap gap-2">
                {clinic.paymentMethods.map((method) => (
                  <Badge key={method} variant="outline">
                    {method}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            <h3 className="font-semibold">Available Services</h3>
            <div className="space-y-3">
              {clinic.services.map((service) => (
                <div key={service} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{service}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Professional {service.toLowerCase()} available at this facility
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-[#1EB53A] text-white">
                      Available
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="staff" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Staff information is available upon request. Please contact the clinic directly for more details.
            </p>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold">{clinic.rating}</span>
                  <div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= Math.floor(clinic.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{clinic.reviewCount} reviews</p>
                  </div>
                </div>
              </div>
              <Button>Write a Review</Button>
            </div>
            <Separator />
            <p className="text-sm text-muted-foreground">Reviews coming soon...</p>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild className="flex-1">
            <a href={`tel:${clinic.phone}`}>
              <Phone className="mr-2 h-4 w-4" />
              Call Now
            </a>
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            <MapPin className="mr-2 h-4 w-4" />
            Get Directions
          </Button>
          {clinic.emergency && (
            <Button variant="outline" className="flex-1 bg-transparent">
              Book Appointment
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
