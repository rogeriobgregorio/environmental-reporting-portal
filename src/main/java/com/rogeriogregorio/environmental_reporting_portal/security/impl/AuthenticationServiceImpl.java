package com.rogeriogregorio.environmental_reporting_portal.security.impl;

import com.rogeriogregorio.environmental_reporting_portal.dto.UserAuthDetailsDto;
import com.rogeriogregorio.environmental_reporting_portal.dto.request.LoginRequest;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.LoginResponse;
import com.rogeriogregorio.environmental_reporting_portal.security.AuthenticationService;
import com.rogeriogregorio.environmental_reporting_portal.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    @Autowired
    public AuthenticationServiceImpl(AuthenticationManager authenticationManager,
                                     TokenService tokenService) {

        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    public LoginResponse authenticateUser(LoginRequest loginRequest) {

        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        UsernamePasswordAuthenticationToken usernamePassword = new UsernamePasswordAuthenticationToken(email, password);

        Authentication authenticate = authenticationManager.authenticate(usernamePassword);
        String token = tokenService.generateAuthenticationToken((UserAuthDetailsDto) authenticate.getPrincipal());
        return new LoginResponse(token);
    }
}
