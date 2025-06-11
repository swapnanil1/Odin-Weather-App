import { fetchWeather } from './query'
import * as localDB from './components/localDB'

export function app() {
    // const apiJson = fetchWeather()
    // console.log(apiJson.data.resolvedAddress)
}
export async function formEvents() {
    const locationInput = document.getElementById('search')
    const submitBtn = document.querySelector('.submit')
    const viewSaved = document.querySelector('.viewSaved')
    viewSaved.addEventListener('click', () => {
        console.log(localDB.getAllWeatherData())
    })
    submitBtn.addEventListener('click', async (e) => {
        try {
            // on each click create a weather-loc object and add it to localstorage
            const location = locationInput.value
            e.preventDefault()
            const api = await fetchWeather(location)
            localDB.saveWeatherData(api)
            console.log(api)
            console
        } catch (error) {
            console.log(error)
        }
    })
}
