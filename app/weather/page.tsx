"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import WeatherCard from "@/components/WeatherCard"
import LeafletMap from "@/components/LeafletMap"
import { fetchWeatherByCity } from "@/lib/weather-api"
import { useTemperature } from "@/components/temperature-context"
import { MapPin } from "lucide-react"

interface GeoLocation {
  lat: number
  lon: number
}

export default function WeatherPage() {
  const searchParams = useSearchParams()
  const city = searchParams.get("city")
  const [weatherData, setWeatherData] = useState<any>(null)
  const [geoData, setGeoData] = useState<GeoLocation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isCelsius } = useTemperature()

  useEffect(() => {
    if (!city) {
      setError("No city specified")
      setLoading(false)
      return
    }

    const fetchWeather = async () => {
      try {
        setLoading(true)
        setError(null)
        const { data, lat, lon } = await fetchWeatherByCity(city)
        setWeatherData(data)
        setGeoData({ lat, lon })
      } catch (err) {
        setError("City not found. Please try another search.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [city])

  const loadingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const skeletonVariants = {
    hidden: { opacity: 0.5, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'reverse' as const,
      },
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-24 pb-6 sm:pt-28 sm:pb-12">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-foreground">Weather for {city}</h1>

        <p className="text-xs sm:text-base text-muted-foreground mb-6 sm:mb-8">
          Real-time weather information and location insights
        </p>

        {loading ? (
          <motion.div className="space-y-4 sm:space-y-8" variants={loadingVariants} initial="hidden" animate="visible">
            <motion.div
              className="rounded-lg sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-700 h-48 sm:h-64"
              variants={skeletonVariants}
            />
            <motion.div
              className="rounded-lg sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-700 h-32 sm:h-40"
              variants={skeletonVariants}
            />
            <motion.div className="grid grid-cols-2 gap-3 sm:gap-4" variants={loadingVariants}>
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="rounded-lg sm:rounded-xl p-4 sm:p-6 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-700 h-20 sm:h-24"
                  variants={skeletonVariants}
                />
              ))}
            </motion.div>
          </motion.div>
        ) : error ? (
          <motion.div
            className="rounded-lg sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-destructive/20 dark:border-destructive/40 bg-destructive/5 dark:bg-destructive/10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm sm:text-lg text-destructive font-medium">{error}</p>
            <p className="text-xs sm:text-sm text-destructive/80 mt-2">Please try searching for a different city.</p>
          </motion.div>
        ) : (
          <motion.div
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Weather Card */}
            <div>{weatherData && geoData && <WeatherCard data={weatherData} location={geoData} />}</div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
              <motion.div
                className="lg:col-span-1 rounded-2xl p-6 sm:p-8 shadow-xl border border-primary/25 glassmorphism-strong"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-lg sm:text-xl font-bold mb-6 text-foreground">Additional Info</h3>
                <div className="space-y-4">
                  <div className="glassmorphism rounded-xl p-4 border border-primary/20">
                    <p className="text-xs text-muted-foreground mb-1">Feels Like</p>
                    <p className="text-2xl sm:text-3xl font-bold text-primary">
                      {Math.round(isCelsius ? weatherData.main.feels_like : (weatherData.main.feels_like * 9) / 5 + 32)}
                      °
                    </p>
                  </div>
                  <div className="glassmorphism rounded-xl p-4 border border-primary/20">
                    <p className="text-xs text-muted-foreground mb-1">Pressure</p>
                    <p className="text-2xl sm:text-3xl font-bold text-primary">{weatherData.main.pressure}</p>
                    <p className="text-xs text-muted-foreground mt-1">hPa</p>
                  </div>
                  <div className="glassmorphism rounded-xl p-4 border border-primary/20">
                    <p className="text-xs text-muted-foreground mb-1">Visibility</p>
                    <p className="text-2xl sm:text-3xl font-bold text-primary">
                      {(weatherData.visibility / 1000).toFixed(1)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">km</p>
                  </div>
                  <div className="glassmorphism rounded-xl p-4 border border-primary/20">
                    <p className="text-xs text-muted-foreground mb-1">Cloudiness</p>
                    <p className="text-2xl sm:text-3xl font-bold text-primary">{weatherData.clouds.all}%</p>
                  </div>
                </div>
              </motion.div>

              {/* Map Card */}
              <motion.div
                className="lg:col-span-3 rounded-2xl overflow-hidden shadow-xl border border-primary/25 glassmorphism-strong"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="p-4 sm:p-6 border-b border-primary/15 bg-primary/5">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-foreground text-base sm:text-lg">Location Map</h3>
                  </div>
                </div>
                <div className="h-96 sm:h-[500px] w-full">
                  {geoData && <LeafletMap latitude={geoData.lat} longitude={geoData.lon} />}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
