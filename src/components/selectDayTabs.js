//  this fn is for switching between tabs now it does it by getting the current query location from the dataset added to gridContainer
//  and on switching between tabs calls renderDataFn with the day you want to display

import renderWeather from './renderData.js'
import { getWeatherData } from './localDB.js'

export default function selectDayTabs() {
    const todayBtn = document.getElementById('todayBtn')
    const tomorrowBtn = document.getElementById('tomorrowBtn')
    const todayTab = document.querySelector('.todayTab')
    const tomorrowTab = document.querySelector('.tomorrowTab')
    todayTab.classList.add('bg-neutral-600') // when searched a location todayTab is highlighted
    tomorrowTab.classList.remove('bg-neutral-600')
    const handleToday = (event) => {
        event.preventDefault()
        const currentLocation =
            document.getElementById('gridContainer').dataset.location
        renderWeather(getWeatherData(currentLocation), 0)
        tomorrowTab.classList.remove('bg-neutral-600')
        todayTab.classList.add('bg-neutral-600')
    }
    const handleTomorrow = (event) => {
        event.preventDefault()
        const currentLocation =
            document.getElementById('gridContainer').dataset.location
        renderWeather(getWeatherData(currentLocation), 1)
        todayTab.classList.remove('bg-neutral-600')
        tomorrowTab.classList.add('bg-neutral-600')
    }
    // reset events
    todayBtn.removeEventListener('click', handleToday)
    todayBtn.addEventListener('click', handleToday)
    tomorrowBtn.removeEventListener('click', handleTomorrow)
    tomorrowBtn.addEventListener('click', handleTomorrow)
}
