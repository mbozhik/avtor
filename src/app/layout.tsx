export {metadata} from '@/lib/layout-config'
import {inter} from '@/lib/layout-config'
import '@/app/globals.css'

import {cn} from '@/lib/utils'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={cn(inter.variable, 'bg-neutral-950 text-white', 'font-sans antialiased')}>{children}</body>
    </html>
  )
}
