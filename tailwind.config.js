/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        primary: {
          DEFAULT: '#7A00FF',
          hover: '#6200CC',
          light: '#9E47FF',
        },
        // Accent Colors
        accent: {
          gold: '#FFD700',
          teal: '#00E676',
          orange: '#FFAB00',
        },
        // Dark Theme UI Colors
        dark: {
          bg: '#050505',
          card: '#121212',
          surface: '#1E1E1E',
          border: '#27272A',
        },
        // Semantic Status Colors
        status: {
          error: '#FF1744',
          success: '#00E676',
          warning: '#FFAB00',
        },
        // Text Colors
        text: {
          primary: '#FFFFFF',
          secondary: '#A1A1AA',
          muted: '#52525B',
        }
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(122, 0, 255, 0.5)',
        'glow-purple-sm': '0 0 10px rgba(122, 0, 255, 0.3)',
        'glow-gold': '0 0 15px rgba(255, 215, 0, 0.4)',
        'btn-primary': '0 4px 14px 0 rgba(122, 0, 255, 0.39)',
        'btn-primary-hover': '0 6px 20px 0 rgba(122, 0, 255, 0.5)',
        'btn-gold': '0 4px 14px 0 rgba(255, 215, 0, 0.4)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 8px 24px rgba(122, 0, 255, 0.15)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'display-1': ['56px', { lineHeight: '1.1', fontWeight: '800' }],
        'display-2': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-1': ['36px', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-2': ['30px', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-3': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
      },
      borderRadius: {
        'card': '12px',
        'btn': '8px',
        'input': '8px',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease',
        'slide-up': 'slideUp 0.3s ease',
        'spin': 'spin 0.8s linear infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          to: { backgroundPosition: '-200% 0' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(122, 0, 255, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(122, 0, 255, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
