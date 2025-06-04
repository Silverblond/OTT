package com.example.ott.controller;

import com.example.ott.dto.TranslationDto;
import com.example.ott.dto.TranslationRequestDto;
import com.example.ott.service.TranslateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 번역 요청을 처리하는 컨트롤러
 *
 * 클라이언트로부터 원문과 대상 언어를 받아 번역된 결과를 반환한다.
 * 엔드포인트: POST /api/translate
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/translate")
public class TranslateController {

    private final TranslateService translateService;

    @PostMapping
    public TranslationDto translatText(@RequestBody TranslationRequestDto requestDto) {
        String translated = translateService.translate(requestDto.getOriginalText(),requestDto.getTargetLang());
        return new TranslationDto(translated);
    }
}
