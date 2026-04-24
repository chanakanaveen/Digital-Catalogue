import { create } from 'zustand'

type Mode = 'qr' | 'manual' | null

interface SessionPayload {
  sessionId: string
  mode: 'qr' | 'manual'
  companyName: string
  customerName?: string
}

interface AppState {
  // Session
  sessionId: string | null
  mode: Mode
  companyName: string
  customerName: string

  // Device — stable across sessions, generated once
  tabletToken: string

  // Selections
  selectedIds: Set<string>
  selectionCount: number

  // Actions
  setSession: (payload: SessionPayload) => void
  clearSession: () => void
  addSelection: (itemId: string) => void
}

function generateToken(): string {
  return (
    'TABLET-' +
    Math.random().toString(36).slice(2, 8).toUpperCase() +
    '-' +
    Math.random().toString(36).slice(2, 6).toUpperCase()
  )
}

export const useAppStore = create<AppState>((set) => ({
  sessionId: null,
  mode: null,
  companyName: '',
  customerName: '',
  tabletToken: generateToken(),
  selectedIds: new Set(),
  selectionCount: 0,

  setSession: ({ sessionId, mode, companyName, customerName = '' }) =>
    set({
      sessionId,
      mode,
      companyName,
      customerName,
      // Reset selections on each new session
      selectedIds: new Set(),
      selectionCount: 0,
    }),

  clearSession: () =>
    set((state) => ({
      sessionId: null,
      mode: null,
      companyName: '',
      customerName: '',
      selectedIds: new Set(),
      selectionCount: 0,
      // tabletToken intentionally preserved
      tabletToken: state.tabletToken,
    })),

  addSelection: (itemId) =>
    set((state) => {
      if (state.selectedIds.has(itemId)) return state
      const next = new Set(state.selectedIds)
      next.add(itemId)
      return { selectedIds: next, selectionCount: next.size }
    }),
}))
