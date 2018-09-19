self.addEventListener('install', e => {
 e.waitUntil(
   // ïîñëå óñòàíîâêè service worker
   // îòêðûòü íîâûé êýø
   caches.open('my-pwa-cache').then(cache => {
     // äîáàâëÿåì âñå URL ðåñóðñîâ, êîòîðûå õîòèì çàêýøèðîâàòü
     return cache.addAll([
       '/schedule',
       '/schedule/index.html',
       '/schedule/style.css',
       '/schedule/script.js',
       'https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.min.js',
       'https://unpkg.com/axios/dist/axios.min.js',
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {

console.log(event.request.url);

event.respondWith(

caches.match(event.request).then(function(response) {

return response || fetch(event.request);

})

);

});
