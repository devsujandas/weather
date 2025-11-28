"use client"

import { Cloud, Droplets, Wind, MapPin, Eye, Gauge } from "lucide-react"
import { motion } from "framer-motion"
import { useTemperature } from "@/components/temperature-context"
import { getWeatherColors } from "@/lib/weather-colors"

interface WeatherCardProps {
  data: any
  location: { lat: number; lon: number } | null
}

const convertTemperature = (celsius: number, isCelsius: boolean): number => {
  if (!isCelsius) {
    return Math.round((celsius * 9) / 5 + 32)
  }
  return Math.round(celsius)
}

export default function WeatherCard({ data, location }: WeatherCardProps) {
  const { isCelsius } = useTemperature()

  if (!data) return null

  const temp = convertTemperature(data.main.temp, isCelsius)
  const feelsLike = convertTemperature(data.main.feels_like, isCelsius)
  const humidity = data.main.humidity
  const windSpeed = data.wind.speed
  const condition = data.weather[0].main
  const description = data.weather[0].description
  const pressure = data.main.pressure
  const visibility = (data.visibility / 1000).toFixed(1)

  const colors = getWeatherColors(data)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl p-6 sm:p-8 shadow-2xl shadow-primary/15 border border-primary/25 glassmorphism-strong"
    >
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-6">
          <motion.div variants={itemVariants}>
            <h2 className="text-6xl sm:text-7xl font-bold text-primary">{temp}°</h2>
            <p className="text-foreground/70 mt-3 capitalize text-base sm:text-lg">{description}</p>
          </motion.div>
          <motion.div variants={itemVariants} className="sm:text-right">
            <p className="text-3xl sm:text-4xl font-bold text-primary">{data.name}</p>
            <p className="text-sm text-foreground/60 flex items-center gap-2 mt-2 sm:justify-end">
              <MapPin className="w-4 h-4" />
              <span>
                {location?.lat.toFixed(2)}° N, {location?.lon.toFixed(2)}° E
              </span>
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 pt-6 border-t border-primary/15">
          <motion.div
            variants={itemVariants}
            className={`glassmorphism rounded-xl p-4 flex flex-col items-center border ${colors.humidity.border} hover:${colors.humidity.border} transition-all`}
          >
            <div
              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors.humidity.bg} flex items-center justify-center mb-2`}
            >
              <Droplets className={`w-5 h-5 ${colors.humidity.icon}`} />
            </div>
            <p className="text-xs text-foreground/60 mb-1">Humidity</p>
            <p className={`font-semibold ${colors.humidity.text} text-sm`}>{humidity}%</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={`glassmorphism rounded-xl p-4 flex flex-col items-center border ${colors.wind.border} hover:${colors.wind.border} transition-all`}
          >
            <div
              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors.wind.bg} flex items-center justify-center mb-2`}
            >
              <Wind className={`w-5 h-5 ${colors.wind.icon}`} />
            </div>
            <p className="text-xs text-foreground/60 mb-1">Wind</p>
            <p className={`font-semibold ${colors.wind.text} text-sm`}>{windSpeed.toFixed(1)} m/s</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={`glassmorphism rounded-xl p-4 flex flex-col items-center border ${colors.pressure.border} hover:${colors.pressure.border} transition-all`}
          >
            <div
              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors.pressure.bg} flex items-center justify-center mb-2`}
            >
              <Gauge className={`w-5 h-5 ${colors.pressure.icon}`} />
            </div>
            <p className="text-xs text-foreground/60 mb-1">Pressure</p>
            <p className={`font-semibold ${colors.pressure.text} text-sm`}>{pressure} hPa</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={`glassmorphism rounded-xl p-4 flex flex-col items-center border ${colors.visibility.border} hover:${colors.visibility.border} transition-all`}
          >
            <div
              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors.visibility.bg} flex items-center justify-center mb-2`}
            >
              <Eye className={`w-5 h-5 ${colors.visibility.icon}`} />
            </div>
            <p className="text-xs text-foreground/60 mb-1">Visibility</p>
            <p className={`font-semibold ${colors.visibility.text} text-sm`}>{visibility} km</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={`glassmorphism rounded-xl p-4 flex flex-col items-center border ${colors.condition.border} hover:${colors.condition.border} transition-all`}
          >
            <div
              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors.condition.bg} flex items-center justify-center mb-2`}
            >
              <Cloud className={`w-5 h-5 ${colors.condition.icon}`} />
            </div>
            <p className="text-xs text-foreground/60 mb-1">Condition</p>
            <p className={`font-semibold ${colors.condition.text} text-sm`}>{condition}</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={`glassmorphism rounded-xl p-4 flex flex-col items-center border ${colors.feelsLike.border} hover:${colors.feelsLike.border} transition-all`}
          >
            <div
              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors.feelsLike.bg} flex items-center justify-center mb-2`}
            >
              <span className={`text-lg font-bold ${colors.feelsLike.icon}`}>°</span>
            </div>
            <p className="text-xs text-foreground/60 mb-1">Feels Like</p>
            <p className={`font-semibold ${colors.feelsLike.text} text-sm`}>{feelsLike}°</p>
          </motion.div>
        </div>
      </div>

      <motion.div variants={itemVariants} className="glassmorphism rounded-xl p-4 border border-primary/30">
        <p className="text-sm text-foreground/70">
          Feels like{" "}
          <span className="font-semibold text-primary">
            {feelsLike}°{isCelsius ? "C" : "F"}
          </span>{" "}
          with {condition.toLowerCase()} conditions
        </p>
      </motion.div>
    </motion.div>
  )
}
