import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vercel Deployment Adapter for TanStack Start SSR
const isVercel = Boolean(
  process.env.VERCEL ||
  process.env.VERCEL_ENV ||
  process.env.NOW_BUILDER ||
  !process.env.NETLIFY,
)

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  plugins: [
    tailwindcss(),
    tanstackStart(),
    nitro({
      preset: isVercel ? 'vercel' : (process.env.NITRO_PRESET || undefined),
    }),
    viteReact(),
  ],
})

export default config
