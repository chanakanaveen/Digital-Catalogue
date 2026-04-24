import { useEffect } from 'react'

interface ToastProps {
  visible: boolean
  onDismiss: () => void
}

export function Toast({ visible, onDismiss }: ToastProps) {
  useEffect(() => {
    if (!visible) return
    const id = setTimeout(onDismiss, 2000)
    return () => clearTimeout(id)
  }, [visible, onDismiss])

  if (!visible) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-8 z-50 flex justify-center px-4">
      <div className="pointer-events-auto flex items-center gap-3 rounded-xl bg-green-500 px-5 py-3 shadow-xl">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" aria-hidden>
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span className="text-sm font-semibold text-white">Added to selection</span>
        <button
          onClick={onDismiss}
          className="ml-1 rounded-full p-1 text-white/70 transition hover:text-white"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  )
}
