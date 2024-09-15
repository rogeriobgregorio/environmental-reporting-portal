package com.rogeriogregorio.environmental_reporting_portal.security;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

@Component
public interface AuthorizationService extends UserDetailsService {
}