import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useAppStore } from '../store/appStore'
import { StatusBar } from '../components/StatusBar'
import { TopBar } from '../components/TopBar'
import { Toast } from '../components/Toast'
import { PriceDisplay } from '../components/PriceDisplay'
import { MoreInfoModal } from '../components/MoreInfoModal'
import { useInactivityTimer } from '../hooks/useInactivityTimer'
import { useKioskMode } from '../hooks/useKioskMode'
import { useSwipe } from '../hooks/useSwipe'
import { sampleCategories, sampleProducts } from '../data/sampleData'

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

// Gradient backgrounds for each category — purely decorative
const CATEGORY_GRADIENTS: Record<string, string> = {
  '1': 'from-blue-50 to-cyan-50',
  '2': 'from-orange-50 to-amber-50',
  '3': 'from-yellow-50 to-lime-50',
  '4': 'from-pink-50 to-rose-50',
  '5': 'from-green-50 to-emerald-50',
  '6': 'from-purple-50 to-violet-50',
  '7': 'from-red-50 to-pink-50',
  '8': 'from-amber-50 to-yellow-50',
  '9': 'from-slate-50 to-gray-50',
}

export function CatalogueScreen() {
  const { categoryId = '1' } = useParams<{ categoryId: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const sessionId = useAppStore((s) => s.sessionId)
  const mode = useAppStore((s) => s.mode)
  const addSelection = useAppStore((s) => s.addSelection)
  const { toggleFullscreen } = useKioskMode()
  useInactivityTimer(!!sessionId)

  const products = sampleProducts[categoryId] ?? []
  const category = sampleCategories.find((c) => c.id === categoryId)

  const rawIdx = parseInt(searchParams.get('item') ?? '0', 10)
  const currentIdx = products.length > 0 ? clamp(rawIdx, 0, products.length - 1) : 0
  const product = products[currentIdx]

  const [showModal, setShowModal] = useState(false)
  const [toast, setToast] = useState(false)
  const addingRef = useRef(false)

  // Guard: no session → entry
  useEffect(() => {
    if (!sessionId) navigate('/', { replace: true })
  }, [sessionId, navigate])

  // Reset modal when item changes
  useEffect(() => {
    setShowModal(false)
  }, [currentIdx, categoryId])

  const goTo = useCallback(
    (n: number) => {
      const next = clamp(n, 0, Math.max(0, products.length - 1))
      setSearchParams({ item: String(next) }, { replace: true })
    },
    [products.length, setSearchParams],
  )

  const goNext = useCallback(() => goTo(currentIdx + 1), [currentIdx, goTo])
  const goPrev = useCallback(() => goTo(currentIdx - 1), [currentIdx, goTo])

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  // Swipe
  const swipeHandlers = useSwipe((dir) => {
    if (dir === 'left') goNext()
    else goPrev()
  })

  // Debounced add to selection (300ms)
  function handleAddToSelection() {
    if (!product || addingRef.current) return
    addingRef.current = true
    addSelection(product.id)
    setToast(true)
    setTimeout(() => {
      addingRef.current = false
    }, 300)
  }

  // Empty category state
  if (products.length === 0) {
    return (
      <div className="flex h-screen flex-col bg-slate-50">
        <StatusBar />
        <TopBar onFullscreen={toggleFullscreen} />
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
          <span className="text-6xl">{category?.emoji ?? '📦'}</span>
          <p className="text-lg font-semibold text-slate-700">No products in {category?.name ?? 'this category'}.</p>
          <button
            onClick={() => navigate('/categories')}
            className="rounded-xl border border-blue-300 px-6 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 active:scale-95"
          >
            ← Back to Categories
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-white select-none">
      <StatusBar />
      <TopBar onFullscreen={toggleFullscreen} />

      {/* Nav bar */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 active:scale-95"
          >
            🏠 Home
          </button>
          <select
            value={categoryId}
            onChange={(e) => navigate(`/catalogue/${e.target.value}?item=0`)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 outline-none transition hover:bg-slate-100 focus:ring-2 focus:ring-blue-200 cursor-pointer"
          >
            {sampleCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.emoji} {c.name}
              </option>
            ))}
          </select>
          <button
            onClick={goPrev}
            disabled={currentIdx === 0}
            className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Back
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-700 tabular-nums">
            {currentIdx + 1} / {products.length}
          </span>
          <button
            onClick={goNext}
            disabled={currentIdx === products.length - 1}
            className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Image area — flex-1, swipeable */}
      <div
        className={`relative flex flex-1 items-center justify-center bg-gradient-to-br ${CATEGORY_GRADIENTS[categoryId] ?? 'from-slate-50 to-gray-50'} overflow-hidden`}
        {...swipeHandlers}
      >
        {/* Left arrow */}
        <button
          onClick={goPrev}
          disabled={currentIdx === 0}
          className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-xl text-slate-500 shadow-md transition hover:bg-white hover:text-slate-800 active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Previous"
        >
          ‹
        </button>

        {/* Product image placeholder */}
        <div className="flex h-full w-full items-center justify-center p-8">
          <span className="text-[8rem] leading-none select-none drop-shadow-sm">
            {category?.emoji ?? '📦'}
          </span>
        </div>

        {/* Right arrow */}
        <button
          onClick={goNext}
          disabled={currentIdx === products.length - 1}
          className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-xl text-slate-500 shadow-md transition hover:bg-white hover:text-slate-800 active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Next"
        >
          ›
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5 py-2 bg-white border-t border-slate-100">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Product ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-200 ${
              i === currentIdx ? 'w-6 bg-blue-500' : 'w-2 bg-slate-300'
            }`}
          />
        ))}
      </div>

      {/* Bottom bar — 3 columns */}
      <div className="grid grid-cols-[1.5fr_1.2fr_0.9fr] border-t border-slate-200 bg-white">
        {/* Col 1: Item info */}
        <div className="flex flex-col justify-center border-r border-slate-100 px-4 py-3">
          <p className="text-[11px] text-slate-400 font-mono">{product.code}</p>
          <p className="mt-0.5 line-clamp-2 text-sm font-bold text-slate-800 leading-snug">{product.name}</p>
          <p className="mt-0.5 text-xs text-slate-500">{product.subtitle}</p>
        </div>

        {/* Col 2: Price */}
        <div className="flex flex-col justify-center overflow-auto border-r border-slate-100 px-4 py-3 max-h-28">
          <PriceDisplay product={product} compact />
        </div>

        {/* Col 3: Action buttons */}
        <div className="flex flex-col items-stretch justify-center gap-2 px-3 py-3">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-95"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            More Info
          </button>

          {mode === 'qr' && (
            <button
              onClick={handleAddToSelection}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-600 active:scale-95"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" aria-hidden>
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              I NEED THIS
            </button>
          )}
        </div>
      </div>

      {/* Toast */}
      <Toast visible={toast} onDismiss={() => setToast(false)} />

      {/* More Info Modal */}
      {showModal && (
        <MoreInfoModal
          product={product}
          categoryEmoji={category?.emoji ?? '📦'}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
