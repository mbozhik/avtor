'use client'

import {useRouter, useSearchParams} from 'next/navigation'
import {useCallback, useEffect, useState} from 'react'

export function useProjectDialog() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  // Получаем текущий slug проекта из URL
  const currentProjectSlug = searchParams.get('project')

  // Эффект для синхронизации состояния модалки с URL
  useEffect(() => {
    setIsOpen(!!currentProjectSlug)
  }, [currentProjectSlug])

  // Функция для открытия модалки с конкретным проектом
  const openProjectDialog = useCallback(
    (projectSlug: string) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      newSearchParams.set('project', projectSlug)
      router.push(`?${newSearchParams.toString()}`, {scroll: false})
    },
    [router, searchParams],
  )

  // Функция для закрытия модалки
  const closeProjectDialog = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.delete('project')
    router.push(`?${newSearchParams.toString()}`, {scroll: false})
  }, [router, searchParams])

  // Функция для замены URL без навигации (для закрытия через ESC или клик вне)
  const replaceProjectDialog = useCallback(
    (projectSlug: string | null) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      if (projectSlug) {
        newSearchParams.set('project', projectSlug)
      } else {
        newSearchParams.delete('project')
      }
      router.replace(`?${newSearchParams.toString()}`, {scroll: false})
    },
    [router, searchParams],
  )

  return {
    isOpen,
    currentProjectSlug,
    openProjectDialog,
    closeProjectDialog,
    replaceProjectDialog,
  }
}
