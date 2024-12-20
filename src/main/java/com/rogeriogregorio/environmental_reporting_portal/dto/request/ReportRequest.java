package com.rogeriogregorio.environmental_reporting_portal.dto.request;

import com.rogeriogregorio.environmental_reporting_portal.entities.enums.ReportStatus;
import com.rogeriogregorio.environmental_reporting_portal.entities.enums.ReportType;
import com.rogeriogregorio.environmental_reporting_portal.entities.enums.SeverityLevel;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public class ReportRequest implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String authorId;
    private String description;
    private String location;
    private Integer severityLevel;
    private Integer reportType;
    private Integer reportStatus;
    private Instant timestamp;
    private transient List<MultipartFile> images = new ArrayList<>();

    public ReportRequest() {
    }

    private ReportRequest(Builder builder) {
        setAuthorId(builder.authorId);
        setDescription(builder.description);
        setLocation(builder.location);
        severityLevel = builder.severityLevel;
        reportType = builder.reportType;
        reportStatus = builder.reportStatus;
        setTimestamp(builder.timestamp);
        setImages(builder.images);
    }

    public static Builder newBuilder() {
        return new Builder();
    }

    public String getAuthorId() {
        return authorId;
    }

    public void setAuthorId(String authorId) {
        this.authorId = authorId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public SeverityLevel getSeverityLevel() {
        return SeverityLevel.valueOf(severityLevel);
    }

    public void setSeverityLevel(SeverityLevel severityLevel) {
        if (severityLevel == null) {
            throw new IllegalArgumentException("The severity level cannot be null.");
        }

        this.severityLevel = severityLevel.getCode();
    }

    public ReportType getReportType() {
        return ReportType.valueOf(reportType);
    }

    public void setReportType(ReportType reportType) {
        if (reportType == null) {
            throw new IllegalArgumentException("The report type cannot be null.");
        }

        this.reportType = reportType.getCode();
    }

    public ReportStatus getReportStatus() {
        return ReportStatus.valueOf(reportStatus);
    }

    public void setReportStatus(ReportStatus reportStatus) {
        if (reportStatus == null) {
            throw new IllegalArgumentException("The report status cannot be null.");
        }

        this.reportStatus = reportStatus.getCode();
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public List<MultipartFile> getImages() {
        return images;
    }

    public void setImages(List<MultipartFile> images) {
        this.images = images;
    }

    public Builder toBuilder() {

        return new Builder()
                .withAuthorId(this.authorId)
                .withDescription(this.description)
                .withLocation(this.location)
                .withSeverityLevel(this.severityLevel)
                .withReportType(this.reportType)
                .withReportStatus(this.reportStatus)
                .withTimestamp(this.timestamp)
                .withImages(this.images);
    }


    public static final class Builder {
        private String authorId;
        private String description;
        private String location;
        private Integer severityLevel;
        private Integer reportType;
        private Integer reportStatus;
        private Instant timestamp;
        private List<MultipartFile> images;

        private Builder() {
        }

        public Builder withAuthorId(String authorId) {
            this.authorId = authorId;
            return this;
        }

        public Builder withDescription(String description) {
            this.description = description;
            return this;
        }

        public Builder withLocation(String location) {
            this.location = location;
            return this;
        }

        public Builder withSeverityLevel(Integer severityLevel) {
            this.severityLevel = severityLevel;
            return this;
        }

        public Builder withReportType(Integer reportType) {
            this.reportType = reportType;
            return this;
        }

        public Builder withReportStatus(Integer reportStatus) {
            this.reportStatus = reportStatus;
            return this;
        }

        public Builder withTimestamp(Instant timeStamp) {
            this.timestamp = timeStamp;
            return this;
        }

        public Builder withImages(List<MultipartFile> imageURLs) {
            this.images = imageURLs;
            return this;
        }

        public ReportRequest build() {
            return new ReportRequest(this);
        }
    }
}
