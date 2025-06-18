import { getAllWeatherData } from './localDB.js'

export default function viewHistory() {
    const viewSavedModal = document.getElementById('view-saved-modal')
    const viewPreviousBtn = document.querySelectorAll('.viewSaved')
    viewPreviousBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault()
            viewSavedModal.innerHTML = ''
            const ul = document.createElement('ul')
            getAllWeatherData().forEach((weatherData) => {
                const li = document.createElement('li')
                li.textContent = weatherData.location
                ul.appendChild(li)
            })
            viewSavedModal.appendChild(ul)
            viewSavedModal.showModal()
        })
    })
}
