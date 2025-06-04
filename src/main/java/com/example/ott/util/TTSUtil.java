package com.example.ott.util;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import okhttp3.*;

import java.util.Base64;

public class TTSUtil {

    /**
     * Google TTS API 호출 URL
     */
    private static final String API_URL = "https://texttospeech.googleapis.com/v1/text:synthesize";

    /**
     * Google TTS API를 사용하여 텍스트를 음성으로 변환
     *
     * @param text         변환할 텍스트
     * @param languageCode 언어 코드 (예: "ko-KR", "en-US")
     * @param apiKey       Google Cloud API 키
     * @return MP3 형식의 음성 데이터를 바이트 배열로 반환
     */
    public static byte[] synthesizeSpeech(String text, String languageCode, String apiKey) {
        try {
            OkHttpClient client = new OkHttpClient();

            // 입력 텍스트 설정
            JsonObject input = new JsonObject();
            input.addProperty("text", text);

            // 음성 설정 (언어 및 성별)
            JsonObject voice = new JsonObject();
            voice.addProperty("languageCode", languageCode);
            voice.addProperty("ssmlGender", "FEMALE");

            // 오디오 출력 포맷 설정
            JsonObject audioConfig = new JsonObject();
            audioConfig.addProperty("audioEncoding", "MP3");

            // 최종 요청 페이로드 구성
            JsonObject payload = new JsonObject();
            payload.add("input", input);
            payload.add("voice", voice);
            payload.add("audioConfig", audioConfig);

            // HTTP 요청 생성
            RequestBody body = RequestBody.create(payload.toString(), MediaType.get("application/json"));
            Request request = new Request.Builder()
                    .url(API_URL + "?key=" + apiKey)
                    .post(body)
                    .addHeader("Content-Type", "application/json")
                    .build();

            // 요청 실행 및 응답 처리
            Response response = client.newCall(request).execute();
            String responseStr = response.body().string();

            JsonObject json = JsonParser.parseString(responseStr).getAsJsonObject();
            if (!json.has("audioContent")) {
                throw new RuntimeException("audioContent 누락 - 응답 JSON: " + responseStr);
            }

            // Base64로 인코딩된 오디오 콘텐츠 디코딩하여 반환
            String audioContent = json.get("audioContent").getAsString();
            return Base64.getDecoder().decode(audioContent);

        } catch (Exception e) {
            throw new RuntimeException("Google TTS 호출 실패", e);
        }
    }
}
