package com.example.ott.service;

import com.example.ott.util.TesseractUtil;
import lombok.RequiredArgsConstructor;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OCRService {

    public String performOCR(String imagePath) {
        try{
            return TesseractUtil.extractText(imagePath);
        } catch (TesseractException e) {
            throw new RuntimeException("OCR 처리 실패, e");
        }
    }
}
