package com.rogeriogregorio.environmental_reporting_portal.dto.response;

import com.rogeriogregorio.environmental_reporting_portal.entities.Report;
import com.rogeriogregorio.environmental_reporting_portal.entities.User;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;

public class CommentResponse implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String id;
    private User author;
    private Report report;
    private String content;
    private Instant timestamp;

    public CommentResponse() {
    }

    private CommentResponse(Builder builder) {
        setId(builder.id);
        setAuthor(builder.author);
        setReport(builder.report);
        setContent(builder.content);
        setTimestamp(builder.timestamp);
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

    public Report getReport() {
        return report;
    }

    public void setReport(Report report) {
        this.report = report;
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
                .withId(this.id)
                .withAuthor(this.author)
                .withReport(this.report)
                .withContent(this.content)
                .withTimestamp(this.timestamp);
    }

    public static final class Builder {
        private String id;
        private User author;
        private Report report;
        private String content;
        private Instant timestamp;

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

        public Builder withReport(Report report) {
            this.report = report;
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

        public CommentResponse build() {
            return new CommentResponse(this);
        }
    }
}
