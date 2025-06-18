// const API_KEY = 'SJRTXB4W9NF5US39PGU2MJHAH'
const API_KEY = '7XT6XT58ZY8WZ8YMMTB439YZJ'

export async function fetchWeather(location) {
    try {
        const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=current&key=${API_KEY}`
        )
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log('Raw weather API response:', data)
        const { resolvedAddress, days, currentConditions } = data || {}

        if (!Array.isArray(days) || days.length === 0) {
            throw new Error("Missing or invalid 'days' data from API")
        }

        if (!currentConditions || typeof currentConditions !== 'object') {
            throw new Error(
                "Missing or invalid 'currentConditions' data from API"
            )
        }
        const weatherSummary = {
            location: resolvedAddress,
            lastUpdatedISO: new Date().toISOString(),
            today: {
                date: days[0].datetime,
                overview_1: {
                    title: `Feels Like ${farenheitToCelcius(days[0].feelslike)}°C`,
                    icon: 'water-outline',
                    detailPrimary: `Humidity: ${days[0].humidity}%`,
                    detailSecondary: `Dew Point: ${farenheitToCelcius(days[0].dew)}°C`,
                },
                overview_2: {
                    title: `High: ${farenheitToCelcius(days[0].tempmax)}°F / Low: ${farenheitToCelcius(days[0].tempmin)}°C`,
                    icon: getWeatherIcon(currentConditions.conditions),
                    detailPrimary: `Current Conditions: ${currentConditions.conditions}`,
                    detailSecondary: `Range: ${farenheitToCelcius(days[0].tempmin)}°C - ${farenheitToCelcius(days[0].tempmax)}°C`,
                },
                overview_3: {
                    title: `Precipitation: ${days[0].precipprob}% Chance`,
                    icon: getRainIcon(days[0].precipprob),
                    detailPrimary: `Rainfall: ${days[0].precip} in`,
                    detailSecondary: `Coverage Time: ${percentageToTime(days[0].precipcover)} h:m`,
                },
                overview_4: {
                    title: `Wind: ${milesToKM(days[0].windspeed)} km/h`,
                    icon: `navigate-outline`,
                    detailPrimary: `Gusts: ${milesToKM(days[0].windgust)} km/h`,
                    detailSecondary: `Direction: ${degreesToCompass(days[0].winddir)}`,
                    direction: days[0].winddir,
                },
                overview_5: {
                    title: `UV Index: ${days[0].uvindex}`,
                    icon: `glasses-outline`,
                    detailPrimary: `Sunrise: ${days[0].sunrise}`,
                    detailSecondary: `Sunset: ${days[0].sunset}`,
                },
                overview_6: {
                    title: `Visibility: ${milesToKM(days[0].visibility)} km`,
                    icon: `eye-outline`,
                    detailPrimary: `Pressure: ${days[0].pressure} mb`,
                    detailSecondary: `Moon Phase: ${days[0].moonphase}`,
                },
            },
            tomorrow: {
                date: days[1].datetime,
                overview_1: {
                    title: `Feels Like ${farenheitToCelcius(days[1].feelslike)}°C`,
                    icon: 'water-outline',
                    detailPrimary: `Humidity: ${days[1].humidity}%`,
                    detailSecondary: `Dew Point: ${farenheitToCelcius(days[1].dew)}°C`,
                },
                overview_2: {
                    title: `High: ${farenheitToCelcius(days[1].tempmax)}°F / Low: ${farenheitToCelcius(days[0].tempmin)}°C`,
                    icon: getWeatherIcon(currentConditions.conditions),
                    detailPrimary: `Current Conditions: ${currentConditions.conditions}`,
                    detailSecondary: `Range: ${farenheitToCelcius(days[1].tempmin)}°C - ${farenheitToCelcius(days[0].tempmax)}°C`,
                },
                overview_3: {
                    title: `Precipitation: ${days[1].precipprob}% Chance`,
                    icon: getRainIcon(days[0].precipprob),
                    detailPrimary: `Rainfall: ${days[1].precip} in`,
                    detailSecondary: `Coverage Time: ${percentageToTime(days[1].precipcover)} h:m`,
                },
                overview_4: {
                    title: `Wind: ${milesToKM(days[1].windspeed)} km/h`,
                    icon: `navigate-outline`,
                    detailPrimary: `Gusts: ${milesToKM(days[1].windgust)} km/h`,
                    detailSecondary: `Direction: ${degreesToCompass(days[1].winddir)}`,
                    direction: days[1].winddir,
                },
                overview_5: {
                    title: `UV Index: ${days[1].uvindex}`,
                    icon: `glasses-outline`,
                    detailPrimary: `Sunrise: ${days[1].sunrise}`,
                    detailSecondary: `Sunset: ${days[1].sunset}`,
                },
                overview_6: {
                    title: `Visibility: ${milesToKM(days[1].visibility)} km`,
                    icon: `eye-outline`,
                    detailPrimary: `Pressure: ${days[1].pressure} mb`,
                    detailSecondary: `Moon Phase: ${days[1].moonphase}`,
                },
            },
        }
        console.log('Formatted and Saved Data:', weatherSummary)
        return weatherSummary
    } catch (error) {
        console.error('Failed to fetch weather data:', error)
        return null
    }
}

function percentageToTime(percent) {
    if (percent === null || percent === 0) {
        return '00:00'
    }
    const totalMinutes = 1440
    const minutes = (percent / 100) * totalMinutes
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = Math.round(minutes % 60)

    const paddedHours = String(hours).padStart(2, '0')
    const paddedMinutes = String(remainingMinutes).padStart(2, '0')

    return `${paddedHours}:${paddedMinutes}`
}

function degreesToCompass(degrees) {
    if (degrees === null || typeof degrees === 'undefined') {
        return 'Direction: N/A'
    }

    const directions = [
        'N',
        'NNE',
        'NE',
        'ENE',
        'E',
        'ESE',
        'SE',
        'SSE',
        'S',
        'SSW',
        'SW',
        'WSW',
        'W',
        'WNW',
        'NW',
        'NNW',
    ]

    const fromIndex = Math.round(degrees / 22.5) % 16
    const fromDirection = directions[fromIndex]

    const oppositeDegrees = (degrees + 180) % 360
    const toIndex = Math.round(oppositeDegrees / 22.5) % 16
    const toDirection = directions[toIndex]

    return `${fromDirection} to ${toDirection} at ${degrees.toFixed(1)}°`
}
function milesToKM(speedInMiles) {
    return Math.floor(speedInMiles * 1.60934)
}
function farenheitToCelcius(tempInF) {
    const tempInC = ((tempInF - 32) * 5) / 9
    return Math.floor(tempInC)
}
function getRainIcon(percent) {
    if (percent <= 100 && percent > 75) {
        return 'thunderstorm-outline'
    } else if (percent > 50 && percent <= 75) {
        return 'rainy-outline'
    } else if (percent > 25 && percent <= 50) {
        return 'umbrella-outline'
    } else {
        return 'happy-outline'
    }
}
function getWeatherIcon(condition) {
    const cond = condition.toLowerCase()
    if (cond.includes('rain')) return 'rainy-outline'
    if (cond.includes('overcast') || cond.includes('cloud'))
        return 'cloudy-outline'
    if (cond.includes('sun') || cond.includes('clear')) return 'sunny-outline'
    if (cond.includes('storm') || cond.includes('thunder'))
        return 'thunderstorm-outline'
    if (cond.includes('snow')) return 'snow-outline'
    return 'partly-sunny-outline'
}
