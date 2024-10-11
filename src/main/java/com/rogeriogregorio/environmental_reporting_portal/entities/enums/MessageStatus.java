package com.rogeriogregorio.environmental_reporting_portal.entities.enums;

public enum MessageStatus {

    READ(1),
    UNREAD(2);

    private final int code;

    MessageStatus(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static MessageStatus valueOf(int code) {

        for (MessageStatus value : MessageStatus.values()) {
            if (value.getCode() == code) {
                return value;
            }
        }
        throw new IllegalArgumentException("The message status code is invalid");
    }
}
