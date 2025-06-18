import { animate, stagger } from 'motion'
import { getDynamicWindIcon } from './stateIcon.js'
export default function renderWeather(weatherObject, dayNumber) {
    try {
        if (
            !weatherObject ||
            typeof weatherObject !== 'object' ||
            !weatherObject.location ||
            !weatherObject.lastUpdatedISO
        ) {
            throw new Error('Invalid or empty weather data')
        }

        clearPage(weatherObject.location)
        let day = ''
        if (dayNumber === 0) {
            day = 'today'
        }
        if (dayNumber === 1) {
            day = 'tomorrow'
        }

        const dateHeader = document.querySelector('.dateHeader')
        dateHeader.innerText = formatDateToText(weatherObject[day].date)

        for (let index = 1; index <= 6; index++) {
            const h2 = document.querySelector(`.overview_${index} h2`)
            const iconDiv = document.querySelector(`.overview_${index} .icon`)
            iconDiv.classList.add('flex', 'justify-center')
            const p1 = document.querySelector(
                `.overview_${index} .detailPrimary`
            )
            const p2 = document.querySelector(
                `.overview_${index} .detailSecondary`
            )

            if (!h2 || !p1 || !p2) {
                console.warn(`Missing elements for overview_${index}`)
                continue
            }

            h2.textContent = weatherObject[day][`overview_${index}`].title
            if (index === 4) {
                iconDiv.innerHTML = getDynamicWindIcon(
                    weatherObject[day][`overview_${index}`].direction
                )
            } else {
                iconDiv.innerHTML = `<ion-icon
                className="col-start-1 col-end-3 max-h-min text-center text-4xl"
                style="font-size: 6rem; color: black"
                name="${weatherObject[day][`overview_${index}`].icon}"
                role="img"
            ></ion-icon>`
            }
            p1.textContent =
                weatherObject[day][`overview_${index}`].detailPrimary
            p2.textContent =
                weatherObject[day][`overview_${index}`].detailSecondary
        }
    } catch (error) {
        console.error('Failed to render weather data:', error.message)
    }
}

function clearPage(location) {
    const homeQueryForm = document.getElementById('homeQueryForm')
    const browseQueryForm = document.getElementById('browseQueryForm')

    const mainContent = document.getElementById('main-content')
    if (mainContent) {
        mainContent.innerHTML = ''
    }

    if (
        !homeQueryForm.classList.contains('hidden') &&
        browseQueryForm.classList.contains('hidden')
    ) {
        homeQueryForm.classList.add('hidden')
        browseQueryForm.classList.remove('hidden')

        mainContent.classList.add('pt-28')
    }

    const elementsToAnimate = []

    const appWrapper = document.createElement('div')
    appWrapper.id = 'appWrapper'
    const dateHeader = document.createElement('div')
    dateHeader.classList.add('dateHeader', 'text-2xl', 'md:mt-5')

    appWrapper.classList.add(
        'flex',
        'flex-col',
        'w-full',
        'pt-20',
        'pb-2',
        'items-center',
        'md:h-screen',
        'md:overflow-hidden',
        'md:pt-30'
    )

    const gridContainer = document.createElement('div')
    gridContainer.id = 'gridContainer'

    gridContainer.classList.add(
        'grid',
        'w-full',
        'max-w-7xl',
        'gap-x-12',
        'gap-y-4',
        'text-center',
        'text-2xl',
        'p-4',
        'grid-cols-1',
        'sm:grid-cols-2',
        'md:grid-cols-3',

        'md:grid-rows-2',
        'md:place-content-center',
        'md:h-full'
    )

    for (let index = 1; index <= 6; index++) {
        const div = document.createElement('div')

        div.classList.add(
            `overview_${index}`,
            'w-full',
            'h-full',
            'text-neutral-300',
            'grid',
            'grid-cols-2',
            'grid-rows-3',
            'items-center',
            'border-2',
            'border-teal-500',
            'bg-neutral-700',
            'opacity-0',
            'rounded-xl',
            'translate-y-4',
            'p-4'
        )

        const h2 = document.createElement('h2')
        h2.classList.add('col-start-1', 'col-end-3')
        const icon = document.createElement('div')
        icon.classList.add('icon', 'col-start-1', 'col-end-3')
        const p1 = document.createElement('p')
        p1.classList.add('detailPrimary')
        const p2 = document.createElement('p')
        p2.classList.add('detailSecondary')
        div.appendChild(h2)
        div.appendChild(icon)
        div.appendChild(p1)
        div.appendChild(p2)
        gridContainer.appendChild(div)
        elementsToAnimate.push(div)
    }
    gridContainer.dataset.location = location
    appWrapper.appendChild(dateHeader)
    appWrapper.appendChild(gridContainer)

    mainContent.appendChild(appWrapper)

    animate(
        elementsToAnimate,
        { opacity: 1, y: 0 },
        { delay: stagger(0.1), duration: 0.5, easing: 'ease-out' }
    )
}
function formatDateToText(dateStr) {
    const date = new Date(dateStr)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString('en-US', options)
}
