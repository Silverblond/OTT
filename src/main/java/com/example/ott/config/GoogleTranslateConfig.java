package com.example.ott.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Google Translate API 설정 클래스
 *
 * 이 클래스는 application.yml 또는 환경변수에서 설정된
 * GOOGLE_API_KEY 값을 로드하여 사용할 수 있도록 한다.
 */

/**
 * Google Translate 설정 정보를 담는 구성 클래스
 */
@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "google")
public class GoogleTranslateConfig {

    /**
     * Google Translate API 키
     * 환경 변수 GOOGLE_API_KEY 값을 주입받음
     */
    @Value("${GOOGLE_API_KEY}")
    private String apiKey;
}