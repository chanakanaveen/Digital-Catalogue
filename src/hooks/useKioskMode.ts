import { useEffect, useCallback } from 'react'

interface KioskMode {
  toggleFullscreen: () => void
}

export function useKioskMode(): KioskMode {
  useEffect(() => {
    function preventContext(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
        e.preventDefault()
      }
    }
    function preventSelect(e: Event) {
      const target = e.target as HTMLElement
      if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
        e.preventDefault()
      }
    }

    document.addEventListener('contextmenu', preventContext)
    document.addEventListener('selectstart', preventSelect)
    return () => {
      document.removeEventListener('contextmenu', preventContext)
      document.removeEventListener('selectstart', preventSelect)
    }
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }, [])

  return { toggleFullscreen }
}
