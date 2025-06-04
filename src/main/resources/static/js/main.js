// -------------------- 설정 및 초기화 --------------------
// OCR 번역 TTS 시스템 JS 전체 코드
let imagePath = "";
let translatedText = "";
let languageCode = "en-US";
const BASE_URL = "http://localhost:8080";
let selectedOcrLangs = new Set();
let previousScreen = "mainScreen"; // 이전 화면을 추적하는 변수 추가

// 기본 설정
const defaultSettings = {
    darkMode: false,
    defaultOcrLang: ["kor"],
    defaultTranslateLang: "en",
    useCustomFilename: false,
    customFilename: "",
    siteLanguage: "ko",
    enhancedOcrMode: false
};

// 번역된 텍스트 정의
const translations = {
    ko: {
        mainTitle: "📄 OCR 번역 TTS 시스템",
        start: "시작하기",
        settings: "⚙️ 설정",
        upload: "업로드",
        add: "추가",
        startOcr: "OCR 시작",
        capture: "📸 전체 화면 캡처",
        areaCapture: "📐 영역 지정 캡처",
        viewResult: "👉 결과 보기",
        ocrResult: "📝 OCR 결과",
        copyOcr: "📋 OCR 복사",
        saveOcr: "📝 OCR 결과 저장",
        translation: "🌐 번역",
        selectTargetLang: "번역할 언어 선택:",
        startTranslation: "번역 시작",
        saveTranslation: "🌐 번역 결과 저장",
        copyTranslation: "📋 번역 복사",
        tts: "🔊 TTS",
        runTts: "TTS 실행",
        backToOcr: "← 다시 OCR 화면",
        darkMode: "다크 모드:",
        defaultOcrLang: "기본 OCR 언어 설정:",
        customFilename: "파일명 직접 입력:",
        siteLanguage: "사이트 언어:",
        applySettings: "설정 저장",
        backToPrevious: "이전 화면으로",
        imageUpload: "1. 이미지 업로드",
        ocrLangSelect: "2. OCR 언어 선택",
        langKor: "한국어",
        langEng: "영어",
        langJpn: "일본어",
        langChiSim: "중국어 간체",
        langChiTrad: "중국어 번체",
        langRus: "러시아어",
        langDeu: "독일어",
        langFra: "프랑스어",
        langSpa: "스페인어",
        langVie: "베트남어",
        langTha: "태국어",
        noFileSelected: "선택된 파일 없음",
        uploadSuccess: "✅ 이미지 업로드 성공",
        uploadFail: "❌ 이미지 업로드 실패",
        copySuccess: "✅ 복사 성공",
        copyFail: "❌ 복사 실패",
        saveSuccess: "✅ 저장 성공",
        saveFail: "❌ 저장 실패",
        noOcrResult: "OCR 결과가 비어 있습니다.",
        noTranslationResult: "번역 결과가 비어 있습니다.",
        ocrProcessing: "OCR 처리 중...",
        ocrSuccess: "✅ OCR 처리 완료",
        ocrFail: "❌ OCR 처리 실패",
        translationProcessing: "번역 처리 중...",
        translationSuccess: "✅ 번역 완료",
        translationFail: "❌ 번역 실패",
        ttsProcessing: "TTS 생성 중...",
        ttsSuccess: "✅ TTS 생성 완료",
        ttsFail: "❌ TTS 생성 실패",
        totalLines: "총 {count}줄의 텍스트가 인식되었습니다.",
        totalWords: "총 {count}개의 단어가 인식되었습니다.",
        selectFile: "파일 선택",
        savePathPlaceholder: "예: /Users/사용자이름/Desktop 또는 C:\\Users\\사용자이름\\Desktop",
        enhancedOcrMode: "OCR 정확도 향상 모드:",
        enhancedOcrModeDesc: "이미지 전처리 및 해상도 향상을 통해 OCR 정확도를 개선합니다."
    },
    en: {
        mainTitle: "📄 OCR Translation TTS System",
        start: "Start",
        settings: "⚙️ Settings",
        upload: "Upload",
        add: "Add",
        startOcr: "Start OCR",
        capture: "📸 Full Screen Capture",
        areaCapture: "📐 Area Capture",
        viewResult: "👉 View Result",
        ocrResult: "📝 OCR Result",
        copyOcr: "📋 Copy OCR",
        saveOcr: "📝 Save OCR Result",
        translation: "🌐 Translation",
        selectTargetLang: "Select target language:",
        startTranslation: "Start Translation",
        saveTranslation: "🌐 Save Translation",
        copyTranslation: "📋 Copy Translation",
        tts: "🔊 TTS",
        runTts: "Run TTS",
        backToOcr: "← Back to OCR",
        darkMode: "Dark Mode:",
        defaultOcrLang: "Default OCR Language:",
        customFilename: "Custom Filename:",
        siteLanguage: "Site Language:",
        applySettings: "Apply Settings",
        backToPrevious: "Back to Previous",
        imageUpload: "1. Image Upload",
        ocrLangSelect: "2. OCR Language Selection",
        langKor: "Korean",
        langEng: "English",
        langJpn: "Japanese",
        langChiSim: "Chinese (Simplified)",
        langChiTrad: "Chinese (Traditional)",
        langRus: "Russian",
        langDeu: "German",
        langFra: "French",
        langSpa: "Spanish",
        langVie: "Vietnamese",
        langTha: "Thai",
        noFileSelected: "No file selected",
        uploadSuccess: "✅ Image upload successful",
        uploadFail: "❌ Image upload failed",
        copySuccess: "✅ Copy successful",
        copyFail: "❌ Copy failed",
        saveSuccess: "✅ Save successful",
        saveFail: "❌ Save failed",
        noOcrResult: "OCR result is empty.",
        noTranslationResult: "Translation result is empty.",
        ocrProcessing: "Processing OCR...",
        ocrSuccess: "✅ OCR processing completed",
        ocrFail: "❌ OCR processing failed",
        translationProcessing: "Processing translation...",
        translationSuccess: "✅ Translation completed",
        translationFail: "❌ Translation failed",
        ttsProcessing: "Generating TTS...",
        ttsSuccess: "✅ TTS generation completed",
        ttsFail: "❌ TTS generation failed",
        totalLines: "Total {count} lines of text recognized.",
        totalWords: "Total {count} words recognized.",
        selectFile: "Select File",
        savePathPlaceholder: "Example: /Users/username/Desktop or C:\\Users\\username\\Desktop",
        enhancedOcrMode: "Enhanced OCR Mode:",
        enhancedOcrModeDesc: "Improves OCR accuracy through image preprocessing and resolution enhancement."
    },
};

