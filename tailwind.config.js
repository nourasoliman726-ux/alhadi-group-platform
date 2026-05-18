/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          darkest: '#0f1b3d',   // أزرق داكن جداً
          dark: '#1e3a5f',      // أزرق داكن
          main: '#3b6fa0',      // أزرق رئيسي
          light: '#e8edf3',     // أزرق فاتح جداً
        },
        accent: {
          gold: '#d4af37',      // ذهبي للتأكيدات
          success: '#10b981',   // أخضر للنجاح
          warning: '#f59e0b',   // برتقالي للتحذيرات
        }
      },
      fontFamily: {
        arabic: ['Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}