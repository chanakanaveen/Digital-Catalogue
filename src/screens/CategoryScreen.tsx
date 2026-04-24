import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/appStore'
import { StatusBar } from '../components/StatusBar'
import { TopBar } from '../components/TopBar'
import { useInactivityTimer } from '../hooks/useInactivityTimer'
import { useKioskMode } from '../hooks/useKioskMode'
import { sampleCategories } from '../data/sampleData'
import type { Category } from '../data/sampleData'

type LoadState = 'loading' | 'loaded' | 'error'

export function CategoryScreen() {
  const navigate = useNavigate()
  const sessionId = useAppStore((s) => s.sessionId)
  const { toggleFullscreen } = useKioskMode()
  useInactivityTimer(!!sessionId)

  const [loadState, setLoadState] = useState<LoadState>('loading')
  const [categories, setCategories] = useState<Category[]>([])

  const load = useCallback(() => {
    setLoadState('loading')
    setCategories([])
    // Simulate API fetch
    const t = setTimeout(() => {
      // Uncomment the next line to test the error state:
      // setLoadState('error'); return
      setCategories(sampleCategories)
      setLoadState('loaded')
    }, 900)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!sessionId) {
      navigate('/', { replace: true })
      return
    }
    return load()
  }, [sessionId, navigate, load])

  const skeletons = Array.from({ length: 9 })

  return (
    <div className="flex h-screen flex-col bg-slate-50">
      <StatusBar />
      <TopBar onFullscreen={toggleFullscreen} />

      <main className="flex flex-1 flex-col overflow-hidden p-5">
        {loadState === 'loading' && (
          <div className="grid flex-1 grid-cols-3 gap-4">
            {skeletons.map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-slate-200 bg-slate-200"
              />
            ))}
          </div>
        )}

        {loadState === 'error' && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <span className="text-5xl">📶</span>
            <p className="text-base font-semibold text-slate-700">Unable to load data.</p>
            <p className="text-sm text-slate-500">Please check your connection.</p>
            <button
              onClick={load}
              className="rounded-xl bg-blue-500 px-8 py-3 text-sm font-semibold text-white shadow transition hover:bg-blue-600 active:scale-95"
            >
              Retry
            </button>
          </div>
        )}

        {loadState === 'loaded' && categories.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <span className="text-5xl">📦</span>
            <p className="text-base font-semibold text-slate-700">No categories available.</p>
            <p className="text-sm text-slate-500">Please check back later.</p>
            <button
              onClick={load}
              className="rounded-xl bg-blue-500 px-8 py-3 text-sm font-semibold text-white shadow transition hover:bg-blue-600 active:scale-95"
            >
              Retry
            </button>
          </div>
        )}

        {loadState === 'loaded' && categories.length > 0 && (
          <div className="grid flex-1 grid-cols-3 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(`/catalogue/${cat.id}`)}
                className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:shadow-md active:scale-95"
              >
                <span className="text-5xl leading-none select-none">{cat.emoji}</span>
                <span className="text-sm font-semibold text-slate-700">{cat.name}</span>
              </button>
            ))}
          </div>
        )}
      </main>

      <footer className="py-2 text-center text-[11px] text-slate-400 select-none">
        Version 1.4.0
      </footer>
    </div>
  )
}