// 페이지 로드 시 설정 불러오기
document.addEventListener("DOMContentLoaded", () => {
    // 로컬 스토리지 초기화 (첫 실행 시)
    if (!localStorage.getItem("appSettings")) {
        localStorage.setItem("appSettings", JSON.stringify(defaultSettings));
    }

    loadSettings();
    initTargetLangDropdown();

    // 시작하기 버튼 이벤트
    document.getElementById("startBtn").addEventListener("click", () => {
        showScreen("ocrScreen");
    });

    // 캡처 버튼 이벤트
    document.getElementById("screenshotBtn").addEventListener("click", captureAndSend);
    document.getElementById("areaCaptureBtn").addEventListener("click", startAreaCapture);

    // 파일 선택 이벤트 리스너
    const fileInput = document.getElementById("imageInput");
    const selectedFileName = document.getElementById("selectedFileName");

    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        if (file) {
            selectedFileName.textContent = file.name;
        } else {
            selectedFileName.textContent = getTranslatedMessage("noFileSelected");
        }
    });

    // 파일명 입력 필드 이벤트 리스너
    const filenameInput = document.getElementById("filenameInput");
    if (filenameInput) {
        filenameInput.addEventListener("input", () => {
            const settings = JSON.parse(localStorage.getItem("appSettings")) || defaultSettings;
            settings.customFilename = filenameInput.value.trim();
            localStorage.setItem("appSettings", JSON.stringify(settings));
        });
    }

    // 설정 화면의 이전 화면으로 돌아가기 버튼 이벤트
    const backToPreviousBtn = document.querySelector('#settingsScreen button[data-translate="backToPrevious"]');
    if (backToPreviousBtn) {
        backToPreviousBtn.addEventListener("click", () => {
            showScreen(previousScreen);
        });
    }
});

