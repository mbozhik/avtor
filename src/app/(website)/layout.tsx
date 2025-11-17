export {metadata} from '@/lib/layout-config'
import {inter} from '@/lib/layout-config'
import '@/app/(website)/globals.css'

import {cn} from '@/lib/utils'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={cn(inter.variable, 'bg-background text-foreground', 'font-sans antialiased')}>{children}</body>
    </html>
  )
}
