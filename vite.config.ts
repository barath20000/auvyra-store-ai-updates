import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  plugins: [
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
})

export default config
