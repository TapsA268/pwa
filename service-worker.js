self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('monkeyhealthy-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/Views/Registro_comidas.html',
          '/Views/Seguimiento_calorias.html',
          '/Views/Objetivos.html',
          '/style.css',
          '/Scripts/objetivos.js',
          '/Scripts/registro_comidas.js',
          '/Scripts/seguimiento_calorias.js',
          'Public/img1.jpeg',
          'Public/img2.jpg',
          'Public/img3.jpeg',
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  