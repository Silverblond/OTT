package com.example.ott.service;

import com.example.ott.config.GoogleTranslateConfig;
import com.example.ott.util.TTSUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TTSService {
    private final GoogleTranslateConfig googleTranslateConfig;

    public byte[] generateSpeech(String text, String languageCode){
        return TTSUtil.synthesizeSpeech(text, languageCode, googleTranslateConfig.getApiKey());
    }
}
