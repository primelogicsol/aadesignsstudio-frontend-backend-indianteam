"use client"

export function forcePageRefresh() {
  window.location.reload()
}

export function navigateWithRefresh(url: string) {
  window.location.href = url
}
