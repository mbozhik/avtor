import MkImage from '$/details/mk.svg'
import FkImage from '$/details/fk.svg'

import type {Detail} from '@payload-types'
import {BOX} from '~/global/container'

import {payload} from '@/lib/payload'
import {cn} from '@/lib/utils'

import Image, {type StaticImageData} from 'next/image'
import AnimatedCounter from '~~/index/details-counter'
import {H3, P} from '~/ui/typography'

type DetailOption = Detail['option']

const DATA: Record<DetailOption, {emblem: StaticImageData | null; subject: string}> = {
  fk_support: {emblem: FkImage, subject: 'Поддержано Минкультуры России'},
  mk_support: {emblem: MkImage, subject: 'Поддержано Фондом Кино'},
  iip_support: {emblem: null, subject: 'Поддержано иными институтами поддержки'},
}

export default async function Details() {
  const details = await payload.find({
    collection: 'details',
  })

  const detailsMap = new Map(details.docs.map((detail) => [detail.option, detail]))

  return (
    <section data-section="details-index" className={cn(BOX, 'grid grid-cols-3 sm:grid-cols-1 gap-4 xl:gap-3 sm:gap-2.5')}>
      {(Object.keys(DATA) as DetailOption[]).map((option) => {
        const data = DATA[option]
        const detail = detailsMap.get(option)

        return (
          <div key={option} className={cn('p-6 xl:p-5 sm:p-4', 'grid grid-cols-2', 'bg-gray-dark rounded-[10px]', 'group')}>
            <div className="flex flex-col justify-between">
              {data.emblem && (
                <div className="max-w-[250px] max-h-[50px] xl:max-w-[200px] xl:max-h-[40px] sm:max-w-[150px] sm:max-h-[30px]">
                  <Image quality={100} src={data.emblem} alt={data.subject} className={cn('w-fit h-full', 'object-contain opacity-80 group-hover:opacity-100 duration-300')} />
                </div>
              )}

              <div className="flex-1 flex flex-col justify-end gap-1.25 xl:gap-1.5">
                <H3>Счетчик проектов</H3>
                <P className="max-w-[20ch] text-balance text-foreground-dark">{data.subject}</P>
              </div>
            </div>

            {detail && (
              <div className="h-full pt-14 sm:pt-10 grid items-end justify-end pointer-events-none">
                <AnimatedCounter value={parseInt(detail.value.toString(), 10)} />
              </div>
            )}
          </div>
        )
      })}
    </section>
  )
}
