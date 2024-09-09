package com.rogeriogregorio.environmental_reporting_portal.entities.enums;

public enum ReportType {

    AIR_POLLUTION(1),
    ANIMAL_ABUSE(2),
    DEFORESTATION(3),
    GREEN_AREA_INVASION(4),
    ILLEGAL_DRAINAGE(5),
    ILLEGAL_FENCING(6),
    ILLEGAL_HUNTING(7),
    ILLEGAL_MINING(8),
    ILLEGAL_PRUNING(9),
    ILLEGAL_TREE_REMOVAL(10),
    ILLEGAL_WASTE_DISPOSAL(11),
    SOIL_CONTAMINATION(12),
    WATER_CONTAMINATION(13),
    ECOLOGICAL_IMBALANCE(14),
    WILDFIRE(15),
    OTHER(16);

    private final int code;

    ReportType(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static ReportType valueOf(int code) {

        for (ReportType value : ReportType.values()) {
            if (value.getCode() == code) {
                return value;
            }
        }
        throw new IllegalArgumentException("The report type code is invalid");
    }
}


