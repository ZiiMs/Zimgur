/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        zimgur: {
          50: "#2d2d2d",
          100: "#2a2a2a",
          200: "#272727",
          300: "#252525",
          400: "#222222",
          500: "#1f1f1f",
          600: "#1c1c1c",
          700: "#1a1a1a",
          800: "#171717",
          900: "#141414",
        },
      },
      keyframes: {
        grow: {
          // from: { transform: "scale(1.0)" },
          to: { transform: "scale(1.1)" },
        },
        enter: {
          from: {
            opacity: 0,
            transform: "scale(0.5)",
            transition: "all 150ms",
          },
          to: {
            opacity: 100,
            transform: "scale(1)",
            transition: "all 150ms",
          },
        },
        blurBackdrop: {
          from: {
            opacity: 0,
            transition: "all 150ms",
          },
          to: {
            opacity: "20",
            transition: "all 150ms",
          },
        },
      },
      animation: {
        modelBackdrop: "blurBackdrop 150ms linear 1 forwards",
        enter: "enter 150ms linear 1 forwards",
        grow: "grow 500ms linear 1 both",
      },
    },
  },
  plugins: [],
};
