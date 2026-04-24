import type { Product } from '../data/sampleData'

interface PriceDisplayProps {
  product: Product
  compact?: boolean
}

export function PriceDisplay({ product, compact = false }: PriceDisplayProps) {
  if (product.price_type === 'single') {
    return (
      <div>
        <p className={compact ? 'text-2xl font-bold text-slate-800' : 'text-4xl font-bold text-slate-800'}>
          ₹{product.price?.toLocaleString('en-IN')}
        </p>
        {product.price_unit && (
          <p className="text-xs text-slate-500 mt-0.5">{product.price_unit}</p>
        )}
      </div>
    )
  }

  // Matrix price
  const matrix = product.price_matrix ?? []
  const sizes = [...new Set(matrix.map((e) => e.size))]
  const colors = [...new Set(matrix.map((e) => e.color))]

  function getPrice(size: string, color: string): number | undefined {
    return matrix.find((e) => e.size === size && e.color === color)?.price
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-slate-100">
            <th className="border border-slate-200 px-2 py-1 text-left text-slate-600 font-semibold">
              Size / Colour
            </th>
            {colors.map((c) => (
              <th key={c} className="border border-slate-200 px-2 py-1 text-slate-600 font-semibold">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sizes.map((size, si) => (
            <tr key={size} className={si % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              <td className="border border-slate-200 px-2 py-1 font-semibold text-slate-700">
                {size}
              </td>
              {colors.map((color) => {
                const p = getPrice(size, color)
                return (
                  <td key={color} className="border border-slate-200 px-2 py-1 text-center text-slate-700">
                    {p !== undefined ? `₹${p}` : '—'}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
