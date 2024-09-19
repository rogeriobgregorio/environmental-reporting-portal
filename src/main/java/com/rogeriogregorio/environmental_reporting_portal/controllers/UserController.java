package com.rogeriogregorio.environmental_reporting_portal.controllers;

import com.rogeriogregorio.environmental_reporting_portal.dto.request.UserRequest;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.UserResponse;
import com.rogeriogregorio.environmental_reporting_portal.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers(Pageable pageable) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userService.findAllUsers(pageable).getContent());
    }

    @PostMapping
    public ResponseEntity<UserResponse> postUser(
            @Valid @RequestBody UserRequest userRequest) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userService.registerUser(userRequest));
    }

    @PatchMapping(value = "/roles/{id}")
    public ResponseEntity<UserResponse> patchUserRole(
            @PathVariable String id,
            @Valid @RequestBody UserRequest userRequest) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userService.updateUserRole(id, userRequest));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable String id) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userService.findUserById(id));
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<UserResponse> putUser(
            @PathVariable String id,
            @Valid @RequestBody UserRequest userRequest) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userService.updateUser(id, userRequest));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {

        userService.deleteUser(id);

        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }

    @GetMapping(value = "/search")
    public ResponseEntity<List<UserResponse>> getUsersByNameOrEmail(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            Pageable pageable) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userService.findUsersByNameOrEmail(name, email, pageable).getContent());
    }
}
