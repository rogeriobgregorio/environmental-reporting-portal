package com.rogeriogregorio.environmental_reporting_portal.controllers;

import com.rogeriogregorio.environmental_reporting_portal.dto.request.CommentRequest;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.CommentResponse;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.UserResponse;
import com.rogeriogregorio.environmental_reporting_portal.services.CommentService;
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
@RequestMapping(value = "/comments")
@Tag(name = "Comments API", description = "API para gestão de comentários")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @Operation(summary = "Buscar todos os comentários", description = "Endpoint para buscar todos os comentários")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = CommentResponse.class))),
            @ApiResponse(responseCode = "403", description = "Não autorizado"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar comentários")
    })
    @GetMapping
    public ResponseEntity<List<CommentResponse>> getAllComments(Pageable pageable) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(commentService.findAllComments(pageable).getContent());
    }

    @Operation(summary = "Criar comentário", description = "Endpoint para criar comentário")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Criação realizada com sucesso",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = CommentResponse.class))),
            @ApiResponse(responseCode = "403", description = "Não autorizado"),
            @ApiResponse(responseCode = "500", description = "Erro ao criar comentário")
    })
    @PostMapping
    public ResponseEntity<CommentResponse> postComment(
            @Valid @RequestBody CommentRequest commentRequest) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(commentService.createComment(commentRequest));
    }

    @Operation(summary = "Atualizar comentário", description = "Endpoint para atualizar comentário")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "comentário atualizado com sucesso",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = CommentResponse.class))),
            @ApiResponse(responseCode = "403", description = "Não autorizado"),
            @ApiResponse(responseCode = "404", description = "Nenhum comentário encontrado"),
            @ApiResponse(responseCode = "500", description = "Erro ao atualizar comentário")
    })
    @PutMapping(value = "/{id}")
    public ResponseEntity<CommentResponse> putComment(
            @PathVariable String id,
            @Valid @RequestBody CommentRequest commentRequest) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(commentService.updateComment(id, commentRequest));
    }

    @Operation(summary = "Buscar comentário por Id",description = "Endpoint para buscar comentário pelo Id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = UserResponse.class))),
            @ApiResponse(responseCode = "403", description = "Não autorizado"),
            @ApiResponse(responseCode = "404", description = "Nenhum comentário encontrado"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar comentário")
    })
    @GetMapping(value = "/{id}")
    public ResponseEntity<CommentResponse> getCommentById(@PathVariable String id) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(commentService.findCommentById(id));
    }

    @Operation(summary = "Deletar comentário", description = "Endpoint para deletar comentário")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Comentário deletado com sucesso"),
            @ApiResponse(responseCode = "403", description = "Não autorizado"),
            @ApiResponse(responseCode = "404", description = "Nenhum comentário encontrado"),
            @ApiResponse(responseCode = "500", description = "Erro ao deletar comentário")
    })
    @DeleteMapping(value = "/{commentId}/{reportId}")
    public ResponseEntity<Void> deleteComment(@PathVariable String commentId, @PathVariable String reportId) {

        commentService.deleteComment(commentId, reportId);

        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }

    @Operation(summary = "Buscar comentário por nome ou email do autor",
            description = "Endpoint para buscar comentário por nome ou email do autor")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = CommentResponse.class))),
            @ApiResponse(responseCode = "403", description = "Não autorizado"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar comentário")
    })
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
