package com.rogeriogregorio.environmental_reporting_portal.dto.response;

import com.rogeriogregorio.environmental_reporting_portal.entities.enums.UserRole;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;

public class UserResponse implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String id;
    private String name;
    private String email;
    private UserRole role;
    private Instant timestamp;

    public UserResponse() {
    }

    private UserResponse(Builder builder) {
        setId(builder.id);
        setName(builder.name);
        setEmail(builder.email);
        setRole(builder.role);
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

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
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
                .withRole(this.role)
                .withTimestamp(this.timestamp);
    }

    public static final class Builder {
        private String id;
        private String name;
        private String email;
        private UserRole role;
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

        public Builder withRole(UserRole role) {
            this.role = role;
            return this;
        }

        public Builder withTimestamp(Instant timestamp) {
            this.timestamp = timestamp;
            return this;
        }

        public UserResponse build() {
            return new UserResponse(this);
        }
    }
}
