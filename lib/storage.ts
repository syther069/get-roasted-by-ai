export function saveEntry(entry: any) {
  if (typeof window === "undefined") return

  const existing = JSON.parse(
    localStorage.getItem("roasts") || "[]"
  )

  existing.unshift(entry)

  localStorage.setItem(
    "roasts",
    JSON.stringify(existing)
  )
}

export function getEntries() {
  if (typeof window === "undefined") return []

  return JSON.parse(
    localStorage.getItem("roasts") || "[]"
  )
}