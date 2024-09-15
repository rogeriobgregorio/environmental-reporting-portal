package com.rogeriogregorio.environmental_reporting_portal.services.impl;

import com.rogeriogregorio.environmental_reporting_portal.dto.request.ReportRequest;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.ReportResponse;
import com.rogeriogregorio.environmental_reporting_portal.entities.Report;
import com.rogeriogregorio.environmental_reporting_portal.services.ReportService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ReportServiceImpl implements ReportService {

    public Page<ReportResponse> findAllReports(Pageable pageable) {
        return null;
    }

    public ReportResponse createReport(ReportRequest reportRequest) {
        return null;
    }

    public ReportResponse updateReport(String id, ReportRequest reportRequest) {
        return null;
    }

    public ReportResponse findReportById(String id) {
        return null;
    }

    public void deleteReport(String id) {

    }

    public Report getReportIfExists(String id) {
        return null;
    }
}
