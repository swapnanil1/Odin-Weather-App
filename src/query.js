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

        const [today] = days

        const weatherSummary = {
            location: resolvedAddress,
            lastUpdatedISO: new Date().toISOString(),
            overview_1: {
                title: `Feels Like ${today.feelslike}°F`,
                detailPrimary: `Humidity: ${today.humidity}%`,
                detailSecondary: `Dew Point: ${today.dew}°F`,
            },
            overview_2: {
                title: `High: ${today.tempmax}°F / Low: ${today.tempmin}°F`,
                detailPrimary: `Current Conditions: ${currentConditions.conditions}`,
                detailSecondary: `Range: ${today.tempmin}°F - ${today.tempmax}°F`,
            },
            overview_3: {
                title: `Precipitation: ${today.precipprob}% Chance`,
                detailPrimary: `Rainfall: ${today.precip} in`,
                detailSecondary: `Coverage Time: ${percentageToTime(today.precipcover)} h:m`,
            },
            overview_4: {
                title: `Wind: ${today.windspeed} mph`,
                detailPrimary: `Gusts: ${today.windgust} mph`,
                detailSecondary: `Direction: ${degreesToCompass(today.winddir)}`,
            },
            overview_5: {
                title: `UV Index: ${today.uvindex}`,
                detailPrimary: `Sunrise: ${today.sunrise}`,
                detailSecondary: `Sunset: ${today.sunset}`,
            },
            overview_6: {
                title: `Visibility: ${today.visibility} mi`,
                detailPrimary: `Pressure: ${today.pressure} mb`,
                detailSecondary: `Moon Phase: ${today.moonphase}`,
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
