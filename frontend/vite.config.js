import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // '/api': 'http://localhost:5000',
   '/api': {
        target: process.env.VITE_API_BASE_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
