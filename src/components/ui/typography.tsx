'use client'

import {cn} from '@/lib/utils'
import {useMediaQuery} from '@/hooks/use-media-query'

import React from 'react'
import {AnimatePresence, motion, useInView} from 'motion/react'

type Props = {
  type: TypoTypes
  className?: string
  children: React.ReactNode
  animated?: boolean
  by?: 'word' | 'line'
  offset?: number
}

type MotionElementType = {[K in TypoTypes]: (typeof motion)[K]}[TypoTypes]
export type TypoTypes = keyof typeof TYPO_CLASSES

export const TYPO_CLASSES = {
  h1: cn('text-5xl xl:text-4xl sm:text-2xl', 'leading-[1.1]!', 'font-semibold'),
  h3: cn('text-2xl sm:text-xl', 'leading-[1.1]!', 'font-semibold'),
  h4: cn('text-xl sm:text-lg', 'leading-[1.1]!', 'font-medium'),
  p: cn('text-base sm:text-sm', 'leading-[1.3]!'),
  span: cn('text-sm sm:text-xs', 'leading-[1.3]!'),
} as const

export const H1 = createTypography('h1')
export const H3 = createTypography('h3')
export const H4 = createTypography('h4')
export const P = createTypography('p')
export const SPAN = createTypography('span')

export const CONFIG = {
  animations: {
    durations: {
      default: 0.4,
      word: 0.2,
    },
    staggers: {
      default: 0.2,
      word: 0.1,
    },
  },
  offsets: {
    desktop: 100,
    mobile: 25,
  },
} as const

const VARIANTS = {
  item: {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: (duration: number) => ({
      opacity: 1,
      y: 0,
      transition: {duration},
    }),
  },
  container: {
    hidden: {opacity: 0},
    visible: (stagger: number) => ({
      opacity: 1,
      transition: {staggerChildren: stagger},
    }),
  },
} as const

const VARIANT_CONFIGS = {
  default: {
    item: {
      ...VARIANTS.item,
      visible: VARIANTS.item.visible(CONFIG.animations.durations.default),
    },
    container: {
      ...VARIANTS.container,
      visible: VARIANTS.container.visible(CONFIG.animations.staggers.default),
    },
  },
  word: {
    item: {
      ...VARIANTS.item,
      visible: VARIANTS.item.visible(CONFIG.animations.durations.word),
    },
    container: {
      ...VARIANTS.container,
      visible: VARIANTS.container.visible(CONFIG.animations.staggers.word),
    },
  },
} as const

const {
  default: {item: defaultVariants, container: containerVariants},
  word: {item: wordVariants, container: wordContainerVariants},
} = VARIANT_CONFIGS

function Typography({type, className, children, animated = true, by = 'line', offset, ...props}: Props) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const offsetValue = offset ?? (isDesktop ? CONFIG.offsets.desktop : CONFIG.offsets.mobile)

  const Element = type
  const ref = React.useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: `${-offsetValue}px 0px`,
  })

  if (!animated) {
    return (
      <Element className={cn(TYPO_CLASSES[type], className)} {...props}>
        {children}
      </Element>
    )
  }

  const MotionElement = motion[type] as MotionElementType

  if (by === 'word') {
    const processContent = (child: React.ReactNode): React.ReactNode[] => {
      if (typeof child === 'string') {
        return child.split(/(\s+)/).map((part) => part)
      }
      if (React.isValidElement(child)) {
        return [child]
      }
      return []
    }

    const content = React.Children.toArray(children).flatMap(processContent)

    return (
      <AnimatePresence mode="wait">
        <MotionElement
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={wordContainerVariants} // Use word-specific container variants
          className={cn(TYPO_CLASSES[type], className)}
        >
          {content.map((segment, index) => {
            if (React.isValidElement(segment)) {
              return segment
            }
            return (
              <span key={`word-${index}`} className="inline-block overflow-hidden">
                <motion.span variants={wordVariants} className="block whitespace-pre">
                  {segment}
                </motion.span>
              </span>
            )
          })}
        </MotionElement>
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <MotionElement
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'} // trigger when in view
        variants={containerVariants}
        className={cn(TYPO_CLASSES[type], className)}
      >
        <span className="block overflow-hidden">
          <motion.span variants={defaultVariants} className="block">
            {children}
          </motion.span>
        </span>
      </MotionElement>
    </AnimatePresence>
  )
}

function createTypography(type: TypoTypes) {
  const Component = ({className, children, animated, by, offset, ...props}: Omit<Props, 'type'>) => (
    <Typography type={type} className={className} animated={animated} by={by} offset={offset} {...props}>
      {children}
    </Typography>
  )
  Component.displayName = `Typography(${type.toUpperCase()})`
  return Component
}
