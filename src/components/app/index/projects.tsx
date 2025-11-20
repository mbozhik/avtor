import type {Project} from '@payload-types'
import {BOX} from '~/global/container'

import {payload} from '@/lib/payload'
import {cn} from '@/lib/utils'

import {Suspense} from 'react'

export type ProjectStatus = Project['status']

import ProjectsModule from '~~/index/projects-module'
import {Skeleton} from '~/ui/skeleton'

export default async function Projects({status}: {status: ProjectStatus}) {
  const projects = await payload.find({
    collection: 'projects',
    sort: 'createdAt',
  })

  const tags = await payload.find({
    collection: 'tags',
  })

  return (
    <>
      <Suspense
        fallback={
          <div className={cn(BOX, 'grid grid-cols-3 sm:grid-cols-1 gap-4 xl:gap-3 sm:gap-2.5')}>
            {Array.from({length: 3}).map((_, i) => (
              <Skeleton className="aspect-3/2 w-full" key={i} />
            ))}
          </div>
        }
      >
        <ProjectsModule status={status} projects={projects} tags={tags} />
      </Suspense>
    </>
  )
}
