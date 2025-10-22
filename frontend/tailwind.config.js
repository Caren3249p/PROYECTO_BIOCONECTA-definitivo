/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#009688",
          dark: "#111827"
        }
      },
      boxShadow: {
        soft: "0 10px 25px rgba(0,0,0,0.25)"
      },
      borderRadius: {
        "2xl": "1.25rem"
      }
    },
  },
  plugins: [],
}
