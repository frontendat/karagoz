self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  // Only modify requests for the same origin
  if (url.origin === location.origin) {
    const modifiedHeaders = new Headers(event.request.headers)
    modifiedHeaders.set('Cross-Origin-Opener-Policy', 'same-origin')
    modifiedHeaders.set('Cross-Origin-Embedder-Policy', 'require-corp')

    event.respondWith(
      fetch(event.request, { headers: modifiedHeaders }).then((response) => {
        const newHeaders = new Headers(response.headers)
        newHeaders.set('Cross-Origin-Opener-Policy', 'same-origin')
        newHeaders.set('Cross-Origin-Embedder-Policy', 'require-corp')

        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders,
        })
      }),
    )
  }
})
