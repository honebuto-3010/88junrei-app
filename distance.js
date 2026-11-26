/**
 * 四国八十八ヶ所霊場 現在地からの直線距離 自動計算スクリプト
 * HTMLの .temple-number から札所番号を自動判定し、.current-distance を更新します。
 */

// 1. 全88ヶ寺の緯度・経度データ（1番〜88番）
const TEMPLE_COORDS = {
    1:  { name: "霊山寺",   lat: 34.1597, lng: 134.5025 },
    2:  { name: "極楽寺",   lat: 34.1556, lng: 134.4903 },
    3:  { name: "金泉寺",   lat: 34.1475, lng: 134.4686 },
    4:  { name: "大日寺",   lat: 34.1511, lng: 134.4308 },
    5:  { name: "地蔵寺",   lat: 34.1372, lng: 134.4319 },
    6:  { name: "安楽寺",   lat: 34.1181, lng: 134.3883 },
    7:  { name: "十楽寺",   lat: 34.1208, lng: 134.3778 },
    8:  { name: "熊谷寺",   lat: 34.1228, lng: 134.3400 },
    9:  { name: "法輪寺",   lat: 34.1044, lng: 134.3339 },
    10: { name: "切幡寺",   lat: 34.1078, lng: 134.3042 },
    11: { name: "藤井寺",   lat: 34.0517, lng: 134.3486 },
    12: { name: "焼山寺",   lat: 33.9850, lng: 134.3103 },
    13: { name: "大日寺",   lat: 34.0378, lng: 134.4628 },
    14: { name: "常楽寺",   lat: 34.0503, lng: 134.4753 },
    15: { name: "国分寺",   lat: 34.0556, lng: 134.4736 },
    16: { name: "観音寺",   lat: 34.0686, lng: 134.4742 },
    17: { name: "井戸寺",   lat: 34.0853, lng: 134.4856 },
    18: { name: "恩山寺",   lat: 33.9861, lng: 134.5781 },
    19: { name: "立江寺",   lat: 33.9678, lng: 134.6058 },
    20: { name: "鶴林寺",   lat: 33.9139, lng: 134.5056 },
    21: { name: "太龍寺",   lat: 33.8825, lng: 134.5219 },
    22: { name: "平等寺",   lat: 33.8519, lng: 134.5828 },
    23: { name: "薬王寺",   lat: 33.7322, lng: 134.5275 },
    24: { name: "最御崎寺", lat: 33.2494, lng: 134.1758 },
    25: { name: "津照寺",   lat: 33.2872, lng: 134.1481 },
    26: { name: "金剛頂寺", lat: 33.3072, lng: 134.1228 },
    27: { name: "神峯寺",   lat: 33.4675, lng: 133.9747 },
    28: { name: "大日寺",   lat: 33.5775, lng: 133.7056 },
    29: { name: "国分寺",   lat: 33.5986, lng: 133.6406 },
    30: { name: "善楽寺",   lat: 33.5919, lng: 133.5775 },
    31: { name: "竹林寺",   lat: 33.5467, lng: 133.5775 },
    32: { name: "禅師峰寺", lat: 33.5267, lng: 133.6114 },
    33: { name: "雪蹊寺",   lat: 33.5008, lng: 133.5431 },
    34: { name: "種間寺",   lat: 33.4919, lng: 133.4875 },
    35: { name: "清滝寺",   lat: 33.5125, lng: 133.4094 },
    36: { name: "青龍寺",   lat: 33.4258, lng: 133.4508 },
    37: { name: "岩本寺",   lat: 33.2081, lng: 133.1347 },
    38: { name: "金剛福寺", lat: 32.7258, lng: 133.0186 },
    39: { name: "延光寺",   lat: 32.9614, lng: 132.7742 },
    40: { name: "観自在寺", lat: 32.9647, lng: 132.5644 },
    41: { name: "龍光寺",   lat: 33.2953, lng: 132.5983 },
    42: { name: "佛木寺",   lat: 33.3106, lng: 132.5814 },
    43: { name: "明石寺",   lat: 33.3692, lng: 132.5189 },
    44: { name: "大寶寺",   lat: 33.6608, lng: 132.9122 },
    45: { name: "岩屋寺",   lat: 33.6586, lng: 132.9808 },
    46: { name: "浄瑠璃寺", lat: 33.7536, lng: 132.8192 },
    47: { name: "八坂寺",   lat: 33.7581, lng: 132.8128 },
    48: { name: "西林寺",   lat: 33.7936, lng: 132.8139 },
    49: { name: "浄土寺",   lat: 33.8167, lng: 132.8083 },
    50: { name: "繁多寺",   lat: 33.8281, lng: 132.8047 },
    51: { name: "石手寺",   lat: 33.8478, lng: 132.7964 },
    52: { name: "太山寺",   lat: 33.8850, lng: 132.7150 },
    53: { name: "圓明寺",   lat: 33.8919, lng: 132.7397 },
    54: { name: "延命寺",   lat: 34.0667, lng: 132.9639 },
    55: { name: "南光坊",   lat: 34.0683, lng: 132.9958 },
    56: { name: "泰山寺",   lat: 34.0503, lng: 132.9747 },
    57: { name: "栄福寺",   lat: 34.0294, lng: 132.9786 },
    58: { name: "仙遊寺",   lat: 34.0133, lng: 132.9775 },
    59: { name: "国分寺",   lat: 34.0261, lng: 133.0256 },
    60: { name: "横峰寺",   lat: 33.8378, lng: 133.1111 },
    61: { name: "香園寺",   lat: 33.8936, lng: 133.1033 },
    62: { name: "宝寿寺",   lat: 33.8975, lng: 133.1150 },
    63: { name: "吉祥寺",   lat: 33.8961, lng: 133.1292 },
    64: { name: "前神寺",   lat: 33.8897, lng: 133.1606 },
    65: { name: "三角寺",   lat: 33.9675, lng: 133.5867 },
    66: { name: "雲辺寺",   lat: 34.0353, lng: 133.7236 },
    67: { name: "大興寺",   lat: 34.1022, lng: 133.7192 },
    68: { name: "神恵院",   lat: 34.1342, lng: 133.6475 },
    69: { name: "観音寺",   lat: 34.1347, lng: 133.6475 },
    70: { name: "本山寺",   lat: 34.1397, lng: 133.6942 },
    71: { name: "弥谷寺",   lat: 34.2297, lng: 133.7244 },
    72: { name: "曼荼羅寺", lat: 34.2233, lng: 133.7503 },
    73: { name: "出釈迦寺", lat: 34.2194, lng: 133.7503 },
    74: { name: "甲山寺",   lat: 34.2333, lng: 133.7658 },
    75: { name: "善通寺",   lat: 34.2250, lng: 133.7742 },
    76: { name: "金倉寺",   lat: 34.2500, lng: 133.7811 },
    77: { name: "道隆寺",   lat: 34.2767, lng: 133.7628 },
    78: { name: "郷照寺",   lat: 34.3067, lng: 133.8247 },
    79: { name: "天皇寺",   lat: 34.3114, lng: 133.8828 },
    80: { name: "国分寺",   lat: 34.3031, lng: 133.9442 },
    81: { name: "白峯寺",   lat: 34.3333, lng: 133.9267 },
    82: { name: "根香寺",   lat: 34.3444, lng: 133.9606 },
    83: { name: "一宮寺",   lat: 34.2867, lng: 134.0267 },
    84: { name: "屋島寺",   lat: 34.3578, lng: 134.1014 },
    85: { name: "八栗寺",   lat: 34.3597, lng: 134.1397 },
    86: { name: "志度寺",   lat: 34.3244, lng: 134.1797 },
    87: { name: "長尾寺",   lat: 34.2667, lng: 134.1717 },
    88: { name: "大窪寺",   lat: 34.1914, lng: 134.2067 }
};

