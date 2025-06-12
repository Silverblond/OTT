package com.example.ott.config;

/**
 * WebConfig 클래스는 Spring MVC의 CORS(Cross-Origin Resource Sharing) 설정을 구성한다.
 * 주로 프론트엔드 애플리케이션과의 도메인 간 통신을 허용하기 위해 사용된다.
 */
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * CORS 정책을 설정한다.
     * "/api/**" 경로에 대해 localhost:63342에서의 요청을 허용하며,
     * GET, POST, PUT, DELETE, OPTIONS 메서드 및 모든 헤더를 허용하고, 인증 정보를 포함할 수 있도록 설정한다.
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:63342",
                        "http://3.34.97.31",
                        "http://ec2-3-34-97-31.ap-northeast-2.compute.amazonaws.com",
                        "https://ec2-3-34-97-31.ap-northeast-2.compute.amazonaws.com")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}