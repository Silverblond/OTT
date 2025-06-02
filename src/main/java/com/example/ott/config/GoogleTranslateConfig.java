package com.example.ott.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "google")
public class GoogleTranslateConfig {

    @Value("${GOOGLE_API_KEY}")
    private String apiKey;
}