package com.rogeriogregorio.environmental_reporting_portal.entities;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

public class Comment implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String id;
    private User author;
    private Report report;
    private String content;
    private Instant timestamp;

    public Comment() {
    }

    public Comment(String id, User author, Report report,
                   String content, Instant timestamp) {

        this.id = id;
        this.author = author;
        this.report = report;
        this.content = content;
        this.timestamp = timestamp;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Comment comment = (Comment) o;
        return Objects.equals(id, comment.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", author=" + author +
                ", report=" + report +
                ", content='" + content + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }
}

