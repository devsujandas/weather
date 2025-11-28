"use client"

import { motion } from "framer-motion"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-background/50 border-t border-border backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col items-center justify-center text-center">

          {/* Professional Copyright Line */}
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            © {currentYear} Weather — All rights reserved.
          </p>

        </div>
      </div>
    </motion.footer>
  )
}
