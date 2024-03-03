import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                'poll-widget': resolve(__dirname, 'poll-widget/index.html'),
            },
        },
    },
})