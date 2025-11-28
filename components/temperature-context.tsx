"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface TemperatureContextType {
  isCelsius: boolean
  toggleTemperature: () => void
}

const TemperatureContext = createContext<TemperatureContextType | undefined>(undefined)

export function TemperatureProvider({ children }: { children: ReactNode }) {
  const [isCelsius, setIsCelsius] = useState(true)

  const toggleTemperature = () => {
    setIsCelsius(!isCelsius)
  }

  return <TemperatureContext.Provider value={{ isCelsius, toggleTemperature }}>{children}</TemperatureContext.Provider>
}

export function useTemperature() {
  const context = useContext(TemperatureContext)
  if (!context) {
    throw new Error("useTemperature must be used within TemperatureProvider")
  }
  return context
}
