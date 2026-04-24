import { useRef } from 'react'
import type { TouchEvent } from 'react'

type SwipeDirection = 'left' | 'right'

interface SwipeHandlers {
  onTouchStart: (e: TouchEvent) => void
  onTouchEnd: (e: TouchEvent) => void
}

export function useSwipe(onSwipe: (dir: SwipeDirection) => void): SwipeHandlers {
  const startX = useRef<number | null>(null)

  function onTouchStart(e: TouchEvent) {
    startX.current = e.touches[0].clientX
  }

  function onTouchEnd(e: TouchEvent) {
    if (startX.current === null) return
    const delta = e.changedTouches[0].clientX - startX.current
    startX.current = null
    if (Math.abs(delta) > 50) {
      onSwipe(delta < 0 ? 'left' : 'right')
    }
  }

  return { onTouchStart, onTouchEnd }
}
