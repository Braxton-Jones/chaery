import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        nunito_sans: ['var(--font-nunito-sans)'],
      },
      colors: {
        white: {
          DEFAULT: '#f5f5f5',
          100: '#313131',
          200: '#626262',
          300: '#939393',
          400: '#c4c4c4',
          500: '#f5f5f5',
          600: '#f7f7f7',
          700: '#f9f9f9',
          800: '#fbfbfb',
          900: '#fdfdfd',
        },
        mauve: {
          DEFAULT: '#e7c6ff',
          100: '#35005b',
          200: '#6a00b6',
          300: '#9c11ff',
          400: '#c26cff',
          500: '#e7c6ff',
          600: '#ecd2ff',
          700: '#f1ddff',
          800: '#f6e9ff',
          900: '#faf4ff',
        },
        mauve_dark: {
          DEFAULT: '#c8b6ff',
          100: '#160058',
          200: '#2c00af',
          300: '#4608ff',
          400: '#8860ff',
          500: '#c8b6ff',
          600: '#d4c6ff',
          700: '#dfd4ff',
          800: '#eae2ff',
          900: '#f4f1ff',
        },
        periwinkle: {
          DEFAULT: '#bbd0ff',
          100: '#001c59',
          200: '#0038b1',
          300: '#0b58ff',
          400: '#6495ff',
          500: '#bbd0ff',
          600: '#cadbff',
          700: '#d7e4ff',
          800: '#e4edff',
          900: '#f2f6ff',
        },
        black: {
          DEFAULT: '#202020',
          100: '#070707',
          200: '#0d0d0d',
          300: '#141414',
          400: '#1b1b1b',
          500: '#202020',
          600: '#4e4e4e',
          700: '#7a7a7a',
          800: '#a6a6a6',
          900: '#d3d3d3',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
