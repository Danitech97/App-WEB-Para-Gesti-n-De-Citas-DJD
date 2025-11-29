"use client"

import { useAppointments } from "@/context/AppointmentContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export default function AppointmentsList() {
  const { appointments, updateAppointmentStatus } = useAppointments()

  const upcomingAppointments = appointments.filter((apt) => apt.status === "scheduled")
  const pastAppointments = appointments.filter((apt) => apt.status !== "scheduled")

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Citas Próximas</h2>
        {upcomingAppointments.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">No tienes citas programadas</CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {upcomingAppointments.map((apt) => (
              <Card key={apt.id} className="hover:shadow-lg transition">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{apt.doctor_name}</CardTitle>
                      <CardDescription>{apt.specialty}</CardDescription>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Programada
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">
                    <strong>Fecha:</strong> {format(new Date(apt.appointment_date), "dd MMMM yyyy", { locale: es })}
                  </p>
                  <p className="text-sm">
                    <strong>Hora:</strong> {format(new Date(apt.appointment_date), "HH:mm")}
                  </p>
                  <p className="text-sm">
                    <strong>Clínica:</strong> {apt.clinic}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline">
                      Reprogramar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => updateAppointmentStatus(apt.id, "cancelled")}
                    >
                      Cancelar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {pastAppointments.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Historial de Citas</h2>
          <div className="grid gap-4">
            {pastAppointments.map((apt) => (
              <Card key={apt.id} className="opacity-75">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{apt.doctor_name}</CardTitle>
                      <CardDescription>{apt.specialty}</CardDescription>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        apt.status === "cancelled" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                      }`}
                    >
                      {apt.status === "cancelled" ? "Cancelada" : "Completada"}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(apt.appointment_date), "dd MMMM yyyy - HH:mm", { locale: es })}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
