self.addEventListener("install", (event) => {
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  // cleanup/claim clients
  event.waitUntil(self.clients.claim())
})

self.addEventListener("fetch", (event) => {
  // passthrough - could be extended to cache offline routes
  return
})
