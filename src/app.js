import { fetchWeather } from './query'
import * as localDB from './components/localDB'

export function app() {
    // Placeholder for app initialization logic
    // const weatherData = fetchWeather()
    // console.log(weatherData.data.resolvedAddress)
}

export async function formEvents() {
    const locationInputEl = document.getElementById('search')
    const submitButtonEl = document.querySelector('.submit')
    const viewSavedButtonEl = document.querySelector('.viewSaved')

    viewSavedButtonEl.addEventListener('click', () => {
        const savedWeatherData = localDB.getAllWeatherData()
        console.log(savedWeatherData)
    })

    submitButtonEl.addEventListener('click', async (event) => {
        event.preventDefault()
        try {
            const location = locationInputEl.value.trim()
            if (!location) {
                console.warn('No location provided')
                return
            }

            const weatherData = await fetchWeather(location)
            localDB.saveWeatherData(weatherData)
            console.log(weatherData)
        } catch (error) {
            console.error('Failed to fetch weather data:', error)
        }
    })
}
