package com.rogeriogregorio.environmental_reporting_portal.services;

import com.rogeriogregorio.environmental_reporting_portal.dto.request.ReportRequest;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.ReportResponse;
import com.rogeriogregorio.environmental_reporting_portal.entities.Report;
import com.rogeriogregorio.environmental_reporting_portal.entities.User;
import com.rogeriogregorio.environmental_reporting_portal.entities.enums.ReportStatus;
import com.rogeriogregorio.environmental_reporting_portal.exceptions.NotFoundException;
import com.rogeriogregorio.environmental_reporting_portal.mail.MailService;
import com.rogeriogregorio.environmental_reporting_portal.repositories.ReportRepository;
import com.rogeriogregorio.environmental_reporting_portal.services.impl.ReportServiceImpl;
import com.rogeriogregorio.environmental_reporting_portal.utils.CatchError;
import com.rogeriogregorio.environmental_reporting_portal.utils.DataMapper;
import com.rogeriogregorio.environmental_reporting_portal.utils.FileStorage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ReportServiceImplTest {

    @Mock
    private ReportRepository reportRepository;

    @Mock
    private UserService userService;

    @Mock
    private MailService mailService;

    @Mock
    private FileStorage fileStorage;

    @Mock
    private CatchError catchError;

    @Mock
    private DataMapper dataMapper;

    @InjectMocks
    private ReportServiceImpl reportService;

    private static Report report;
    private static ReportRequest reportRequest;
    private static ReportResponse reportResponse;
    private static User author;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        author = User.newBuilder()
                .withId("1")
                .withName("Author Test")
                .withEmail("author@test.com")
                .withPassword("password123")
                .withTimestamp(Instant.now())
                .build();

        report = Report.newBuilder()
                .withId("1")
                .withAuthor(author)
                .withDescription("Test Report")
                .withImageURLs(List.of("http://image.url/test.png"))
                .withLocation("Location A")
                .withSeverityLevel(3)
                .withReportType(1)
                .withReportStatus(ReportStatus.PENDING.getCode())
                .withTimestamp(Instant.now())
                .build();

        reportRequest = ReportRequest.newBuilder()
                .withAuthorId(author.getId())
                .withDescription("Updated Description")
                .withImages(List.of())
                .withLocation("Location B")
                .withSeverityLevel(2)
                .withReportType(2)
                .build();

        reportResponse = ReportResponse.newBuilder()
                .withId(report.getId())
                .withDescription(report.getDescription())
                .withImageURLs(report.getImageURLs())
                .withLocation(report.getLocation())
                .withSeverityLevel(report.getSeverityLevel().getCode())
                .withReportType(report.getReportType().getCode())
                .withReportStatus(report.getReportStatus().getCode())
                .build();
    }

    @Test
    @DisplayName("findAllReports - Busca bem-sucedida retorna lista de denúncias")
    void shouldFindAllReports() {
        // Arrange
        ReportResponse expectedResponse = reportResponse;
        Page<Report> reportPage = new PageImpl<>(List.of(report));
        when(catchError.run(any(CatchError.SafeFunction.class))).thenReturn(reportPage);
        when(dataMapper.map(any(Report.class), eq(ReportResponse.class))).thenReturn(reportResponse);

        // Act
        Page<ReportResponse> actualResponse = reportService.findAllReports(Pageable.unpaged());

        // Assert
        assertNotNull(actualResponse, "Report should not be null");
        assertEquals(1, actualResponse.getTotalElements());
        assertEquals(expectedResponse, actualResponse.getContent().get(0));
        verify(catchError, times(1)).run((CatchError.SafeFunction<Object>) any());
    }

    @Test
    @DisplayName("createReport - Criação bem-sucedida retorna denúncia")
    void shouldCreateReport() {
        // Arrange
        ReportResponse expectedResponse = reportResponse;
        when(userService.getUserIfExists(reportRequest.getAuthorId())).thenReturn(author);
        when(fileStorage.saveFilesAndGetUrls(reportRequest.getImages())).thenReturn(report.getImageURLs());
        when(reportRepository.save(any(Report.class))).thenReturn(report);
        when(catchError.run(any(CatchError.SafeFunction.class))).thenAnswer(invocation -> reportRepository.save(report));
        when(dataMapper.map(report, ReportResponse.class)).thenReturn(reportResponse);

        // Act
        ReportResponse actualResponse = reportService.createReport(reportRequest);

        // Assert
        assertNotNull(actualResponse, "Report should not be null");
        assertEquals(expectedResponse, actualResponse, "Expected and actual responses should be equal");
        verify(userService, times(1)).getUserIfExists(reportRequest.getAuthorId());
        verify(fileStorage, times(1)).saveFilesAndGetUrls(reportRequest.getImages());
        verify(reportRepository, times(1)).save(any(Report.class));
        verify(dataMapper, times(1)).map(report, ReportResponse.class);
    }

    @Test
    @DisplayName("findReportById - Retorna denúncia pelo ID")
    void shouldFindReportById() {
        // Arrange
        ReportResponse expectedResponse = reportResponse;
        when(reportRepository.findById(report.getId())).thenReturn(Optional.of(report));
        when(catchError.run(any(CatchError.SafeFunction.class))).thenAnswer(invocation -> reportRepository.findById(report.getId()));
        when(dataMapper.map(report, ReportResponse.class)).thenReturn(reportResponse);

        // Act
        ReportResponse actualResponse = reportService.findReportById(report.getId());

        // Assert
        assertNotNull(actualResponse, "Report should not be null");
        assertEquals(expectedResponse, actualResponse, "Expected and actual responses should be equal");
        verify(reportRepository, times(1)).findById(report.getId());
    }

    @Test
    @DisplayName("findReportById - Lança exceção para ID inexistente")
    void shouldThrowExceptionWhenReportNotFound() {
        // Arrange
        when(reportRepository.findById(report.getId())).thenReturn(Optional.empty());
        when(catchError.run(any(CatchError.SafeFunction.class))).thenAnswer(invocation -> reportRepository.findById("1"));

        // Act and Assert
        assertThrows(NotFoundException.class, () -> reportService.findReportById("1"));
        verify(reportRepository, times(1)).findById(report.getId());
    }

    @Test
    @DisplayName("deleteReport - Exclui denúncia com sucesso")
    void shouldDeleteReport() throws IOException {
        // Arrange
        when(reportRepository.findById(report.getId())).thenReturn(Optional.of(report));
        when(catchError.run(any(CatchError.SafeFunction.class))).then(invocation -> reportRepository.findById(report.getId()));
        doNothing().when(fileStorage).deleteFiles(any());
        doAnswer(invocation -> {
            reportRepository.delete(report);
            return null;
        }).when(catchError).run(any(CatchError.SafeProcedure.class));
        doNothing().when(reportRepository).delete(report);

        // Act
        reportService.deleteReport(report.getId());

        // Assert
        verify(reportRepository, times(1)).findById(report.getId());
        verify(reportRepository, times(1)).delete(report);
        verify(catchError, times(1)).run(any(CatchError.SafeFunction.class));
        verify(catchError, times(1)).run(any(CatchError.SafeProcedure.class));
    }

    @Test
    @DisplayName("updateReport - Atualiza denúncia com sucesso")
    void shouldUpdateReport() {
        // Arrange
        ReportResponse expectedResponse = reportResponse;
        when(reportRepository.findById(report.getId())).thenReturn(Optional.of(report));
        when(reportRepository.save(any(Report.class))).thenReturn(report);
        when(catchError.run(any(CatchError.SafeFunction.class))).thenAnswer(invocation -> {
            CatchError.SafeFunction<?> function = invocation.getArgument(0);
            return function.execute();
        });
        when(dataMapper.map(report, ReportResponse.class)).thenReturn(reportResponse);

        // Act
        ReportResponse actualResponse = reportService.updateReport(report.getId(), reportRequest);

        // Asserts
        assertNotNull(actualResponse, "Report should not be null");
        assertEquals(expectedResponse, actualResponse, "Expected and actual responses should be equal");
        verify(reportRepository, times(1)).findById(report.getId());
        verify(reportRepository, times(1)).save(any(Report.class));
        verify(dataMapper, times(1)).map(report, ReportResponse.class);
        verify(catchError, times(2)).run(any(CatchError.SafeFunction.class));
    }

    @Test
    @DisplayName("updateReport - Lança exceção para denúncia inexistente")
    void shouldThrowExceptionWhenUpdatingNonExistingReport() {
        when(reportRepository.findById(report.getId())).thenReturn(Optional.empty());
        when(catchError.run(any(CatchError.SafeFunction.class))).thenAnswer(invocation -> reportRepository.findById(report.getId()));

        assertThrows(NotFoundException.class, () -> reportService.updateReport("1", reportRequest));
        verify(reportRepository, times(1)).findById(report.getId());
    }

    @Test
    @DisplayName("updateReportStatus - Atualiza status da denúncia com sucesso")
    void shouldUpdateReportStatus() {
        // Arrange
        Integer newStatus = ReportStatus.VERIFIED.getCode();
        ReportResponse expectedResponse = reportResponse;
        when(reportRepository.findById(report.getId())).thenReturn(Optional.of(report));
        when(reportRepository.save(any(Report.class))).thenReturn(report);
        when(catchError.run(any(CatchError.SafeFunction.class))).thenAnswer(invocation -> {
            CatchError.SafeFunction<?> function = invocation.getArgument(0);
            return function.execute();
        });
        when(dataMapper.map(report, ReportResponse.class)).thenReturn(reportResponse);

        // Act
        ReportResponse actualResponse = reportService.updateReportStatus(report.getId(), newStatus);

        // Asserts
        assertNotNull(actualResponse, "Report should not be null");
        assertEquals(expectedResponse, actualResponse, "Expected and actual responses should be equal");
        verify(reportRepository, times(1)).findById(report.getId());
        verify(reportRepository, times(1)).save(any(Report.class));
        verify(dataMapper, times(1)).map(report, ReportResponse.class);
    }

    @Test
    @DisplayName("updateReportStatus - Lança exceção para denúncia inexistente")
    void shouldThrowExceptionWhenUpdatingStatusOfNonExistingReport() {
        when(reportRepository.findById(report.getId())).thenReturn(Optional.empty());
        when(catchError.run(any(CatchError.SafeFunction.class))).thenAnswer(invocation -> reportRepository.findById(report.getId()));

        assertThrows(NotFoundException.class, () -> reportService.updateReportStatus("1", 3));
        verify(reportRepository, times(1)).findById(report.getId());
    }

    @Test
    @DisplayName("findReportsByAuthorId - Retorna denúncia de um autor")
    void shouldFindReportsByAuthorId() {
        // Arrange
        ReportResponse expectedResponse = reportResponse;
        Page<Report> reportPage = new PageImpl<>(List.of(report));
        when(catchError.run(any(CatchError.SafeFunction.class))).thenReturn(reportPage);
        when(dataMapper.map(any(Report.class), eq(ReportResponse.class))).thenReturn(reportResponse);

        // Act
        Page<ReportResponse> actualResponse = reportService.findReportsByAuthorId(author.getId(), Pageable.unpaged());

        // Asserts
        assertNotNull(actualResponse, "Report should not be null");
        assertEquals(1, actualResponse.getTotalElements());
        assertEquals(expectedResponse, actualResponse.getContent().get(0));
        verify(catchError, times(1)).run(any(CatchError.SafeFunction.class));
    }

    @Test
    @DisplayName("findReportsBySeverityLevel - Retorna denúncia por nível de severidade")
    void shouldFindReportsBySeverityLevel() {
        // Arrange
        ReportResponse expectedResponse = reportResponse;
        Page<Report> reportPage = new PageImpl<>(List.of(report));
        when(catchError.run(any(CatchError.SafeFunction.class))).thenReturn(reportPage);
        when(dataMapper.map(any(Report.class), eq(ReportResponse.class))).thenReturn(reportResponse);

        // Act
        Page<ReportResponse> actualResponse = reportService.findReportsBySeverityLevel(report.getSeverityLevel().getCode(), Pageable.unpaged());

        // Asserts
        assertNotNull(actualResponse, "Report should not be null");
        assertEquals(1, actualResponse.getTotalElements());
        assertEquals(expectedResponse, actualResponse.getContent().get(0));
        verify(catchError, times(1)).run(any(CatchError.SafeFunction.class));
    }

    @Test
    @DisplayName("findReportsByReportType - Retorna denúncia por tipo")
    void shouldFindReportsByReportType() {
        // Arrange
        ReportResponse expectedResponse = reportResponse;
        Page<Report> reportPage = new PageImpl<>(List.of(report));
        when(catchError.run(any(CatchError.SafeFunction.class))).thenReturn(reportPage);
        when(dataMapper.map(any(Report.class), eq(ReportResponse.class))).thenReturn(reportResponse);

        // Act
        Page<ReportResponse> actualResponse = reportService.findReportsByReportType(report.getReportType().getCode(), Pageable.unpaged());

        // Asserts
        assertNotNull(actualResponse, "Report should not be null");
        assertEquals(1, actualResponse.getTotalElements());
        assertEquals(expectedResponse, actualResponse.getContent().get(0));
        verify(catchError, times(1)).run(any(CatchError.SafeFunction.class));
    }

    @Test
    @DisplayName("findReportsByReportStatus - Retorna denúncia por status")
    void shouldFindReportsByReportStatus() {
        // Arrange
        ReportResponse expectedResponse = reportResponse;
        Page<Report> reportPage = new PageImpl<>(List.of(report));
        when(catchError.run(any(CatchError.SafeFunction.class))).thenReturn(reportPage);
        when(dataMapper.map(any(Report.class), eq(ReportResponse.class))).thenReturn(reportResponse);

        // Act
        Page<ReportResponse> actualResponse = reportService.findReportsByReportStatus(report.getReportStatus().getCode(), Pageable.unpaged());

        // Assert
        assertNotNull(actualResponse, "Report should not be null");
        assertEquals(1, actualResponse.getTotalElements());
        assertEquals(expectedResponse, actualResponse.getContent().get(0));
        verify(catchError, times(1)).run(any(CatchError.SafeFunction.class));
    }

}
