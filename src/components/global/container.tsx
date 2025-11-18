import {cn} from '@/lib/utils'

export const BOX = 'w-[95%] xl:w-[96%] sm:w-auto mx-auto sm:mx-2.5'

export default function Container({children, className}: {children: React.ReactNode; className?: string}) {
  return <main className={cn(BOX, className)}>{children}</main>
}
