// stateIcon.js
function getWeatherIconHTML(condition) {
    const cond = condition.toLowerCase()
    if (cond.includes('rain'))
        return '<ion-icon name="rainy-outline"></ion-icon>'
    if (cond.includes('overcast') || cond.includes('cloud'))
        return '<ion-icon name="cloudy-outline"></ion-icon>'
    if (cond.includes('sun') || cond.includes('clear'))
        return '<ion-icon name="sunny-outline"></ion-icon>'
    if (cond.includes('storm') || cond.includes('thunder'))
        return '<ion-icon name="thunderstorm-outline"></ion-icon>'
    if (cond.includes('snow'))
        return '<ion-icon name="snow-outline"></ion-icon>'
    return '<ion-icon name="partly-sunny-outline"></ion-icon>'
}

function getCompassRotation(direction) {
    // const dir = direction.toUpperCase().split(' ')[0]
    const compass = {
        N: 0,
        NE: 45,
        ENE: 67.5,
        E: 90,
        ESE: 112.5,
        SE: 135,
        SSE: 157.5,
        S: 180,
        SSW: 202.5,
        SW: 225,
        WSW: 247.5,
        W: 270,
        WNW: 292.5,
        NW: 315,
        NNW: 337.5,
    }
    return compass[direction] || 0
}
function getDynamicWindIcon(degree) {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512" 
             style="transform: rotate(${degree}deg); width: 6rem; height: 6rem; color: black;">
            <path d="M448 64L64 240.14h200a8 8 0 018 8V448z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
        </svg>
    `
}

function getHumidityIcon() {
    return '<ion-icon name="water-outline"></ion-icon>'
}

function getDewPointIcon() {
    return '<ion-icon name="thermometer-outline"></ion-icon>'
}

function getTemperatureIcon() {
    return '<ion-icon name="thermometer-outline"></ion-icon>'
}

function getUVIndexIcon(uvIndex) {
    if (uvIndex < 3) return '<ion-icon name="sunny-outline"></ion-icon>'
    if (uvIndex < 6) return '<ion-icon name="partly-sunny-outline"></ion-icon>'
    return '<ion-icon name="alert-outline" style="color: orange;"></ion-icon>'
}

function getPressureIcon() {
    return '<ion-icon name="speedometer-outline"></ion-icon>'
}

function getVisibilityIcon() {
    return '<ion-icon name="eye-outline"></ion-icon>'
}

function getMoonPhaseIcon(phase) {
    if (phase < 0.25) return '<ion-icon name="moon-outline"></ion-icon>'
    if (phase < 0.5) return '<ion-icon name="moon-half-outline"></ion-icon>'
    if (phase < 0.75) return '<ion-icon name="moon-outline"></ion-icon>'
    return '<ion-icon name="moon-outline"></ion-icon>'
}

export {
    getWeatherIconHTML,
    getDynamicWindIcon,
    getHumidityIcon,
    getDewPointIcon,
    getTemperatureIcon,
    getUVIndexIcon,
    getPressureIcon,
    getVisibilityIcon,
    getMoonPhaseIcon,
}
