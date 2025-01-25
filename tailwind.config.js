/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
   "./src/**/*.{js,jsx,ts,tsx}",
   "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af', // Adjust to your theme's primary color
        secondary: '#2563eb',
        accent: '#9333ea',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}
