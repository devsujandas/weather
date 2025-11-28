"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Loader2 } from "lucide-react"
import { reverseGeocode } from "@/lib/weather-api"
import { motion } from "framer-motion"

export default function SearchBox() {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)

    setTimeout(() => {
      router.push(`/weather?city=${encodeURIComponent(query.trim())}`)
      setQuery("")
      setLoading(false)
    }, 800) 
  }

  const handleDetectLocation = async () => {
    setLoading(true)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords
            const data = await reverseGeocode(latitude, longitude)

            if (data.length > 0) {
              setTimeout(() => {
                router.push(`/weather?city=${encodeURIComponent(data[0].name)}`)
                setLoading(false)
              }, 800)
            }
          } catch (error) {
            alert("Unable to detect location")
            setLoading(false)
          }
        },
        () => {
          alert("Location access denied")
          setLoading(false)
        },
      )
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`rounded-xl p-4 sm:p-6 shadow-xl transition-all duration-200 glassmorphism sm:px-6 sm:py-2 ${
            isFocused
              ? "border-primary shadow-xl shadow-primary/25 glassmorphism-strong"
              : "border-primary/20"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Search className="w-5 h-5 text-primary hidden sm:block" />

            <input
              type="text"
              placeholder="Search for any city..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="flex-1 bg-transparent text-foreground placeholder-primary/50 outline-none text-base sm:text-lg"
            />

            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
                type="button"
                disabled={loading}
                onClick={handleDetectLocation}
                className={`flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-lg font-medium glassmorphism 
                text-xs sm:text-sm transition-all border border-primary/20 flex items-center justify-center gap-2
                ${loading ? "opacity-60 cursor-not-allowed" : "hover:glassmorphism-strong hover:border-primary/40"}`}
                title="Detect my location"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <MapPin className="w-4 h-4 hidden sm:block" />
                )}
                {loading ? "Loading..." : "My Location"}
              </motion.button>

              <motion.button
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
                type="submit"
                disabled={loading}
                className={`flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-lg font-medium 
                bg-gradient-to-r from-primary to-primary/70 text-primary-foreground text-xs sm:text-sm 
                transition-all shadow-lg flex items-center justify-center gap-2 
                ${loading ? "opacity-70 cursor-not-allowed" : "hover:from-primary/90 hover:to-primary/60 hover:shadow-primary/80"}`}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                {loading ? "Searching..." : "Search"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </form>
    </div>
  )
}
