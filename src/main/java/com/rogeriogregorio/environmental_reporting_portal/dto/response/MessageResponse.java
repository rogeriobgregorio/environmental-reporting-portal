package com.rogeriogregorio.environmental_reporting_portal.dto.response;

import com.rogeriogregorio.environmental_reporting_portal.entities.enums.MessageStatus;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;

public class MessageResponse implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String id;
    private String name;
    private String email;
    private String content;
    private Integer messageStatus;
    private Instant timestamp;

    public MessageResponse() {
    }

    private MessageResponse(Builder builder) {
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

        public Builder withContent(String message) {
            this.content = message;
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

        public MessageResponse build() {
            return new MessageResponse(this);
        }
    }
}
