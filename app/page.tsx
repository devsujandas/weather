"use client"

import { useEffect, useState } from "react"
import { motion, type Variants } from "framer-motion"
import WeatherCard from "@/components/WeatherCard"
import InfoCard from "@/components/InfoCard"
import LeafletMap from "@/components/LeafletMap"
import SearchBox from "@/components/SearchBox"
import { fetchWeatherByCoords } from "@/lib/weather-api"
import { Cloud, MapPin } from "lucide-react"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null)

  useEffect(() => {
    const fetchWeather = async (latitude: number, longitude: number) => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchWeatherByCoords(latitude, longitude)
        setWeatherData(data)
        setLocation({ lat: latitude, lon: longitude })
      } catch (err) {
        setError("Unable to fetch weather data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude)
        },
        () => {
          setError("Location permission denied. Using default location.")
          fetchWeather(40.7128, -74.006)
        },
      )
    } else {
      setError("Geolocation not supported")
      fetchWeather(40.7128, -74.006)
    }
  }, [])

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-24 pb-8 sm:pb-12">
        <motion.div className="mb-10 sm:mb-14" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div className="flex items-center gap-3 mb-3" variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Cloud className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
            </motion.div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Weather Intelligence</h1>
          </motion.div>

          <motion.p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-10" variants={itemVariants}>
            Explore real-time weather conditions and interactive maps worldwide
          </motion.p>

          <motion.div variants={itemVariants}>
            <SearchBox />
          </motion.div>
        </motion.div>

        {loading ? (
          <motion.div className="mb-8 sm:mb-12" variants={itemVariants} initial="hidden" animate="visible">
            <div className="rounded-2xl p-6 sm:p-8 shadow-lg glassmorphism h-64 sm:h-80 animate-pulse"></div>
          </motion.div>
        ) : error ? (
          <motion.div
            className="rounded-2xl p-6 sm:p-8 shadow-lg border border-destructive/40 glassmorphism mb-8 sm:mb-12"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-base sm:text-lg text-destructive font-medium">{error}</p>
          </motion.div>
        ) : weatherData ? (
          <motion.div className="mb-8 sm:mb-12" variants={itemVariants} initial="hidden" animate="visible">
            <WeatherCard data={weatherData} location={location} />
          </motion.div>
        ) : null}

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <InfoCard />
          </motion.div>

          <motion.div className="rounded-2xl p-6 sm:p-8 shadow-xl border glassmorphism-strong" variants={itemVariants}>
            <h3 className="text-lg sm:text-xl font-bold mb-6 text-foreground">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-sm text-muted-foreground">Active Coverage</span>
                <span className="text-base font-semibold text-primary">Global</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-sm text-muted-foreground">Data Source</span>
                <span className="text-base font-semibold text-primary">OpenWeather</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Update Rate</span>
                <span className="text-base font-semibold text-primary">Real-time</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="mt-8 sm:mt-12" variants={itemVariants} initial="hidden" animate="visible">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-primary/25 glassmorphism-strong">
            <div className="p-6 sm:p-8 border-b border-primary/15 bg-primary/5">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-5 h-5 text-primary" />
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Live Map</h2>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground mt-2">
                Interactive map showing your current location with real-time positioning
              </p>
            </div>
            <div className="h-96 sm:h-[500px]">
              <LeafletMap latitude={location?.lat || 40.7128} longitude={location?.lon || -74.006} />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
