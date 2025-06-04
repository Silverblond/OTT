package com.example.ott.controller;

import com.example.ott.dto.TTSRequestDto;
import com.example.ott.service.TTSService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tts")
public class TTSController {

    private final TTSService ttsService;

    /**
     * 텍스트를 음성으로 변환하여 audio/mpeg 형식으로 반환하는 엔드포인트
     *
     * @param requestDto 텍스트와 언어 코드가 포함된 요청 DTO
     * @return 변환된 음성 데이터 (MP3)와 함께 200 OK 응답 반환
     */
    @PostMapping(produces = "audio/mpeg")
    public ResponseEntity<byte[]> convertToSpeech(@RequestBody TTSRequestDto requestDto) {
        byte[] audio = ttsService.generateSpeech(requestDto.getText(), requestDto.getLanguageCode());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.valueOf("audio/mpeg"));
        headers.setContentLength(audio.length);

        return new ResponseEntity<>(audio, headers, HttpStatus.OK);
    }
}
