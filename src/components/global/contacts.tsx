import {BOX} from '~/global/container'

import {cn} from '@/lib/utils'

import Link from 'next/link'
import {H3, P} from '~/ui/typography'

const DATA = {
  1: {
    name: 'Алеся Волкова',
    position: 'Генеральный директор АНО «АВТОР»',

    contacts: [
      {value: 'alesya.volkova@avtor-russia.ru', link: 'mailto:alesya.volkova@avtor-russia.ru'},
      {value: '+7 (495) 161 66 36 (доб. 1000)', link: 'tel:+74951616636w1000"'},
      {value: '+7 (926) 533 64 50', link: 'tel:+79265336450'},
    ],
  },
  2: {
    name: 'Ангелина Сальникова',
    position: 'Руководитель социальной отраслевой программы поддержки сценаристов «АВТОР»',
    contacts: [
      {value: 'angelina.salnikova@avtor-russia.ru', link: 'mailto:angelina.salnikova@avtor-russia.ru'},
      {value: '+7 (495) 161 66 36 (доб. 5000)', link: 'tel:+74951616636w5000'},
      {value: '+7 (960) 647 83 05', link: 'tel:+79606478305'},
    ],
  },
}

export default function Contacts() {
  return (
    <section data-section="contacts-index" className={cn(BOX, 'py-10 sm:p-4', 'grid grid-cols-2 sm:grid-cols-1 xl:gap-20 sm:gap-8', 'bg-gray-dark rounded-[10px]')}>
      {Object.entries(DATA).map(([key, person]) => (
        <div key={key} className={cn('grid grid-cols-2 sm:grid-cols-1 gap-20 xl:gap-14 sm:gap-3 pr-20 xl:pr-14 sm:pr-0', 'bg-gray-dark rounded-[10px]', 'group')}>
          <H3 className="justify-self-end sm:justify-self-start">{person.name}</H3>

          <div className="space-y-6 sm:space-y-3">
            <P className="text-foreground-dark">{person.position}</P>

            <div className="space-y-1.5">
              {person.contacts.map((contact) => (
                <Link href={contact.link} className={cn('block w-fit', 'text-foreground-light', 'border-b border-transparent', 'hover:border-foreground-dark duration-300')} key={contact.value}>
                  <P className="text-foreground-dark">{contact.value}</P>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
