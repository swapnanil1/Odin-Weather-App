import { getAllWeatherData } from './localDB.js'
import renderWeather from './renderData.js'
import selectDayTabs from './selectDayTabs.js'

export default function viewHistory() {
    const closeModalBtn = document.querySelector('.close-modal')
    closeModalBtn.addEventListener('click', () => {
        viewSavedModal.close()
        overlay.classList.add('hidden')
    })
    const viewSavedModal = document.getElementById('view-saved-modal')
    viewSavedModal.addEventListener('close', () => {
        overlay.classList.add('hidden')
    })
    const overlay = document.getElementById('overlay')
    const viewPreviousBtn = document.querySelectorAll('.viewSaved')
    viewPreviousBtn.forEach((btn) => {
        const modalContainer = document.querySelector('.modal-content')
        btn.addEventListener('click', (e) => {
            e.preventDefault()
            modalContainer.innerHTML = ''
            const ul = document.createElement('ul')
            ul.classList.add(
                'grid',
                'grid-rows-10',
                'grid-cols-3',
                'h-full',
                'w-full',
                'gap-2'
            )
            getAllWeatherData().forEach((weatherData) => {
                const li = document.createElement('li')
                li.textContent = weatherData.location
                li.classList.add(
                    'text-2xl',
                    'border-2',
                    'border-neutral-500',
                    'rounded-sm',
                    'p-2'
                )
                li.addEventListener('click', () => {
                    renderWeather(weatherData, 0)
                    const browsePageQueryLocation =
                        document.getElementById('browsePage')
                    browsePageQueryLocation.value = weatherData.location
                    selectDayTabs()
                    viewSavedModal.close()
                    overlay.classList.add('hidden')
                })
                ul.appendChild(li)
            })
            modalContainer.appendChild(ul)

            modalContainer.appendChild(closeModalBtn)
            overlay.classList.remove('hidden')
            viewSavedModal.showModal()
        })
    })
}
