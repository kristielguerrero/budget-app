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
    if (event.request.url.includes("/api")) {}