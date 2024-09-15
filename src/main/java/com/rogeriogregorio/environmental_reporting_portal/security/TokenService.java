package com.rogeriogregorio.environmental_reporting_portal.security;

import com.rogeriogregorio.environmental_reporting_portal.dto.UserAuthDetailsDto;
import com.rogeriogregorio.environmental_reporting_portal.entities.User;
import org.springframework.stereotype.Component;

@Component
public interface TokenService {

    String generateAuthenticationToken(UserAuthDetailsDto userAuthDetailsDto);

    String validateAuthenticationToken(String token);

    String generateEmailToken(User user);

    User validateEmailToken(String token);
}