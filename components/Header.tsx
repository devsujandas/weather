"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Cloud, Moon, Sun, Thermometer } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { useTemperature } from "@/components/temperature-context"

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme, systemTheme } = useTheme()
  const { isCelsius, toggleTemperature } = useTemperature()

  useEffect(() => {
    setMounted(true)

    if (theme === "system" || !theme) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(prefersDark ? "dark" : "light")
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [theme, setTheme])

  const handleThemeChange = () => {
    const currentTheme =
      theme === "dark" || (theme === "system" && systemTheme === "dark")
        ? "light"
        : "dark"
    setTheme(currentTheme)
  }

  if (!mounted) return null

  const isDark = theme === "dark" || (theme === "system" && systemTheme === "dark")

  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center"
    >
      <motion.div
        layout
        className={`transition-all duration-300
          w-[95%] 
          sm:max-w-7xl
          py-1.5 rounded-2xl
          border border-dashed border-green-500/40
          backdrop-blur-xl bg-background/90 shadow-md
          ${scrolled ? "sm:w-[86%]" : "sm:w-[92%]"} 
        `}
      >
        <div className="px-4 sm:px-6 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1 hover:opacity-80 transition-opacity duration-200"
          >
          <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 flex items-center justify-center"
            >
            <img
              src="/logo.png"
              alt="Logo"
              className="w-8 h-8 object-contain"
            />
          </motion.div>


            <div className="leading-tight">
              <h1 className="font-bold text-sm sm:text-base text-foreground">
                Weather
              </h1>
              <p className="text-[9px] text-muted-foreground">Real-Time Insights</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTemperature}
              className="p-1.5 rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all duration-200 flex items-center gap-1"
              title="Toggle temperature unit"
            >
              <Thermometer className="w-3.5 h-3.5" />
              <span className="text-[10px] font-medium">°{isCelsius ? "C" : "F"}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleThemeChange}
              className="p-1.5 rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all duration-200"
              title="Toggle theme"
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.header>
  )
}
