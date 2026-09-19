// ------------------------------
// ハンバーガーメニュー開閉（PC用）
// ------------------------------
const menu = document.getElementById("menu");
if (menu) {
    menu.addEventListener("click", () => {
        const menuContent = document.getElementById("menu-content");
        if (menuContent) {
            menuContent.style.display =
                menuContent.style.display === "block" ? "none" : "block";
        }
        menu.classList.toggle("active");
    });
}

// ------------------------------
// 画面切り替え
// ------------------------------
function hideAllScreens() {
    ["screen-home", "screen-list", "screen-detail"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });
}

// ------------------------------
// HTML読み込み
// ------------------------------
function loadScreen(targetId, file) {
    fetch(file)
        .then(res => res.text())
        .then(html => {
            const target = document.getElementById(targetId);
            if (!target) return;

            target.innerHTML = html;
            hideAllScreens();
            target.style.display = "block";
        })
        .catch(err => console.error("読み込みエラー:", err));
}

// ------------------------------
// DOM読み込み後
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {

    // 四国4県の一覧読み込み
    const linkMap = {
        "link-tokushima": "tokushima-icon.html",
        "link-kagawa": "kagawa-icon.html",
        "link-ehime": "ehime-icon.html",
        "link-kochi": "kochi-icon.html",
        "link-manner": "manner.html"
    };

    // PC用リンク + スマホ用リンクの両方にイベントを付ける
    Object.keys(linkMap).forEach(id => {
        document.querySelectorAll(`#${id}`).forEach(btn => {
            btn.addEventListener("click", () => {
                loadScreen("screen-list", linkMap[id]);
            });
        });
    });

    // ------------------------------
    // 一覧 → 詳細（イベント委譲）
    // ------------------------------
    document.addEventListener("click", (e) => {
        const icon = e.target.closest(".temple-wrapper");
        if (icon) {
            const file = icon.dataset.file;
            if (file) loadScreen("screen-detail", file);
        }
    });

    // ------------------------------
    // ホームに戻る（イベント委譲）
    // ------------------------------
    document.addEventListener("click", (e) => {
        const btnHome = e.target.closest(".btn-back-home");
        if (btnHome) {
            hideAllScreens();
            document.getElementById("screen-home").style.display = "block";
        }
    });

    // ------------------------------
    // 一覧に戻る（イベント委譲）
    // ------------------------------
    document.addEventListener("click", (e) => {
        const btnList = e.target.closest(".btn-back-list");
        if (btnList) {
            hideAllScreens();
            document.getElementById("screen-list").style.display = "block";
        }
    });

});

// ------------------------------
// Service Worker
// ------------------------------
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
}
