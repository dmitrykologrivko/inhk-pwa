self.addEventListener('install', async () => {
    console.log('SW Install');

    const cache = await caches.open('v1');
    await cache.addAll([]);
});

self.addEventListener('fetch', event => {
    event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
    const cached = await caches.match(request);
    return cached ?? await fetch(request);
}