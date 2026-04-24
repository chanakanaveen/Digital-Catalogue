// Module-level activity tracker — intentionally NOT in Zustand to avoid
// re-render storms from high-frequency touch/click events.

let _lastActivity = Date.now()

export function touchActivity(): void {
  _lastActivity = Date.now()
}

export function getLastActivity(): number {
  return _lastActivity
}
