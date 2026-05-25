/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        macro: {
          blue: "#004B87",
          "blue-light": "#0066B3",
          "blue-dark": "#002B49",
          pink: "#E4007C",
          teal: "#00B4C8",
          red: "#E30613",
          gold: "#C9A227",
          "gold-light": "#F5E6B8",
          gray: "#F5F7FA",
          "gray-dark": "#64748B",
        },
        primary: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#004B87",
          700: "#003366",
          800: "#002B49",
          900: "#001A2E",
        },
        accent: {
          pink: "#E4007C",
          teal: "#00B4C8",
        },
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
        },
        danger: {
          50: "#fef2f2",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
        },
        card: {
          DEFAULT: "#ffffff",
          background: "#F5F7FA",
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        card: "0 4px 16px rgba(0, 43, 73, 0.1)",
        float: "0 8px 24px rgba(0, 75, 135, 0.2)",
        macro: "0 8px 24px rgba(0, 75, 135, 0.2)",
      },
    },
  },
  plugins: [],
};
