package com.rogeriogregorio.environmental_reporting_portal.entities.enums;

public enum ReportStatus {

    PENDING(1),
    UNDER_REVIEW(2),
    VERIFIED(3),
    ACTION_TAKEN(4),
    RESOLVED(5),
    REJECTED(6);

    private final int code;

    ReportStatus(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static ReportStatus valueOf(int code) {

        for (ReportStatus value : ReportStatus.values()) {
            if (value.getCode() == code) {
                return value;
            }
        }
        throw new IllegalArgumentException("The report status code is invalid");
    }
}


