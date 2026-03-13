const CACHE_NAME = 'slowdown-hare-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './zorza.jpg',
  './hare_relax.JPG',
  './soundreality-notification-piano-443094.mp3',
  './logo192.png',
  './logo512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
