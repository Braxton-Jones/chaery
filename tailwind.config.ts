import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],

  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],

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

          transparent: {
            DEFAULT: 'rgba(245, 245, 245, 0.5)',

            30: 'rgba(245, 245, 245, 0.3)',

            10: 'rgba(245, 245, 245, 0.1)',
          },
        },

        cherry_light: {
          DEFAULT: 'hsla(348, 66%, 44%, 1)',

          100: 'hsla(348, 90%, 7%, 1)',

          200: 'hsla(348, 77%, 17%, 1)',

          300: 'hsla(348, 64%, 30%, 1)',

          400: 'hsla(348, 53%, 43%, 1)',

          500: 'hsla(348, 66%, 44%, 1)',

          600: 'hsla(348, 80%, 53%, 1)',

          700: 'hsla(348, 75%, 66%, 1)',

          800: 'hsla(348, 80%, 82%, 1)',

          900: 'hsla(348, 82%, 91%, 1)',

          transparent: {
            DEFAULT: 'hsla(348, 66%, 44%, 0.5)',

            30: 'hsla(348, 66%, 44%, 0.3)',

            10: 'hsla(348, 66%, 44%, 0.1)',
          },
        },

        cherry_medium: {
          DEFAULT: 'hsla(346, 63%, 39%, 1)',

          100: 'hsla(346, 92%, 10%, 1)',

          200: 'hsla(346, 64%, 14%, 1)',

          300: 'hsla(346, 56%, 20%, 1)',

          400: 'hsla(346, 49%, 26%, 1)',

          500: 'hsla(346, 63%, 39%, 1)',

          600: 'hsla(346, 81%, 49%, 1)',

          700: 'hsla(346, 79%, 65%, 1)',

          800: 'hsla(346, 75%, 78%, 1)',

          900: 'hsla(346, 73%, 89%, 1)',

          transparent: {
            DEFAULT: 'hsla(346, 63%, 39%, 0.5)',

            30: 'hsla(346, 63%, 39%, 0.3)',

            10: 'hsla(346, 63%, 39%, 0.1)',
          },
        },

        cherry_dark: {
          DEFAULT: 'hsla(352, 96%, 33%, 1)',

          100: 'hsla(352, 88%, 4%, 1)',

          200: 'hsla(352, 89%, 10%, 1)',

          300: 'hsla(352, 90%, 16%, 1)',

          400: 'hsla(352, 91%, 23%, 1)',

          500: 'hsla(352, 96%, 33%, 1)',

          600: 'hsla(352, 98%, 53%, 1)',

          700: 'hsla(352, 98%, 63%, 1)',

          800: 'hsla(352, 98%, 75%, 1)',

          900: 'hsla(352, 98%, 86%, 1)',

          transparent: {
            DEFAULT: 'hsla(352, 96%, 33%, 0.5)',

            30: 'hsla(352, 96%, 33%, 0.3)',

            10: 'hsla(352, 96%, 33%, 0.1)',
          },
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

          transparent: {
            DEFAULT: 'rgba(32, 32, 32, 0.5)',

            30: 'rgba(32, 32, 32, 0.3)',

            10: 'rgba(32, 32, 32, 0.1)',
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
      fontFamily: {
        nunito_sans: 'var(--font-nunito-sans)',
        inter: 'var(--font-inter)',
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
