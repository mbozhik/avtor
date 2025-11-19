import type {Project, Media} from '@payload-types'

type ProjectTags = Project['tags']
type SingleTag = ProjectTags['mode'] | ProjectTags['format']
type MultiTag = ProjectTags['genre'] | ProjectTags['audience']
export type ProjectTagsType = keyof ProjectTags

export function decomposeProjectTags(tags: ProjectTags[]) {
  const getTagValue = (tag: SingleTag): string => {
    if (!tag) return ''
    return typeof tag === 'string' ? tag : tag.name
  }

  const getTagArray = (input: SingleTag | MultiTag): string[] => {
    if (Array.isArray(input)) return input.map(getTagValue)
    return input ? [getTagValue(input)] : []
  }

  return tags.map((tag) => ({
    mode: getTagArray(tag.mode),
    format: getTagArray(tag.format),
    genre: getTagArray(tag.genre),
    audience: getTagArray(tag.audience),
  }))
}

export function decomposeMedia(media: string | Media | null | undefined) {
  //  If media is not provided or empty
  if (!media) {
    return {
      url: null,
      alt: '',
      width: null,
      height: null,
      filename: null,
      mimeType: null,
      filesize: null,
    }
  }

  // If media is a string (direct URL)
  if (typeof media === 'string') {
    return {
      url: media,
      alt: '',
      width: null,
      height: null,
      filename: null,
      mimeType: null,
      filesize: null,
    }
  }

  // If media is a Media object from PayloadCMS
  return {
    url: media.url || null,
    alt: media.alt || '',
    width: media.width || null,
    height: media.height || null,
    filename: media.filename || null,
    mimeType: media.mimeType || null,
    filesize: media.filesize || null,
  }
}
