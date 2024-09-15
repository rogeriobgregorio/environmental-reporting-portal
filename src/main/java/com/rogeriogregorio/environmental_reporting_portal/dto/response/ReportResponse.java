package com.rogeriogregorio.environmental_reporting_portal.dto.response;

import com.rogeriogregorio.environmental_reporting_portal.entities.Comment;
import com.rogeriogregorio.environmental_reporting_portal.entities.User;

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
    private Instant timeStamp;
    private List<String> imageURLs = new ArrayList<>();
    private List<Comment> comments = new ArrayList<>();

    public ReportResponse() {
    }

    private ReportResponse(Builder builder) {
        setId(builder.id);
        setAuthor(builder.author);
        setDescription(builder.description);
        setLocation(builder.location);
        setSeverityLevel(builder.severityLevel);
        setReportType(builder.reportType);
        setReportStatus(builder.reportStatus);
        setTimeStamp(builder.timeStamp);
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

    public Integer getSeverityLevel() {
        return severityLevel;
    }

    public void setSeverityLevel(Integer severityLevel) {
        this.severityLevel = severityLevel;
    }

    public Integer getReportType() {
        return reportType;
    }

    public void setReportType(Integer reportType) {
        this.reportType = reportType;
    }

    public Integer getReportStatus() {
        return reportStatus;
    }

    public void setReportStatus(Integer reportStatus) {
        this.reportStatus = reportStatus;
    }

    public Instant getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(Instant timeStamp) {
        this.timeStamp = timeStamp;
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
                .withTimeStamp(this.timeStamp)
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
        private Instant timeStamp;
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

        public Builder withTimeStamp(Instant timeStamp) {
            this.timeStamp = timeStamp;
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