// -------------------- 화면 전환 및 설정 처리 --------------------

/**
 * 화면을 전환하여 지정된 화면을 표시합니다.
 *
 * @param targetId 표시할 화면의 DOM ID
 */
function showScreen(targetId) {
    const screens = ["mainScreen", "ocrScreen", "resultScreen", "settingsScreen"];

    // 설정 화면으로 이동할 때 현재 화면을 저장
    if (targetId === "settingsScreen") {
        screens.forEach(id => {
            const el = document.getElementById(id);
            if (el && el.style.display === "block") {
                previousScreen = id;
            }
        });
    }

    screens.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = (id === targetId) ? "block" : "none";
        }
    });
}

/**
 * 로컬 스토리지에서 설정을 불러와 적용합니다.
 *
 * @return 불러온 설정 객체
 */
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem("appSettings")) || defaultSettings;
    applySettings(settings);
    return settings;
}

/**
 * 현재 운영체제에 맞는 경로 구분자를 반환합니다.
 *
 * @return 경로 구분자 문자열 ('/' 또는 '\\')
 */
function getOSPathSeparator() {
    return navigator.platform.includes('Win') ? '\\' : '/';
}

/**
 * 주어진 경로 문자열을 현재 OS에 맞는 경로 구분자로 정규화합니다.
 *
 * @param path 경로 문자열
 * @return 정규화된 경로 문자열
 */
function normalizePath(path) {
    if (!path) return '';

    // 모든 경로 구분자를 현재 OS에 맞는 구분자로 변환
    const separator = getOSPathSeparator();
    const normalizedPath = path.replace(/[\/\\]/g, separator);

    // 경로 끝에 구분자가 없는 경우 추가
    return normalizedPath.endsWith(separator) ? normalizedPath : normalizedPath + separator;
}

/**
 * 주어진 경로에서 파일명만 추출합니다.
 *
 * @param path 전체 파일 경로
 * @return 파일명 문자열
 */
function getFileNameFromPath(path) {
    const separator = getOSPathSeparator();
    const parts = path.split(/[\/\\]/);
    return parts[parts.length - 1];
}

/**
 * 텍스트 파일을 다운로드합니다.
 *
 * @param content 저장할 텍스트 내용
 * @param defaultFilename 기본 파일명
 */
function downloadTextFile(content, defaultFilename) {
    const settings = JSON.parse(localStorage.getItem("appSettings")) || defaultSettings;
    let filename = settings.useCustomFilename && settings.customFilename
        ? settings.customFilename
        : defaultFilename;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;

    // 다운로드 시작
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // 저장 성공 메시지 표시
    alert(getTranslatedMessage("saveSuccess"));
}

/**
 * 설정 화면에서 입력한 값을 로컬 스토리지에 저장하고 적용합니다.
 */
function saveSettings() {
    const settings = {
        darkMode: document.getElementById("darkModeToggle").checked,
        defaultOcrLang: [document.getElementById("defaultLang").value],
        defaultTranslateLang: document.getElementById("targetLang")?.value || "en",
        useCustomFilename: document.getElementById("customFilename").checked,
        customFilename: document.getElementById("filenameInput").value.trim(),
        siteLanguage: document.getElementById("siteLanguage").value,
        enhancedOcrMode: document.getElementById("enhancedOcrMode").checked
    };

    localStorage.setItem("appSettings", JSON.stringify(settings));
    applySettings(settings);
}

