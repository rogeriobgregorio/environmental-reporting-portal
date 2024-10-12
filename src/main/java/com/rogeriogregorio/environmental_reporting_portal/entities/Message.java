package com.rogeriogregorio.environmental_reporting_portal.entities;

import com.rogeriogregorio.environmental_reporting_portal.entities.enums.MessageStatus;
import jakarta.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

@Document(collection = "messages")
public class Message implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotBlank(message = "The name must not be blank.")
    @Pattern(regexp = "^[\\p{L}\\s.]+$", message = "The name must contain only letters and spaces.")
    @Size(min = 5, max = 250, message = "The name must have between 5 and 250 characters.")
    private String name;

    @NotBlank(message = "The email must not be blank.")
    @Email(message = "Please enter a valid email address. Example: user@example.com")
    private String email;

    @NotBlank(message = "The content must not be blank.")
    private String content;

    @NotNull(message = "The message status cannot be null.")
    private Integer messageStatus;

    private Instant timestamp;

    public Message() {
    }

    private Message(Builder builder) {
        setId(builder.id);
        setName(builder.name);
        setEmail(builder.email);
        setContent(builder.content);
        messageStatus = builder.messageStatus;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public MessageStatus getMessageStatus() {
        return MessageStatus.valueOf(messageStatus);
    }

    public void setMessageStatus(MessageStatus messageStatus) {
        if (messageStatus == null) {
            throw new IllegalArgumentException("The message status cannot be null.");
        }

        this.messageStatus = messageStatus.getCode();
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
                .withName(this.name)
                .withEmail(this.email)
                .withContent(this.content)
                .withMessageStatus(this.messageStatus)
                .withTimestamp(this.timestamp);
    }

    public static final class Builder {
        private String id;
        private String name;
        private String email;
        private String content;
        private Integer messageStatus;
        private Instant timestamp;

        private Builder() {
        }

        public Builder withId(String id) {
            this.id = id;
            return this;
        }

        public Builder withName(String name) {
            this.name = name;
            return this;
        }

        public Builder withEmail(String email) {
            this.email = email;
            return this;
        }

        public Builder withContent(String content) {
            this.content = content;
            return this;
        }

        public Builder withMessageStatus(Integer messageStatus) {
            this.messageStatus = messageStatus;
            return this;
        }

        public Builder withTimestamp(Instant timestamp) {
            this.timestamp = timestamp;
            return this;
        }

        public Message build() {
            return new Message(this);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Message that = (Message) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Message{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", content='" + content + '\'' +
                ", messageStatus=" + messageStatus +
                ", timestamp=" + timestamp +
                '}';
    }
}
