package com.example.ott.controller;

import com.example.ott.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * 이미지 파일 업로드를 처리하는 컨트롤러
 *
 * 이 컨트롤러는 클라이언트로부터 Multipart 형식의 이미지를 업로드받아
 * FileStorageService를 통해 저장한 후 저장 경로를 반환합니다.
 */
@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/image")
public class ImageController {

    private final FileStorageService fileStorageService;

    /**
     * 이미지 업로드 API
     *
     * @param file 업로드할 이미지 파일 (Multipart 형식)
     * @return 저장된 이미지의 경로 문자열을 포함한 ResponseEntity
     */
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        //파일 저장 후 저장된 경로 반환
        String savedPath = fileStorageService.saveImage(file);
        return ResponseEntity.ok(savedPath);
    }
}
