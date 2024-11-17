package com.rogeriogregorio.environmental_reporting_portal.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

@Document(collection = "comments")
public class Comment implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @DBRef
    private User author;

    @NotBlank(message = "The comment content must not be blank.")
    private String content;

    private Instant timestamp;

    public Comment() {
    }

    private Comment(Builder builder) {
        setId(builder.id);
        setAuthor(builder.author);
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
                .withContent(this.content)
                .withTimestamp(this.timestamp);
    }

    public static final class Builder {
        private String id;
        private User author;
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

        public Builder withContent(String content) {
            this.content = content;
            return this;
        }

        public Builder withTimestamp(Instant timestamp) {
            this.timestamp = timestamp;
            return this;
        }

        public Comment build() {
            return new Comment(this);
        }
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
                ", content='" + content + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }
}

