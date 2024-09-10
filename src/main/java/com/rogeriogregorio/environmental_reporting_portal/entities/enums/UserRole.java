package com.rogeriogregorio.environmental_reporting_portal.entities.enums;

public enum UserRole {

    ADMIN("ADMIN"),
    USER("USER");

    private final String role;

    UserRole(String role){
        this.role = role;
    }

    public String getRole(){
        return role;
    }
}