"use client"

import { motion } from "framer-motion"

export default function InfoCard() {
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl p-6 shadow-xl shadow-primary/15 border border-primary/25 glassmorphism-strong"
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-4 text-primary">
        About This System
      </motion.h2>
      <div className="space-y-4">
        <motion.p variants={itemVariants} className="text-foreground/70 leading-relaxed">
          Weather provides real-time weather intelligence and interactive mapping for locations worldwide. Get
          accurate, up-to-date weather data with precision location details.
        </motion.p>
        <motion.p variants={itemVariants} className="text-foreground/70 leading-relaxed">
          Powered by OpenWeather API, our platform delivers reliable meteorological data with detailed metrics including
          temperature, humidity, wind speed, and atmospheric pressure.
        </motion.p>
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-primary/15">
          <div className="glassmorphism rounded-lg p-3 border border-primary/20 hover:border-primary/40 transition-all">
            <p className="text-primary font-semibold text-sm">Data Source</p>
            <p className="text-xs text-foreground/60 mt-1">OpenWeather API</p>
          </div>
          <div className="glassmorphism rounded-lg p-3 border border-primary/20 hover:border-primary/40 transition-all">
            <p className="text-primary font-semibold text-sm">Coverage</p>
            <p className="text-xs text-foreground/60 mt-1">Global</p>
          </div>
          <div className="glassmorphism rounded-lg p-3 border border-primary/20 hover:border-primary/40 transition-all">
            <p className="text-primary font-semibold text-sm">Updates</p>
            <p className="text-xs text-foreground/60 mt-1">Real-time</p>
          </div>
          <div className="glassmorphism rounded-lg p-3 border border-primary/20 hover:border-primary/40 transition-all">
            <p className="text-primary font-semibold text-sm">Accuracy</p>
            <p className="text-xs text-foreground/60 mt-1">High precision</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
