self.addEventListener('install', e => {
 e.waitUntil(
   // ����� ��������� service worker
   // ������� ����� ���
   caches.open('my-pwa-cache').then(cache => {
     // ��������� ��� URL ��������, ������� ����� ������������
     return cache.addAll([
       '/',
       '/index.html',
       '/style.css',
     ]);
   })
 );
});