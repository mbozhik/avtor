'use client'

import type {PaginatedDocs} from 'payload'
import type {Project, Tag} from '@payload-types'
import type {ProjectStatus} from '~~/index/projects'
import {BOX} from '~/global/container'

import {cn} from '@/lib/utils'
import {decomposeProjectTags, type ProjectTagsType} from '@/utils/decompose-relationship'

import {useState} from 'react'

import Autoplay from 'embla-carousel-autoplay'

import {Button} from '~/ui/button'
import {ButtonGroup, ButtonGroupSeparator} from '~/ui/button-group'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger} from '~/ui/dropdown-menu'
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from '~/ui/carousel'
import PayloadImage from '~/ui/payload-image'
import {H1, H3, H4, P, SPAN} from '~/ui/typography'

export default function ProjectsModule({status, projects}: {status: ProjectStatus; projects: PaginatedDocs<Project>; tags: PaginatedDocs<Tag>}) {
  const [view, setView] = useState<'grid' | 'slider'>('slider')
  const [visibleCount, setVisibleCount] = useState(9)

  // Состояние для выбранных фильтров
  const [selectedFilters, setSelectedFilters] = useState<Record<ProjectTagsType, Set<string>>>({
    mode: new Set(),
    format: new Set(),
    genre: new Set(),
    audience: new Set(),
  })

  const projectsData = projects.docs.filter((project) => project.status === status)
  const projectTags = decomposeProjectTags(projectsData.map((p) => p.tags))

  // Собираем уникальные значения для фильтров
  const uniqueTagValues = {
    mode: new Set<string>(),
    format: new Set<string>(),
    genre: new Set<string>(),
    audience: new Set<string>(),
  }

  projectTags.forEach((tag) => {
    tag.mode.forEach((value) => uniqueTagValues.mode.add(value))
    tag.format.forEach((value) => uniqueTagValues.format.add(value))
    tag.genre.forEach((value) => uniqueTagValues.genre.add(value))
    tag.audience.forEach((value) => uniqueTagValues.audience.add(value))
  })

  // Функция для переключения фильтра
  const toggleFilter = (category: ProjectTagsType, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: new Set(prev[category].has(value) ? [...prev[category]].filter((v) => v !== value) : [...prev[category], value]),
    }))
    setVisibleCount(9) // Сбрасываем счетчик видимых проектов
  }

  // Функция для сброса фильтров
  const resetFilters = () => {
    setSelectedFilters({
      mode: new Set(),
      format: new Set(),
      genre: new Set(),
      audience: new Set(),
    })
    setVisibleCount(9)
  }

  // Проверяем, есть ли активные фильтры
  const activeFiltersCount = Object.values(selectedFilters).reduce((sum, set) => sum + set.size, 0)

  // Фильтрация проектов
  const filteredProjects = projectsData.filter((_, idx) => {
    const projectTag = projectTags[idx]

    // Проверяем каждый выбранный фильтр
    for (const category of ['mode', 'format', 'genre', 'audience'] as ProjectTagsType[]) {
      const selectedValues = selectedFilters[category]
      if (selectedValues.size > 0) {
        const projectValues = projectTag[category]
        const hasMatch = projectValues.some((value: string) => selectedValues.has(value))
        if (!hasMatch) return false
      }
    }
    return true
  })

  const visibleProjects = filteredProjects.slice(0, visibleCount)
  const hasMore = filteredProjects.length > visibleCount

  const displayProjects = status === 'implementation' && view === 'slider' ? filteredProjects : visibleProjects

  return (
    <section data-section="projects-index" className="space-y-6 sm:space-y-5">
      <div data-module="headline-projects" className={cn(BOX, 'flex items-center justify-between')}>
        <H1 className="text-foreground-light">{status === 'implementation' ? 'Проекты в реализации' : 'Свободные сценарии'}</H1>

        <div className="flex items-center gap-4">
          {(status === 'free_scripts' || view === 'grid') && (
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>Фильтры {activeFiltersCount > 0 && <div className="block px-1.5 bg-background rounded-sm aspect-square">{activeFiltersCount}</div>}</Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent side={'left'}>
                  <div className={cn('p-3', 'grid grid-cols-4 gap-4', 'divide-x divide-foreground-dark')}>
                    {(['mode', 'format', 'genre', 'audience'] as ProjectTagsType[]).map((category) => {
                      const categoryLabels = {mode: 'Вид', format: 'Формат', genre: 'Жанр', audience: 'Аудитория'}

                      return (
                        <div className="pr-4" key={category}>
                          <DropdownMenuLabel>
                            <H4>{categoryLabels[category]}</H4>
                          </DropdownMenuLabel>

                          <div className="space-y-0.5">
                            {Array.from(uniqueTagValues[category]).map((value) => (
                              <DropdownMenuItem key={value} onClick={() => toggleFilter(category, value)} className={cn('group cursor-pointer pr-4', selectedFilters[category].has(value) && 'bg-gray-medium')}>
                                <P className={cn('text-foreground-dark group-hover:text-foreground', selectedFilters[category].has(value) && 'text-foreground')}>{value}</P>
                              </DropdownMenuItem>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {activeFiltersCount > 0 && (
                <Button variant="outline" onClick={resetFilters}>
                  Сбросить
                </Button>
              )}
            </div>
          )}

          {status === 'implementation' && (
            <ButtonGroup aria-label="Button group">
              <Button onClick={() => setView('slider')} className={cn(view !== 'slider' && 'text-foreground/60 hover:text-foreground')}>
                Слайдер
              </Button>
              <ButtonGroupSeparator />
              <Button onClick={() => setView('grid')} className={cn(view !== 'grid' && 'text-foreground/60 hover:text-foreground')}>
                Сетка
              </Button>
            </ButtonGroup>
          )}
        </div>
      </div>

      {status === 'implementation' && view === 'slider' ? (
        <ProjectsSlider projects={displayProjects} />
      ) : (
        <>
          <ProjectsGrid projects={displayProjects} projectTags={projectTags} />

          {hasMore && (
            <div className="flex justify-center mt-8">
              <Button variant="destructive" onClick={() => setVisibleCount((prev) => prev + 9)}>
                Показать еще
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  )
}
function ProjectsGrid({projects, projectTags}: {projects: Project[]; projectTags: ReturnType<typeof decomposeProjectTags>}) {
  const projectFirstTags = projectTags.map((p) => [p.mode[0], p.audience[0]].filter(Boolean))

  return (
    <div data-module="grid-projects" className={cn(BOX, 'grid grid-cols-3 sm:grid-cols-1 gap-4 xl:gap-3 sm:gap-2.5')}>
      {projects.map((project, idx) => (
        <div data-item="card-grid-projects" className={cn('relative', 'bg-gray-dark rounded-[10px] overflow-hidden', 'group')} key={project.id}>
          <div className={cn('absolute z-50 inset-0 size-full', 'flex items-end')}>
            <div className={cn('w-full p-5 xl:p-4 sm:p-3', 'space-y-1 sm:space-y-1.25', 'bg-linear-to-t from-gray-dark via-gray-dark/80 to-transparent')}>
              <H3 className="pt-10 line-clamp-1">{project.title}</H3>

              <div className={cn('flex flex-wrap gap-2.5', 'divide-x divide-gray-medium')}>
                {project.details.screenwriter && <SPAN className={cn('pr-2.5 last:pr-0', 'text-foreground-light')}>{project.details.screenwriter}</SPAN>}

                {projectFirstTags[idx].map((tag, idx) => (
                  <SPAN className={cn('pr-2.5 last:pr-0', 'text-foreground-light')} key={idx}>
                    {tag}
                  </SPAN>
                ))}
              </div>
            </div>
          </div>

          <PayloadImage className={cn('size-full object-contain', 'group-hover:scale-[1.03] ease-in-out duration-400')} resource={project.poster} />
        </div>
      ))}
    </div>
  )
}

function ProjectsSlider({projects}: {projects: Project[]}) {
  const autoplayPlugin = Autoplay({
    delay: 2500,
    // stopOnMouseEnter: true,
    // stopOnInteraction: true,
  })

  return (
    <Carousel
      data-module="slider-projects"
      opts={{
        loop: true,
        align: 'start',
        slidesToScroll: 1,
      }}
      plugins={[autoplayPlugin]}
      className="w-full"
    >
      <CarouselContent className="">
        {projects.map((project, idx) => (
          <CarouselItem className="basis-1/3 sm:basis-full" key={idx}>
            <div data-item="card-slider-projects" className={cn('basis-1/3 sm:basis-full', 'relative', 'bg-gray-dark rounded-[10px] sm:rounded-none overflow-hidden', 'group')}>
              <PayloadImage className={cn('size-full object-contain', 'group-hover:scale-[1.03] ease-in-out duration-400')} resource={project.poster} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="z-50 left-4 sm:left-2 cursor-pointer hover:scale-[1.05] duration-400" />
      <CarouselNext className="z-50 right-4 sm:right-2 cursor-pointer hover:scale-[1.05] duration-400" />

      <div className={cn('sm:hidden', 'absolute top-0 left-0', 'w-[10vw] h-full', 'bg-linear-to-r from-background via-background/70 to-transparent')}></div>
      <div className={cn('sm:hidden', 'absolute top-0 right-0', 'w-[10vw] h-full', 'bg-linear-to-l from-background via-background/70 to-transparent')}></div>
    </Carousel>
  )
}