/**
 * 주어진 설정 객체를 바탕으로 화면과 기능에 설정을 적용합니다.
 *
 * @param settings 적용할 설정 객체
 */
function applySettings(settings) {
    // 다크모드 적용
    if (settings.darkMode) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }

    // OCR 언어 설정 적용
    const defaultLangSelect = document.getElementById("defaultLang");
    if (defaultLangSelect) {
        defaultLangSelect.value = settings.defaultOcrLang[0];
    }

    // OCR 언어 드롭다운 업데이트
    const ocrLangDropdown = document.getElementById("ocrLangDropdown");
    if (ocrLangDropdown) {
        ocrLangDropdown.value = settings.defaultOcrLang[0];
        selectedOcrLangs.clear();
        selectedOcrLangs.add(settings.defaultOcrLang[0]);
        updateSelectedLangTags();
    }

    // 번역 언어 설정 적용
    const targetLangSelect = document.getElementById("targetLang");
    if (targetLangSelect) {
        targetLangSelect.value = settings.defaultTranslateLang;
    }

    // 파일명 직접 입력 설정 적용
    const customFilename = document.getElementById("customFilename");
    const filenameInput = document.getElementById("filenameInput");
    if (customFilename && filenameInput) {
        customFilename.checked = settings.useCustomFilename || false;
        filenameInput.value = settings.customFilename || "";
        filenameInput.style.display = settings.useCustomFilename ? "block" : "none";
    }

    // 사이트 언어 적용
    const siteLanguage = document.getElementById("siteLanguage");
    if (siteLanguage) {
        siteLanguage.value = settings.siteLanguage;
        changeSiteLanguage(); // 언어 변경 즉시 적용
    }

    // OCR 정확도 향상 모드 설정 적용
    const enhancedOcrMode = document.getElementById("enhancedOcrMode");
    if (enhancedOcrMode) {
        enhancedOcrMode.checked = settings.enhancedOcrMode || false;
    }
}

/**
 * 다크모드 설정을 토글하여 화면에 적용합니다.
 */
function toggleDarkMode() {
    const isDarkMode = document.getElementById("darkModeToggle").checked;
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}

/**
 * 기본 OCR 언어를 업데이트하고 선택된 언어 태그를 갱신합니다.
 */
function updateDefaultOcrLang() {
    const lang = document.getElementById("defaultLang").value;
    selectedOcrLangs.clear();
    selectedOcrLangs.add(lang);
    updateSelectedLangTags();
}

/**
 * 선택된 OCR 언어 태그 UI를 갱신합니다.
 */
function updateSelectedLangTags() {
    const container = document.getElementById("selectedLangTags");
    container.innerHTML = "";
    const currentLang = getCurrentLanguage();

    selectedOcrLangs.forEach(code => {
        const langKey = getLangKeyFromCode(code);
        const tag = document.createElement("span");
        tag.className = "lang-tag";
        tag.dataset.code = code;
        tag.innerHTML = `${translations[currentLang][langKey]} <button onclick="removeOcrLang('${code}')">×</button>`;
        container.appendChild(tag);
    });
}

/**
 * OCR 언어 드롭다운에서 선택한 언어를 추가합니다.
 */
function addOcrLang() {
    const dropdown = document.getElementById("ocrLangDropdown");
    const langCode = dropdown.value;
    const langText = dropdown.options[dropdown.selectedIndex].text;

    if (selectedOcrLangs.has(langCode)) return;

    selectedOcrLangs.add(langCode);
    updateSelectedLangTags();
}

// -------------------- 번역 및 언어 선택 드롭다운 --------------------
/**
 * 선택된 OCR 언어 태그에서 해당 언어를 제거합니다.
 *
 * @param code 제거할 언어 코드
 */
function removeOcrLang(code) {
    selectedOcrLangs.delete(code);
    updateSelectedLangTags();
}

/**
 * 번역 대상 언어 드롭다운을 초기화합니다.
 */
