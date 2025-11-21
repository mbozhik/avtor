export {metadata} from '@/lib/layout-config'
import {inter} from '@/lib/layout-config'
import '@/app/(website)/globals.css'

import {cn} from '@/lib/utils'

import Header from '~/global/header'
import Footer from '~/global/footer'
import YandexMetrika from '~/global/analytics'

export const dynamic = 'auto'
export const revalidate = 3600 // 60 minutes (1 hour)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={cn(inter.variable, 'bg-background text-foreground', 'font-sans tracking-[-0.015em] antialiased')}>
        <Header />
        {children}
        <Footer />

        {process.env.NODE_ENV === 'production' && <YandexMetrika />}
      </body>
    </html>
  )
}
