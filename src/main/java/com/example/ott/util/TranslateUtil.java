package com.example.ott.util;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import okhttp3.*;

import java.util.ArrayList;
import java.util.List;

public class TranslateUtil {

    // Google Cloud Translation API 엔드포인트
    private static final String API_URL = "https://translation.googleapis.com/language/translate/v2";
    private static final int MAX_CHARS_PER_REQUEST = 5000; // API 제한보다 여유있게 설정

    /**
     * Google 번역 API를 호출하여 주어진 텍스트를 대상 언어로 번역합니다.
     *
     * @param text      원본 텍스트
     * @param targetLang 대상 언어 코드 (예: "en", "ja", "zh-CN" 등)
     * @param apiKey    Google Cloud API 키
     * @return          번역된 텍스트
     */
    public static String translateText(String text, String targetLang, String apiKey) {
        if (text == null || text.trim().isEmpty()) {
            return "";
        }

        try {
            List<String> chunks = splitTextIntoChunks(text);
            List<String> translatedChunks = new ArrayList<>();

            for (String chunk : chunks) {
                if (chunk.trim().isEmpty()) continue;
                String translated = translateChunk(chunk, targetLang, apiKey);
                if (translated != null && !translated.isEmpty()) {
                    translatedChunks.add(translated);
                }
            }

            return String.join("\n", translatedChunks);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("번역 처리 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    private static List<String> splitTextIntoChunks(String text) {
        List<String> chunks = new ArrayList<>();
        if (text == null || text.trim().isEmpty()) {
            return chunks;
        }

        String[] lines = text.split("\n");
        StringBuilder currentChunk = new StringBuilder();
        int currentLength = 0;

        for (String line : lines) {
            line = line.trim();
            if (line.isEmpty()) continue;

            int lineLength = line.length();
            
            if (currentLength + lineLength + 1 > MAX_CHARS_PER_REQUEST) {
                if (currentChunk.length() > 0) {
                    chunks.add(currentChunk.toString());
                    currentChunk = new StringBuilder();
                    currentLength = 0;
                }
                
                // 한 줄이 MAX_CHARS_PER_REQUEST보다 길 경우
                if (lineLength > MAX_CHARS_PER_REQUEST) {
                    int start = 0;
                    while (start < lineLength) {
                        int end = Math.min(start + MAX_CHARS_PER_REQUEST, lineLength);
                        chunks.add(line.substring(start, end));
                        start = end;
                    }
                    continue;
                }
            }

            if (currentChunk.length() > 0) {
                currentChunk.append("\n");
                currentLength++;
            }
            currentChunk.append(line);
            currentLength += lineLength;
        }

        if (currentChunk.length() > 0) {
            chunks.add(currentChunk.toString());
        }

        return chunks;
    }

    private static String translateChunk(String text, String targetLang, String apiKey) {
        if (text == null || text.trim().isEmpty()) {
            return "";
        }

        try {
            OkHttpClient client = new OkHttpClient();

            String jsonBody = String.format(
                    "{\"q\":\"%s\", \"target\":\"%s\", \"format\":\"text\"}",
                    text.replace("\"", "\\\""), targetLang
            );

            RequestBody body = RequestBody.create(jsonBody, MediaType.get("application/json"));
            Request request = new Request.Builder()
                    .url(API_URL + "?key=" + apiKey)
                    .post(body)
                    .addHeader("Content-Type", "application/json")
                    .build();

            Response response = client.newCall(request).execute();
            if (!response.isSuccessful()) {
                throw new RuntimeException("API 응답 오류: " + response.code());
            }

            String responseStr = response.body().string();
            JsonObject json = JsonParser.parseString(responseStr).getAsJsonObject();
            
            if (!json.has("data") || !json.getAsJsonObject("data").has("translations")) {
                throw new RuntimeException("API 응답 형식 오류");
            }

            return json.getAsJsonObject("data")
                    .getAsJsonArray("translations")
                    .get(0).getAsJsonObject()
                    .get("translatedText").getAsString();

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("번역 처리 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
}