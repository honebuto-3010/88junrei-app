// 後から読み込まれるHTMLにも対応したモーダル制御
document.addEventListener("click", (e) => {
    // 1. メニューカード（.menu-card）またはその中の文字がクリックされた場合
    const menuBtn = e.target.closest(".menu-card");
    if (menuBtn) {
        const modalId = menuBtn.getAttribute("data-modal");
        const targetModal = document.getElementById(modalId);
        if (targetModal) {
            targetModal.classList.add("active");
            document.body.style.overflow = "hidden";

            const modalBody = targetModal.querySelector(".modal-body");
            if (modalBody) {
                modalBody.scrollTop = 0;
            }
        }
        return;
    }

    // 2. モーダルの「✕」「閉じる」ボタン、または背景の暗い部分がクリックされた場合
    if (
        e.target.classList.contains("modal-overlay") ||
        e.target.classList.contains("modal-close") ||
        e.target.classList.contains("modal-close-bottom")
    ) {
        const activeModal = e.target.closest(".modal-overlay");
        if (activeModal) {
            activeModal.classList.remove("active");
            document.body.style.overflow = "";
        }
        return;
    }
});

// Escキーでも閉じられるようにする
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        const activeModal = document.querySelector(".modal-overlay.active");
        if (activeModal) {
            activeModal.classList.remove("active");
            document.body.style.overflow = "";
        }
    }
});
