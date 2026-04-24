import { useState } from 'react'
import type { Product } from '../data/sampleData'
import { PriceDisplay } from './PriceDisplay'

interface MoreInfoModalProps {
  product: Product | null
  categoryEmoji: string
  onClose: () => void
}

export function MoreInfoModal({ product, categoryEmoji, onClose }: MoreInfoModalProps) {
  const [activeThumb, setActiveThumb] = useState(0)

  if (!product) return null

  const thumbCount = 4

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Left — image area */}
        <div className="flex w-5/12 flex-shrink-0 flex-col gap-3 border-r border-slate-100 bg-slate-50 p-5">
          {/* Main image placeholder */}
          <div className="flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white">
            <span className="text-[6rem] select-none">{categoryEmoji}</span>
          </div>
          {/* Thumbnail strip */}
          <div className="flex gap-2">
            {Array.from({ length: thumbCount }, (_, i) => (
              <button
                key={i}
                onClick={() => setActiveThumb(i)}
                className={`flex h-12 flex-1 items-center justify-center rounded-lg border text-xl transition ${
                  activeThumb === i
                    ? 'border-blue-400 bg-blue-50 shadow-sm'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <span className="text-sm select-none">{categoryEmoji}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right — details */}
        <div className="flex-1 overflow-y-auto p-6">
          <p className="mb-0.5 text-xs font-mono text-slate-400">{product.code}</p>
          <h2 className="mb-3 text-xl font-bold text-slate-800 leading-tight">{product.name}</h2>

          <section className="mb-4">
            <h3 className="mb-1 text-sm font-semibold text-slate-700">Description</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{product.description}</p>
          </section>

          {product.key_features.length > 0 && (
            <section className="mb-4">
              <h3 className="mb-2 text-sm font-semibold text-slate-700">Key Features</h3>
              <ul className="space-y-1">
                {product.key_features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" className="mt-0.5 flex-shrink-0" aria-hidden>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mb-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-[10px] text-slate-400 uppercase tracking-wide">Pack Size</p>
              <p className="mt-0.5 text-sm font-semibold text-slate-700">{product.pack_size}</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-[10px] text-slate-400 uppercase tracking-wide">Shelf Life</p>
              <p className="mt-0.5 text-sm font-semibold text-slate-700">{product.shelf_life}</p>
            </div>
          </div>

          <section>
            <h3 className="mb-2 text-sm font-semibold text-slate-700">Pricing</h3>
            <PriceDisplay product={product} />
          </section>
        </div>
      </div>
    </div>
  )
}
