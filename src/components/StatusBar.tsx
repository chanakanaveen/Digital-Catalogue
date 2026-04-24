import { useState, useEffect } from 'react'

function getTimeString(): string {
  const now = new Date()
  return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
}

function getDateString(): string {
  return new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })
}

export function StatusBar() {
  const [time, setTime] = useState(getTimeString)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeString()), 60_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex h-6 items-center justify-between bg-slate-900 px-4 text-[10px] text-white/70 select-none">
      <span>
        {time} &nbsp;·&nbsp; {getDateString()}
      </span>
      <div className="flex items-center gap-2">
        {/* Wi-Fi icon */}
        <svg width="14" height="11" viewBox="0 0 20 15" fill="currentColor" aria-hidden>
          <path d="M10 12a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0-5a7 7 0 0 1 5.19 2.3l-1.42 1.41A5 5 0 0 0 10 9a5 5 0 0 0-3.77 1.71L4.81 9.3A7 7 0 0 1 10 7zm0-5a12 12 0 0 1 8.66 3.64L17.24 7.06A10 10 0 0 0 10 4a10 10 0 0 0-7.24 3.06L1.34 5.64A12 12 0 0 1 10 2z" />
        </svg>
        {/* Battery icon */}
        <svg width="18" height="11" viewBox="0 0 24 12" fill="currentColor" aria-hidden>
          <rect x="0" y="1" width="20" height="10" rx="2" ry="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <rect x="1.5" y="2.5" width="17" height="7" rx="1" fill="currentColor" opacity="0.9" />
          <rect x="20" y="4" width="4" height="4" rx="1" fill="currentColor" opacity="0.5" />
        </svg>
        <span>100%</span>
      </div>
    </div>
  )
}
