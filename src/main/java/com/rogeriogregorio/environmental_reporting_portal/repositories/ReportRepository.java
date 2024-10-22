package com.rogeriogregorio.environmental_reporting_portal.repositories;

import com.rogeriogregorio.environmental_reporting_portal.entities.Report;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends MongoRepository<Report, String> {

    @Query("{ 'author.id': ?0 }")
    Page<Report> findByAuthorId(String id, Pageable pageable);

    Page<Report> findBySeverityLevel(Integer severityLevel, Pageable pageable);

    Page<Report> findByReportType(Integer reportType, Pageable pageable);

    Page<Report> findByReportStatus(Integer reportStatus, Pageable pageable);
}
