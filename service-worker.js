const CACHE_NAME = "v3"; // 更新を反映させるため v2 → v3 に変更

// オフラインでも使えるようにキャッシュするファイル一覧
// ※ここにあるファイルが1つでも見つからないとエラーになるため、実際に存在するファイルだけを書いてください
const STATIC_FILES = [
  "./",
  "index.html",
  "tokushima.css",
  "manner.css",          // ← 新しく作ったマナー用CSS（ファイル名が違う場合は書き換えてください）
  "distance.js",         // ← 距離自動計算JS（フォルダ内なら "js/distance.js" に変更）
  "tokushima-icon.html",
  "kagawa-icon.html",
  "ehime-icon.html",
  "kochi-icon.html",
  "manner.html",
  "manifest.json",
  "overview-map-01.png",
  "photo-1620374476350-b7c1eabcc131.jpg"
];

// インストール時にキャッシュ登録（万が一1つ欠けていても全体が止まらない安全設計）
self.addEventListener("install", event => {
  self.skipWaiting(); // 新しいService Workerを即座に有効化
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.allSettled(
        STATIC_FILES.map(url =>
          cache.add(url).catch(err => console.warn("キャッシュ失敗（ファイル名を確認）:", url))
        )
      );
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
    ).then(() => self.clients.claim())
  );
});