// 2. 漢数字（「一番」〜「八十八番」）を数値（1〜88）に変換する関数
function parseTempleNumber(text) {
    const match = text.match(/([一二三四五六七八九十]+)番札所/);
    if (!match) return null;

    const kanjiMap = { "一": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6, "七": 7, "八": 8, "九": 9 };
    const str = match[1];

    if (str.includes("十")) {
        const parts = str.split("十");
        const tens = parts[0] === "" ? 1 : kanjiMap[parts[0]];
        const ones = parts[1] === "" ? 0 : kanjiMap[parts[1]];
        return tens * 10 + ones;
    }
    return kanjiMap[str] || null;
}

// 3. 2点間の直線距離（km）を計算する関数（ハバーサイン公式）
function calcDistanceKm(lat1, lng1, lat2, lng2) {
    const R = 6371; // 地球の半径 (km)
    const toRad = (deg) => deg * (Math.PI / 180);
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// 4. ページ読み込み時に自動実行
document.addEventListener("DOMContentLoaded", () => {
    const numberEl = document.querySelector(".temple-number");
    const distanceEl = document.querySelector(".current-distance");

    if (!numberEl || !distanceEl) return;

    const templeNo = parseTempleNumber(numberEl.textContent);
    const target = TEMPLE_COORDS[templeNo];

    if (!target) return;

    // ブラウザが位置情報に対応しているかチェック
    if (!("geolocation" in navigator)) {
        return; // 非対応なら「約 -- km」のまま維持
    }

    // 取得中の表示（任意）
    distanceEl.innerHTML = `📍 現在地から 計測中... <span class="en-sub">(Calculating...)</span>`;

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const userLat = pos.coords.latitude;
            const userLng = pos.coords.longitude;
            const dist = calcDistanceKm(userLat, userLng, target.lat, target.lng);

            // 10km未満なら小数第1位まで（例: 3.4 km）、10km以上なら整数（例: 42 km）でスッキリ表示
            const formattedDist = dist < 10 ? dist.toFixed(1) : Math.round(dist);

            distanceEl.innerHTML = `📍 現在地から 約 ${formattedDist} km <span class="en-sub">(From current location)</span>`;
        },
        (err) => {
            // ユーザーが位置情報を拒否・オフにしている場合は元の表示に戻す
            distanceEl.innerHTML = `📍 現在地から 約 -- km <span class="en-sub">(From current location)</span>`;
        },
        {
            enableHighAccuracy: false, // バッテリー節約＆高速取得（寺院までの大まかな距離なら十分高精度）
            timeout: 8000,
            maximumAge: 60000          // 1分以内のキャッシュは再利用してサクッと表示
        }
    );
});
