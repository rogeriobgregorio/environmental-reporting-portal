package com.rogeriogregorio.environmental_reporting_portal.dto.request;

import com.rogeriogregorio.environmental_reporting_portal.entities.enums.UserRole;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;

public class UserRequest implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String name;
    private String email;
    private String password;
    private UserRole role;
    private Instant timestamp;

    public UserRequest() {
    }

    private UserRequest(Builder builder) {
        setName(builder.name);
        setEmail(builder.email);
        setPassword(builder.password);
        setRole(builder.role);
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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
                .withName(this.name)
                .withEmail(this.email)
                .withPassword(this.password)
                .withRole(this.role)
                .withTimestamp(this.timestamp);
    }

    public static final class Builder {
        private String name;
        private String email;
        private String password;
        private UserRole role;
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

        public Builder withPassword(String password) {
            this.password = password;
            return this;
        }

        public Builder withRole(UserRole role) {
            this.role = role;
            return this;
        }

        public Builder withTimestamp(Instant timeStamp) {
            this.timestamp = timeStamp;
            return this;
        }

        public UserRequest build() {
            return new UserRequest(this);
        }
    }
}
