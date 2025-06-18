const DB_KEY = 'weatherAppDB'

function getDatabase() {
    try {
        const db = localStorage.getItem(DB_KEY)
        return db ? JSON.parse(db) : {}
    } catch (e) {
        console.error('Failed to parse weather DB from localStorage', e)
        return {}
    }
}

function saveDatabase(db) {
    try {
        localStorage.setItem(DB_KEY, JSON.stringify(db))
    } catch (e) {
        console.error('Failed to save weather DB to localStorage', e)
    }
}

export function saveWeatherData(data) {
    if (!data || !data.location) {
        console.error('Invalid data provided to saveWeatherData')
        return
    }
    const db = getDatabase()
    const key = data.location.toLowerCase()
    db[key] = data
    saveDatabase(db)
}

export function getWeatherData(location) {
    const db = getDatabase()
    const key = location.toLowerCase()
    return db[key] || null
}

export function getAllWeatherData() {
    const db = getDatabase()
    return Object.values(db)
}

export function deleteWeatherData(location) {
    const db = getDatabase()
    const key = location.toLowerCase()
    if (db[key]) {
        delete db[key]
        saveDatabase(db)
    }
}

export function clearAllWeatherData() {
    localStorage.removeItem(DB_KEY)
}
