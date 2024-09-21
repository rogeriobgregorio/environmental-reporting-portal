package com.rogeriogregorio.environmental_reporting_portal.utils;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Component
public interface FileStorage {

    List<String> saveFilesAndGetUrls(List<MultipartFile> files);

    void deleteFiles(List<String> fileNames) throws IOException;
}
