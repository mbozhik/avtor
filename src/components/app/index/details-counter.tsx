'use client'

import {cn} from '@/lib/utils'

import {useEffect, useMemo, useRef, useState} from 'react'
import {MotionValue, motion, useInView, useSpring, useTransform} from 'motion/react'

const fontSize = 1 // em
const padding = 0
const height = fontSize + padding

export default function AnimatedCounter({value}: {value: number}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {once: true, margin: '-100px'})
  const [isAnimating, setIsAnimating] = useState(false)

  // Генерируем случайные значения только один раз при появлении в viewport
  const animationParams = useMemo(() => {
    if (!isInView) return null

    const tensRandomTarget = Math.floor(Math.random() * 8) + 2 // 2-9 для десятков
    const onesRandomTarget = Math.floor(Math.random() * 8) + 2 // 2-9 для единиц
    let adjustedOnesRandomTarget = onesRandomTarget

    // Гарантируем, что десятки и единицы не имеют одинаковые значения
    if (adjustedOnesRandomTarget === tensRandomTarget) {
      adjustedOnesRandomTarget = (onesRandomTarget % 8) + 2 // Сдвигаем на 1 если совпадает
    }

    const tensRandomDelay = Math.floor(Math.random() * 1200) + 800 // 800-1800ms для десятков
    const onesRandomDelay = Math.floor(Math.random() * 1200) + 800 // 800-1800ms для единиц
    const maxDelay = Math.max(tensRandomDelay, onesRandomDelay)

    return {
      tensRandomTarget,
      onesRandomTarget: adjustedOnesRandomTarget,
      tensRandomDelay,
      onesRandomDelay,
      maxDelay,
    }
  }, [isInView])

  useEffect(() => {
    if (isInView && animationParams) {
      // Задержка 500ms перед запуском всей анимации
      const startTimer = setTimeout(() => {
        setIsAnimating(true) // Начинаем анимацию - меняем цвет

        // Через максимальную задержку + буфер заканчиваем анимацию
        const endTimer = setTimeout(() => {
          setIsAnimating(false) // Анимация закончилась - возвращаем цвет
        }, animationParams.maxDelay + 300)

        return () => clearTimeout(endTimer)
      }, 500)

      return () => clearTimeout(startTimer)
    }
  }, [isInView, animationParams])

  return (
    <div ref={ref} className={cn('relative overflow-hidden', 'grid place-items-center', 'text-[210px] xl:text-[160px] sm:text-[130px] leading-none! tracking-[-0.055em] font-semibold', isAnimating ? 'text-foreground' : 'text-gray-medium', 'group-hover:text-foreground', 'transition-colors duration-500')}>
      <div className={cn('px-0 pr-2.5 sm:pr-1.5 -mb-6 sm:-mb-4', 'flex space-x-3', 'leading-none rounded overflow-hidden')}>
        <Digit place={10} value={value} isInView={isInView} randomTarget={animationParams?.tensRandomTarget || 4} randomDelay={animationParams?.tensRandomDelay || 800} />
        <Digit place={1} value={value} isInView={isInView} randomTarget={animationParams?.onesRandomTarget || 8} randomDelay={animationParams?.onesRandomDelay || 1200} />
      </div>
    </div>
  )
}

function Digit({place, value, isInView, randomTarget, randomDelay}: {place: number; value: number; isInView: boolean; randomTarget: number; randomDelay: number}) {
  const valueRoundedToPlace = Math.floor(value / place)
  const animatedValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
  })

  useEffect(() => {
    if (isInView) {
      // Задержка 500ms перед запуском анимации
      const timer = setTimeout(() => {
        // Всегда делаем эффектную анимацию: сначала к случайному числу, потом к целевому
        animatedValue.set(randomTarget)
        setTimeout(() => {
          animatedValue.set(valueRoundedToPlace) // Потом к целевому значению
        }, randomDelay)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [animatedValue, valueRoundedToPlace, isInView, randomTarget, randomDelay])

  return (
    <div style={{height: `${height}em`}} className="relative w-[0.5em] tabular-nums">
      {[...Array(10).keys()].map((i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  )
}

function Number({mv, number}: {mv: MotionValue; number: number}) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10
    const offset = (10 + number - placeValue) % 10

    let memo = offset * height

    if (offset > 5) {
      memo -= 10 * height
    }

    return `${memo}em`
  })

  return (
    <motion.span style={{y}} className="absolute inset-0 flex items-center justify-center">
      {number}
    </motion.span>
  )
}
