const { response } = require("express");

var infoToCache = [
  "/",
  "/index.js",
  "index.html",
  "/manifest.json",
  "/styles.css",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

var CACHE_NAME = "budget-cache-v1";
var DATA_CACHE_NAME = "data-cache-v1";

// install
self.addEventListener("install", (event) => {
  event.waitUnti(
    cahces.open(CACHE_NAME).then((cache) => {
      return cache.addAll(infoToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.watiUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((key) => {
          if (key !== CACHE_NAME && KEY !== DATA_CACHE_NAME) {
            console.log("Deleting old cache data", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

//fetch

self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("/api")) {
    event.respondWith(
      caches
        .open(DATA_CACHE_NAME)
        .then((cache) => {
          return fetch(event.request)
            .then((response) => {
              if (response.status === 200) {
                cache.put(event.request.url, response.clone());
              }
              return response;
            })
            .catch((err) => {
              return cache.match(event.request);
            });
        })
        .catch((err) => {
          console.log(err);
        })
    );
    return;
  }
  event.respondWith(
    fetch(event.request).cache(() => {
      return cache.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        if (event.request.headers.get("accept").includes("text/html")) {
          return caches.match("/");
        }
      });
    })
  );
});
