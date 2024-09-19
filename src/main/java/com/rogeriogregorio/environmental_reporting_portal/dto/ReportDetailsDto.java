package com.rogeriogregorio.environmental_reporting_portal.dto;

import com.rogeriogregorio.environmental_reporting_portal.entities.Report;

import java.io.Serial;
import java.io.Serializable;

public class ReportDetailsDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String author;
    private String description;
    private String location;
    private String severityLevel;
    private String reportType;
    private String reportStatus;
    private String timeStamp;

    public ReportDetailsDto() {
    }

    public ReportDetailsDto(Report report) {
        this.author = report.getAuthor().getName();
        this.description = report.getDescription();
        this.location = report.getLocation();
        this.severityLevel = report.getSeverityLevel().toString();
        this.reportType = report.getReportType().toString();
        this.reportStatus = report.getReportStatus().toString();
        this.timeStamp = report.getTimeStamp().toString();
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getSeverityLevel() {
        return severityLevel;
    }

    public void setSeverityLevel(String severityLevel) {
        this.severityLevel = severityLevel;
    }

    public String getReportType() {
        return reportType;
    }

    public void setReportType(String reportType) {
        this.reportType = reportType;
    }

    public String getReportStatus() {
        return reportStatus;
    }

    public void setReportStatus(String reportStatus) {
        this.reportStatus = reportStatus;
    }

    public String getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(String timeStamp) {
        this.timeStamp = timeStamp;
    }

    @Override
    public String toString() {

        StringBuilder sb = new StringBuilder();
        sb.append("Detalhes da Denúncia:\n");
        sb.append("-----------------------------------\n");
        sb.append("Autor: ").append(author).append("\n");
        sb.append("Descrição: ").append(description).append("\n");
        sb.append("Localização: ").append(location).append("\n");
        sb.append("Nível de Severidade: ").append(severityLevel).append("\n");
        sb.append("Tipo de Denúncia: ").append(reportType).append("\n");
        sb.append("Status Atual: ").append(reportStatus).append(" (atualizado)\n");
        sb.append("Data e Hora da Denúncia: ").append(timeStamp).append("\n");
        sb.append("-----------------------------------\n");
        sb.append("Agradecemos pela sua colaboração.");

        return sb.toString();
    }

}
