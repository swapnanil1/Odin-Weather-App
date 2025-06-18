import { homeFormEvents, browseFormEvents } from './app'
import viewHistory from './components/viewHistory.js'

homeFormEvents().then(() =>
    console.log('Weather Rendered Success From Homepage')
)
browseFormEvents().then(() =>
    console.log('Weather Rendered Success From Browsing Page')
)
viewHistory()
