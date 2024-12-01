package com.rogeriogregorio.environmental_reporting_portal.dto.response;

import com.rogeriogregorio.environmental_reporting_portal.entities.Comment;
import com.rogeriogregorio.environmental_reporting_portal.entities.User;
import com.rogeriogregorio.environmental_reporting_portal.entities.enums.ReportStatus;
import com.rogeriogregorio.environmental_reporting_portal.entities.enums.ReportType;
import com.rogeriogregorio.environmental_reporting_portal.entities.enums.SeverityLevel;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public class ReportResponse implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String id;
    private User author;
    private String description;
    private String location;
    private Integer severityLevel;
    private Integer reportType;
    private Integer reportStatus;
    private Instant timestamp;
    private List<String> imageURLs = new ArrayList<>();
    private List<Comment> comments = new ArrayList<>();

    public ReportResponse() {
    }

    private ReportResponse(Builder builder) {
        setId(builder.id);
        setAuthor(builder.author);
        setDescription(builder.description);
        setLocation(builder.location);
        severityLevel = builder.severityLevel;
        reportType = builder.reportType;
        reportStatus = builder.reportStatus;
        setTimestamp(builder.timestamp);
        setImageURLs(builder.imageURLs);
        setComments(builder.comments);
    }

    public static Builder newBuilder() {
        return new Builder();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
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

    public List<String> getImageURLs() {
        return imageURLs;
    }

    public void setImageURLs(List<String> imageURLs) {
        this.imageURLs = imageURLs;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }


    public Builder toBuilder() {

        return new Builder()
                .withId(this.id)
                .withAuthor(this.author)
                .withDescription(this.description)
                .withLocation(this.location)
                .withSeverityLevel(this.severityLevel)
                .withReportType(this.reportType)
                .withReportStatus(this.reportStatus)
                .withTimestamp(this.timestamp)
                .withImageURLs(this.imageURLs)
                .withComments(this.comments);
    }

    public static final class Builder {
        private String id;
        private User author;
        private String description;
        private String location;
        private Integer severityLevel;
        private Integer reportType;
        private Integer reportStatus;
        private Instant timestamp;
        private List<String> imageURLs;
        private List<Comment> comments;

        private Builder() {
        }

        public Builder withId(String id) {
            this.id = id;
            return this;
        }

        public Builder withAuthor(User author) {
            this.author = author;
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

        public Builder withTimestamp(Instant timestamp) {
            this.timestamp = timestamp;
            return this;
        }

        public Builder withImageURLs(List<String> imageURLs) {
            this.imageURLs = imageURLs;
            return this;
        }

        public Builder withComments(List<Comment> comments) {
            this.comments = comments;
            return this;
        }

        public ReportResponse build() {
            return new ReportResponse(this);
        }
    }
}
