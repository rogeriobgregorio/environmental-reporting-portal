package com.rogeriogregorio.environmental_reporting_portal.services.impl;

import com.rogeriogregorio.environmental_reporting_portal.dto.request.CommentRequest;
import com.rogeriogregorio.environmental_reporting_portal.dto.request.ReportRequest;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.CommentResponse;
import com.rogeriogregorio.environmental_reporting_portal.entities.Report;
import com.rogeriogregorio.environmental_reporting_portal.services.CommentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {

    public Page<CommentResponse> findAllComments(Pageable pageable) {
        return null;
    }

    public CommentResponse createComment(ReportRequest commentRequest) {
        return null;
    }

    public CommentResponse updateComment(String id, CommentRequest commentRequest) {
        return null;
    }

    public CommentResponse findCommentById(String id) {
        return null;
    }

    public void deleteComment(String id) {

    }

    public Report getCommentIfExists(String id) {
        return null;
    }
}
