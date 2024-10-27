package com.rogeriogregorio.environmental_reporting_portal.security.impl;

import com.rogeriogregorio.environmental_reporting_portal.dto.UserAuthDetailsDto;
import com.rogeriogregorio.environmental_reporting_portal.entities.User;
import com.rogeriogregorio.environmental_reporting_portal.entities.enums.UserRole;
import com.rogeriogregorio.environmental_reporting_portal.repositories.UserRepository;
import com.rogeriogregorio.environmental_reporting_portal.security.AuthorizationService;
import com.rogeriogregorio.environmental_reporting_portal.utils.CatchError;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class AuthorizationServiceImpl implements AuthorizationService {

    @Value("${api.security.password.secret}")
    private String secretPassword;
    private final UserRepository userRepository;
    private final CatchError catchError;

    @Autowired
    public AuthorizationServiceImpl(UserRepository userRepository,
                                    CatchError handler) {

        this.userRepository = userRepository;
        this.catchError = handler;
    }

    @Override
    public UserAuthDetailsDto loadUserByUsername(String email) {

        return catchError.run(() -> userRepository.findByEmail(email))
                .map(UserAuthDetailsDto::new)
                .orElseThrow(() -> new RuntimeException("User cannot be loaded by email"));
    }

    @PostConstruct
    private void createDefaultAdmin() {

        String encodedPassword = new BCryptPasswordEncoder().encode(secretPassword);

        User admin = User.newBuilder()
                .withName("Administrador")
                .withEmail("admin@email.com")
                .withPassword(encodedPassword)
                .withRole(UserRole.ADMIN)
                .withTimestamp(Instant.now())
                .build();

        catchError.run(() -> userRepository.save(admin));
    }
}