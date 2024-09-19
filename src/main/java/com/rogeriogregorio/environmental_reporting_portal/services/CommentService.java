package com.rogeriogregorio.environmental_reporting_portal.services;

import com.rogeriogregorio.environmental_reporting_portal.dto.request.CommentRequest;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.CommentResponse;
import com.rogeriogregorio.environmental_reporting_portal.entities.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
public interface CommentService {

    Page<CommentResponse> findAllComments(Pageable pageable);

    CommentResponse createComment(CommentRequest commentRequest);

    CommentResponse updateComment(String id, CommentRequest commentRequest);

    CommentResponse findCommentById(String id);

    void deleteComment(String id);

    Comment getCommentIfExists(String id);

    Page<CommentResponse> findCommentsByAuthorNameOrEmail(String name, String email, Pageable pageable);
}