function initTargetLangDropdown() {
    const select = document.getElementById("targetLang");
    const options = [
        { code: "en", label: "langEng" },
        { code: "ko", label: "langKor" },
        { code: "ja", label: "langJpn" },
        { code: "zh-CN", label: "langChiSim" },
        { code: "zh-TW", label: "langChiTrad" },
        { code: "fr", label: "langFra" },
        { code: "de", label: "langDeu" },
        { code: "es", label: "langSpa" },
        { code: "ru", label: "langRus" },
        { code: "vi", label: "langVie" },
        { code: "th", label: "langTha" }
    ];

    select.innerHTML = '';
    options.forEach(opt => {
        const o = document.createElement("option");
        o.value = opt.code;
        o.setAttribute("data-translate", opt.label);
        const currentLang = getCurrentLanguage();
        o.textContent = translations[currentLang][opt.label] || translations['ko'][opt.label];
        select.appendChild(o);
    });
}

/**
 * OCR 결과 텍스트를 선택된 언어로 번역합니다.
 *
 * @return 없음 (번역 결과는 전역 변수 및 UI에 반영)
 */
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

// -------------------- TTS (음성 합성) --------------------

/**
 * 번역된 텍스트로 TTS 오디오를 생성합니다.
 *
 * @return 없음 (생성된 오디오는 오디오 플레이어에 반영)
 */
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

// -------------------- OCR 및 번역 결과 처리 --------------------

/**
 * OCR 결과 텍스트를 파일로 저장합니다.
 */
function saveOCRResult() {
    const text = document.getElementById("ocrResult")?.innerText || "";
    if (!text.trim()) return alert("OCR 결과가 비어 있습니다.");
    downloadTextFile(text, "ocr_result.txt");
}

/**
 * 번역 결과 텍스트를 파일로 저장합니다.
 */
function saveTranslationResult() {
    const text = document.getElementById("translationResult")?.innerText || "";
    if (!text.trim()) return alert("번역 결과가 비어 있습니다.");
    downloadTextFile(text, "translation_result.txt");
}

/**
 * 번역 결과 텍스트를 클립보드에 복사합니다.
 */
function copyTranslation() {
    const text = document.getElementById("translationResult")?.innerText || "";
    if (!text.trim()) {
        alert(getTranslatedMessage("noTranslationResult"));
        return;
    }
    navigator.clipboard.writeText(text)
        .then(() => alert(getTranslatedMessage("copySuccess")))
        .catch(() => alert(getTranslatedMessage("copyFail")));
}

/**
 * OCR 결과 텍스트를 클립보드에 복사합니다.
 */
function copyOCRResult() {
    const text = document.getElementById("ocrResult")?.innerText || "";
    if (!text.trim()) {
        alert(getTranslatedMessage("noOcrResult"));
        return;
    }
    navigator.clipboard.writeText(text)
        .then(() => alert(getTranslatedMessage("copySuccess")))
        .catch(() => alert(getTranslatedMessage("copyFail")));
}

/**
 * 번역 언어 코드에 맞는 TTS 언어 코드를 반환합니다.
 *
 * @param target 번역 언어 코드
 * @return TTS 언어 코드
 */
function getTTSLang(target) {
    const map = {
        ko: "ko-KR", en: "en-US", ja: "ja-JP", zh: "zh-CN",
        "zh-CN": "zh-CN", "zh-TW": "zh-TW", fr: "fr-FR", de: "de-DE",
        es: "es-ES", ru: "ru-RU", vi: "vi-VN", th: "th-TH"
    };
    return map[target] || "en-US";
}

// -------------------- 화면 캡처 및 OCR --------------------

/**
 * 화면 전체를 캡처하여 이미지 업로드 및 OCR 처리를 수행합니다.
 *
 * @return 없음 (OCR 결과는 UI에 반영)
 */
