import {ChevronLeftIcon, BadgeRussianRuble} from 'lucide-react'

import type {Project} from '@payload-types'

import {cn} from '@/lib/utils'
import {decomposeProjectTags} from '@/utils/decompose-relationship'

import Link from 'next/link'
import {Button} from '~/ui/button'
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from '~/ui/dialog'
import {ScrollArea} from '~/ui/scroll-area'
import PayloadImage from '~/ui/payload-image'
import {H1, H3, P, SPAN} from '~/ui/typography'

export default function ProjectDialog({project, isOpen, onClose}: {project: Project | null; isOpen: boolean; onClose: () => void}) {
  if (!project) return null

  const [decomposedTags] = decomposeProjectTags([project.tags])

  const formatTags = (tagArray: string[]) => {
    return tagArray.filter(Boolean).join(', ')
  }

  const renderTagSection = (tagConfigs: Array<{tags: string[]; style: 'red' | 'gray-medium' | 'white'; isMultiple: boolean}>) => {
    const Tag = ({tag, style}: {tag: string; style: 'red' | 'gray-medium' | 'white'}) => {
      return <P className={cn('px-3 py-0.75 rounded-md', style === 'red' ? 'text-foreground-light bg-red' : style === 'gray-medium' ? 'text-foreground-light bg-gray-medium' : 'text-background bg-foreground')}>{tag}</P>
    }

    return tagConfigs.map(({tags, style, isMultiple}, index) => {
      if (isMultiple) {
        return tags.map((tag, tagIndex) => <Tag key={`${index}-${tagIndex}`} tag={tag} style={style} />)
      } else {
        return <Tag key={index} tag={formatTags(tags)} style={style} />
      }
    })
  }

  const CONFIG = {
    padding: 'p-6 xl:p-5 sm:p-3',
    grid: 'grid grid-cols-2 sm:grid-cols-1 gap-14 xl:gap-10 sm:gap-10',
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={cn('mb-8 flex gap-12 h-[calc(100vh-5rem)] w-[calc(100vw-5rem)] sm:h-[calc(100vh-1.5rem)] sm:w-[calc(100vw-1.5rem)]', 'p-0 flex-col justify-between gap-0')}>
        <ScrollArea className="flex flex-col justify-between overflow-hidden">
          <DialogHeader className="contents space-y-0 text-left">
            <div data-module="dialog-headline" className={cn(CONFIG.padding, CONFIG.grid)}>
              {project.poster && (
                <div className="shrink-0">
                  <PayloadImage resource={project.poster} className="size-full object-cover rounded-[10px]" />
                </div>
              )}

              <div className="flex flex-col justify-between xl:gap-8 sm:gap-6">
                <div className="space-y-3">
                  <H1>{project.title}</H1>
                  <DialogTitle className="sr-only">{project.title}</DialogTitle>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {renderTagSection([
                      {tags: decomposedTags.mode, style: 'red', isMultiple: false},
                      {tags: decomposedTags.format, style: 'gray-medium', isMultiple: false},
                      {tags: decomposedTags.genre, style: 'gray-medium', isMultiple: true},
                      {tags: decomposedTags.audience, style: 'white', isMultiple: true},
                    ])}
                  </div>
                </div>

                <div className="space-y-8 sm:space-y-4">
                  <div className="space-y-3.5 sm:space-y-2.5">
                    <H3>Описание</H3>

                    <ScrollArea className={cn('relative', 'w-full h-40 sm:h-52')}>
                      {project.details.description.map((item) => (
                        <P className={cn('text-foreground-light', 'max-w-[80ch]', 'pb-3.5 last:pb-0')} key={item.id}>
                          {item.item}
                        </P>
                      ))}

                      <div className="absolute bottom-0 left-0 w-full h-14 bg-linear-to-t from-background to-transparent"></div>
                    </ScrollArea>
                  </div>

                  <div className="space-y-3.5">
                    {[project.details.screenwriter, project.details.year, project.status].filter(Boolean).map((item, idx) => {
                      const data = {
                        label: '',
                        value: item,
                      }

                      if (item === project.details.screenwriter) {
                        data.label = 'Сценарист'
                      } else if (item === project.details.year) {
                        data.label = 'Год'
                      } else if (item === project.status) {
                        data.label = 'Статус'
                        data.value = project.status === 'implementation' ? 'В реализации' : 'Свободный сценарий'
                      }

                      return (
                        <div className={cn(CONFIG.grid, 'sm:grid-cols-2')} key={idx}>
                          <P className="text-foreground font-medium">{data.label}:</P>
                          <P className="text-foreground-light">{data.value}</P>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div data-module="dialog-description" className={cn(CONFIG.padding, CONFIG.grid, 'sm:mt-8!')}>
            {project.references && (
              <div className="space-y-5">
                <H3>Коммерческие референсы</H3>

                <div className="grid grid-cols-3 xl:grid-cols-2 sm:grid-cols-1 gap-4 sm:gap-6">
                  {project.references.map((ref, idx) => (
                    <div className="flex flex-col gap-4 sm:gap-3" key={idx}>
                      <PayloadImage resource={ref.item.poster} className="w-full object-cover rounded-lg" />

                      <div className="flex flex-col gap-4">
                        <SPAN className="text-foreground-dark/60">Источник: {ref.item.source}</SPAN>

                        <div className="space-y-1.5">
                          <H3 className="text-foreground font-semibold">{ref.item.title}</H3>

                          <div className={cn('flex flex-wrap gap-2', 'divide-x divide-foreground-dark')}>
                            {[ref.item.descriptors.country, ref.item.descriptors.year, ref.item.descriptors.screenwriter].filter(Boolean).map((item) => (
                              <SPAN className={cn('pr-2 last:pr-0', 'text-foreground-light text-nowrap')} key={item}>
                                {item}
                              </SPAN>
                            ))}
                          </div>
                        </div>

                        {ref.item.report && (
                          <Link href={ref.item.report} className="flex items-center gap-1.75 group" target="_blank" rel="noopener noreferrer">
                            <BadgeRussianRuble className="size-6.5 text-foreground-dark group-hover:scale-[1.1] duration-300" strokeWidth={1.5} />

                            <P className="text-foreground-dark font-medium group-hover:underline">Отчет ЕАИС</P>
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(project.roadmap?.production_date || project.roadmap?.production_budget || project.roadmap?.box_office_fees) && (
              <div className="space-y-5">
                <H3>Карта кинопроекта</H3>

                <div className={cn('p-8 xl:p-6 sm:p-4 space-y-5', 'bg-gray rounded-lg')}>
                  {[project.roadmap?.production_date, project.roadmap?.production_budget, project.roadmap?.box_office_fees].filter(Boolean).map((item, idx) => {
                    const data = {
                      label: '',
                      value: item,
                    }

                    if (item === project.roadmap?.production_date) {
                      data.label = 'Сроки производства'
                    } else if (item === project.roadmap?.production_budget) {
                      data.label = 'Бюджет производства (оценочно)'
                    } else if (item === project.roadmap?.box_office_fees) {
                      data.label = 'Касовые сборы (оценочно)'
                    }

                    return (
                      <div className={cn('flex sm:flex-col items-center sm:items-start gap-4 sm:gap-2.5')} key={idx}>
                        <P className="text-foreground font-medium">{data.label}:</P>
                        <div className="sm:hidden flex-1 w-full h-0.25 bg-gray-medium"></div>
                        <P className="text-foreground-light">{data.value}</P>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className={cn('p-6 sm:py-3 sm:justify-end')}>
          <DialogClose asChild>
            <Button onClick={onClose} className="gap-1.5 sm:w-full">
              <ChevronLeftIcon />

              <SPAN offset={0}>На главную</SPAN>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
