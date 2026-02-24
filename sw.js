// Root Work Framework — Service Worker
// Cache version: rwfw-v1
// UPGRADE PROCEDURE: increment CACHE_NAME (rwfw-v2, rwfw-v3, etc.) on each deploy
// to bust stale caches across all client devices.

'use strict';

var CACHE_NAME = 'rwfw-v1';

// Static shell — precached on install
var PRECACHE_ASSETS = [
  '/',
  '/styles.css',
  '/scripts.js',
  '/manifest.json',
  '/offline.html',
  '/icons/logo.webp',
  '/icons/root.webp',
  '/icons/root.png',
  '/icons/regulate.webp',
  '/icons/reflect.webp',
  '/icons/restore.webp',
  '/icons/reconnect.webp',
  '/icons/tree-simple.svg',
  '/icons/tree-roots.svg',
  '/favicon.ico'
];

// ─── Install ────────────────────────────────────────────────────────────────
// Precache the static shell. skipWaiting() activates immediately.
self.addEventListener('install', function (event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
});

// ─── Activate ───────────────────────────────────────────────────────────────
// Delete all caches with a name that doesn't match the current version.
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (k) { return k !== CACHE_NAME; })
          .map(function (k) { return caches.delete(k); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

// ─── Fetch ──────────────────────────────────────────────────────────────────
self.addEventListener('fetch', function (event) {
  var req = event.request;
  var url;

  // Only handle GET requests
  if (req.method !== 'GET') return;

  try {
    url = new URL(req.url);
  } catch (e) {
    return;
  }

  // Same-origin only — do not intercept cross-origin requests
  if (url.origin !== self.location.origin) return;

  // API routes: NETWORK ONLY — never cache; always fresh
  if (url.pathname.startsWith('/api/')) return;

  // Navigation (page) requests: network-first → cached page → offline fallback
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(function (response) {
          // Opportunistically update the cache for this navigation
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(req, clone);
          });
          return response;
        })
        .catch(function () {
          return caches.match(req).then(function (cached) {
            return cached || caches.match('/offline.html');
          });
        })
    );
    return;
  }

  // Static assets: cache-first → network fallback → cache new assets
  event.respondWith(
    caches.match(req).then(function (cached) {
      if (cached) return cached;
      return fetch(req).then(function (response) {
        // Only cache valid same-origin basic responses
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(req, clone);
        });
        return response;
      });
    })
  );
});
