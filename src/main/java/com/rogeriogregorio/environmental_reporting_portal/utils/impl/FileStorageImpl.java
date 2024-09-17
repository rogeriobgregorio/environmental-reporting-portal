package com.rogeriogregorio.environmental_reporting_portal.utils.impl;

import com.rogeriogregorio.environmental_reporting_portal.utils.CatchError;
import com.rogeriogregorio.environmental_reporting_portal.utils.FileStorage;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class FileStorageImpl implements FileStorage {

    private static final String STORAGE_DIRECTORY = "uploads/";
    private static final Logger LOGGER = LogManager.getLogger(FileStorageImpl.class);

    private final CatchError catchError;

    @Autowired
    public FileStorageImpl(CatchError catchError) {
        this.catchError = catchError;
    }


    public List<String> saveFiles(List<MultipartFile> files) {

        List<String> fileNames = new ArrayList<>();

        for (MultipartFile file : files) {

            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path path = Paths.get(STORAGE_DIRECTORY + fileName);

            catchError.run(() -> {
                Files.createDirectories(path.getParent());
                Files.write(path, file.getBytes());
            });

            fileNames.add(fileName);
            LOGGER.info("File saved: {}", fileName);
        }

        return fileNames;
    }

    public void deleteFiles(List<String> fileNames) {

        for (String fileName : fileNames) {
            Path path = Paths.get(STORAGE_DIRECTORY + fileName);
            catchError.run(() -> Files.deleteIfExists(path));
            LOGGER.warn("File deleted: {}", path);
        }
    }
}
