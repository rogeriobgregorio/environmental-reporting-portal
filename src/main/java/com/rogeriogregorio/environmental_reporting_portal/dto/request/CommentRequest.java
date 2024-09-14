package com.rogeriogregorio.environmental_reporting_portal.dto.request;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;

public class CommentRequest implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String authorId;
    private String reportId;
    private String content;
    private Instant timestamp;

    public CommentRequest() {
    }

    private CommentRequest(Builder builder) {
        setAuthorId(builder.authorId);
        setReportId(builder.reportId);
        setContent(builder.content);
        setTimestamp(builder.timestamp);
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

    public String getReportId() {
        return reportId;
    }

    public void setReportId(String reportId) {
        this.reportId = reportId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public Builder toBuilder() {

        return new Builder()
                .withAuthorId(this.authorId)
                .withReportId(this.reportId)
                .withContent(this.content)
                .withTimestamp(this.timestamp);
    }

    public static final class Builder {
        private String authorId;
        private String reportId;
        private String content;
        private Instant timestamp;

        private Builder() {
        }

        public Builder withAuthorId(String authorId) {
            this.authorId = authorId;
            return this;
        }

        public Builder withReportId(String reportId) {
            this.reportId = reportId;
            return this;
        }

        public Builder withContent(String content) {
            this.content = content;
            return this;
        }

        public Builder withTimestamp(Instant timestamp) {
            this.timestamp = timestamp;
            return this;
        }

        public CommentRequest build() {
            return new CommentRequest(this);
        }
    }
}
