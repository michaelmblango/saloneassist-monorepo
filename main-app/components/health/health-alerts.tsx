"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertTriangle, Info, Syringe, Heart, Shield, Share2, X } from "lucide-react"
import { demoHealthAlerts, type HealthAlert } from "@/lib/health-data"

export function HealthAlerts() {
  const [filter, setFilter] = useState<string>("all")
  const [selectedAlert, setSelectedAlert] = useState<HealthAlert | null>(null)
  const [dismissedBanner, setDismissedBanner] = useState(false)

  const filteredAlerts = demoHealthAlerts.filter((alert) => filter === "all" || alert.type === filter)

  const criticalAlert = demoHealthAlerts.find((a) => a.severity === "Critical")

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "Outbreak":
        return <AlertTriangle className="h-5 w-5" />
      case "Vaccination":
        return <Syringe className="h-5 w-5" />
      case "COVID-19":
        return <Shield className="h-5 w-5" />
      case "Emergency":
        return <AlertTriangle className="h-5 w-5" />
      default:
        return <Heart className="h-5 w-5" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-500"
      case "Warning":
        return "bg-yellow-500"
      default:
        return "bg-blue-500"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Outbreak":
        return "border-red-200 bg-red-50"
      case "Vaccination":
        return "border-blue-200 bg-blue-50"
      case "COVID-19":
        return "border-purple-200 bg-purple-50"
      case "Emergency":
        return "border-red-200 bg-red-50"
      default:
        return "border-green-200 bg-green-50"
    }
  }

  return (
    <div className="space-y-6">
      {/* Critical Alert Banner */}
      {criticalAlert && !dismissedBanner && (
        <Alert className="border-red-200 bg-red-50">
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 shrink-0 text-red-600" />
              <div>
                <AlertDescription className="text-red-800">
                  <strong className="font-bold">⚠️ {criticalAlert.title}</strong>
                  <p className="mt-1">{criticalAlert.summary}</p>
                  <Button
                    variant="link"
                    className="mt-2 h-auto p-0 text-red-700"
                    onClick={() => setSelectedAlert(criticalAlert)}
                  >
                    Read More →
                  </Button>
                </AlertDescription>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setDismissedBanner(true)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Alert>
      )}

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className={filter === "all" ? "bg-[#1EB53A] hover:bg-[#1EB53A]/90" : ""}
        >
          All Alerts
        </Button>
        <Button variant={filter === "Outbreak" ? "default" : "outline"} onClick={() => setFilter("Outbreak")}>
          Outbreaks
        </Button>
        <Button variant={filter === "Vaccination" ? "default" : "outline"} onClick={() => setFilter("Vaccination")}>
          Vaccination
        </Button>
        <Button variant={filter === "Health Tip" ? "default" : "outline"} onClick={() => setFilter("Health Tip")}>
          Health Tips
        </Button>
        <Button variant={filter === "COVID-19" ? "default" : "outline"} onClick={() => setFilter("COVID-19")}>
          COVID-19
        </Button>
        <Button variant={filter === "Emergency" ? "default" : "outline"} onClick={() => setFilter("Emergency")}>
          Emergency
        </Button>
      </div>

      {/* Alert Cards */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <Card key={alert.id} className={`p-6 ${getTypeColor(alert.type)}`}>
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`rounded-full p-2 ${getSeverityColor(alert.severity)} text-white`}>
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="border-current">
                        {alert.type}
                      </Badge>
                      <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                    </div>
                    <h3 className="mt-2 text-lg font-bold">{alert.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Posted {alert.datePosted}</p>
                  </div>
                </div>
              </div>

              {/* Affected Districts */}
              {alert.districts.length > 0 && alert.districts[0] !== "All Districts" && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium">Affected areas:</span>
                  {alert.districts.map((district) => (
                    <Badge key={district} variant="outline">
                      {district}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Summary */}
              <p className="text-sm">{alert.summary}</p>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <Button size="sm" onClick={() => setSelectedAlert(alert)}>
                  Read Full Alert
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <Card className="flex h-[300px] items-center justify-center p-12">
          <div className="text-center">
            <Info className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 font-semibold">No alerts found</p>
            <p className="mt-2 text-sm text-muted-foreground">Try selecting a different category</p>
          </div>
        </Card>
      )}

      {/* Health Resources Section */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Health Resources</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <Button variant="outline" className="justify-start bg-transparent">
            Ministry of Health Website
          </Button>
          <Button variant="outline" className="justify-start bg-transparent">
            WHO Sierra Leone
          </Button>
          <Button variant="outline" className="justify-start bg-transparent">
            Disease Prevention Guide (PDF)
          </Button>
          <Button variant="outline" className="justify-start bg-transparent">
            Maternal Health Guide (PDF)
          </Button>
          <Button variant="outline" className="justify-start bg-transparent">
            Child Healthcare Guide (PDF)
          </Button>
          <Button variant="outline" className="justify-start bg-transparent">
            Mental Health Support
          </Button>
        </div>
      </Card>

      {/* Alert Detail Modal */}
      {selectedAlert && (
        <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
          <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
            <DialogHeader>
              <div className="flex items-start gap-3">
                <div className={`rounded-full p-3 ${getSeverityColor(selectedAlert.severity)} text-white`}>
                  {getAlertIcon(selectedAlert.type)}
                </div>
                <div>
                  <DialogTitle className="text-xl">{selectedAlert.title}</DialogTitle>
                  <DialogDescription className="sr-only">
                    Full details about the {selectedAlert.type} alert including affected areas, actions to take, and
                    contact information
                  </DialogDescription>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="outline">{selectedAlert.type}</Badge>
                    <Badge className={getSeverityColor(selectedAlert.severity)}>{selectedAlert.severity}</Badge>
                  </div>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              {/* Affected Areas */}
              {selectedAlert.districts.length > 0 && (
                <div>
                  <h4 className="mb-2 font-semibold">Affected Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAlert.districts.map((district) => (
                      <Badge key={district} variant="outline">
                        {district}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Content */}
              <div>
                <h4 className="mb-2 font-semibold">Details</h4>
                <p className="whitespace-pre-line text-sm text-muted-foreground">{selectedAlert.content}</p>
              </div>

              {/* Actions */}
              {selectedAlert.actions.length > 0 && (
                <div>
                  <h4 className="mb-2 font-semibold">What to Do</h4>
                  <ol className="list-inside list-decimal space-y-1 text-sm text-muted-foreground">
                    {selectedAlert.actions.map((action, index) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Contacts */}
              {selectedAlert.contacts.length > 0 && (
                <div>
                  <h4 className="mb-2 font-semibold">Contact Information</h4>
                  <div className="space-y-2">
                    {selectedAlert.contacts.map((contact, index) => (
                      <Card key={index} className="p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{contact.label}</span>
                          <Button asChild size="sm">
                            <a href={`tel:${contact.value}`}>{contact.value}</a>
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Resources */}
              {selectedAlert.resources && selectedAlert.resources.length > 0 && (
                <div>
                  <h4 className="mb-2 font-semibold">Related Resources</h4>
                  <div className="space-y-2">
                    {selectedAlert.resources.map((resource, index) => (
                      <Button key={index} variant="outline" className="w-full justify-start bg-transparent">
                        {resource.title}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Button */}
              <Button className="w-full">
                <Share2 className="mr-2 h-4 w-4" />
                Share This Alert
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
