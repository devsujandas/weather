"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false, loading: () => <MapLoader /> })

interface LeafletMapProps {
  latitude: number
  longitude: number
}

function MapLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
      <div className="text-center">
        <p className="text-slate-600 dark:text-slate-400 text-sm">Loading map...</p>
      </div>
    </div>
  )
}

export default function LeafletMap({ latitude, longitude }: LeafletMapProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <MapLoader />
  }

  return <MapComponent latitude={latitude} longitude={longitude} />
}
