const loading = document.getElementById('loading')

function showLoading() {
    loading.classList.remove('hidden')
}

function hideLoading() {
    loading.classList.add('hidden')
}

export default function toggleLoading(time) {
    setTimeout(() => {
        showLoading()
    }, 0)
    setTimeout(() => {
        hideLoading()
    }, time)
}
