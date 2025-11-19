import type {Config} from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  theme: {
    screens: {
      xl: {max: '1780px'},
      sm: {max: '500px'},
    },
    fontFamily: {
      sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
    },
    colors: ({colors}) => ({
      background: '#1A191B',

      foreground: {
        DEFAULT: '#FFFFFF',
        light: '#D1D1D1',
        dark: '#8A898A',
      },

      gray: {
        DEFAULT: '#343335',
        light: '#D0D0D0',
        medium: '#6E6D6F',
        dark: '#151416',
      },

      red: '#5C0000',

      transparent: colors.transparent,
    }),
    extend: {
      backgroundImage: {
        'gradient-red': 'linear-gradient(180deg, #D8092F 0%, #7B020C 82%, #5C0000 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config
