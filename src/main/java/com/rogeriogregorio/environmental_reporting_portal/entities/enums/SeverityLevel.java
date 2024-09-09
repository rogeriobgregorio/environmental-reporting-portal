package com.rogeriogregorio.environmental_reporting_portal.entities.enums;

public enum SeverityLevel {

    VERY_LOW(1),
    LOW(2),
    MEDIUM(3),
    HIGH(4),
    VERY_HIGH(5);

    private final int code;

    SeverityLevel(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static SeverityLevel valueOf(int code) {

        for (SeverityLevel value : SeverityLevel.values()) {
            if (value.getCode() == code) {
                return value;
            }
        }
        throw new IllegalArgumentException("The severity level code is invalid");
    }
}
