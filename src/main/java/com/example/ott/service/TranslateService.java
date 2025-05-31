package com.example.ott.service;

import com.example.ott.config.GoogleTranslateConfig;
import com.example.ott.util.TranslateUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TranslateService {

    private final GoogleTranslateConfig config;

    public String translate(String text, String targetLang) {
        return TranslateUtil.translateText(text, targetLang, config.getApiKey());
    }
}
