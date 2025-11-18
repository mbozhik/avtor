'use client'

import type {PaginatedDocs} from 'payload'
import type {Project} from '@payload-types'
import type {ProjectStatus} from '~~/index/projects'
import {BOX} from '~/global/container'

import {cn} from '@/lib/utils'
import {decomposeProjectTags} from '@/utils/decompose-relationship'

import PayloadImage from '~/ui/payload-image'
import {H1, H3, SPAN} from '~/ui/typography'

export default function ProjectsModule({status, data}: {status: ProjectStatus; data: PaginatedDocs<Project>}) {
  const projects = data.docs.filter((project) => project.status === status)

  const projectTags = decomposeProjectTags(projects.map((p) => p.tags))
  const projectFirstTags = projectTags.map((p) => [p.mode[0], p.audience[0]].filter(Boolean))

  return (
    <section data-section="projects-index" className={cn(BOX, 'space-y-6 sm:space-y-5')}>
      <div data-module="headline-projects">
        <H1 className="text-foreground-light">{status === 'implementation' ? 'Проекты в реализации' : 'Свободные сценарии'}</H1>
      </div>

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
    </section>
  )
}
