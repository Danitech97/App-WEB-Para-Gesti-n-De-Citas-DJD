"use client"

import { useAuth } from "@/context/AuthContext"
import { AppointmentProvider } from "@/context/AppointmentContext"
import Navbar from "./Navbar"
import AppointmentsList from "./AppointmentsList"
import MedicalRecords from "./MedicalRecords"
import { useState } from "react"

export default function Dashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<"appointments" | "records">("appointments")

  return (
    <AppointmentProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Bienvenido, {user?.name}</h1>
            <p className="text-muted-foreground">Gestiona tus citas y registros médicos en un solo lugar</p>
          </div>

          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab("appointments")}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                activeTab === "appointments" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              Mis Citas
            </button>
            <button
              onClick={() => setActiveTab("records")}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                activeTab === "records" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              Registros Médicos
            </button>
          </div>

          {activeTab === "appointments" && <AppointmentsList />}
          {activeTab === "records" && <MedicalRecords />}
        </div>
      </div>
    </AppointmentProvider>
  )
}
