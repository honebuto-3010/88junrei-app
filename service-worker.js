const CACHE_NAME = "v1";

// フォルダごとのページ数
const PAGE_COUNT = {
  Awa: 23,
  Tosa: 16,
  Iyo: 26,
  Sanuki: 23
};

// 固定ファイル（相対パスに修正）
const STATIC_FILES = [
  "index.html",
  "script.js",
  "css/styles.css",
  "tokushima-icon.html",
  "kagawa-icon.html",
  "ehime-icon.html",
  "kochi-icon.html",
];

// フォルダごとの連番ページを生成（先頭の / を削除）
function generatePageList() {
  const pages = [];

  Object.entries(PAGE_COUNT).forEach(([folder, count]) => {
    for (let i = 1; i <= count; i++) {
      const num = String(i).padStart(2, "0");
      pages.push(`${folder}/${num}.html`);
    }
  });

  return pages;
}

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      const pages = generatePageList();
      return cache.addAll([...STATIC_FILES, ...pages]);
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
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
});
