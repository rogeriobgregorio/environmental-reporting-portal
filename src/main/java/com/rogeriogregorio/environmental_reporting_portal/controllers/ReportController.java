package com.rogeriogregorio.environmental_reporting_portal.controllers;

import com.rogeriogregorio.environmental_reporting_portal.dto.request.ReportRequest;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.ReportResponse;
import com.rogeriogregorio.environmental_reporting_portal.services.ReportService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/reports")
public class ReportController {

    private final ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping
    public ResponseEntity<List<ReportResponse>> getAllReports(Pageable pageable) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(reportService.findAllReports(pageable).getContent());
    }

    @PostMapping
    public ResponseEntity<ReportResponse> postReport(
            @Valid @RequestBody ReportRequest reportRequest) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(reportService.createReport(reportRequest));
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<ReportResponse> putReport(
            @PathVariable String id,
            @Valid @RequestBody ReportRequest reportRequest) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(reportService.updateReport(id, reportRequest));
    }

    @PatchMapping(value = "/{id}/status")
    public ResponseEntity<ReportResponse> patchReportStatus(
            @PathVariable String id,
            @Valid @RequestBody Integer reportStatus) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(reportService.updateReportStatus(id, reportStatus));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<ReportResponse> getReportById(@PathVariable String id) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(reportService.findReportById(id));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteReport(@PathVariable String id) {

        reportService.deleteReport(id);

        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }

    @GetMapping(value = "/search/name-email")
    public ResponseEntity<List<ReportResponse>> getReportsByAuthorNameOrEmail(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            Pageable pageable) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(reportService.findReportsByAuthorNameOrEmail(name, email, pageable).getContent());
    }

    @GetMapping(value = "/search/severity-level")
    public ResponseEntity<List<ReportResponse>> getReportsBySeverityLevel(
            @RequestParam Integer severityLevel,
            Pageable pageable) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(reportService.findReportsBySeverityLevel(severityLevel, pageable).getContent());
    }

    @GetMapping(value = "/search/report-type")
    public ResponseEntity<List<ReportResponse>> getReportsByReportType(
            @RequestParam(required = false) Integer reportType,
            Pageable pageable) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(reportService.findReportsByReportType(reportType, pageable).getContent());
    }

    @GetMapping(value = "/search/report-status")
    public ResponseEntity<List<ReportResponse>> getReportsByReportStatus(
            @RequestParam(required = false) Integer reportStatus,
            Pageable pageable) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(reportService.findReportsByReportStatus(reportStatus, pageable).getContent());
    }
}
