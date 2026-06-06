"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

interface CVCertificationsProps {
  data: any
  onUpdate: (field: string, value: any) => void
  onNext: () => void
}

export function CVCertifications({ data, onUpdate, onNext }: CVCertificationsProps) {
  const certifications = data.certifications || []

  const addCertification = () => {
    onUpdate("certifications", [
      ...certifications,
      {
        name: "",
        organization: "",
        issueDate: "",
        expiryDate: "",
      },
    ])
  }

  const removeCertification = (index: number) => {
    onUpdate(
      "certifications",
      certifications.filter((_: any, i: number) => i !== index),
    )
  }

  const updateCertification = (index: number, field: string, value: any) => {
    const updated = [...certifications]
    updated[index] = { ...updated[index], [field]: value }
    onUpdate("certifications", updated)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Certifications & Awards</h3>
          <p className="text-sm text-muted-foreground">Add your certifications (optional)</p>
        </div>
        <Button onClick={addCertification} variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Certification
        </Button>
      </div>

      {certifications.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-sm text-muted-foreground">No certifications added</p>
          <Button onClick={addCertification} className="mt-4 bg-transparent" variant="outline" size="sm">
            Add Certification
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          {certifications.map((cert: any, index: number) => (
            <Card key={index} className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-semibold">Certification {index + 1}</h4>
                <Button variant="ghost" size="icon" onClick={() => removeCertification(index)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Certification Name</Label>
                  <Input
                    value={cert.name}
                    onChange={(e) => updateCertification(index, "name", e.target.value)}
                    placeholder="e.g., AWS Certified Developer"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Issuing Organization</Label>
                  <Input
                    value={cert.organization}
                    onChange={(e) => updateCertification(index, "organization", e.target.value)}
                    placeholder="e.g., Amazon Web Services"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Issue Date</Label>
                  <Input
                    type="month"
                    value={cert.issueDate}
                    onChange={(e) => updateCertification(index, "issueDate", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Expiry Date (if applicable)</Label>
                  <Input
                    type="month"
                    value={cert.expiryDate}
                    onChange={(e) => updateCertification(index, "expiryDate", e.target.value)}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
