import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  content: ["./index.html", "./src/**/*.{js, jsx, ts, tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "ui-sans-serif", "system-ui"],
        poppins: ["Poppins", "ui-sans-serif", "system-ui"]
      }
    }
  }
})
