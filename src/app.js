// URL (required), options (optional)
//https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]/[date1]/[date2]?key=YOUR_API_KEY

export async function fetchWeather(location) {
    const id = 'SJRTXB4W9NF5US39PGU2MJHAH'
    const data = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${id}`
    )
    const useData = await data.json()
    console.log(useData)
}

export function formEvents() {
    const locationInput = document.getElementById('search')
    const submitBtn = document.querySelector('.submit')
    submitBtn.addEventListener('click', (e) => {
        const location = locationInput.value
        e.preventDefault()
        fetchWeather(location)
    })
}