async function captureAndSend() {
    const lang = Array.from(selectedOcrLangs).join("+");
    const settings = JSON.parse(localStorage.getItem("appSettings")) || defaultSettings;

    let canvas = await html2canvas(document.body);

    // OCR 정확도 향상 모드 적용
    if (settings.enhancedOcrMode) {
        canvas = await preprocessImage(canvas);
        canvas = await enhanceResolution(canvas);
    }

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


/**
 * 사용자가 지정한 화면 영역을 캡처할 수 있도록 오버레이를 띄워줍니다.
 */
function startAreaCapture() {
    // 기존 오버레이가 있다면 제거
    const existingOverlay = document.getElementById("captureOverlay");
    if (existingOverlay) {
        existingOverlay.remove();
    }

    const overlay = document.createElement("div");
    overlay.id = "captureOverlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.zIndex = "9999";
    overlay.style.cursor = "crosshair";
    document.body.appendChild(overlay);

    let startX, startY, box;
    let isCapturing = false;

    overlay.addEventListener("mousedown", e => {
        isCapturing = true;
        startX = e.clientX;
        startY = e.clientY;

        box = document.createElement("div");
        box.className = "selectionBox";
        box.style.position = "absolute";
        box.style.border = "2px solid #00ff00";
        box.style.backgroundColor = "rgba(0, 255, 0, 0.1)";
        box.style.left = `${startX}px`;
        box.style.top = `${startY}px`;
        overlay.appendChild(box);

        const onMouseMove = e => {
            if (!isCapturing) return;

            const width = e.clientX - startX;
            const height = e.clientY - startY;
            box.style.width = `${Math.abs(width)}px`;
            box.style.height = `${Math.abs(height)}px`;
            box.style.left = `${Math.min(e.clientX, startX)}px`;
            box.style.top = `${Math.min(e.clientY, startY)}px`;
        };

        const onMouseUp = async () => {
            if (!isCapturing) return;
            isCapturing = false;

            const rect = box.getBoundingClientRect();
            if (rect.width < 10 || rect.height < 10) {
                overlay.remove();
                return;
            }

            try {
                document.getElementById("areaCaptureStatus").textContent = getTranslatedMessage("ocrProcessing");
                await captureRegion(rect);
                document.getElementById("areaCaptureStatus").textContent = getTranslatedMessage("ocrSuccess");
            } catch (error) {
                console.error("영역 캡처 에러:", error);
                document.getElementById("areaCaptureStatus").textContent = getTranslatedMessage("ocrFail");
            } finally {
                overlay.remove();
            }
        };

        overlay.addEventListener("mousemove", onMouseMove);
        overlay.addEventListener("mouseup", onMouseUp);
    });

    // ESC 키로 캡처 취소
    const onKeyDown = (e) => {
        if (e.key === "Escape") {
            overlay.remove();
            document.removeEventListener("keydown", onKeyDown);
        }
    };
    document.addEventListener("keydown", onKeyDown);
}

/**
 * 지정된 사각형 영역(rect)을 캡처하여 이미지 업로드 및 OCR 처리를 수행합니다.
 *
 * @param rect 캡처할 화면 영역의 getBoundingClientRect 객체
 * @return Promise<void>
 */
async function captureRegion(rect) {
    const lang = Array.from(selectedOcrLangs).join("+");
    const settings = JSON.parse(localStorage.getItem("appSettings")) || defaultSettings;

    try {
        let canvas = await html2canvas(document.body, {
            logging: false,
            useCORS: true,
            allowTaint: true,
            backgroundColor: null
        });

        const cropped = document.createElement("canvas");
        const dpr = window.devicePixelRatio || 1;
        cropped.width = rect.width * dpr;
        cropped.height = rect.height * dpr;

        const ctx = cropped.getContext("2d");
        ctx.scale(dpr, dpr);
        ctx.drawImage(
            canvas,
            rect.left, rect.top, rect.width, rect.height,
            0, 0, rect.width, rect.height
        );

        let processedCanvas = cropped;

        // OCR 정확도 향상 모드 적용
        if (settings.enhancedOcrMode) {
            processedCanvas = await preprocessImage(processedCanvas);
            processedCanvas = await enhanceResolution(processedCanvas);
        }

        return new Promise((resolve, reject) => {
            processedCanvas.toBlob(async blob => {
                try {
                    const file = new File([blob], "area.png", { type: "image/png" });
                    const formData = new FormData();
                    formData.append("file", file);

                    const res = await fetch(`${BASE_URL}/api/image/upload`, {
                        method: "POST",
                        body: formData
                    });

                    if (!res.ok) throw new Error("이미지 업로드 실패");

                    imagePath = await res.text();
                    const ocrRes = await fetch(`${BASE_URL}/api/ocr`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ imagePath, lang })
                    });

                    if (!ocrRes.ok) throw new Error("OCR 처리 실패");

                    const result = await ocrRes.json();
                    document.getElementById("ocrResult").innerText = result.lines.join("\n");
                    resolve();
                } catch (error) {
                    reject(error);
                }
            }, "image/png");
        });
    } catch (error) {
        throw error;
    }
}

