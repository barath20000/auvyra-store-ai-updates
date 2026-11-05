import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => {
  if (command === 'build') {
    process.env.NODE_ENV = 'production'
  }

  // Vercel Deployment Adapter for TanStack Start SSR
  const isVercel = Boolean(
    process.env.VERCEL ||
    process.env.VERCEL_ENV ||
    process.env.NOW_BUILDER ||
    !process.env.NETLIFY,
  )

  return {
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
        inlineDynamicImports: true,
        vercel: {
          entryFormat: 'node',
          functions: {
            runtime: 'nodejs22.x',
          },
        },
      }),
      viteReact(),
    ],
  }
})
