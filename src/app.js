import { fetchWeather } from './query'
import * as localDB from './components/localDB'
import renderWeather from './components/renderData'
export function app() {
    // Placeholder for app initialization logic
    // const weatherData = fetchWeather()
    // console.log(weatherData.data.resolvedAddress)
}

export async function homeFormEvents() {
    const locationInputEl = document.getElementById('homePage')
    const submitButtonEl = document.querySelector('.homePageSearch')
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
            renderWeather(weatherData)
            console.log(weatherData)
        } catch (error) {
            console.error('Failed to fetch weather data:', error)
        }
    })
}

export async function browseFormEvents() {
    const locationInputEl = document.getElementById('browsePage')
    const submitButtonEl = document.querySelector('.browsePageSearch')
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
            renderWeather(weatherData)
            console.log(weatherData)
        } catch (error) {
            console.error('Failed to fetch weather data:', error)
        }
    })
}
