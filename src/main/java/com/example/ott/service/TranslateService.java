package com.example.ott.service;

import com.example.ott.config.GoogleTranslateConfig;
import com.example.ott.util.TranslateUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Google Translate API를 사용하여 텍스트를 지정된 언어로 번역하는 서비스 클래스
 *
 * 주요 기능:
 * - translate: 입력 텍스트와 대상 언어를 받아 번역 결과를 반환
 */
@Service
@RequiredArgsConstructor
public class TranslateService {

    private final GoogleTranslateConfig config;

    /**
     * 주어진 텍스트를 대상 언어로 번역
     *
     * @param text       원본 텍스트
     * @param targetLang 번역할 대상 언어 코드 (예: "en", "ko")
     * @return           번역된 텍스트 문자열
     */
    public String translate(String text, String targetLang) {
        return TranslateUtil.translateText(text, targetLang, config.getApiKey());
    }
}
