"use client"

import React, { createContext, useState, useCallback } from "react"

export interface Appointment {
  id: number
  user_id: number
  doctor_name: string
  specialty: string
  appointment_date: string
  status: "scheduled" | "cancelled" | "completed"
  clinic: string
}

interface AppointmentContextType {
  appointments: Appointment[]
  addAppointment: (appointment: Appointment) => void
  removeAppointment: (id: number) => void
  updateAppointmentStatus: (id: number, status: string) => void
  isLoading: boolean
}

export const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined)

export function AppointmentProvider({ children }: { children: React.ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      user_id: 1,
      doctor_name: "Dr. García",
      specialty: "Cardiología",
      appointment_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: "scheduled",
      clinic: "Clínica Central",
    },
    {
      id: 2,
      user_id: 1,
      doctor_name: "Dra. López",
      specialty: "Pediatría",
      appointment_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      status: "scheduled",
      clinic: "Clínica Sur",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const addAppointment = useCallback((appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment])
  }, [])

  const removeAppointment = useCallback((id: number) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id))
  }, [])

  const updateAppointmentStatus = useCallback((id: number, status: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: status as Appointment["status"] } : apt)),
    )
  }, [])

  return (
    <AppointmentContext.Provider
      value={{ appointments, addAppointment, removeAppointment, updateAppointmentStatus, isLoading }}
    >
      {children}
    </AppointmentContext.Provider>
  )
}

export function useAppointments() {
  const context = React.useContext(AppointmentContext)
  if (!context) {
    throw new Error("useAppointments must be used within AppointmentProvider")
  }
  return context
}
