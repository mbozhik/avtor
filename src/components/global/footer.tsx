import Logo from '$/logo.svg'

import {LINKS} from '@/lib/constants'
import {BOX} from '~/global/container'

import {cn} from '@/lib/utils'

import Link from 'next/link'
import Image from 'next/image'
import {P} from '~/ui/typography'

const DATA = [
  {value: 'Политика конфиденциальности', link: 'https://avtor-russia.ru/privacy-policy'},
  {value: 'СОУТ', link: 'https://avtor-russia.ru/sout.pdf'},
  {value: 'город Москва, вн. тер. г. мунициальный округ Замоскворечье, улица Зацепа, дом 24, строение 2', link: null},
]

export default function Footer() {
  return (
    <footer className={cn(BOX, 'pt-24 pb-10 xl:pt-20 sm:pt-12 sm:pb-6', 'flex sm:flex-col justify-between sm:gap-5')}>
      <Link href={LINKS.website} target="_blank" className="group">
        <Image quality={100} src={Logo} className={cn('w-[220px] xl:w-[200px] sm:w-[150px]', 'group-hover:opacity-80 duration-300')} alt="avtor-russia.ru logo" />
      </Link>

      <div className="space-y-2.5">
        {DATA.map((item) => (
          <Link href={item.link ?? ''} target="_blank" className={cn('block w-fit', 'text-foreground-light', 'border-b border-foreground-dark last:border-b-0', 'hover:border-transparent duration-300', !item.link && 'pointer-events-none')} key={item.value}>
            <P offset={0} className="text-foreground-dark max-w-[30ch] text-balance">
              {item.value}
            </P>
          </Link>
        ))}
      </div>
    </footer>
  )
}
