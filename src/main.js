import { homeFormEvents, browseFormEvents } from './app'

homeFormEvents().then(() =>
    console.log('Weather Rendered Success From Homepage')
)
browseFormEvents().then(() =>
    console.log('Weather Rendered Success From Browsing Page')
)
