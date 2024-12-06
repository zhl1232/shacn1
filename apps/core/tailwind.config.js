const sharedConfig = require('../../tailwind.config.js')

/** @type {import('tailwindcss').Config} */
export default {
  presets: [sharedConfig],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "../../packages/components/src/**/*.{vue,js,ts,jsx,tsx}"
  ]
} 