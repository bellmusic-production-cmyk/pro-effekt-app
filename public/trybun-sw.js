const TRYBUN_CACHE_VERSION = "trybun-shell-v4.12.67";
const TRYBUN_STATIC_CACHE = `${TRYBUN_CACHE_VERSION}-static`;
const TRYBUN_PAGE_CACHE = `${TRYBUN_CACHE_VERSION}-page`;

const TRYBUN_PRECACHE = [
  "/",
  "/trybun-logo.png",
  "/trybun.webmanifest",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(TRYBUN_STATIC_CACHE)
      .then((cache) => cache.addAll(TRYBUN_PRECACHE))
      .catch(() => undefined),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                key.startsWith("trybun-shell-") &&
                !key.startsWith(TRYBUN_CACHE_VERSION),
            )
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "TRYBUN_SKIP_WAITING") {
    self.skipWaiting();
  }
});

function isCacheableStaticAsset(url, request) {
  if (url.origin !== self.location.origin) return false;
  if (request.method !== "GET") return false;

  return (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/fonts/") ||
    /\.(?:js|css|woff2?|ttf|otf|png|jpg|jpeg|webp|svg|ico)$/i.test(url.pathname)
  );
}

function shouldNeverCache(url, request) {
  if (request.method !== "GET") return true;
  if (url.origin !== self.location.origin) return true;

  return (
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/auth/") ||
    url.pathname.includes("supabase") ||
    url.pathname.includes("/storage/")
  );
}

async function cacheFirstStatic(request) {
  const cache = await caches.open(TRYBUN_STATIC_CACHE);
  const cached = await cache.match(request);

  if (cached) return cached;

  const response = await fetch(request);

  if (response.ok && response.type === "basic") {
    cache.put(request, response.clone());
  }

  return response;
}

async function networkFirstRootNavigation(request, url) {
  const cache = await caches.open(TRYBUN_PAGE_CACHE);

  try {
    const response = await fetch(request);

    // Nur die saubere Root-Navigation wird als App-Shell gespeichert.
    // Recovery-/Invite-Links mit Query-Parametern dürfen niemals im Cache landen.
    if (
      response.ok &&
      response.type === "basic" &&
      url.pathname === "/" &&
      url.search === ""
    ) {
      await cache.put("/", response.clone());
    }

    return response;
  } catch (error) {
    const cachedRoot =
      (await cache.match("/")) ||
      (await caches.match("/"));

    if (cachedRoot) return cachedRoot;

    throw error;
  }
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (shouldNeverCache(url, request)) {
    return;
  }

  if (request.mode === "navigate") {
    // Auth-/Recovery-URLs nicht offline aus einem alten Shell-Dokument bedienen.
    if (url.pathname !== "/" || url.search !== "") {
      event.respondWith(fetch(request));
      return;
    }

    event.respondWith(networkFirstRootNavigation(request, url));
    return;
  }

  if (isCacheableStaticAsset(url, request)) {
    event.respondWith(cacheFirstStatic(request));
  }
});