/**
 * 업로드된 이미지를 서버로 전송하여 OCR을 수행합니다.
 *
 * @return 없음 (OCR 결과 및 통계는 UI에 반영)
 */
async function performOCR() {
    if (!imagePath) {
        alert(getTranslatedMessage("noFileSelected"));
        return;
    }

    const lang = Array.from(selectedOcrLangs).join("+");
    const settings = JSON.parse(localStorage.getItem("appSettings")) || defaultSettings;

    try {
        document.getElementById("ocrResult").innerText = getTranslatedMessage("ocrProcessing");

        const res = await fetch(`${BASE_URL}/api/ocr`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                imagePath,
                lang,
                enhancedMode: settings.enhancedOcrMode
            })
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "OCR 처리 실패");
        }

        const result = await res.json();
        document.getElementById("ocrResult").innerText = result.lines.join("\n");

        // 줄 수와 단어 수 계산
        const lineCount = result.lines.length;
        const wordCount = result.lines.reduce((count, line) => count + line.split(/\s+/).filter(word => word.length > 0).length, 0);

        // 번역된 통계 메시지 표시
        const statsText = [
            getTranslatedMessage("totalLines", { count: lineCount }),
            getTranslatedMessage("totalWords", { count: wordCount })
        ].join("\n");

        document.getElementById("ocrStats").innerText = statsText;
        document.getElementById("uploadResult").textContent = getTranslatedMessage("ocrSuccess");
    } catch (error) {
        console.error("OCR 에러:", error);
        document.getElementById("uploadResult").textContent = getTranslatedMessage("ocrFail");
    }
}

/**
 * 사용자가 선택한 이미지를 서버에 업로드합니다.
 *
 * @return 없음 (업로드 결과 및 미리보기는 UI에 반영)
 */
async function uploadImage() {
    const fileInput = document.getElementById("imageInput");
    const file = fileInput.files[0];
    if (!file) {
        alert(getTranslatedMessage("noFileSelected"));
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        const res = await fetch(`${BASE_URL}/api/image/upload`, {
            method: "POST",
            body: formData
        });

        if (!res.ok) {
            throw new Error("업로드 실패");
        }

        imagePath = await res.text();
        document.getElementById("uploadResult").textContent = getTranslatedMessage("uploadSuccess");

        const preview = document.getElementById("imagePreview");
        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
    } catch (error) {
        console.error("업로드 에러:", error);
        document.getElementById("uploadResult").textContent = getTranslatedMessage("uploadFail");
    }
}

/**
 * 파일명 직접 입력 체크박스 토글 시 입력 필드 표시를 제어합니다.
 */
function toggleCustomFilename() {
    const checkbox = document.getElementById("customFilename");
    const input = document.getElementById("filenameInput");
    input.style.display = checkbox.checked ? "block" : "none";

    // 파일명 입력 필드에 현재 파일명 표시
    if (checkbox.checked) {
        const settings = JSON.parse(localStorage.getItem("appSettings")) || defaultSettings;
        input.value = settings.customFilename || "result.txt";
    }
}

