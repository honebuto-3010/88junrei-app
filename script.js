// 公開時だけこの1行を入れると、すべての console.log が無効になります
console.log = function() {};
// ------------------------------
// 全88ヶ所のファイルパス一覧（順番通り）
// ------------------------------
const TEMPLE_FILES = [
    // 阿波（徳島県：1〜23番）
    "Awa/01_ryozenji.html", "Awa/02_gokurakuji.html", "Awa/03_konsenji.html", "Awa/04_dainichiji.html",
    "Awa/05_jizouji.html", "Awa/06_anrakuji.html", "Awa/07_jyuurakuji.html", "Awa/08_kumadaniji.html",
    "Awa/09_hourinji.html", "Awa/10_kirihataji.html", "Awa/11_fujiidera.html", "Awa/12_shousanji.html",
    "Awa/13_dainichiji.html", "Awa/14_jorakuji.html", "Awa/15_kokubunji.html", "Awa/16_kanonji.html",
    "Awa/17_idoji.html", "Awa/18_onzanji.html", "Awa/19_tatsueji.html", "Awa/20_kakurinji.html",
    "Awa/21_tairyuji.html", "Awa/22_byoudouji.html", "Awa/23_yakuouji.html",
    // 土佐（高知県：24〜39番）
    "Tosa/24_hotsumisakiji.html", "Tosa/25_shinshouji.html", "Tosa/26_kongouchouji.html", "Tosa/27_kounomineji.html",
    "Tosa/28_dainichiji.html", "Tosa/29_kokubunji.html", "Tosa/30_zenrakuji.html", "Tosa/31_tikurinji.html",
    "Tosa/32_zenjibuji.html", "Tosa/33_sekkeiji.html", "Tosa/34_tanemaji.html", "Tosa/35_kiyotakiji.html",
    "Tosa/36_shouryuji.html", "Tosa/37_iwamotoji.html", "Tosa/38_kongoufukuji.html", "Tosa/39_enkouji.html",
    // 伊予（愛媛県：40〜65番）
    "Iyo/40_kanjizaiji.html", "Iyo/41_ryukouji.html", "Iyo/42_butsumokuji.html", "Iyo/43_meisekiji.html",
    "Iyo/44_daihouji.html", "Iyo/45_iwayaji.html", "Iyo/46_joururiji.html", "Iyo/47_yasakaji.html",
    "Iyo/48_sairinji.html", "Iyo/49_joudoji.html", "Iyo/50_hantaji.html", "Iyo/51_ishiteji.html",
    "Iyo/52_taisanji.html", "Iyo/53_enmyouji.html", "Iyo/54_enmeiji.html", "Iyo/55_nankoubou.html",
    "Iyo/56_taisanji.html", "Iyo/57_eifukuji.html", "Iyo/58_senyuji.html", "Iyo/59_kokubunji.html",
    "Iyo/60_yokomineji.html", "Iyo/61_kouonji.html", "Iyo/62_houjuji.html", "Iyo/63_kitijouji.html",
    "Iyo/64_maegamiji.html", "Iyo/65_sankakuji.html",
    // 讃岐（香川県：66〜88番）
    "Sanuki/66_unpenji.html", "Sanuki/67_daikouji.html", "Sanuki/68_jinnein.html", "Sanuki/69_kannonji.html",
    "Sanuki/70_motoyamaji.html", "Sanuki/71_iyadaniji.html", "Sanuki/72_mandaraji.html", "Sanuki/73_shu_shakaji.html",
    "Sanuki/74_kouyamaji.html", "Sanuki/75_zentsuuji.html", "Sanuki/76_konzouji.html", "Sanuki/77_douryuuji.html",
    "Sanuki/78_goushouji.html", "Sanuki/79_tennouji.html", "Sanuki/80_kokubunji.html", "Sanuki/81_shiromineji.html",
    "Sanuki/82_negoroji.html", "Sanuki/83_ichinomiyaji.html", "Sanuki/84_yashimaji.html", "Sanuki/85_yakuriji.html",
    "Sanuki/86_sidoji.html", "Sanuki/87_nagaoji.html", "Sanuki/88_ookuboji.html"
];

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
/*function loadScreen(targetId, file) {
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
} */

function loadScreen(targetId, file) {
    fetch(file)
        .then(res => res.text())
        .then(html => {
            const target = document.getElementById(targetId);
            if (!target) return;

            target.innerHTML = html;

            // 詳細画面（screen-detail）の場合、前後の札所ボタンを自動挿入
            if (targetId === "screen-detail") {
                const idx = TEMPLE_FILES.indexOf(file);
                const backNav = target.querySelector(".back-buttons");
                
                if (idx !== -1 && backNav) {
                    const prevIdx = (idx - 1 + TEMPLE_FILES.length) % TEMPLE_FILES.length; // 1番の前は88番へ
                    const nextIdx = (idx + 1) % TEMPLE_FILES.length; // 88番の次は1番へ
                    const prevNum = prevIdx + 1;
                    const nextNum = nextIdx + 1;

                    const prevNextHtml = `
                        <nav class="back-buttons" style="margin-bottom: 12px;">
                            <button type="button" class="glass-btn btn-prev-temple" data-file="${TEMPLE_FILES[prevIdx]}">
                                ← 第${prevNum}番へ
                                <span class="label-en">No.${prevNum} Temple</span>
                            </button>
                            <button type="button" class="glass-btn btn-next-temple" data-file="${TEMPLE_FILES[nextIdx]}">
                                第${nextNum}番へ →
                                <span class="label-en">No.${nextNum} Temple</span>
                            </button>
                        </nav>
                    `;
                    backNav.insertAdjacentHTML("beforebegin", prevNextHtml);
                }
            }

            hideAllScreens();
            target.style.display = "block";
            window.scrollTo({ top: 0, behavior: "smooth" }); // ページ切り替え時に一番上へ戻る
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

        // ------------------------------
    // 前の札所・次の札所へ移動（イベント委譲）
    // ------------------------------
    document.addEventListener("click", (e) => {
        const navBtn = e.target.closest(".btn-prev-temple, .btn-next-temple");
        if (navBtn) {
            const file = navBtn.dataset.file;
            if (file) loadScreen("screen-detail", file);
        }
    });


});

// ------------------------------
// Service Worker
// ------------------------------
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
}

// ===============================
// 地図モーダルを開く
// ===============================
document.getElementById("show-map-btn").addEventListener("click", function () {
    const modal = document.querySelector(".fullscreen-map");
    modal.style.display = "flex";   // モーダルを表示
    document.body.style.overflow = "hidden"; // 背景スクロール防止
});

// ===============================
// 地図モーダルを閉じる
// ===============================
document.getElementById("close-map-btn").addEventListener("click", function () {
    const modal = document.querySelector(".fullscreen-map");
    modal.style.display = "none";   // モーダルを非表示
    document.body.style.overflow = ""; // スクロール解除
});
