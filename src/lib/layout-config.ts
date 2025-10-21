import type {Metadata} from 'next'
import {Inter} from 'next/font/google'

export const metadata: Metadata = {
  title: {
    template: '%s — АНО АВТОР',
    default: 'АНО АВТОР',
  },
}

export const inter = Inter({
  variable: '--font-inter',
  preload: true,
  subsets: ['cyrillic'],
})
