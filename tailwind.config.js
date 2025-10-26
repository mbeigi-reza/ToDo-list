/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        vazir: ["Vazir", "sans-serif"],
      },
      colors: {
        primary: {
          50: '#F3E5F5',
          100: '#E1D8F1',
          500: '#7C4DFF', 
          600: '#673AB7',
          700: '#512DA8',
        }
      },
      screens: {
        'xxs': '280px',   // موبایل‌های بسیار کوچک
        'xs': '360px',    // موبایل‌های کوچک
        'sm': '640px',    // موبایل‌های معمولی
        'md': '768px',    // تبلت
        'lg': '1024px',   // دسکتاپ کوچک
        'xl': '1280px',   // دسکتاپ
        '2xl': '1536px',  // دسکتاپ بزرگ
      },
      fontSize: {
        'xxs': ['0.625rem', '0.75rem'], // 10px
        'xs': ['0.75rem', '1rem'],      // 12px
        'sm': ['0.875rem', '1.25rem'],  // 14px
        'base': ['1rem', '1.5rem'],     // 16px
        'lg': ['1.125rem', '1.75rem'],  // 18px
        'xl': ['1.25rem', '1.75rem'],   // 20px
        '2xl': ['1.5rem', '2rem'],      // 24px
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        },
        '.text-ellipsis-2': {
          display: '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },
        '.text-ellipsis-3': {
          display: '-webkit-box',
          '-webkit-line-clamp': '3',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        }
      })
    }
  ],
}