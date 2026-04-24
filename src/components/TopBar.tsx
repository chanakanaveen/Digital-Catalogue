import { useAppStore } from '../store/appStore'
import { useSessionTimer } from '../hooks/useSessionTimer'

interface TopBarProps {
  onFullscreen?: () => void
}

export function TopBar({ onFullscreen }: TopBarProps) {
  const mode = useAppStore((s) => s.mode)
  const companyName = useAppStore((s) => s.companyName)
  const customerName = useAppStore((s) => s.customerName)
  const selectionCount = useAppStore((s) => s.selectionCount)
  const timer = useSessionTimer()

  return (
    <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-2 shadow-sm select-none">
      {/* Left: company info */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800 leading-tight">{companyName || 'No Company'}</p>
          <p className="text-xs text-slate-400 leading-tight">{customerName || 'Customer'}</p>
        </div>
      </div>

      {/* Right: badges + timer + chip + fullscreen */}
      <div className="flex items-center gap-3">
        {/* Mode badge */}
        {mode === 'qr' ? (
          <span className="rounded-md bg-blue-500 px-3 py-1 text-xs font-bold text-white tracking-wide">
            QR MODE
          </span>
        ) : mode === 'manual' ? (
          <span className="rounded-md bg-slate-500 px-3 py-1 text-xs font-bold text-white tracking-wide">
            MANUAL
          </span>
        ) : null}

        {/* Session countdown */}
        <div className="text-center">
          <p className="text-base font-semibold tabular-nums text-slate-700">{timer}</p>
          <p className="text-[10px] text-slate-400 leading-none">Session Remaining</p>
        </div>

        {/* Selection chip */}
        {selectionCount > 0 && (
          <div className="flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1">
            <span className="text-xs text-slate-600">Selected Items</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[11px] font-bold text-white">
              {selectionCount}
            </span>
          </div>
        )}

        {/* Fullscreen toggle */}
        {onFullscreen && (
          <button
            onClick={onFullscreen}
            className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100 active:scale-95"
            title="Toggle Fullscreen"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
