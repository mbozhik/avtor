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
      black: colors.black,
      white: colors.white,
      neutral: colors.neutral,
      transparent: colors.transparent,
    }),
    extend: {},
  },
  plugins: [],
} satisfies Config