// -------------------- 언어 변경 및 번역 도우미 --------------------

/**
 * 사이트 언어를 변경하고 화면의 모든 번역 가능한 텍스트를 갱신합니다.
 */
function changeSiteLanguage() {
    const lang = document.getElementById("siteLanguage").value;
    const settings = JSON.parse(localStorage.getItem("appSettings")) || defaultSettings;
    settings.siteLanguage = lang;
    localStorage.setItem("appSettings", JSON.stringify(settings));

    // 페이지 새로고침 없이 언어 변경 적용
    const currentTranslations = translations[lang] || translations['ko'];

    // 모든 버튼, 라벨, 제목, 옵션의 텍스트 업데이트
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (key && currentTranslations[key]) {
            if (element.tagName === 'LABEL') {
                element.textContent = currentTranslations[key] + ':';
            } else if (element.tagName === 'OPTION') {
                element.textContent = currentTranslations[key];
            } else {
                element.textContent = currentTranslations[key];
            }
        }
    });

    // 파일 입력 placeholder 업데이트
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (key && currentTranslations[key]) {
            element.setAttribute('placeholder', currentTranslations[key]);
        }
    });

    // 번역 언어 드롭다운 업데이트
    initTargetLangDropdown();

    // OCR 언어 태그 업데이트
    updateSelectedLangTags();
}

/**
 * 현재 설정된 사이트 언어 코드를 반환합니다.
 *
 * @return 언어 코드 문자열
 */
function getCurrentLanguage() {
    const settings = JSON.parse(localStorage.getItem("appSettings")) || defaultSettings;
    return settings.siteLanguage;
}

/**
 * 현재 언어에 맞는 번역 메시지를 반환합니다.
 *
 * @param key 번역 메시지 키
 * @param params 메시지 내 파라미터({count} 등) 치환용 객체
 * @return 번역된 메시지 문자열
 */
function getTranslatedMessage(key, params = {}) {
    const lang = getCurrentLanguage();
    let message = translations[lang][key] || translations['ko'][key];

    // 파라미터 치환
    Object.keys(params).forEach(param => {
        message = message.replace(`{${param}}`, params[param]);
    });

    return message;
}

/**
 * OCR/번역 언어 코드에서 번역 테이블 키로 변환합니다.
 *
 * @param code 언어 코드
 * @return 번역 키 문자열
 */
function getLangKeyFromCode(code) {
    const codeToKey = {
        'kor': 'langKor',
        'eng': 'langEng',
        'jpn': 'langJpn',
        'chi_sim': 'langChiSim',
        'chi_tra': 'langChiTrad',
        'rus': 'langRus',
        'deu': 'langDeu',
        'fra': 'langFra',
        'spa': 'langSpa',
        'vie': 'langVie',
        'tha': 'langTha'
    };
    return codeToKey[code] || 'langEng';
}

// -------------------- 이미지 전처리 및 해상도 향상 --------------------

/**
 * 이미지 캔버스를 전처리(이진화 등)하여 반환합니다.
 *
 * @param canvas 이미지 캔버스 객체
 * @return 전처리된 캔버스 객체
 */
async function preprocessImage(canvas) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // 그레이스케일 변환 및 대비 향상
    for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const threshold = 128;
        const value = avg > threshold ? 255 : 0;
        data[i] = data[i + 1] = data[i + 2] = value;
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
}

/**
 * 이미지 캔버스의 해상도를 2배로 향상시켜 반환합니다.
 *
 * @param canvas 이미지 캔버스 객체
 * @return 해상도 향상된 새 캔버스 객체
 */
async function enhanceResolution(canvas) {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    
    // 2배 해상도로 확대
    tempCanvas.width = canvas.width * 2;
    tempCanvas.height = canvas.height * 2;
    
    // 이미지 스케일링
    tempCtx.imageSmoothingEnabled = true;
    tempCtx.imageSmoothingQuality = 'high';
    tempCtx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);
    
    return tempCanvas;
}
