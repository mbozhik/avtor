'use client'

import type {PaginatedDocs} from 'payload'
import type {Project} from '@payload-types'
import type {ProjectStatus} from '~~/index/projects'
import {BOX} from '~/global/container'

import {cn} from '@/lib/utils'
import {decomposeProjectTags} from '@/utils/decompose-relationship'

import {useState} from 'react'

import {Button} from '~/ui/button'
import {ButtonGroup, ButtonGroupSeparator} from '~/ui/button-group'
import PayloadImage from '~/ui/payload-image'
import {H1, H3, SPAN} from '~/ui/typography'

export default function ProjectsModule({status, projects}: {status: ProjectStatus; projects: PaginatedDocs<Project>}) {
  const [view, setView] = useState<'grid' | 'slider'>('slider')
  const [visibleCount, setVisibleCount] = useState(9)

  const projectsData = projects.docs.filter((project) => project.status === status)
  const visibleProjects = projectsData.slice(0, visibleCount)
  const hasMore = projectsData.length > visibleCount

  const displayProjects = status === 'implementation' && view === 'slider' ? projectsData : visibleProjects

  const projectTags = decomposeProjectTags(projects.docs.map((p) => p.tags))

  return (
    <section data-section="projects-index" className={cn(BOX, 'space-y-6 sm:space-y-5')}>
      <div data-module="headline-projects" className="flex items-center justify-between">
        <H1 className="text-foreground-light">{status === 'implementation' ? 'Проекты в реализации' : 'Свободные сценарии'}</H1>

        <div className="flex items-center gap-3.5">
          {(status === 'free_scripts' || view === 'grid') && <Button>Фильтры</Button>}

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
        <ProjectsSlider projects={displayProjects} /> // only for implementation
      ) : (
        <>
          <ProjectsGrid projects={displayProjects} tags={projectTags} />

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
function ProjectsGrid({projects, tags}: {projects: Project[]; tags: {mode: string[]; format: string[]; genre: string[]; audience: string[]}[]}) {
  const projectFirstTags = tags.map((p) => [p.mode[0], p.audience[0]].filter(Boolean))

  return (
    <div data-module="grid-projects" className="grid grid-cols-3 sm:grid-cols-1 gap-4 xl:gap-3 sm:gap-2.5">
      {projects.map((project, index) => (
        <div data-item="card-grid-projects" className={cn('relative', 'bg-gray-dark rounded-[10px] overflow-hidden', 'group')} key={project.id}>
          <div className={cn('absolute z-50 inset-0 size-full', 'flex items-end')}>
            <div className={cn('w-full p-5 xl:p-4 sm:p-3', 'space-y-1 sm:space-y-1.25', 'bg-linear-to-t from-gray-dark via-gray-dark/80 to-transparent')}>
              <H3 className="pt-10 line-clamp-1">{project.title}</H3>

              <div className={cn('flex flex-wrap gap-2.5', 'divide-x divide-gray-medium')}>
                {project.details.screenwriter && <SPAN className={cn('pr-2.5 last:pr-0', 'text-foreground-light')}>{project.details.screenwriter}</SPAN>}

                {projectFirstTags[index].map((tag, tagIndex) => (
                  <SPAN className={cn('pr-2.5 last:pr-0', 'text-foreground-light')} key={tagIndex}>
                    {tag}
                  </SPAN>
                ))}
              </div>
            </div>
          </div>

          <PayloadImage className={cn('size-full object-contain', 'group-hover:scale-[1.02] duration-400')} resource={project.poster} />
        </div>
      ))}
    </div>
  )
}

function ProjectsSlider({projects}: {projects: Project[]}) {
  return (
    <div data-module="slider-projects" className="w-full">
      <div className="text-center text-gray-500 py-8">Слайдер в разработке ({projects.length})</div>
    </div>
  )
}
