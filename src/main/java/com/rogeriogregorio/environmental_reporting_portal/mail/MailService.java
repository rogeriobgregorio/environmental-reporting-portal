package com.rogeriogregorio.environmental_reporting_portal.mail;

import com.rogeriogregorio.environmental_reporting_portal.dto.PasswordResetDto;
import org.springframework.stereotype.Component;

@Component
public interface MailService {

    void sendPasswordResetEmail(PasswordResetDto passwordResetDTO);

    void validatePasswordResetToken(PasswordResetDto passwordResetDTO);
}
