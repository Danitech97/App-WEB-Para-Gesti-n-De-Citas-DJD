"use client"

import { useState } from "react"
import LoginForm from "@/components/auth/LoginForm"
import Dashboard from "@/components/dashboard/Dashboard"
import { useEffect } from "react"

export default function Home() {
  const [showLogin, setShowLogin] = useState(true)

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      setShowLogin(false)
    }
  }, [])

  return (
    <main className="min-h-screen">
      {showLogin ? <LoginForm onLoginSuccess={() => setShowLogin(false)} /> : <Dashboard />}
    </main>
  )
}
