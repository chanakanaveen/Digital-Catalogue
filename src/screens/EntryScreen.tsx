import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { useAppStore } from '../store/appStore'
import { StatusBar } from '../components/StatusBar'
import { VALID_COMPANY_CODES } from '../data/sampleData'

export function EntryScreen() {
  const navigate = useNavigate()
  const tabletToken = useAppStore((s) => s.tabletToken)
  const setSession = useAppStore((s) => s.setSession)

  const [companyCode, setCompanyCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleStartSession(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const key = companyCode.trim().toUpperCase()
    const companyName = VALID_COMPANY_CODES[key]
    if (!companyName) {
      setError('Invalid company code. Please try again.')
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800)) // simulate API
    setSession({
      sessionId: 'session-' + Date.now(),
      mode: 'manual',
      companyName,
    })
    navigate('/categories')
  }

  function handleQRScan() {
    setSession({
      sessionId: 'session-qr-' + Date.now(),
      mode: 'qr',
      companyName: 'Acme Corporation',
      customerName: 'Customer',
    })
    navigate('/categories')
  }

  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <StatusBar />

      <main className="flex flex-1 flex-col items-center justify-center px-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800">Welcome to Our Catalogue</h1>
          <p className="mt-1 text-sm text-slate-500">Choose a way to start</p>
        </div>

        {/* Two cards */}
        <div className="flex w-full max-w-2xl gap-5">

          {/* QR card */}
          <div className="flex flex-1 flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
            <div className="flex items-center gap-2 text-blue-500">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" /><rect x="14" y="17" width="3" height="3" />
                <path d="M14 14h3M20 14v3M20 20h-3" />
              </svg>
              <span className="text-sm font-semibold">QR Code</span>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <QRCodeSVG value={tabletToken} size={160} level="M" />
            </div>

            <p className="text-center text-xs text-slate-500">Scan with SFA app to begin</p>

            <button
              onClick={handleQRScan}
              className="w-full rounded-xl bg-slate-800 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 active:scale-95"
            >
              Simulate QR Scan
            </button>

            <p className="flex items-center gap-1 text-[10px] text-slate-400">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-4.5" />
              </svg>
              Token refreshes in 00:45
            </p>
          </div>

          {/* Manual card */}
          <div className="flex flex-1 flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
            <div className="flex items-center gap-2 text-blue-500">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              <span className="text-sm font-semibold">Manual Entry</span>
            </div>

            <form onSubmit={handleStartSession} className="flex flex-1 flex-col gap-3">
              <div>
                <label className="mb-1 block text-xs text-slate-500">Enter Company Code</label>
                <input
                  value={companyCode}
                  onChange={(e) => {
                    setCompanyCode(e.target.value)
                    setError('')
                  }}
                  placeholder="e.g. ACME2025"
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
                />
                {error && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !companyCode.trim()}
                className="mt-auto w-full rounded-xl bg-blue-500 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-600 active:scale-95 disabled:opacity-50"
              >
                {loading ? 'Starting…' : 'Start Session'}
              </button>
            </form>

            <p className="text-center text-[10px] text-slate-400">
              Demo codes: ACME2025 · DEMO · TEST · SALES
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-3 text-center text-[11px] text-slate-400 select-none">
        © 2025 Your Company Name &nbsp;|&nbsp; Powering Growth Together
      </footer>
    </div>
  )
}
