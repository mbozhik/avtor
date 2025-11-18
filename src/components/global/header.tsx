import Logo from '$/logo.svg'
import Logo2 from '$/logo2.svg'
import {Search} from 'lucide-react'

import {LINKS} from '@/lib/constants'
import {BOX} from '~/global/container'

import {cn} from '@/lib/utils'

import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className={cn(BOX, 'py-9 xl:pt-6 xl:pb-8 sm:pt-2 sm:pb-6', 'flex items-center justify-between')}>
      <Link href={LINKS.website} target="_blank" className="group">
        <Image quality={100} src={Logo} className={cn('w-[220px] xl:w-[200px] sm:w-[150px]', 'group-hover:opacity-80 duration-300')} alt="avtor-russia.ru logo" />
      </Link>

      <div className="flex items-center gap-10 xl:gap-8 sm:gap-5">
        <Search className={cn('size-6 sm:size-5', 'hover:scale-[1.1] duration-300')} />

        <Link href={LINKS.program} target="_blank" className="group">
          <Image quality={100} src={Logo2} className={cn('w-[85px] xl:w-[75px] sm:w-[55px]', 'group-hover:opacity-80 duration-300')} alt="avtor-russia.ru logo" />
        </Link>
      </div>
    </header>
  )
}
