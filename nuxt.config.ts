// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  ssr: false,
  devtools: { enabled: false },
  nitro: {
    preset: 'static',
    prerender: {
      routes: [
        '/',
        '/discover',
        '/life',
        '/events',
        '/academics',
        '/athletics',
        '/faith',
        '/president',
        '/swoop-shop'
      ]
    }
  },
  app: {
    head: {
      title: 'Northwest University — Interactive Display',
      link: [
        { rel: 'stylesheet', href: 'https://use.typekit.net/lsx4kqf.css' }
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=1080, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover' },
        { name: 'theme-color', content: '#0068bb' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      script: [
        {
          // Lock down browser gestures that can break a fixed 1080x1920 stage.
          // Pinch-zoom, double-tap-zoom, two-finger pan, iOS callout, drag.
          innerHTML: `
            (function () {
              var lastTouchEnd = 0;
              document.addEventListener('touchstart', function (e) {
                if (e.touches.length > 1) e.preventDefault();
              }, { passive: false });
              document.addEventListener('touchend', function (e) {
                var now = Date.now();
                if (now - lastTouchEnd <= 300) e.preventDefault();
                lastTouchEnd = now;
              }, { passive: false });
              document.addEventListener('gesturestart',  function (e) { e.preventDefault(); }, { passive: false });
              document.addEventListener('gesturechange', function (e) { e.preventDefault(); }, { passive: false });
              document.addEventListener('gestureend',    function (e) { e.preventDefault(); }, { passive: false });
              document.addEventListener('contextmenu',   function (e) { e.preventDefault(); });
              document.addEventListener('dblclick',      function (e) { e.preventDefault(); });
              document.addEventListener('wheel',         function (e) { e.preventDefault(); }, { passive: false });
            })();
          `,
          tagPosition: 'head'
        }
      ]
    }
  },
  css: ['~/assets/css/main.css']
})
