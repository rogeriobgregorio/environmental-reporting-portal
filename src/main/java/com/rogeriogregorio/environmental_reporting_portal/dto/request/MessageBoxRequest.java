package com.rogeriogregorio.environmental_reporting_portal.dto.request;

import com.rogeriogregorio.environmental_reporting_portal.entities.enums.MessageStatus;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;

public class MessageBoxRequest implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String name;
    private String email;
    private String message;
    private Integer messageStatus;
    private Instant timestamp;

    public MessageBoxRequest() {
    }

    private MessageBoxRequest(Builder builder) {
        setName(builder.name);
        setEmail(builder.email);
        setMessage(builder.message);
        messageStatus = builder.messageStatus;
        setTimestamp(builder.timestamp);
    }

    public static Builder newBuilder() {
        return new Builder();
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
                .withName(this.name)
                .withEmail(this.email)
                .withMessage(this.message)
                .withMessageStatus(this.messageStatus)
                .withTimestamp(this.timestamp);
    }

    public static final class Builder {
        private String name;
        private String email;
        private String message;
        private Integer messageStatus;
        private Instant timestamp;

        private Builder() {
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

        public MessageBoxRequest build() {
            return new MessageBoxRequest(this);
        }
    }
}
