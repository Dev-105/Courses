const CACHE_NAME = "app-v2";
let path = ''
const urlsToCache = [
  path + "/",
  path + "/index.html",
  path + "/client.html",
  path + "/style.css",
  path + "/app.js",
  path + "/qr.js",
  path + "/android-chrome-192x192.png",
  path + "/android-chrome-512x512.png",
  path + "/abonnement.jpg",
  path + "/bgtram.png",
  path + "/header.png",
  path + "/more.jpg",
  path + "/profile.png",
  path + "/qr.jpg",
  path + "/ticket.jpg",
  path + "/tram.png"
];

// install → cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// fetch → serve from cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});