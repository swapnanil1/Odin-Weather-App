const API_KEY = 'SJRTXB4W9NF5US39PGU2MJHAH'

export async function fetchWeather(location) {
    try {
        const date = getTodayDate()
        const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date}?unitGroup=us&include=current&key=${API_KEY}`
        )

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        const { days, currentConditions, resolvedAddress } = data
        const [today] = days

        const dataToUse = {
            location: resolvedAddress,
            lastUpdated: new Date().toISOString(),
            grid_1: {
                feelslike: today.feelslike,
                feelslike_unit: '°F',
                humidity: today.humidity,
                humidity_unit: '%',
                dew: today.dew,
                dew_unit: '°F',
            },
            grid_2: {
                tempmax: today.tempmax,
                tempmax_unit: '°F',
                tempmin: today.tempmin,
                tempmin_unit: '°F',
                currentConditions: currentConditions.conditions,
            },
            grid_3: {
                precipprob: today.precipprob,
                precipprob_unit: '%',
                precip: today.precip,
                precip_unit: 'in',
                precipcover: percentageToTime(today.precipcover),
                precipcover_unit: 'h:m',
            },
            grid_4: {
                windspeed: today.windspeed,
                windspeed_unit: 'mph',
                windgust: today.windgust,
                windgust_unit: 'mph',
                winddir: degreesToCompass(today.winddir),
            },
            grid_5: {
                uvindex: today.uvindex,
                sunrise: today.sunrise,
                sunset: today.sunset,
            },
            grid_6: {
                visibility: today.visibility,
                visibility_unit: 'mi',
                pressure: today.pressure,
                pressure_unit: 'mb',
                moonphase: today.moonphase,
            },
        }

        console.log('Formatted and Saved Data:', dataToUse)
        return dataToUse
    } catch (error) {
        console.error('Failed to fetch weather data:', error)
        return null
    }
}

function getTodayDate() {
    return new Date().toISOString().split('T')[0]
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
    const index = Math.round(degrees / 22.5) % 16
    return `${directions[index]} (${degrees.toFixed(1)}°)`
}
