package com.rogeriogregorio.environmental_reporting_portal.services;

import com.rogeriogregorio.environmental_reporting_portal.dto.request.CommentRequest;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.CommentResponse;
import com.rogeriogregorio.environmental_reporting_portal.entities.Comment;
import com.rogeriogregorio.environmental_reporting_portal.entities.Report;
import com.rogeriogregorio.environmental_reporting_portal.entities.User;
import com.rogeriogregorio.environmental_reporting_portal.repositories.CommentRepository;
import com.rogeriogregorio.environmental_reporting_portal.repositories.ReportRepository;
import com.rogeriogregorio.environmental_reporting_portal.services.impl.CommentServiceImpl;
import com.rogeriogregorio.environmental_reporting_portal.utils.CatchError;
import com.rogeriogregorio.environmental_reporting_portal.utils.DataMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CommentServiceImplTest {

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private ReportRepository reportRepository;

    @Mock
    private UserService userService;

    @Mock
    private ReportService reportService;

    @Mock
    private CatchError catchError;

    @Mock
    private DataMapper dataMapper;

    @InjectMocks
    private CommentServiceImpl commentService;

    private static Comment comment;
    private static Report report;
    private static User author;
    private static CommentRequest commentRequest;
    private static CommentResponse commentResponse;

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
                .withComments(List.of())
                .withTimestamp(Instant.now())
                .build();

        comment = Comment.newBuilder()
                .withId("1")
                .withAuthor(author)
                .withContent("Test Comment")
                .withTimestamp(Instant.now())
                .build();

        commentRequest = CommentRequest.newBuilder()
                .withAuthorId(author.getId())
                .withContent("Updated Comment Content")
                .withReportId(report.getId())
                .build();

        commentResponse = CommentResponse.newBuilder()
                .withId(comment.getId())
                .withAuthor(author)
                .withContent(comment.getContent())
                .withTimestamp(comment.getTimestamp())
                .build();
    }

    @Test
    @DisplayName("findAllComments - Retorna todos os comentários com sucesso")
    void shouldFindAllComments() {
        // Arrange
        CommentResponse expectedResponse = commentResponse;
        Page<Comment> commentPage = new PageImpl<>(List.of(comment));
        when(catchError.run(any(CatchError.SafeFunction.class))).thenReturn(commentPage);
        when(dataMapper.map(any(Comment.class), eq(CommentResponse.class))).thenReturn(commentResponse);

        // Act
        Page<CommentResponse> actualResponse = commentService.findAllComments(Pageable.unpaged());

        // Asserts
        assertNotNull(actualResponse, "Comment should not be null");
        assertEquals(1, actualResponse.getTotalElements());
        assertEquals(expectedResponse, actualResponse.getContent().get(0));
        verify(catchError, times(1)).run(any(CatchError.SafeFunction.class));
    }

    @Test
    @DisplayName("createComment - Criação de comentário bem-sucedida")
    void shouldCreateComment() {
        // Arrange
        report = mock(Report.class);
        CommentResponse expectedResponse = commentResponse;
        when(userService.getUserIfExists(commentRequest.getAuthorId())).thenReturn(author);
        when(reportService.getReportIfExists(commentRequest.getReportId())).thenReturn(report);
        when(commentRepository.save(any(Comment.class))).thenReturn(comment);
        when(catchError.run(any(CatchError.SafeFunction.class))).thenAnswer(invocation -> commentRepository.save(comment));
        when(dataMapper.map(comment, CommentResponse.class)).thenReturn(commentResponse);

        // Act
        CommentResponse actualResponse = commentService.createComment(commentRequest);

        // Assert
        assertNotNull(actualResponse, "Comment should not be null");
        assertEquals(expectedResponse, actualResponse, "Expected and actual responses should be equal");
        verify(commentRepository, times(1)).save(any(Comment.class));
        verify(reportRepository, times(1)).save(report);
    }


    @Test
    @DisplayName("updateComment - Atualização bem-sucedida de comentário")
    void shouldUpdateComment() {
        // Arrange
        CommentResponse expectedResponse = commentResponse;
        when(commentRepository.findById(comment.getId())).thenReturn(Optional.of(comment));
        when(commentRepository.save(any(Comment.class))).thenReturn(comment);
        when(catchError.run(any(CatchError.SafeFunction.class))).then(invocation -> invocation
                .getArgument(0, CatchError.SafeFunction.class).execute());
        when(dataMapper.map(comment, CommentResponse.class)).thenReturn(commentResponse);

        // Act
        CommentResponse actualResponse = commentService.updateComment(comment.getId(), commentRequest);

        // Asserts
        assertNotNull(actualResponse, "Comment should not be null");
        assertEquals(expectedResponse, actualResponse, "Expected and actual responses should be equal");
        verify(commentRepository, times(1)).findById(comment.getId());
        verify(commentRepository, times(1)).save(any(Comment.class));
    }

    @Test
    @DisplayName("findCommentById - Busca comentário por ID com sucesso")
    void shouldFindCommentById() {
        // Arrange
        CommentResponse expectedResponse = commentResponse;
        when(commentRepository.findById(comment.getId())).thenReturn(Optional.of(comment));
        when(catchError.run(any(CatchError.SafeFunction.class))).then(invocation -> invocation
                .getArgument(0, CatchError.SafeFunction.class).execute());
        when(dataMapper.map(comment, CommentResponse.class)).thenReturn(commentResponse);

        // Act
        CommentResponse actualResponse = commentService.findCommentById(comment.getId());

        // Asserts
        assertNotNull(actualResponse, "Comment should not be null");
        assertEquals(expectedResponse, actualResponse, "Expected and actual responses should be equal");
        verify(commentRepository, times(1)).findById(comment.getId());
    }

    @Test
    @DisplayName("deleteComment - Exclui comentário de forma bem-sucedida")
    void shouldDeleteComment() {
        // Arrange
        when(commentRepository.findById(comment.getId())).thenReturn(Optional.of(comment));
        when(reportService.getReportIfExists(report.getId())).thenReturn(report);
        when(catchError.run(any(CatchError.SafeFunction.class))).thenAnswer(invocation -> Optional.of(comment));
        doNothing().when(commentRepository).delete(comment);
        when(reportRepository.save(report)).thenReturn(report);

        // Act
        commentService.deleteComment(comment.getId(), report.getId());

        // Assert
        assertFalse(report.getComments().contains(comment), "Comment should be removed from the report");
        verify(commentRepository, times(1)).delete(comment);
        verify(reportRepository, times(1)).save(report);
        verify(catchError, times(1)).run(any(CatchError.SafeProcedure.class));
    }

    @Test
    @DisplayName("findCommentsByAuthorNameOrEmail - Busca por autor ou email")
    void shouldFindCommentsByAuthorNameOrEmail() {
        // Arrange
        CommentResponse expectedResponse = commentResponse;
        Page<Comment> commentPage = new PageImpl<>(List.of(comment));
        when(catchError.run(any(CatchError.SafeFunction.class))).thenReturn(commentPage);
        when(dataMapper.map(any(Comment.class), eq(CommentResponse.class))).thenReturn(commentResponse);

        // Act
        Page<CommentResponse> actualResponse = commentService.findCommentsByAuthorNameOrEmail("Author Test", "author@test.com", Pageable.unpaged());

        // Asserts
        assertNotNull(actualResponse, "Comment should not be null");
        assertEquals(1, actualResponse.getTotalElements());
        assertEquals(expectedResponse, actualResponse.getContent().get(0));
        verify(catchError, times(1)).run(any(CatchError.SafeFunction.class));
    }
}
