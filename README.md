# OTT
OCR, Translate and TTS

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

## 📦 설치 방법 (Windows / macOS / Ubuntu)
    
---

### 🪟 Windows 설치 방법

#### 1️⃣ Java 17 설치

- [AdoptOpenJDK](https://adoptium.net/) 또는 [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) 에서 Java 17 설치

#### 2️⃣ Git 설치 및 Chocolatey 설치

- [Git 공식 다운로드](https://git-scm.com/download/win)에서 설치

powershell을 관리자 권한으로 실행
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

설치 확인:
```powershell
choco
```
버전이 나온다면 정상설치 완료

#### 3️⃣ Tesseract 설치

Chocolatey 사용 (권장):

```powershell
choco install tesseract
```
또는 https://github.com/tesseract-ocr/tessdoc 다운로드 후 설치

```powershell
# 영어
Invoke-WebRequest -Uri "https://github.com/tesseract-ocr/tessdata/raw/main/eng.traineddata" -OutFile "C:\Program Files\Tesseract-OCR\tessdata\eng.traineddata"
# 한국어
Invoke-WebRequest -Uri "https://github.com/tesseract-ocr/tessdata/raw/main/kor.traineddata" -OutFile "C:\Program Files\Tesseract-OCR\tessdata\kor.traineddata"
# 일본어
Invoke-WebRequest -Uri "https://github.com/tesseract-ocr/tessdata/raw/main/jpn.traineddata" -OutFile "C:\Program Files\Tesseract-OCR\tessdata\jpn.traineddata"
# 중국어 간체
Invoke-WebRequest -Uri "https://github.com/tesseract-ocr/tessdata/raw/main/chi_sim.traineddata" -OutFile "C:\Program Files\Tesseract-OCR\tessdata\chi_sim.traineddata"
# 러시아어
Invoke-WebRequest -Uri "https://github.com/tesseract-ocr/tessdata/raw/main/rus.traineddata" -OutFile "C:\Program Files\Tesseract-OCR\tessdata\rus.traineddata"
# 독일어
Invoke-WebRequest -Uri "https://github.com/tesseract-ocr/tessdata/raw/main/deu.traineddata" -OutFile "C:\Program Files\Tesseract-OCR\tessdata\deu.traineddata"
# 프랑스어
Invoke-WebRequest -Uri "https://github.com/tesseract-ocr/tessdata/raw/main/fra.traineddata" -OutFile "C:\Program Files\Tesseract-OCR\tessdata\fra.traineddata"
# 스페인어
Invoke-WebRequest -Uri "https://github.com/tesseract-ocr/tessdata/raw/main/spa.traineddata" -OutFile "C:\Program Files\Tesseract-OCR\tessdata\spa.traineddata"
```
#### 4️⃣ kor.traineddata 설치 확인

```powershell
# kor.traineddata 파일이 아래 경로에 존재하는지 확인
C:\Program Files\Tesseract-OCR\tessdata\kor.traineddata
```
없으면 https://github.com/tesseract-ocr/tessdata 에 직접 다운로드 후 tessdata 폴더에 넣기

---

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

---

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

#### 45️⃣ Tesseract 언어 데이터 설치 (한국어 포함)

```bash
sudo apt install -y tesseract-ocr tesseract-ocr-eng tesseract-ocr-kor tesseract-ocr-jpn tesseract-ocr-chi-sim tesseract-ocr-rus tesseract-ocr-deu tesseract-ocr-fra tesseract-ocr-spa
```

### ⚙️ 프로젝트 실행 방법

#### 1️⃣ 프로젝트 다운로드
```bash
git clone https://github.com/Silverblond/OTT.git
cd OTT
```

#### 2️⃣ Backend 실행

mac/ubuntu일 경우:
```bash
GOOGLE_API_KEY=<API KEY> TESSDATA_PREFIX=<tessdata path> ./gradlew bootRun
```
환경 변수 파일을 생성하고 export로 설정하시고 하셔도됩니다.

tessdata 경로:
```bash
TESSDATA_PREFIX=C:\Program Files\Tesseract-OCR\tessdata
TESSDATA_PREFIX=/opt/homebrew/share/tessdata
TESSDATA_PREFIX=/usr/share/tesseract-ocr/5/tessdata
```

❗윈도우는 다름:
```powershell
$env:GOOGLE_API_KEY = "API KEY"
$env:TESSDATA_PREFIX = "path"
```
환경 변수를 지정하고 시작해야한다. 해당 환경 변수는 해당 세션동안만 임시로 지정되는 환경변수이다.

그리고 이후 해당 명령어로 실행.
```powershell
./gradlew bootRun
```

Google API 키는 발급한 키를 과제 제출시 따로 제출하겠습니다.

#### 3️⃣ 홈페이지 연결
http://localhost:8080으로 접속

#### 4️⃣ 테스트 및 첨언
- 기타 다른 사진으로 실험해보셔도 됩니다.
- 일단 예시 사진은 image 폴더 안에 있으니 해보셔도됩니다.
- 정확도가 높은 편은 아닙니다. 그리고 단점은 자동 언어 인식을 못하기 때문에, 복합적인 언어가 나오면 해당 언어를 추가하여 복수로 등록해줘야합니다.
- 전체 화면 캡쳐는 해당 사이트 내의 전체 화면을 캡쳐합니다.
- 부분 캡쳐는 해당 화면 내에서 부분을 캡쳐합니다. 하지만 정확도가 매우 낮고 인식율이 많이 좋지 않습니다.
- TTS는 번역 설정 언어를 기반으로 하여 읽어줍니다.