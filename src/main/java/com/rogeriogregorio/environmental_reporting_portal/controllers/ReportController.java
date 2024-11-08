package com.rogeriogregorio.environmental_reporting_portal.controllers;

import com.rogeriogregorio.environmental_reporting_portal.dto.request.ReportRequest;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.ReportResponse;
import com.rogeriogregorio.environmental_reporting_portal.services.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/reports")
@Tag(name = "Reports API", description = "API para gestão de denúncias")
public class ReportController {

    private final ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @Operation(summary = "Buscar todos as denúncias", description = "Endpoint para buscar todas as denúncias")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ReportResponse.class))),
            @ApiResponse(responseCode = "403", description = "Não autorizado"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar denúncias")
    })
    @GetMapping
    public ResponseEntity<List<ReportResponse>> getAllReports(Pageable pageable) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(reportService.findAllReports(pageable).getContent());
    }

    @Operation(summary = "Criar denúncia", description = "Endpoint para criar denúncia")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Criação realizada com sucesso",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = ReportResponse.class))),
            @ApiResponse(responseCode = "403", description = "Não autorizado"),
            @ApiResponse(responseCode = "500", description = "Erro ao criar denúncia")
    })
    @PostMapping
    public ResponseEntity<ReportResponse> postReport(
            @Valid @ModelAttribute ReportRequest reportRequest) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(reportService.createReport(reportRequest));
    }

    @Operation(summary = "Atualizar denúncia", description = "Endpoint para atualizar denúncia")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "denúncia atualizada com sucesso",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ReportResponse.class))),
            @ApiResponse(responseCode = "403", description = "Não autorizado"),
            @ApiResponse(responseCode = "404", description = "Nenhuma denúncia encontrada"),
            @ApiResponse(responseCode = "500", description = "Erro ao atualizar denúncia")
    })
    @PutMapping(value = "/{id}")
    public ResponseEntity<ReportResponse> putReport(
            @PathVariable String id,
            @Valid @RequestBody ReportRequest reportRequest) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(reportService.updateReport(id, reportRequest));
    }

    @Operation(summary = "Atualizar status da denúncia", description = "Endpoint para atualizar status da denúncia")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Autorização atualizada com sucesso",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = ReportResponse.class))),
            @ApiResponse(responseCode = "403", description = "Não autorizado"),
            @ApiResponse(responseCode = "404", description = "Nenhuma denúncia encontrada"),
            @ApiResponse(responseCode = "500", description = "Erro ao atualizar status da denúncia")
    })
    @PatchMapping(value = "/{id}/status")
    public ResponseEntity<ReportResponse> patchReportStatus(
            @PathVariable String id,
            @Valid @RequestBody Integer reportStatus) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(reportService.updateReportStatus(id, reportStatus));
    }

    @Operation(summary = "Buscar denúncia por Id",description = "Endpoint para buscar denúncia pelo Id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = ReportResponse.class))),
            @ApiResponse(responseCode = "403", description = "Não autorizado"),
            @ApiResponse(responseCode = "404", description = "Nenhuma denúncia encontrado"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar denúncia")
    })
    @GetMapping(value = "/{id}")
    public ResponseEntity<ReportResponse> getReportById(@PathVariable String id) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(reportService.findReportById(id));
    }

    @Operation(summary = "Deletar denúncia", description = "Endpoint para deletar denúncia")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Denúncia deletado com sucesso"),
            @ApiResponse(responseCode = "403", description = "Não autorizado"),
            @ApiResponse(responseCode = "404", description = "Nenhuma denúncia encontrado"),
            @ApiResponse(responseCode = "500", description = "Erro ao deletar denúncia")
    })
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteReport(@PathVariable String id) {

        reportService.deleteReport(id);

        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }

    @Operation(summary = "Buscar denúncia por id do autor",
            description = "Endpoint para buscar denúncia por id do autor")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = ReportResponse.class))),
            @ApiResponse(responseCode = "403", description = "Não autorizado"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar denúncia")
    })
    @GetMapping(value = "/search/author/id/{id}")
    public ResponseEntity<List<ReportResponse>> getReportsByAuthorId(
            @PathVariable String id, Pageable pageable) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(reportService.findReportsByAuthorId(id, pageable).getContent());
    }

    @Operation(summary = "Buscar denúncia por nível de severidade",
            description = "Endpoint para buscar denúncia por nível de severidade")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ReportResponse.class))),
            @ApiResponse(responseCode = "403", description = "Não autorizado"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar denúncia")
    })
    @GetMapping(value = "/search/severity-level")
    public ResponseEntity<List<ReportResponse>> getReportsBySeverityLevel(
            @RequestParam Integer severityLevel,
            Pageable pageable) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(reportService.findReportsBySeverityLevel(severityLevel, pageable).getContent());
    }

    @Operation(summary = "Buscar denúncia por tipo",
            description = "Endpoint para buscar denúncia por tipo")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ReportResponse.class))),
            @ApiResponse(responseCode = "403", description = "Não autorizado"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar denúncia")
    })
    @GetMapping(value = "/search/report-type")
    public ResponseEntity<List<ReportResponse>> getReportsByReportType(
            @RequestParam(required = false) Integer reportType,
            Pageable pageable) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(reportService.findReportsByReportType(reportType, pageable).getContent());
    }

    @Operation(summary = "Buscar denúncia por status",
            description = "Endpoint para buscar denúncia por status")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ReportResponse.class))),
            @ApiResponse(responseCode = "403", description = "Não autorizado"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar denúncia")
    })
    @GetMapping(value = "/search/report-status")
    public ResponseEntity<List<ReportResponse>> getReportsByReportStatus(
            @RequestParam(required = false) Integer reportStatus,
            Pageable pageable) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(reportService.findReportsByReportStatus(reportStatus, pageable).getContent());
    }
}
