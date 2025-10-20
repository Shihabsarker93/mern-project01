/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1D3557",
          light: "#284775",
          dark: "#162942"
        },
        secondary: {
          DEFAULT: "#457B9D",
          light: "#5590B4",
          dark: "#3A6883"
        },
        accent: {
          DEFAULT: "#E63946",
          light: "#EA5C67",
          dark: "#D32D3A"
        },
        bgLight: {
          DEFAULT: "#F1FAEE",
          dark: "#E3F5E1",
          darker: "#D5F0D4"
        },
        textDark: {
          DEFAULT: "#343A40",
          light: "#495057",
          lighter: "#6C757D"
        },
        textLight: {
          DEFAULT: "#F8F9FA",
          dark: "#E9ECEF",
          darker: "#DEE2E6"
        }
      },
      fontFamily: {
        heading: ['"Poppins"', 'sans-serif'],
        body: ['"Open Sans"', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'lg': '1rem',
        'xl': '1.5rem',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};