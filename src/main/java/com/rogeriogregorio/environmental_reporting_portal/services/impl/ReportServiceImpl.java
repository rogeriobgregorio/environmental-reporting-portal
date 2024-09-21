package com.rogeriogregorio.environmental_reporting_portal.services.impl;

import com.rogeriogregorio.environmental_reporting_portal.dto.request.ReportRequest;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.ReportResponse;
import com.rogeriogregorio.environmental_reporting_portal.entities.Report;
import com.rogeriogregorio.environmental_reporting_portal.entities.User;
import com.rogeriogregorio.environmental_reporting_portal.exceptions.NotFoundException;
import com.rogeriogregorio.environmental_reporting_portal.mail.MailService;
import com.rogeriogregorio.environmental_reporting_portal.repositories.ReportRepository;
import com.rogeriogregorio.environmental_reporting_portal.services.ReportService;
import com.rogeriogregorio.environmental_reporting_portal.services.UserService;
import com.rogeriogregorio.environmental_reporting_portal.utils.CatchError;
import com.rogeriogregorio.environmental_reporting_portal.utils.DataMapper;
import com.rogeriogregorio.environmental_reporting_portal.utils.FileStorage;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;
    private final UserService userService;
    private final MailService mailService;
    private final FileStorage fileStorage;
    private final CatchError catchError;
    private final DataMapper dataMapper;
    private static final Logger LOGGER = LogManager.getLogger(ReportServiceImpl.class);

    @Autowired
    public ReportServiceImpl(ReportRepository reportRepository,
                             UserService userService,
                             MailService mailService,
                             FileStorage fileStorage,
                             CatchError catchError,
                             DataMapper dataMapper) {

        this.reportRepository = reportRepository;
        this.userService = userService;
        this.mailService = mailService;
        this.fileStorage = fileStorage;
        this.catchError = catchError;
        this.dataMapper = dataMapper;
    }

    public Page<ReportResponse> findAllReports(Pageable pageable) {

        return catchError.run(() -> reportRepository.findAll(pageable))
                .map(report -> dataMapper.map(report, ReportResponse.class));
    }

    public ReportResponse createReport(ReportRequest reportRequest) {

        User author = userService.getUserIfExists(reportRequest.getAuthorId());
        List<String> imageURLs = fileStorage.saveFilesAndGetUrls(reportRequest.getImages());

        Report report = Report.newBuilder()
                .withAuthor(author)
                .withDescription(reportRequest.getDescription())
                .withImageURLs(imageURLs)
                .withLocation(reportRequest.getLocation())
                .withSeverityLevel(reportRequest.getSeverityLevel())
                .withReportType(reportRequest.getReportType())
                .withTimeStamp(Instant.now())
                .build();

        Report reportSaved = catchError.run(() -> reportRepository.save(report));
        LOGGER.info("Report created: {}", reportSaved);
        return dataMapper.map(reportSaved, ReportResponse.class);
    }

    public ReportResponse updateReport(String id, ReportRequest reportRequest) {

        Report existingReport = getReportIfExists(id);

        List<String> existingImageNames = existingReport.getImageURLs().stream()
                .map(url -> url.substring(url.lastIndexOf("/") + 1)).toList();

        catchError.run(() -> fileStorage.deleteFiles(existingImageNames));

        List<String> newImageURLs = fileStorage.saveFilesAndGetUrls(reportRequest.getImages());

        Report updatedReport = existingReport.toBuilder()
                .withDescription(reportRequest.getDescription())
                .withImageURLs(newImageURLs)
                .withLocation(reportRequest.getLocation())
                .withSeverityLevel(reportRequest.getSeverityLevel())
                .withReportType(reportRequest.getReportType())
                .build();

        Report savedReport = catchError.run(() -> reportRepository.save(updatedReport));
        LOGGER.info("Report updated: {}", savedReport);
        return dataMapper.map(savedReport, ReportResponse.class);
    }


    public ReportResponse updateReportStatus(String id, Integer reportStatus) {

        Report updatedReport = getReportIfExists(id)
                .toBuilder()
                .withReportStatus(reportStatus)
                .build();

        Report savedReport = catchError.run(() -> reportRepository.save(updatedReport));
        LOGGER.info("ReportStatus updated : {}", savedReport);

        // TODO reativar em produção
        //CompletableFuture.runAsync(() -> mailService.sendReportStatusUpdateEmail(updatedReport));
        return dataMapper.map(savedReport, ReportResponse.class);
    }

    public ReportResponse findReportById(String id) {

        return catchError.run(() -> reportRepository.findById(id))
                .map(report -> dataMapper.map(report, ReportResponse.class))
                .orElseThrow(() -> new NotFoundException("Report not found with ID: " + id + "."));
    }

    public void deleteReport(String id) {

        Report report = getReportIfExists(id);

        List<String> existingImageNames = report.getImageURLs().stream()
                .map(url -> url.substring(url.lastIndexOf("/") + 1)).toList();

        catchError.run(() -> {
            fileStorage.deleteFiles(existingImageNames);
            reportRepository.delete(report);
        });
        LOGGER.warn("Report deleted: {}", report);
    }

    public Report getReportIfExists(String id) {

        return catchError.run(() -> reportRepository.findById(id))
                .orElseThrow(() -> new NotFoundException("Report not found with ID: " + id + "."));
    }

    public Page<ReportResponse> findReportsByAuthorNameOrEmail(String name, String email, Pageable pageable) {
        return catchError.run(() -> reportRepository.findByAuthorNameOrEmail(name, email, pageable))
                .map(report -> dataMapper.map(report, ReportResponse.class));
    }

    public Page<ReportResponse> findReportsBySeverityLevel(Integer severityLevel, Pageable pageable) {

        return catchError.run(() -> reportRepository.findBySeverityLevel(severityLevel, pageable))
                .map(report -> dataMapper.map(report, ReportResponse.class));
    }

    public Page<ReportResponse> findReportsByReportType(Integer reportType, Pageable pageable) {

        return catchError.run(() -> reportRepository.findByReportType(reportType, pageable))
                .map(report -> dataMapper.map(report, ReportResponse.class));
    }

    public Page<ReportResponse> findReportsByReportStatus(Integer reportStatus, Pageable pageable) {

        return catchError.run(() -> reportRepository.findByReportStatus(reportStatus, pageable))
                .map(report -> dataMapper.map(report, ReportResponse.class));
    }
}
