import { animate, stagger } from 'motion'

export default function renderWeather(weatherObject) {
    try {
        if (
            !weatherObject ||
            typeof weatherObject !== 'object' ||
            !weatherObject.location ||
            !weatherObject.lastUpdatedISO
        ) {
            throw new Error('Invalid or empty weather data')
        }

        clearPage() // Clear DOM

        for (let index = 1; index <= 6; index++) {
            const h2 = document.querySelector(`.overview_${index} h2`)
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

            h2.textContent = weatherObject[`overview_${index}`].title
            p1.textContent = weatherObject[`overview_${index}`].detailPrimary
            p2.textContent = weatherObject[`overview_${index}`].detailSecondary
        }
    } catch (error) {
        console.error('Failed to render weather data:', error.message)
    }
}

function clearPage() {
    const oldGrid = document.getElementById('gridContainer')
    const homeQueryForm = document.getElementById('homeQueryForm')
    const browseQueryForm = document.getElementById('browseQueryForm')
    if (oldGrid) {
        oldGrid.innerHTML = ''
        document.body.removeChild(oldGrid)
    }
    if (
        !homeQueryForm.classList.contains('hidden') &&
        browseQueryForm.classList.contains('hidden')
    ) {
        homeQueryForm.classList.add('hidden')
        browseQueryForm.classList.remove('hidden')
    }

    const elementsToAnimate = []

    const gridContainer = document.createElement('div')
    gridContainer.id = 'gridContainer'
    gridContainer.classList.add(
        'grid',
        'h-full',
        'grid-cols-1',
        'sm:grid-cols-2',
        'md:grid-cols-3',
        'grid-rows-2',
        'content-between',
        'gap-2',
        'text-center',
        'text-2xlm-10',
        'grid',
        'h-full',
        'gap-x-2',
        'text-center',
        'text-2xl',
        'p-20'
    )
    for (let index = 1; index <= 6; index++) {
        const div = document.createElement('div')
        div.classList.add(
            `overview_${index}`,
            'w-auto',
            'min-h-12',
            'text-neutal-300',
            'grid',
            'grid-cols-2',
            'grid-rows-2',
            'items-center',
            'border-2',
            'border-teal-500',
            'bg-neutral-700',
            'opacity-0',
            'rounded-xl',
            'translate-y-4'
        )

        const h2 = document.createElement('h2')
        h2.classList.add('col-start-1', 'col-end-3')

        const p1 = document.createElement('p')
        p1.classList.add('detailPrimary')

        const p2 = document.createElement('p')
        p2.classList.add('detailSecondary')

        div.appendChild(h2)
        div.appendChild(p1)
        div.appendChild(p2)

        gridContainer.appendChild(div)
        elementsToAnimate.push(div)
    }
    document.body.appendChild(gridContainer)
    animate(
        elementsToAnimate,
        { opacity: 1, y: 0 },
        { delay: stagger(0.1), duration: 0.5, easing: 'ease-out' }
    )
}
