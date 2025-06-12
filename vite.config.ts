import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    base: '/Odin-Weather-App/',
    plugins: [tailwindcss()],
})
