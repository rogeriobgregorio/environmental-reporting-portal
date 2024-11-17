package com.rogeriogregorio.environmental_reporting_portal.services.impl;

import com.rogeriogregorio.environmental_reporting_portal.dto.request.CommentRequest;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.CommentResponse;
import com.rogeriogregorio.environmental_reporting_portal.entities.Comment;
import com.rogeriogregorio.environmental_reporting_portal.entities.Report;
import com.rogeriogregorio.environmental_reporting_portal.entities.User;
import com.rogeriogregorio.environmental_reporting_portal.exceptions.NotFoundException;
import com.rogeriogregorio.environmental_reporting_portal.repositories.CommentRepository;
import com.rogeriogregorio.environmental_reporting_portal.repositories.ReportRepository;
import com.rogeriogregorio.environmental_reporting_portal.services.CommentService;
import com.rogeriogregorio.environmental_reporting_portal.services.ReportService;
import com.rogeriogregorio.environmental_reporting_portal.services.UserService;
import com.rogeriogregorio.environmental_reporting_portal.utils.CatchError;
import com.rogeriogregorio.environmental_reporting_portal.utils.DataMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final UserService userService;
    private final ReportService reportService;
    private final ReportRepository reportRepository;
    private final CatchError catchError;
    private final DataMapper dataMapper;
    private static final Logger LOGGER = LogManager.getLogger(CommentServiceImpl.class);


    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository,
                              UserService userService,
                              ReportService reportService,
                              ReportRepository reportRepository, CatchError catchError,
                              DataMapper dataMapper) {

        this.commentRepository = commentRepository;
        this.userService = userService;
        this.reportService = reportService;
        this.reportRepository = reportRepository;
        this.catchError = catchError;
        this.dataMapper = dataMapper;
    }

    public Page<CommentResponse> findAllComments(Pageable pageable) {

        return catchError.run(() -> commentRepository.findAll(pageable))
                .map(comment -> dataMapper.map(comment, CommentResponse.class));
    }

    public CommentResponse createComment(CommentRequest commentRequest) {

        User author = userService.getUserIfExists(commentRequest.getAuthorId());
        Report report = reportService.getReportIfExists(commentRequest.getReportId());

        Comment comment = Comment.newBuilder()
                .withAuthor(author)
                .withReport(report)
                .withTimestamp(Instant.now())
                .withContent(commentRequest.getContent())
                .build();

        report.getComments().add(comment);
        reportRepository.save(report);

        Comment commentSaved = catchError.run(() -> commentRepository.save(comment));
        LOGGER.info("Comment created: {}", commentSaved);
        return dataMapper.map(commentSaved, CommentResponse.class);
    }

    public CommentResponse updateComment(String id, CommentRequest commentRequest) {

        Comment updatedComment = getCommentIfExists(id)
                .toBuilder()
                .withContent(commentRequest.getContent())
                .build();

        Comment savedComment = catchError.run(() -> commentRepository.save(updatedComment));
        LOGGER.info("Updated comment: {}", savedComment);
        return dataMapper.map(savedComment, CommentResponse.class);
    }

    public CommentResponse findCommentById(String id) {

        return catchError.run(() -> commentRepository.findById(id))
                .map(comment -> dataMapper.map(comment, CommentResponse.class))
                .orElseThrow(() -> new NotFoundException("Comment not found with ID: " + id + "."));
    }

    public void deleteComment(String id) {

        Comment comment = getCommentIfExists(id);
        catchError.run(() -> commentRepository.delete(comment));
        LOGGER.warn("Comment deleted: {}", comment);
    }

    public Comment getCommentIfExists(String id) {

        return catchError.run(() -> commentRepository.findById(id))
                .orElseThrow(() -> new NotFoundException("Comment not found with ID: " + id + "."));
    }

    public Page<CommentResponse> findCommentsByAuthorNameOrEmail(String name, String email, Pageable pageable) {

        return catchError.run(() -> commentRepository.findByAuthorNameOrEmail(name, email, pageable))
                .map(comment -> dataMapper.map(comment, CommentResponse.class));
    }
}