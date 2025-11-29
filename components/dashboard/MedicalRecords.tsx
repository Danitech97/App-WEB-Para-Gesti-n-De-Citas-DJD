"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface MedicalRecord {
  id: number
  diagnosis: string
  treatment: string
  doctor_name: string
  date_created: string
}

const mockRecords: MedicalRecord[] = [
  {
    id: 1,
    diagnosis: "Hipertensión Arterial",
    treatment: "Medicación: Losartán 50mg",
    doctor_name: "Dr. García",
    date_created: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    diagnosis: "Revisión General Pediátrica",
    treatment: "Vacunación completada",
    doctor_name: "Dra. López",
    date_created: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export default function MedicalRecords() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tus Registros Médicos</h2>
      {mockRecords.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No hay registros médicos disponibles
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {mockRecords.map((record) => (
            <Card key={record.id} className="hover:shadow-lg transition">
              <CardHeader>
                <CardTitle>{record.diagnosis}</CardTitle>
                <CardDescription>Dr./Dra. {record.doctor_name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Tratamiento:</strong> {record.treatment}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Fecha:</strong> {format(new Date(record.date_created), "dd MMMM yyyy", { locale: es })}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
