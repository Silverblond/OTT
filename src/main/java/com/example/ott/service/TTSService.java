package com.example.ott.service;

import com.example.ott.config.GoogleTranslateConfig;
import com.example.ott.util.TTSUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * 텍스트를 음성으로 변환하는 TTS 서비스를 제공하는 클래스
 */
@Service
@RequiredArgsConstructor
public class TTSService {
    /**
     * Google Translate 관련 API 키를 담고 있는 설정 클래스
     */
    private final GoogleTranslateConfig googleTranslateConfig;

    /**
     * 주어진 텍스트와 언어 코드를 이용해 음성 데이터를 생성합니다.
     *
     * @param text          변환할 텍스트
     * @param languageCode  언어 코드 (예: "en-US", "ko-KR" 등)
     * @return              생성된 음성 데이터 (byte 배열 형식)
     */
    public byte[] generateSpeech(String text, String languageCode){
        return TTSUtil.synthesizeSpeech(text, languageCode, googleTranslateConfig.getApiKey());
    }
}
