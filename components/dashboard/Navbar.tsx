"use client"

import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Healthcare</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{user?.email}</span>
          <Button
            variant="destructive"
            onClick={() => {
              logout()
              window.location.href = "/"
            }}
          >
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </nav>
  )
}
