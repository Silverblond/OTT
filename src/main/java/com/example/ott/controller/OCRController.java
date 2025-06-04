package com.example.ott.controller;

import com.example.ott.dto.OCRRequestDto;
import com.example.ott.dto.OCRResultDto;
import com.example.ott.service.OCRService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ocr")
public class OCRController {

    // OCR 처리를 위한 서비스 의존성 주입
    private final OCRService ocrService;

    /**
     * 클라이언트로부터 전달받은 이미지 경로와 언어 코드로 OCR을 수행하고 결과를 반환합니다.
     *
     * @param requestDto OCRRequestDto 객체 (imagePath: 이미지 경로, lang: 언어 코드)
     * @return OCRResultDto 객체 - 줄 단위로 분리된 OCR 결과 텍스트 리스트를 포함
     */
    @PostMapping
    public OCRResultDto ocrImage(@RequestBody OCRRequestDto requestDto) {
        String imagePath = requestDto.getImagePath();
        String lang = requestDto.getLang(); // 클라이언트로부터 전달받은 언어 코드

        List<String> lines = ocrService.performOCR(imagePath, lang);
        return new OCRResultDto(lines);
    }
}