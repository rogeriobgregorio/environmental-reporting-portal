package com.rogeriogregorio.environmental_reporting_portal.entities;

import com.rogeriogregorio.environmental_reporting_portal.entities.enums.UserRole;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Document(collation = "users")
public class User implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    private UserRole role;
    private Instant timeStamp;
    private List<Report> reports = new ArrayList<>();
    private List<Comment> comments = new ArrayList<>();

    public User() {
    }

    public User(String id, String name, String email, String password, UserRole role,
                Instant timeStamp, List<Report> reports, List<Comment> comments) {

        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.timeStamp = timeStamp;
        this.reports = reports;
        this.comments = comments;
    }

    private User(Builder builder) {
        setId(builder.id);
        setName(builder.name);
        setEmail(builder.email);
        setPassword(builder.password);
        setRole(builder.role);
        setTimeStamp(builder.timeStamp);
        setReports(builder.reports);
        setComments(builder.comments);
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

    public Instant getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(Instant timeStamp) {
        this.timeStamp = timeStamp;
    }

    public List<Report> getReports() {
        return reports;
    }

    public void setReports(List<Report> reports) {
        this.reports = reports;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public Builder toBuilder() {

        return new Builder()
                .withId(this.id)
                .withName(this.name)
                .withEmail(this.email)
                .withPassword(this.password)
                .withRole(this.role)
                .withTimestamp(this.timeStamp)
                .withReports(this.reports)
                .withComments(this.comments);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public static final class Builder {
        private String id;
        private String name;
        private String email;
        private String password;
        private UserRole role;
        private Instant timeStamp;
        private List<Report> reports;
        private List<Comment> comments;

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

        public Builder withPassword(String password) {
            this.password = password;
            return this;
        }

        public Builder withRole(UserRole role) {
            this.role = role;
            return this;
        }

        public Builder withTimestamp(Instant timestamp) {
            this.timeStamp = timestamp;
            return this;
        }

        public Builder withReports(List<Report> reports) {
            this.reports = reports;
            return this;
        }

        public Builder withComments(List<Comment> comments) {
            this.comments = comments;
            return this;
        }

        public User build() {
            return new User(this);
        }
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                ", timeStamp=" + timeStamp +
                ", reports=" + reports +
                ", comments=" + comments +
                '}';
    }
}