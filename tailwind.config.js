/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
      },
      colors: {
        primary: {
          DEFAULT: "#F3F4F6", // Gris claro ideal para fondos principales.
          100: "#FFFFFF",     // Blanco puro para secciones limpias.
          200: "#F9FAFB",     // Gris muy claro para bordes o separaciones.
          300: "#E5E7EB",     // Gris claro para elementos secundarios.
          400: "#D1D5DB",     // Gris medio para detalles de fondo.
          500: "#9CA3AF",     // Gris para texto secundario o deshabilitado.
        },
        secondary: {
          DEFAULT: "#1F2937", // Gris oscuro ideal para texto y contrastes.
          100: "#4B5563",     // Gris medio para detalles como íconos o bordes.
          200: "#374151",     // Gris más oscuro para encabezados.
          700: "#111827",     // Gris antracita profundo para fondos contrastantes.
        },        
        danger: {
          DEFAULT: "#EF4444",
          100: "#FEE2E2",
          700: "#B91C1C",
        },
        success: {
          DEFAULT: "#10B981",
          100: "#D1FAE5",
          700: "#047857",
        },
        warning: {
          DEFAULT: "#F59E0B",
          100: "#FEF3C7",
          700: "#B45309",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        csansregular: ["CerebriSans-Regular", "sans-serif"],
        csansmedium: ["CerebriSans-Medium", "sans-serif"],
        csanssemibold: ["CerebriSans-SemiBold", "sans-serif"],
        csansbold: ["CerebriSans-Bold", "sans-serif"],
        csansextrabold: ["CerebriSans-ExtraBold", "sans-serif"],
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
}

