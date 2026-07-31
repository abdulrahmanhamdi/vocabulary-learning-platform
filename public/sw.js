const CACHE_NAME = 'vocab-learn-v1';
const DATA_CACHE_NAME = 'vocab-data-v1';

const PRECACHE_ASSETS = [
  '/',
  '/daily',
  '/words',
  '/quiz',
  '/statistics',
  '/favicon.ico',
  '/icon.svg',
  '/site.webmanifest',
];

// Install event: Precache core application shell and resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching offline assets');
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== DATA_CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event: Network interception & caching strategies
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Strategy for JSON/API data: Cache First, fallback to network with background refresh
  if (requestUrl.pathname.startsWith('/api/') || requestUrl.pathname.endsWith('.json')) {
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            // Return cached response instantly and refresh it in the background
            fetch(event.request)
              .then((networkResponse) => {
                if (networkResponse.status === 200) {
                  cache.put(event.request, networkResponse.clone());
                }
              })
              .catch(() => {
                // Ignore background fetch failures when offline
              });
            return cachedResponse;
          }

          // If not in cache, request from network and cache the response
          return fetch(event.request).then((networkResponse) => {
            if (networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // Strategy for static assets: Stale-While-Revalidate
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch fresh copy in the background to update the cache
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse);
              });
            }
          })
          .catch(() => {
            // Ignore offline network errors
          });
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          networkResponse.type === 'basic'
        ) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      });
    }).catch(() => {
      // Fallback to the root page shell for document navigations while offline
      if (event.request.mode === 'navigate') {
        return caches.match('/');
      }
    })
  );
});
