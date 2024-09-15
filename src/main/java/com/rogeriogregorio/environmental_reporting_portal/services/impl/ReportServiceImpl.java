package com.rogeriogregorio.environmental_reporting_portal.services.impl;

import com.rogeriogregorio.environmental_reporting_portal.dto.request.ReportRequest;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.ReportResponse;
import com.rogeriogregorio.environmental_reporting_portal.entities.Report;
import com.rogeriogregorio.environmental_reporting_portal.entities.User;
import com.rogeriogregorio.environmental_reporting_portal.exceptions.NotFoundException;
import com.rogeriogregorio.environmental_reporting_portal.repositories.ReportRepository;
import com.rogeriogregorio.environmental_reporting_portal.services.ReportService;
import com.rogeriogregorio.environmental_reporting_portal.services.UserService;
import com.rogeriogregorio.environmental_reporting_portal.utils.CatchError;
import com.rogeriogregorio.environmental_reporting_portal.utils.DataMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;
    private final UserService userService;
    private final CatchError catchError;
    private final DataMapper dataMapper;
    private static final Logger LOGGER = LogManager.getLogger(ReportServiceImpl.class);

    @Autowired
    public ReportServiceImpl(ReportRepository reportRepository,
                             UserService userService,
                             CatchError catchError,
                             DataMapper dataMapper) {

        this.reportRepository = reportRepository;
        this.userService = userService;
        this.catchError = catchError;
        this.dataMapper = dataMapper;
    }

    public Page<ReportResponse> findAllReports(Pageable pageable) {

        return catchError.run(() -> reportRepository.findAll(pageable))
                .map(report -> dataMapper.map(report, ReportResponse.class));
    }

    public ReportResponse createReport(ReportRequest reportRequest) {

        User author = userService.getUserIfExists(reportRequest.getAuthorId());
        List<String> imageURLs = null;

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

        List<String> imageURLs = null;

        Report reportRecovered = getReportIfExists(id)
                .toBuilder()
                .withDescription(reportRequest.getDescription())
                .withImageURLs(imageURLs)
                .withLocation(reportRequest.getLocation())
                .withSeverityLevel(reportRequest.getSeverityLevel())
                .withReportType(reportRequest.getReportType())
                .build();

        Report updatedReport = catchError.run(() -> reportRepository.save(reportRecovered));
        LOGGER.info("Report comment: {}", updatedReport);
        return dataMapper.map(updatedReport, ReportResponse.class);
    }

    public ReportResponse findReportById(String id) {

        return catchError.run(() -> reportRepository.findById(id))
                .map(report -> dataMapper.map(report, ReportResponse.class))
                .orElseThrow(() -> new NotFoundException("Report not found with ID: " + id + "."));
    }

    public void deleteReport(String id) {

        Report report = getReportIfExists(id);
        catchError.run(() -> reportRepository.delete(report));
        LOGGER.warn("Report deleted: {}", report);
    }

    public Report getReportIfExists(String id) {

        return catchError.run(() -> reportRepository.findById(id))
                .orElseThrow(() -> new NotFoundException("Report not found with ID: " + id + "."));
    }
}
