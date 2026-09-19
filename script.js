let stage = 1;
let room = 1;
let isFirstStart = true;

function updateRoomDisplay() {
    document.getElementById("roomDisplay").textContent = room + " / 7";
}

let scrollX = 0;
const bg = document.getElementById("background");
const player = document.getElementById("player");
const clearScreen = document.getElementById("clearScreen");

const MIN_SCROLL = -2500;
const MAX_SCROLL = 0;

/* ★ BGM とクリアSE */
const bgm = new Audio("assets/sound/bgm.mp3");
bgm.loop = true;
bgm.volume = 0.4;

const clearSE = new Audio("assets/sound/clear.mp3");
clearSE.volume = 0.8;

let bgmStarted = false;

function updateBackground() {
    if (scrollX < MIN_SCROLL) scrollX = MIN_SCROLL;
    if (scrollX > MAX_SCROLL) scrollX = MAX_SCROLL;
    bg.style.left = scrollX + "px";
}

const allImages = [
    "normal.png",
    "anom_crossdress.png",
    "anom_twintail.png",
    "anom_all_blush.png",
    "anom_wall_pattern.png",
    "anom_empty.png",
    "anom_usui.png",
    "anom_frame_color.png",
    "anom_frame_move.png",
    "anom_frame_tilt.png",
    "anom_frame_bgcolor.png",
    "anom_vase_break.png",
    "anom_light_off.png",
    "anom_order_ot1_ra_kb_ot2.png",
    "anom_order_ot2_kb_ra_ot1.png",
    "anom_otto1_expression.png",
    "anom_otto1_hairchange.png",
    "anom_otto1_hair_rasetsu.png",
    "anom_otto1_shota.png",
    "anom_kb_expression.png",
    "anom_kb_hair_otto2.png",
    "anom_kb_mask.png",
    "anom_kb_mirror.png",
    "anom_rasetsu_expression.png",
    "anom_rasetsu_shota.png",
    "anom_rasetsu_hair_kb.png",
    "anom_rasetsu_cat.png",
    "anom_otto2_expression.png",
    "anom_otto2_hair_otto1.png",
    "anom_otto2_kirakimera.png",
    "anom_otto2_mirror.png"
];

function getRandomImage() {
    const index = Math.floor(Math.random() * allImages.length);
    return "assets/gallery/" + allImages[index];
}

function showRoom() {

    scrollX = 0;
    updateBackground();

    if (stage === 1 && room === 1 && isFirstStart) {
        bg.src = "assets/gallery/normal.png";
        bg.dataset.anomaly = "false";
        isFirstStart = false;
        return;
    }

    const img = getRandomImage();
    bg.src = img;

    const isAnomaly = !img.includes("normal");
    bg.dataset.anomaly = isAnomaly ? "true" : "false";
}

function judge(playerChoice) {
    const realAnomaly = bg.dataset.anomaly === "true";

    if (playerChoice === realAnomaly) {

        if (room === 7) {
            showClearScreen();
            return;
        }

        room++;
        updateRoomDisplay();
        showRoom();

    } else {
        stage = 1;
        room = 1;

        scrollX = 0;
        updateBackground();

        updateRoomDisplay();
        showRoom();
    }
}

function showClearScreen() {
    clearSE.currentTime = 0;
    clearSE.play();
    clearScreen.classList.remove("hidden");
}

function restartGame() {
    clearScreen.classList.add("hidden");

    stage = 1;
    room = 1;
    isFirstStart = true;

    scrollX = 0;
    updateBackground();

    updateRoomDisplay();
    showRoom();
}

document.addEventListener("keydown", (e) => {

    /* ★ 初回操作でBGMスタート（自動再生制限対策） */
    if (!bgmStarted) {
        bgm.play();
        bgmStarted = true;
    }

    if (e.key === "ArrowRight") {
        player.src = "assets/gallery/sharapp_right.png";
        scrollX -= 20;
        updateBackground();
    }
    if (e.key === "ArrowLeft") {
        player.src = "assets/gallery/sharapp_left.png";
        scrollX += 20;
        updateBackground();
    }
});

document.addEventListener("keyup", () => {
    player.src = "assets/gallery/sharapp_idle.png";
});

updateRoomDisplay();
showRoom();
