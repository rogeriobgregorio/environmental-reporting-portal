package com.rogeriogregorio.environmental_reporting_portal.mail;

import com.rogeriogregorio.environmental_reporting_portal.dto.PasswordResetDto;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.UserResponse;
import com.rogeriogregorio.environmental_reporting_portal.entities.User;
import org.springframework.stereotype.Component;

@Component
public interface MailService {

    void sendVerificationEmail(User user);

    void sendPasswordResetEmail(PasswordResetDto passwordResetDTO);

    void validatePasswordResetToken(PasswordResetDto passwordResetDTO);

    UserResponse validateEmailVerificationToken(String token);
}
