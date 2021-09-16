const { response } = require("express");

var infoToCatch = [
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

self.addEventListener("install", (event) => {
  event.waitUnti(
    cahces.open(CACHE_NAME).then((cache) => {
      return cache.addAll(infoToCatch);
    })
  );
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
            return chache.match(event.request).then((respond) => {
                if (response) {
                    return response;
                }
            })
        })
    )