self.addEventListener("install", event => {
  console.log("Service Workers installing... ", event);
  event.waitUntil(
    caches.open("static").then(cache => {
      console.log("Service Workers Precache...", cache);
      return cache.addAll([
        "/src/js/app.js",
        "/src/js/feed.js",
        "/src/css/app.css",
        "/src/css/feed.css",
        "/src/images/main-image.jpg",
        "/index.html",
        "/"
      ]);
    })
  );
});

self.addEventListener("activate", event => {
  console.log("Activating Service Workers ", event);
  return self.clients.claim();
});

self.addEventListener("fetch", event => {
  console.log("Fetching something... ", event);
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      } else {
        return fetch(event.request);
      }
    })
  );
});

