package com.rogeriogregorio.environmental_reporting_portal.controllers;

import com.rogeriogregorio.environmental_reporting_portal.dto.request.UserRequest;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.UserResponse;
import com.rogeriogregorio.environmental_reporting_portal.services.UserService;
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
@RequestMapping(value = "/users")
@Tag(name = "Users API", description = "API para gestão de usuários")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    @Operation(summary = "Buscar todos os usuários", description = "Endpoint para buscar todos os usuário")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = UserResponse.class))),
            @ApiResponse(responseCode = "403", description = "Não autorizado"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar usuários")
    })
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers(Pageable pageable) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userService.findAllUsers(pageable).getContent());
    }

    @Operation(summary = "Registrar usuário", description = "Endpoint para registrar usuário")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Registro realizado com sucesso",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = UserResponse.class))),
            @ApiResponse(responseCode = "400", description = "Usuário já registrado"),
            @ApiResponse(responseCode = "500", description = "Erro ao registrar-se")
    })
    @PostMapping(value = "/register")
    public ResponseEntity<UserResponse> postUser(
            @Valid @RequestBody UserRequest userRequest) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userService.registerUser(userRequest));
    }

    @Operation(summary = "Atualizar autorização do usuário", description = "Endpoint para atualizar autorização do usuário")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Autorização atualizada com sucesso",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = UserResponse.class))),
            @ApiResponse(responseCode = "403", description = "Não autorizado"),
            @ApiResponse(responseCode = "404", description = "Nenhum usuário encontrado"),
            @ApiResponse(responseCode = "500", description = "Erro ao atualizar autorização do usuário")
    })
    @PatchMapping(value = "/roles/{id}")
    public ResponseEntity<UserResponse> patchUserRole(
            @PathVariable String id,
            @Valid @RequestBody UserRequest userRequest) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userService.updateUserRole(id, userRequest));
    }

    @Operation(summary = "Buscar usuário por Id",description = "Endpoint para buscar usuário pelo Id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = UserResponse.class))),
            @ApiResponse(responseCode = "403", description = "Não autorizado"),
            @ApiResponse(responseCode = "404", description = "Nenhum usuário encontrado"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar usuário")
    })
    @GetMapping(value = "/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable String id) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userService.findUserById(id));
    }

    @Operation(summary = "Atualizar usuário", description = "Endpoint para atualizar usuário")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "usuário atualizado com sucesso",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = UserResponse.class))),
            @ApiResponse(responseCode = "403", description = "Não autorizado"),
            @ApiResponse(responseCode = "404", description = "Nenhum usuário encontrado"),
            @ApiResponse(responseCode = "500", description = "Erro ao atualizar usuário")
    })
    @PutMapping(value = "/{id}")
    public ResponseEntity<UserResponse> putUser(
            @PathVariable String id,
            @Valid @RequestBody UserRequest userRequest) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userService.updateUser(id, userRequest));
    }

    @Operation(summary = "Deletar usuário", description = "Endpoint para deletar usuário")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuário deletado com sucesso"),
            @ApiResponse(responseCode = "403", description = "Não autorizado"),
            @ApiResponse(responseCode = "404", description = "Nenhum usuário encontrado"),
            @ApiResponse(responseCode = "500", description = "Erro ao deletar usuário")
    })
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {

        userService.deleteUser(id);

        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }

    @Operation(summary = "Buscar usuário por email",
            description = "Endpoint para buscar usuários por email")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = UserResponse.class))),
            @ApiResponse(responseCode = "403", description = "Não autorizado"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar usuário")
    })
    @GetMapping(value = "/search/email")
    public ResponseEntity<UserResponse> getUserByEmail(
            @RequestParam String email) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userService.findUserByEmail(email));
    }
}
