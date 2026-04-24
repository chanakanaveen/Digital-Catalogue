import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { touchActivity } from '../lib/activityTracker'
import { useAppStore } from '../store/appStore'

const TIMEOUT_MS = 10 * 60 * 1000 // 10 minutes

export function useInactivityTimer(enabled: boolean): void {
  const navigate = useNavigate()
  const clearSession = useAppStore((s) => s.clearSession)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!enabled) return

    function reset() {
      touchActivity()
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        clearSession()
        navigate('/', { replace: true })
      }, TIMEOUT_MS)
    }

    const events = ['touchstart', 'click', 'scroll', 'keydown'] as const
    events.forEach((e) => document.addEventListener(e, reset, { passive: true }))
    reset() // start the timer on mount

    return () => {
      events.forEach((e) => document.removeEventListener(e, reset))
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [enabled, navigate, clearSession])
}
