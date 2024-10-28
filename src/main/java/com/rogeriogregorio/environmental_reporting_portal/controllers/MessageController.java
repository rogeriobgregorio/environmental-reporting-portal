package com.rogeriogregorio.environmental_reporting_portal.controllers;

import com.rogeriogregorio.environmental_reporting_portal.dto.request.MessageRequest;
import com.rogeriogregorio.environmental_reporting_portal.dto.request.UserRequest;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.MessageResponse;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.UserResponse;
import com.rogeriogregorio.environmental_reporting_portal.services.MessageService;
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
@RequestMapping(value = "/messages")
@Tag(name = "Messages API", description = "API para gestão de mensagens")
public class MessageController {

    private final MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @Operation(summary = "Buscar todas as mensagens", description = "Endpoint para buscar todas as mensagens")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = MessageResponse.class))),
            @ApiResponse(responseCode = "403", description = "Não autorizado"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar mensagens")
    })
    @GetMapping
    public ResponseEntity<List<MessageResponse>> getAllMessages(Pageable pageable) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(messageService.findAllMessages(pageable).getContent());
    }

    @Operation(summary = "Criar mensagem", description = "Endpoint para criar mensagem")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Criação realizada com sucesso",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = MessageResponse.class))),
            @ApiResponse(responseCode = "403", description = "Não autorizado"),
            @ApiResponse(responseCode = "500", description = "Erro ao criar mensagem")
    })
    @PostMapping
    public ResponseEntity<MessageResponse> postMessage(
            @Valid @RequestBody MessageRequest messageRequest) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(messageService.createMessage(messageRequest));
    }

    @Operation(summary = "Atualizar status da mensagem", description = "Endpoint para atualizar status da mensagem")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Status da mensagem atualizado com sucesso",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = UserResponse.class))),
            @ApiResponse(responseCode = "403", description = "Não autorizado"),
            @ApiResponse(responseCode = "404", description = "Nenhuma mensagem encontrado"),
            @ApiResponse(responseCode = "500", description = "Erro ao atualizar status da mensagem")
    })
    @PatchMapping(value = "/message-status/{id}")
    public ResponseEntity<MessageResponse> patchMessageStatus(
            @PathVariable String id,
            @Valid @RequestBody Integer messageStatus) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(messageService.updateMessageStatus(id, messageStatus));
    }

    @Operation(summary = "Buscar mensagem por Id",description = "Endpoint para buscar mensagem pelo Id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = MessageResponse.class))),
            @ApiResponse(responseCode = "403", description = "Não autorizado"),
            @ApiResponse(responseCode = "404", description = "Nenhuma mensagem encontrado"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar mensagem")
    })
    @GetMapping(value = "/{id}")
    public ResponseEntity<MessageResponse> getMessageById(@PathVariable String id) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(messageService.findMessageById(id));
    }

    @Operation(summary = "Deletar mensagem", description = "Endpoint para deletar mensagem")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Mensagem deletado com sucesso"),
            @ApiResponse(responseCode = "403", description = "Não autorizado"),
            @ApiResponse(responseCode = "404", description = "Nenhuma mensagem encontrada"),
            @ApiResponse(responseCode = "500", description = "Erro ao deletar mensagem")
    })
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable String id) {

        messageService.deleteMessage(id);

        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}
