package com.example.ott.service;

import com.example.ott.config.OCRConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileStorageService {
    private final OCRConfig ocrConfig;

    public String saveImage(MultipartFile file){
        //상대 경로를 절대 경로로 변환후 정규화
        String uploadDir = Paths.get(ocrConfig.getSaveDir())
                .toAbsolutePath()
                .normalize()
                .toString();

        //저장 경로(디렉터리) 없으면 생성
        File saveDirectory = new File(uploadDir);
        if (!saveDirectory.exists()) {
            saveDirectory.mkdirs();
        }

        //UUID를 통한 파일 이름 중복 방지
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        File destination = new File(uploadDir + File.separator + filename);

        try {
            //실제 파일 저장
            file.transferTo(destination);
        } catch (IOException e) {
            throw new RuntimeException("이미지 저장 실패", e);
        }
        //저장된 파일의 절대 경로 반환
        return destination.getAbsolutePath();
    }
}
