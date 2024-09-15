package com.rogeriogregorio.environmental_reporting_portal.services;

import com.rogeriogregorio.environmental_reporting_portal.dto.request.ReportRequest;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.ReportResponse;
import com.rogeriogregorio.environmental_reporting_portal.entities.Report;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
public interface ReportService {

    Page<ReportResponse> findAllReports(Pageable pageable);

    ReportResponse createReport(ReportRequest reportRequest);

    ReportResponse updateReport(String id, ReportRequest reportRequest);

    ReportResponse findReportById(String id);

    void deleteReport(String id);

    Report getReportIfExists(String id);
}
