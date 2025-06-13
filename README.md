# OTT
OCR, Translate and TTS

# OCR + 번역 서비스 프로젝트 (OTT)

손글씨 및 이미지에서 텍스트를 추출(OCR)한 후 번역 결과를 제공하는 웹 서비스입니다.  
**Spring Boot + Gradle + Tess4J + Tesseract OCR 엔진** 기반으로 구현되었습니다.

---

## 📂 프로젝트 구성

- Backend : Spring Boot (Gradle)
- Frontend : HTML + JavaScript
- OCR : Tesseract OCR (Tess4J 라이브러리 사용)

---

## 🚀 설치 및 실행 방법

---

## 📦 설치 방법 (Windows / macOS / Ubuntu 전부 포함)

---

### 🪟 Windows 설치 방법

#### 1️⃣ Java 17 설치

- [AdoptOpenJDK](https://adoptium.net/) 또는 [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) 에서 Java 17 설치
- 설치 후 `JAVA_HOME` 환경변수 설정 필요

#### 2️⃣ Git 설치

- [Git 공식 다운로드](https://git-scm.com/download/win)에서 설치

#### 3️⃣ Tesseract 설치

Chocolatey 사용 (권장):

```powershell
choco install tesseract
```
또는 https://github.com/tesseract-ocr/tessdoc 다운로드 후 설치

#### 4️⃣ kor.traineddata 설치 확인

```powershell
# kor.traineddata 파일이 아래 경로에 존재하는지 확인
C:\Program Files\Tesseract-OCR\tessdata\kor.traineddata
```
없으면 https://github.com/tesseract-ocr/tessdata에 직접 다운로드 후 tessdata 폴더에 넣기

### 🍏 macOS 설치 방법

#### 1️⃣ Homebrew 설치 (없다면)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

설치 후 path 설정:
```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

#### 2️⃣ Java 17 설치

```bash
brew install openjdk@17
```

#### 3️⃣ Gradle 설치 (옵션)

```bash
brew install gradle
```

설정 확인:
```bash
gradle -v
```

#### 4️⃣ Git 설치

```bash
brew install git
```

설치 확인:
```bash
git --version
```

#### 5️⃣ Tesseract 설치

```bash
brew install tesseract
```

#### 6️⃣ Tesseract 언어 데이터 설치 (한국어 포함)

```bash
brew install tesseract-lang
```

### 🐧 Ubuntu 설치 방법

#### 1️⃣ Java 17 설치

```bash
sudo apt update
sudo apt install -y openjdk-17-jdk
```

설정 확인:
```bash
java -version
```

#### 2️⃣ Git 설치

```bash
sudo apt install -y git
```

설치 확인:
```bash
git --version
```

#### 3️⃣ Gradle 설치 (옵션)

```bash
sudo apt install -y gradle
```

설치 확인:
```bash
gradle -v
```

#### 4️⃣ Tesseract 설치

```bash
sudo apt install -y tesseract-ocr
```

### ⚙️ 프로젝트 실행 방법

#### 1️⃣ 프로젝트 다운로드
```bash
git clone https://github.com/Silverblond/OTT.git
cd OTT
```

#### 2️⃣ Backend 실행

```bash
./gradlew bootRun
```
