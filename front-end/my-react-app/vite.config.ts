import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'], // <-- LISÄÄ TÄMÄ RIVI
  },
    server: {
    port: 5173,
    strictPort: true, // Prevents Vite from picking a random port if 5173 is busy
	proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
	},
  },
})
