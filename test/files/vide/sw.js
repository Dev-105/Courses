const CACHE_NAME = "tram";
let path = '/Courses/test/files/vide'
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
  path + "/tram.png", 
  "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"
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
