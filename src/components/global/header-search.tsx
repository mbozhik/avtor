'use client'

import {Search} from 'lucide-react'

import type {PaginatedDocs} from 'payload'
import type {Project} from '@payload-types'

import {decomposeProjectTags} from '@/utils/decompose-relationship'
import {cn} from '@/lib/utils'

import {useState, useMemo} from 'react'
import {redirect} from 'next/navigation'

import {CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from '~/ui/command'
import {P, SPAN} from '~/ui/typography'

export default function HeaderSearch({projects}: {projects: PaginatedDocs<Project>}) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Разбираем теги проектов для поиска
  const projectTags = decomposeProjectTags(projects.docs.map((p) => p.tags))

  // Создаем индекс для поиска
  const searchItems = useMemo(() => {
    return projects.docs.map((project, idx) => {
      const tags = projectTags[idx]
      const descriptionText = project.details.description.map((d) => d.item).join(' ')

      return {
        id: project.id,
        title: project.title,
        screenwriter: project.details.screenwriter,
        year: project.details.year.toString(),
        tags: {
          mode: tags.mode,
          format: tags.format,
          genre: tags.genre,
          audience: tags.audience,
        },
        status: project.status,
        slug: project.slug,
        // Для поиска объединяем все текстовые поля
        searchText: [project.title, descriptionText, project.details.screenwriter, project.details.year.toString(), ...tags.mode, ...tags.format, ...tags.genre, ...tags.audience].join(' ').toLowerCase(),
      }
    })
  }, [projects.docs, projectTags])

  // Фильтруем проекты по поисковому запросу
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return searchItems
    }

    const query = searchQuery.toLowerCase().trim()

    return searchItems.filter((item) => item.searchText.includes(query))
  }, [searchItems, searchQuery])

  return (
    <>
      <Search className={cn('size-6 sm:size-5', 'hover:scale-[1.1] duration-300 cursor-pointer')} onClick={() => setOpen(true)} />

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Поиск проектов..." value={searchQuery} onValueChange={setSearchQuery} />
        <CommandList>
          <CommandEmpty>Ничего не найдено.</CommandEmpty>

          {filteredItems.length > 0 && (
            <CommandGroup>
              {filteredItems.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => {
                    redirect(`/?project=${item.slug}`)
                    setOpen(false)
                  }}
                >
                  <div className="flex flex-col gap-0.5 cursor-pointer group">
                    <P className="font-semibold">{item.title}</P>
                    <SPAN className="text-foreground-light group-hover:text-foreground">
                      {item.screenwriter} • {item.year}
                    </SPAN>
                    <SPAN className="text-foreground-dark group-hover:text-foreground">{(item.tags.mode.length > 0 || item.tags.genre.length > 0) && [...item.tags.mode.slice(0, 1), ...item.tags.genre.slice(0, 2)].join(', ')}</SPAN>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
