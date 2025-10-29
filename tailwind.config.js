/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', // فعال کردن دارک مود بر اساس کلاس
  theme: {
    extend: {
      fontFamily: {
        vazir: ["Vazir", "sans-serif"],
      },
      colors: {
        primary: {
          50: '#EFF6FF',   // آبی بسیار روشن
          100: '#DBEAFE',  // آبی روشن
          200: '#BFDBFE',  // آبی متوسط
          300: '#93C5FD',  // آبی
          400: '#60A5FA',  // آبی تیره‌تر
          500: '#3B82F6',  // آبی اصلی
          600: '#2563EB',  // آبی پررنگ
          700: '#1D4ED8',  // آبی بسیار پررنگ
          800: '#1E40AF',  // آبی تیره
          900: '#1E3A8A',  // آبی بسیار تیره
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        }
      },
      screens: {
        'xxxs': '250px',   // موبایل‌های بسیار بسیار کوچک
        'xxs': '280px',    // موبایل‌های بسیار کوچک
        'xs': '360px',     // موبایل‌های کوچک
        'sm': '640px',     // موبایل‌های معمولی
        'md': '768px',     // تبلت
        'lg': '1024px',    // دسکتاپ کوچک
        'xl': '1280px',    // دسکتاپ
        '2xl': '1536px',   // دسکتاپ بزرگ
      },
      fontSize: {
        'xxxs': ['0.5rem', '0.75rem'],  // 8px
        'xxs': ['0.625rem', '0.75rem'], // 10px
        'xs': ['0.75rem', '1rem'],      // 12px
        'sm': ['0.875rem', '1.25rem'],  // 14px
        'base': ['1rem', '1.5rem'],     // 16px
        'lg': ['1.125rem', '1.75rem'],  // 18px
        'xl': ['1.25rem', '1.75rem'],   // 20px
        '2xl': ['1.5rem', '2rem'],      // 24px
      },
      spacing: {
        '1.5': '0.375rem',
        '2.5': '0.625rem',
        '18': '4.5rem',
        '88': '22rem',
      },
      minWidth: {
        'xxxs': '250px',
        'xxs': '280px',
      },
      // انیمیشن‌های سفارشی برای تغییر نرم تم
      transitionProperty: {
        'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
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
        },
        // کلاس‌های کمکی برای دارک مود
        '.bg-gradient-dark': {
          'background': 'linear-gradient(135deg, #1F2937 0%, #111827 100%)',
        },
        '.bg-gradient-light': {
          'background': 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)',
        }
      })
    }
  ],
}