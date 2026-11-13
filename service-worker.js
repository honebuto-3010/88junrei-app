const CACHE_NAME = "v3";

// オフラインでも使えるようにキャッシュするファイル一覧
const STATIC_FILES = [
  "index.html",
  "css/style.css",
  "css/tokushima.css",
  "tokushima-icon.html",
  "kagawa-icon.html",
  "ehime-icon.html",
  "kochi-icon.html",
  "manner.html",  // ← ナビメニューにあるので必須
  "manifest.json",
  "overview-map-01.png",
  "180-icon.png",
  "192-icon.png",
  "512-icon.png"
];

// インストール時にキャッシュ登録
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_FILES);
    })
  );
});

// キャッシュ優先（オフライン対応）
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// 古いキャッシュ削除
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

