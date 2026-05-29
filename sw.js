const CACHE_NAME = 'sistema-v18';

const urlsToCache = [
  './',
  './login.html',
  './welcome.html',
  './index.html',
  './mission.html',
  './manifest.json',
  './ding.wav',
  './levelup.wav',
  './efec_portal.wav',
  './login_efec.wav',
  './portal.jpg',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );

  self.skipWaiting();
});

self.addEventListener('activate', event => {

  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});