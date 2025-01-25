import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  alias:{
    '@tanstack/react-query': '@tanstack/react-query',
  },
  server: {
    historyApiFallback: true,
  },
  css:{
    postcss:'./postcss.config.mjs',
  }
  
})
