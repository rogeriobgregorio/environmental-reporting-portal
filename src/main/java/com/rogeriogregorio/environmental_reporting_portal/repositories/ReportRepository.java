package com.rogeriogregorio.environmental_reporting_portal.repositories;

import com.rogeriogregorio.environmental_reporting_portal.entities.Report;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends MongoRepository<Report, String> {

    @Query("{ '$or' : [ { 'author.name' : { '$regex' : ?0, '$options' : 'i' } }, " +
            "{ 'author.email' : { '$regex' : ?1, '$options' : 'i' } } ] }")
    Page<Report> findByAuthorNameOrEmail(String name, String email, Pageable pageable);

    Page<Report> findBySeverityLevel(Integer severityLevel, Pageable pageable);

    Page<Report> findByReportType(Integer reportType, Pageable pageable);

    Page<Report> findByReportStatus(Integer reportStatus, Pageable pageable);
}
