"use client"

import React, { createContext, useState, useCallback } from "react"

interface User {
  id: number
  email: string
  name: string
  is_patient: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (email: string, name: string, password: string, is_patient: boolean) => Promise<void>
  isLoading: boolean
  error: string | null
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      // Simulación: En producción usar axios para conectar con FastAPI
      const mockUser: User = {
        id: 1,
        email,
        name: "Usuario Demo",
        is_patient: true,
      }
      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
    } catch (err) {
      setError("Error en login")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(async (email: string, name: string, password: string, is_patient: boolean) => {
    setIsLoading(true)
    setError(null)
    try {
      const mockUser: User = {
        id: Date.now(),
        email,
        name,
        is_patient,
      }
      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
    } catch (err) {
      setError("Error en registro")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem("user")
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading, error }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
