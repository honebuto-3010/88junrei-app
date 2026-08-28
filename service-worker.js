const CACHE_NAME = "v1";

// 各地域の番号レンジ
const PAGE_RANGE = {
  Awa: [1, 23],
  Tosa: [24, 39],
  Iyo: [40, 65],
  Sanuki: [66, 88]
};

// 固定ファイル
const STATIC_FILES = [
  "index.html",
  "script.js",
  "css/styles.css",
  "tokushima-icon.html",
  "kagawa-icon.html",
  "ehime-icon.html",
  "kochi-icon.html",

  // 画像
  "134843608.jpg"
];

// 番号からファイル名を生成（番号_寺名.html）
function generatePageList() {
  const pages = [];

  Object.entries(PAGE_RANGE).forEach(([folder, [start, end]]) => {
    for (let num = start; num <= end; num++) {
      const padded = String(num).padStart(2, "0");
      pages.push(`${folder}/${padded}.html`);
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

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

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

