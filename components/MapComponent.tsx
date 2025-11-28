"use client"

import { useEffect, useRef } from "react"

interface MapComponentProps {
  latitude: number
  longitude: number
}

export default function MapComponent({ latitude, longitude }: MapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const leafletRef = useRef<any>(null)

  useEffect(() => {
    if (!mapContainer.current || leafletRef.current) return

    const initMap = async () => {
      try {
        const L = await import("leaflet")
        const leaflet = L.default

        // Load CSS
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
        document.head.appendChild(link)

        leafletRef.current = leaflet

        if (!map.current) {
          map.current = leaflet.map(mapContainer.current).setView([latitude, longitude], 10)

          leaflet
            .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
              attribution: "&copy; OpenStreetMap contributors",
              maxZoom: 19,
            })
            .addTo(map.current)
        } else {
          map.current.setView([latitude, longitude], 10)
        }

        // Remove existing markers
        map.current.eachLayer((layer: any) => {
          if (layer instanceof leaflet.Marker) {
            map.current?.removeLayer(layer)
          }
        })

        // Add marker
        leaflet
          .marker([latitude, longitude], {
            icon: leaflet.icon({
              iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
              shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
              iconSize: [25, 41],
              shadowSize: [41, 41],
            }),
          })
          .addTo(map.current)
          .bindPopup(
            `<div style="font-size: 14px; padding: 8px;"><strong>Location</strong><br>${latitude.toFixed(3)}°, ${longitude.toFixed(3)}°</div>`,
          )
          .openPopup()
      } catch (error) {
        console.error("[v0] Failed to load leaflet:", error)
      }
    }

    initMap()
  }, [latitude, longitude])

  return <div ref={mapContainer} className="w-full h-full" />
}
