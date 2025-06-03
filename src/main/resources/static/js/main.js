let imagePath = "";
let translatedText = "";
let languageCode = "en-US";
const BASE_URL = "http://localhost:8080";
let selectedOcrLangs = new Set();

document.addEventListener("DOMContentLoaded", () => {
    initTargetLangDropdown();
    document.getElementById("screenshotBtn").addEventListener("click", captureAndSend);
    document.getElementById("areaCaptureBtn").addEventListener("click", startAreaCapture);
    document.getElementById("startBtn").addEventListener("click", () => showScreen("ocrScreen"));
});

function showScreen(targetId) {
    const screens = ["mainScreen", "ocrScreen", "resultScreen"];
    screens.forEach(id => {
        document.getElementById(id).style.display = (id === targetId) ? "block" : "none";
    });
}

function addOcrLang() {
    const dropdown = document.getElementById("ocrLangDropdown");
    const langCode = dropdown.value;
    const langText = dropdown.options[dropdown.selectedIndex].text;

    if (selectedOcrLangs.has(langCode)) return;

    selectedOcrLangs.add(langCode);

    const tag = document.createElement("span");
    tag.className = "lang-tag";
    tag.dataset.code = langCode;
    tag.innerHTML = `${langText} <button onclick="removeOcrLang('${langCode}')">×</button>`;
    document.getElementById("selectedLangTags").appendChild(tag);
}

function removeOcrLang(code) {
    selectedOcrLangs.delete(code);
    const tag = document.querySelector(`.lang-tag[data-code="${code}"]`);
    if (tag) tag.remove();
}

async function uploadImage() {
    const input = document.getElementById("imageInput");
    const file = input.files[0];
    if (!file) return alert("이미지를 선택하세요.");
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`${BASE_URL}/api/image/upload`, { method: "POST", body: formData });
    imagePath = await res.text();
    document.getElementById("uploadResult").innerText = "✅ 업로드 완료: " + imagePath;
}

async function performOCR() {
    if (selectedOcrLangs.size === 0) {
        alert("OCR 언어를 하나 이상 선택하세요.");
        return;
    }
    if (!imagePath) {
        alert("이미지를 먼저 업로드해주세요.");
        return;
    }

    const lang = Array.from(selectedOcrLangs).join("+");

    try {
        const res = await fetch(`${BASE_URL}/api/ocr`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imagePath, lang })
        });

        const result = await res.json();

        const ocrOutput = document.getElementById("ocrResult");
        if (!ocrOutput) {
            console.error("❗ ocrResult 요소가 존재하지 않습니다.");
            return;
        }

        if (!result || !result.lines || !Array.isArray(result.lines)) {
            ocrOutput.innerText = "❗ OCR 결과가 유효하지 않습니다.";
            return;
        }

        ocrOutput.innerText = result.lines.length > 0
            ? result.lines.join("\n")
            : "⚠️ 텍스트를 인식하지 못했습니다.";
    } catch (err) {
        console.error("❗ OCR 처리 중 오류 발생:", err);
        alert("OCR 처리 중 오류가 발생했습니다.");
    }
}

function initTargetLangDropdown() {
    const select = document.getElementById("targetLang");
    const options = [
        { code: "en", label: "영어" },
        { code: "ko", label: "한국어" },
        { code: "ja", label: "일본어" },
        { code: "zh-CN", label: "중국어 간체" },
        { code: "zh-TW", label: "중국어 번체" },
        { code: "fr", label: "프랑스어" },
        { code: "de", label: "독일어" },
        { code: "es", label: "스페인어" },
        { code: "ru", label: "러시아어" },
        { code: "vi", label: "베트남어" },
        { code: "th", label: "태국어" }
    ];
    options.forEach(opt => {
        const o = document.createElement("option");
        o.value = opt.code;
        o.textContent = opt.label;
        select.appendChild(o);
    });
}

async function translateText() {
    const targetLang = document.getElementById("targetLang").value;
    const originalText = document.getElementById("ocrResult").innerText;
    const res = await fetch(`${BASE_URL}/api/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalText, targetLang })
    });
    const result = await res.json();
    translatedText = result.translatedText;
    languageCode = getTTSLang(targetLang);
    document.getElementById("translationResult").innerText = translatedText;
}

async function generateTTS() {
    const res = await fetch(`${BASE_URL}/api/tts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: translatedText, languageCode })
    });
    const blob = await res.blob();
    const audioUrl = URL.createObjectURL(blob);
    document.getElementById("audioPlayer").src = audioUrl;
}

async function captureAndSend() {
    const lang = Array.from(selectedOcrLangs).join("+");
    const canvas = await html2canvas(document.body);
    canvas.toBlob(async blob => {
        const file = new File([blob], "screenshot.png", { type: "image/png" });
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch(`${BASE_URL}/api/image/upload`, { method: "POST", body: formData });
        imagePath = await res.text();
        const ocrRes = await fetch(`${BASE_URL}/api/ocr`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imagePath, lang })
        });
        const result = await ocrRes.json();
        document.getElementById("ocrResult").innerText = result.lines.join("\n");
    });
}

function startAreaCapture() {
    const overlay = document.createElement("div");
    overlay.id = "captureOverlay";
    document.body.appendChild(overlay);
    let startX, startY, box;

    overlay.addEventListener("mousedown", e => {
        startX = e.clientX;
        startY = e.clientY;

        box = document.createElement("div");
        box.className = "selectionBox";
        box.style.left = `${startX}px`;
        box.style.top = `${startY}px`;
        overlay.appendChild(box);

        const onMouseMove = e => {
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            box.style.width = `${Math.abs(width)}px`;
            box.style.height = `${Math.abs(height)}px`;
            box.style.left = `${Math.min(e.clientX, startX)}px`;
            box.style.top = `${Math.min(e.clientY, startY)}px`;
        };

        const onMouseUp = async () => {
            overlay.remove();
            const rect = box.getBoundingClientRect();
            await captureRegion(rect);
        };

        overlay.addEventListener("mousemove", onMouseMove);
        overlay.addEventListener("mouseup", onMouseUp);
    });
}

async function captureRegion(rect) {
    const lang = Array.from(selectedOcrLangs).join("+");
    const canvas = await html2canvas(document.body);
    const cropped = document.createElement("canvas");
    const dpr = window.devicePixelRatio || 1;
    cropped.width = rect.width * dpr;
    cropped.height = rect.height * dpr;
    const ctx = cropped.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.drawImage(canvas, rect.left, rect.top, rect.width, rect.height, 0, 0, rect.width, rect.height);
    cropped.toBlob(async blob => {
        const file = new File([blob], "area.png", { type: "image/png" });
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch(`${BASE_URL}/api/image/upload`, { method: "POST", body: formData });
        imagePath = await res.text();
        const ocrRes = await fetch(`${BASE_URL}/api/ocr`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imagePath, lang })
        });
        const result = await ocrRes.json();
        document.getElementById("ocrResult").innerText = result.lines.join("\n");
    });
}

function getTTSLang(target) {
    const map = {
        ko: "ko-KR", en: "en-US", ja: "ja-JP", zh: "zh-CN", "zh-CN": "zh-CN", "zh-TW": "zh-TW",
        fr: "fr-FR", de: "de-DE", es: "es-ES", ru: "ru-RU", vi: "vi-VN", th: "th-TH"
    };
    return map[target] || "en-US";
}