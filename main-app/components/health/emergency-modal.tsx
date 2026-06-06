"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Phone, MapPin, AlertTriangle } from "lucide-react"
import { demoHealthClinics } from "@/lib/health-data"

interface EmergencyModalProps {
  isOpen: boolean
  onClose: () => void
}

export function EmergencyModal({ isOpen, onClose }: EmergencyModalProps) {
  const [userDistrict, setUserDistrict] = useState("")

  useEffect(() => {
    const district = localStorage.getItem("userDistrict") || "Western Urban"
    setUserDistrict(district)
  }, [])

  const nearestEmergencyClinics = demoHealthClinics
    .filter((clinic) => clinic.emergency && clinic.district === userDistrict)
    .slice(0, 3)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-red-100 p-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-2xl text-red-600">Emergency Services</DialogTitle>
              <DialogDescription>Call immediately if you're experiencing a medical emergency</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Emergency Numbers */}
          <div className="space-y-3">
            <h3 className="font-semibold">Emergency Hotlines</h3>
            <Card className="p-4">
              <Button asChild size="lg" className="w-full bg-red-600 text-white hover:bg-red-700">
                <a href="tel:117">
                  <Phone className="mr-2 h-5 w-5" />
                  <div className="text-left">
                    <div className="text-lg font-bold">117</div>
                    <div className="text-xs">National Emergency Number</div>
                  </div>
                </a>
              </Button>
            </Card>

            <div className="grid gap-3 sm:grid-cols-2">
              <Card className="p-4">
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <a href="tel:999">
                    <Phone className="mr-2 h-4 w-4" />
                    <div className="text-left">
                      <div className="font-semibold">999</div>
                      <div className="text-xs">Ambulance Service</div>
                    </div>
                  </a>
                </Button>
              </Card>

              <Card className="p-4">
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <a href="tel:076-555-0001">
                    <Phone className="mr-2 h-4 w-4" />
                    <div className="text-left">
                      <div className="font-semibold">076-555-0001</div>
                      <div className="text-xs">Connaught Hospital</div>
                    </div>
                  </a>
                </Button>
              </Card>
            </div>
          </div>

          {/* Location */}
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              Your location: <span className="font-medium text-foreground">{userDistrict || "Not set"}</span>
            </div>
          </div>

          {/* Nearest Emergency Clinics */}
          {nearestEmergencyClinics.length > 0 && (
            <div>
              <h3 className="mb-3 font-semibold">Nearest Emergency Clinics</h3>
              <div className="space-y-3">
                {nearestEmergencyClinics.map((clinic) => (
                  <Card key={clinic.id} className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-semibold">{clinic.name}</h4>
                        <p className="text-sm text-muted-foreground">{clinic.address}</p>
                        <p className="text-sm text-muted-foreground">{clinic.hours}</p>
                      </div>
                      <Button asChild size="sm">
                        <a href={`tel:${clinic.phone}`}>
                          <Phone className="mr-2 h-4 w-4" />
                          Call
                        </a>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Warning */}
          <Card className="border-yellow-200 bg-yellow-50 p-4">
            <p className="text-sm text-yellow-800">
              <strong>Warning:</strong> If this is a life-threatening emergency, call 117 immediately. Don't delay care
              by searching for clinics.
            </p>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
