package com.rogeriogregorio.environmental_reporting_portal.security;

import com.rogeriogregorio.environmental_reporting_portal.dto.request.LoginRequest;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.LoginResponse;
import org.springframework.stereotype.Component;

@Component
public interface AuthenticationService {

    LoginResponse authenticateUser(LoginRequest loginRequest);
}
