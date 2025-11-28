"use server"

export async function fetchWeatherByCoords(lat: number, lon: number) {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_KEY
  if (!apiKey) throw new Error("API key not configured")

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
  )
  if (!response.ok) throw new Error("Failed to fetch weather")
  return response.json()
}

export async function fetchWeatherByCity(city: string) {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_KEY
  if (!apiKey) throw new Error("API key not configured")

  // Get coordinates from city name
  const geoResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
  const geoResult = await geoResponse.json()

  if (!geoResult.length) {
    throw new Error("City not found")
  }

  const { lat, lon } = geoResult[0]

  // Get weather data
  const weatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
  )
  if (!weatherResponse.ok) throw new Error("Failed to fetch weather")
  const data = await weatherResponse.json()

  return { data, lat, lon }
}

export async function reverseGeocode(lat: number, lon: number) {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_KEY
  if (!apiKey) throw new Error("API key not configured")

  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`,
  )
  const data = await response.json()
  return data
}
