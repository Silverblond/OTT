package com.example.ott.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * OCR 관련 설정을 주입받기 위한 설정 클래스.
 * application.yml 에서 'ocr' 접두어로 시작하는 설정을 읽어들인다.
 */
@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "ocr")
public class OCRConfig {
    /**
     * OCR 결과 파일을 저장할 디렉토리 경로
     */
    private String saveDir;
}
