package com.example.ott.util;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import okhttp3.*;

public class TranslateUtil {

    // Google Cloud Translation API 엔드포인트
    private static final String API_URL = "https://translation.googleapis.com/language/translate/v2";

    /**
     * Google 번역 API를 호출하여 주어진 텍스트를 대상 언어로 번역합니다.
     *
     * @param text      원본 텍스트
     * @param targetLang 대상 언어 코드 (예: "en", "ja", "zh-CN" 등)
     * @param apiKey    Google Cloud API 키
     * @return          번역된 텍스트
     */
    public static String translateText(String text, String targetLang, String apiKey) {
        try {
            OkHttpClient client = new OkHttpClient();

            // JSON 요청 바디 구성
            String jsonBody = String.format(
                    "{\"q\":\"%s\", \"target\":\"%s\", \"format\":\"text\"}",
                    text, targetLang
            );

            RequestBody body = RequestBody.create(jsonBody, MediaType.get("application/json"));
            Request request = new Request.Builder()
                    .url(API_URL + "?key=" + apiKey)
                    .post(body)
                    .addHeader("Content-Type", "application/json")
                    .build();

            // API 호출 및 응답 처리
            Response response = client.newCall(request).execute();
            String responseStr = response.body().string();

            JsonObject json = JsonParser.parseString(responseStr).getAsJsonObject();
            return json.getAsJsonObject("data")
                    .getAsJsonArray("translations")
                    .get(0).getAsJsonObject()
                    .get("translatedText").getAsString();

        } catch (Exception e) {
            throw new RuntimeException("Google 번역 API 호출 실패", e);
        }
    }
}