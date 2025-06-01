package com.example.ott.util;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import okhttp3.*;

import java.util.Base64;

public class TTSUtil {
    private static final String API_URL = "https://texttospeech.googleapis.com/v1/text:synthesize";

    public static byte[] synthesizeSpeech(String text, String languageCode, String apiKey) {
        try {
            OkHttpClient client = new OkHttpClient();

            JsonObject input = new JsonObject();
            input.addProperty("text", text);

            JsonObject voice = new JsonObject();
            voice.addProperty("languageCode", languageCode);
            voice.addProperty("ssmlGender", "FEMALE");

            JsonObject audioConfig = new JsonObject();
            audioConfig.addProperty("audioEncoding", "MP3");

            JsonObject payload = new JsonObject();
            payload.add("input", input);
            payload.add("voice", voice);
            payload.add("audioConfig", audioConfig);

            RequestBody body = RequestBody.create(payload.toString(), MediaType.get("application/json"));
            Request request = new Request.Builder()
                    .url(API_URL + "?key=" + apiKey)
                    .post(body)
                    .addHeader("Content-Type", "application/json")
                    .build();

            Response response = client.newCall(request).execute();
            String responseStr = response.body().string();

            JsonObject json = JsonParser.parseString(responseStr).getAsJsonObject();
            String audioContent = json.get("audioContent").getAsString();
            return Base64.getDecoder().decode(audioContent);

        } catch (Exception e) {
            throw new RuntimeException("Google TTS 호출 실패", e);
        }
    }
}
