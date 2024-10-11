package com.rogeriogregorio.environmental_reporting_portal.entities;

import com.rogeriogregorio.environmental_reporting_portal.entities.enums.MessageStatus;
import com.rogeriogregorio.environmental_reporting_portal.entities.enums.ReportStatus;
import jakarta.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

@Document(collection = "messages")
public class MessageBox implements Serializable {

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

    @NotBlank(message = "The message must not be blank.")
    private String message;

    @NotNull(message = "The message status cannot be null.")
    private Integer messageStatus;

    private Instant timestamp;

    public MessageBox() {
    }

    private MessageBox(Builder builder) {
        setId(builder.id);
        setName(builder.name);
        setEmail(builder.email);
        setMessage(builder.message);
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

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
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
                .withMessage(this.message)
                .withMessageStatus(this.messageStatus)
                .withTimestamp(this.timestamp);
    }

    public static final class Builder {
        private String id;
        private String name;
        private String email;
        private String message;
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

        public Builder withMessage(String message) {
            this.message = message;
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

        public MessageBox build() {
            return new MessageBox(this);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MessageBox that = (MessageBox) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "MessageBox{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", message='" + message + '\'' +
                ", messageStatus=" + messageStatus +
                ", timestamp=" + timestamp +
                '}';
    }
}
