'use client'

import type {StaticImageData} from 'next/image'
import type {Media as MediaType} from '@payload-types'

import {cn} from '@/lib/utils'
import {decomposeMedia} from '@/utils/decompose-relationship'

import Image from 'next/image'

interface Props {
  alt?: string
  width?: number
  height?: number
  className?: string
  fallbackText?: string
  fallbackClassName?: string
  priority?: boolean
  quality?: number
  sizes?: string
  style?: React.CSSProperties
  fill?: boolean // for NextImage only
  onClick?: () => void
  onLoad?: () => void
  loading?: 'lazy' | 'eager' // for NextImage only
  resource?: MediaType | string | null | undefined // for Payload media
  size?: string // for NextImage only
  src?: StaticImageData | string // for static media or direct URLs
}

export default function PayloadImage({src, alt, width = 100, height = 100, className, fallbackText = 'No Image', fallbackClassName, priority = false, quality = 100, sizes, style, fill, onClick, onLoad, loading, resource, size}: Props) {
  // Define the image source
  let imageSrc: string | StaticImageData = src || ''
  let imageAlt = alt || ''
  let imageWidth = width
  let imageHeight = height

  // If resource is passed (PayloadCMS Media object), decompose it
  if (resource) {
    const mediaData = decomposeMedia(resource)
    imageSrc = mediaData.url || ''
    imageAlt = alt || mediaData.alt || ''
    imageWidth = mediaData.width || width
    imageHeight = mediaData.height || height
  }

  // If there is no image source
  if (!imageSrc) {
    return (
      <div className={cn('bg-gray flex items-center justify-center text-gray-400 text-sm', fallbackClassName)} style={{width: imageWidth, height: imageHeight}} onClick={onClick}>
        {fallbackText}
      </div>
    )
  }

  const loadingValue = loading || (!priority ? 'lazy' : undefined)

  // Generate responsive sizes if not passed
  const responsiveSizes = sizes || size || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'

  return <Image alt={imageAlt} className={cn(className)} fill={fill} height={!fill ? imageHeight : undefined} priority={priority} quality={quality} loading={loadingValue} sizes={responsiveSizes} src={imageSrc} width={!fill ? imageWidth : undefined} style={style} onLoad={onLoad} onClick={onClick} />
}
