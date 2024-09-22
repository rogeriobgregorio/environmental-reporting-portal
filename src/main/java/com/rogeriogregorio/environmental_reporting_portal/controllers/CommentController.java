package com.rogeriogregorio.environmental_reporting_portal.controllers;

import com.rogeriogregorio.environmental_reporting_portal.dto.request.CommentRequest;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.CommentResponse;
import com.rogeriogregorio.environmental_reporting_portal.services.CommentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/comments")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public ResponseEntity<List<CommentResponse>> getAllComments(Pageable pageable) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(commentService.findAllComments(pageable).getContent());
    }

    @PostMapping
    public ResponseEntity<CommentResponse> postComment(
            @Valid @RequestBody CommentRequest commentRequest) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(commentService.createComment(commentRequest));
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<CommentResponse> putComment(
            @PathVariable String id,
            @Valid @RequestBody CommentRequest commentRequest) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(commentService.updateComment(id, commentRequest));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<CommentResponse> getCommentById(@PathVariable String id) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(commentService.findCommentById(id));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable String id) {

        commentService.deleteComment(id);

        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }

    @GetMapping(value = "/search/name-email")
    public ResponseEntity<List<CommentResponse>> getCommentsByAuthorNameOrEmail(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            Pageable pageable) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(commentService.findCommentsByAuthorNameOrEmail(name, email, pageable).getContent());
    }
}
