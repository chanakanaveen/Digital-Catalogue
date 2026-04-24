import { useState, useEffect } from 'react'
import { getLastActivity } from '../lib/activityTracker'

const TIMEOUT_MS = 10 * 60 * 1000 // 10 minutes

export function useSessionTimer(): string {
  const [remaining, setRemaining] = useState(TIMEOUT_MS)

  useEffect(() => {
    const id = setInterval(() => {
      const elapsed = Date.now() - getLastActivity()
      setRemaining(Math.max(0, TIMEOUT_MS - elapsed))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const totalSeconds = Math.floor(remaining / 1000)
  const mm = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
  const ss = String(totalSeconds % 60).padStart(2, '0')
  return `${mm}:${ss}`
}
