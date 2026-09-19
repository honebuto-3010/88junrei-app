const CACHE_NAME = "v2";

// オフラインでも使えるようにキャッシュするファイル一覧
const STATIC_FILES = [
  "index.html",
  "style.css",
  "tokushima.css",
  "tokushima-icon.html",
  "kagawa-icon.html",
  "ehime-icon.html",
  "kochi-icon.html",
  "manner.html",  // ← ナビメニューにあるので必須
  "manifest.json",
  "overview-map-01.png",
  "photo-1620374476350-b7c1eabcc131.jpg"
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

