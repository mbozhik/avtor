import type {Project} from '@payload-types'

import {payload} from '@/lib/payload'

export type ProjectStatus = Project['status']

import ProjectsModule from '~~/index/projects-module'

export default async function Projects({status}: {status: ProjectStatus}) {
  const projects = await payload.find({
    collection: 'projects',
    sort: 'createdAt',
  })

  return <ProjectsModule status={status} data={projects} />
}
