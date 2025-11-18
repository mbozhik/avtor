export {metadata} from '@/lib/layout-config'
import {inter} from '@/lib/layout-config'
import '@/app/(website)/globals.css'

import {cn} from '@/lib/utils'

import Header from '~/global/header'
import YandexMetrika from '~/global/analytics'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={cn(inter.variable, 'bg-background text-foreground', 'font-sans antialiased')}>
        <Header />
        {children}

        {process.env.NODE_ENV === 'production' && <YandexMetrika />}
      </body>
    </html>
  )
}
