export interface WeatherColors {
  humidity: { bg: string; border: string; icon: string; text: string }
  wind: { bg: string; border: string; icon: string; text: string }
  pressure: { bg: string; border: string; icon: string; text: string }
  visibility: { bg: string; border: string; icon: string; text: string }
  condition: { bg: string; border: string; icon: string; text: string }
  feelsLike: { bg: string; border: string; icon: string; text: string }
}

export const getWeatherColors = (weatherData: any): WeatherColors => {
  const humidity = weatherData.main.humidity
  const windSpeed = weatherData.wind.speed
  const pressure = weatherData.main.pressure
  const visibility = weatherData.visibility
  const condition = weatherData.weather[0].main.toLowerCase()
  const temp = weatherData.main.temp
  const feelsLike = weatherData.main.feels_like

  // Humidity colors: Blue shades
  const getHumidityColor = () => {
    if (humidity > 80)
      return {
        bg: "from-blue-500/50 to-blue-400/30",
        border: "border-blue-400/50",
        icon: "text-blue-500",
        text: "text-blue-500",
      }
    if (humidity > 60)
      return {
        bg: "from-blue-400/50 to-blue-300/30",
        border: "border-blue-300/50",
        icon: "text-blue-400",
        text: "text-blue-400",
      }
    if (humidity > 40)
      return {
        bg: "from-blue-300/50 to-blue-200/30",
        border: "border-blue-200/50",
        icon: "text-blue-300",
        text: "text-blue-300",
      }
    return {
      bg: "from-slate-400/50 to-slate-300/30",
      border: "border-slate-300/50",
      icon: "text-slate-400",
      text: "text-slate-400",
    }
  }

  // Wind colors: Cyan/Teal shades
  const getWindColor = () => {
    if (windSpeed > 10)
      return {
        bg: "from-cyan-500/50 to-cyan-400/30",
        border: "border-cyan-400/50",
        icon: "text-cyan-500",
        text: "text-cyan-500",
      }
    if (windSpeed > 5)
      return {
        bg: "from-cyan-400/50 to-cyan-300/30",
        border: "border-cyan-300/50",
        icon: "text-cyan-400",
        text: "text-cyan-400",
      }
    return {
      bg: "from-cyan-300/50 to-cyan-200/30",
      border: "border-cyan-200/50",
      icon: "text-cyan-300",
      text: "text-cyan-300",
    }
  }

  // Pressure colors: Purple/Indigo shades
  const getPressureColor = () => {
    if (pressure > 1020)
      return {
        bg: "from-purple-500/50 to-purple-400/30",
        border: "border-purple-400/50",
        icon: "text-purple-500",
        text: "text-purple-500",
      }
    if (pressure > 1010)
      return {
        bg: "from-purple-400/50 to-purple-300/30",
        border: "border-purple-300/50",
        icon: "text-purple-400",
        text: "text-purple-400",
      }
    return {
      bg: "from-purple-300/50 to-purple-200/30",
      border: "border-purple-200/50",
      icon: "text-purple-300",
      text: "text-purple-300",
    }
  }

  // Visibility colors: Yellow/Orange shades
  const getVisibilityColor = () => {
    if (visibility > 10000)
      return {
        bg: "from-yellow-400/50 to-yellow-300/30",
        border: "border-yellow-300/50",
        icon: "text-yellow-400",
        text: "text-yellow-400",
      }
    if (visibility > 5000)
      return {
        bg: "from-orange-400/50 to-orange-300/30",
        border: "border-orange-300/50",
        icon: "text-orange-400",
        text: "text-orange-400",
      }
    return {
      bg: "from-orange-500/50 to-orange-400/30",
      border: "border-orange-400/50",
      icon: "text-orange-500",
      text: "text-orange-500",
    }
  }

  // Weather condition colors: Based on condition type
  const getConditionColor = () => {
    if (condition.includes("rain"))
      return {
        bg: "from-indigo-500/50 to-indigo-400/30",
        border: "border-indigo-400/50",
        icon: "text-indigo-500",
        text: "text-indigo-500",
      }
    if (condition.includes("cloud"))
      return {
        bg: "from-slate-400/50 to-slate-300/30",
        border: "border-slate-300/50",
        icon: "text-slate-400",
        text: "text-slate-400",
      }
    if (condition.includes("clear") || condition.includes("sunny"))
      return {
        bg: "from-amber-400/50 to-amber-300/30",
        border: "border-amber-300/50",
        icon: "text-amber-400",
        text: "text-amber-400",
      }
    if (condition.includes("snow"))
      return {
        bg: "from-sky-300/50 to-sky-200/30",
        border: "border-sky-200/50",
        icon: "text-sky-300",
        text: "text-sky-300",
      }
    if (condition.includes("thunder"))
      return {
        bg: "from-violet-500/50 to-violet-400/30",
        border: "border-violet-400/50",
        icon: "text-violet-500",
        text: "text-violet-500",
      }
    return {
      bg: "from-green-400/50 to-green-300/30",
      border: "border-green-300/50",
      icon: "text-green-400",
      text: "text-green-400",
    }
  }

  // Feels Like colors: Red/Orange shades based on temperature
  const getFeelsLikeColor = () => {
    if (feelsLike > 25)
      return {
        bg: "from-red-500/50 to-red-400/30",
        border: "border-red-400/50",
        icon: "text-red-500",
        text: "text-red-500",
      }
    if (feelsLike > 15)
      return {
        bg: "from-orange-500/50 to-orange-400/30",
        border: "border-orange-400/50",
        icon: "text-orange-500",
        text: "text-orange-500",
      }
    if (feelsLike > 5)
      return {
        bg: "from-emerald-400/50 to-emerald-300/30",
        border: "border-emerald-300/50",
        icon: "text-emerald-400",
        text: "text-emerald-400",
      }
    return {
      bg: "from-blue-500/50 to-blue-400/30",
      border: "border-blue-400/50",
      icon: "text-blue-500",
      text: "text-blue-500",
    }
  }

  return {
    humidity: {
      bg: getHumidityColor().bg,
      border: getHumidityColor().border,
      icon: getHumidityColor().icon,
      text: getHumidityColor().text,
    },
    wind: {
      bg: getWindColor().bg,
      border: getWindColor().border,
      icon: getWindColor().icon,
      text: getWindColor().text,
    },
    pressure: {
      bg: getPressureColor().bg,
      border: getPressureColor().border,
      icon: getPressureColor().icon,
      text: getPressureColor().text,
    },
    visibility: {
      bg: getVisibilityColor().bg,
      border: getVisibilityColor().border,
      icon: getVisibilityColor().icon,
      text: getVisibilityColor().text,
    },
    condition: {
      bg: getConditionColor().bg,
      border: getConditionColor().border,
      icon: getConditionColor().icon,
      text: getConditionColor().text,
    },
    feelsLike: {
      bg: getFeelsLikeColor().bg,
      border: getFeelsLikeColor().border,
      icon: getFeelsLikeColor().icon,
      text: getFeelsLikeColor().text,
    },
  }
}
