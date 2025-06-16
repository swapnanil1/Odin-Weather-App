import { fetchWeather } from './fetchWeather.js'
import * as localDB from './components/localDB'
import renderWeather from './components/renderData'
import selectDayTabs from './components/selectDayTabs.js'

export async function homeFormEvents() {
    const homePageQueryLocation = document.getElementById('homePage')
    const submitButtonEl = document.querySelector('.homePageSearch')
    const viewSavedButtonEl = document.querySelector('.viewSaved')
    const browsePageQueryLocation = document.getElementById('browsePage') // to carry on the value searched in the homepage to browsePage input field
    viewSavedButtonEl.addEventListener('click', () => {
        const savedWeatherData = localDB.getAllWeatherData()
        console.log(savedWeatherData)
    })

    submitButtonEl.addEventListener('click', async (event) => {
        event.preventDefault()
        try {
            const location = homePageQueryLocation.value.trim()
            if (!location) {
                console.warn('No location provided')
                return
            }

            const weatherData = await fetchWeather(location)
            localDB.saveWeatherData(weatherData)
            await renderWeather(weatherData, 0) // make it pass another arg to renderDataFn where if its 0 then its today if its 1 its tomorrow | and in the components/tabs.js file i can call renderweather with 1 or 2 ... to get its specific date
            selectDayTabs()
            browsePageQueryLocation.value = homePageQueryLocation.value.trim()
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
            await renderWeather(weatherData, 0)
            selectDayTabs()
            console.log(weatherData)
        } catch (error) {
            console.error('Failed to fetch weather data:', error)
        }
    })
}
