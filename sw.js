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
     ]);
   })
 );
});
