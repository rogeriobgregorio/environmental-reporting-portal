package com.rogeriogregorio.environmental_reporting_portal.mail.impl;

import com.rogeriogregorio.environmental_reporting_portal.dto.EmailDetailsDto;
import com.rogeriogregorio.environmental_reporting_portal.dto.PasswordResetDto;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.UserResponse;
import com.rogeriogregorio.environmental_reporting_portal.entities.User;
import com.rogeriogregorio.environmental_reporting_portal.exceptions.NotFoundException;
import com.rogeriogregorio.environmental_reporting_portal.mail.MailService;
import com.rogeriogregorio.environmental_reporting_portal.repositories.UserRepository;
import com.rogeriogregorio.environmental_reporting_portal.security.TokenService;
import com.rogeriogregorio.environmental_reporting_portal.utils.CatchError;
import com.rogeriogregorio.environmental_reporting_portal.utils.DataMapper;
import com.rogeriogregorio.environmental_reporting_portal.utils.PasswordHelper;
import jakarta.annotation.Resource;
import jakarta.mail.internet.MimeMessage;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
public class MailServiceImpl implements MailService {

    private static final String SENDER_EMAIL = "ecommercemanager@mailservice.com";
    private static final String EMAIL_VERIFICATION_PROCESS = "Email Verification Process";
    private static final String PASSWORD_RESET_PROCESS = "Password Reset Process";
    private static final String VERIFICATION_EMAIL_HTML = "templates/verification-email.html";
    private static final String PASSWORD_RESET_HTML = "templates/password-reset-email.html";

    private final JavaMailSender mailSender;
    private final UserRepository userRepository;
    private final PasswordHelper passwordHelper;
    private final TokenService tokenService;
    private final CatchError catchError;
    private final DataMapper dataMapper;
    private static final Logger LOGGER = LogManager.getLogger(MailServiceImpl.class);

    @Autowired
    public MailServiceImpl(JavaMailSender mailSender, UserRepository userRepository,
                           PasswordHelper passwordHelper, TokenService tokenService,
                           CatchError catchError, DataMapper dataMapper) {

        this.mailSender = mailSender;
        this.userRepository = userRepository;
        this.passwordHelper = passwordHelper;
        this.tokenService = tokenService;
        this.catchError = catchError;
        this.dataMapper = dataMapper;
    }

    private void sendEmail(EmailDetailsDto emailDetails) {

        catchError.run(() -> {

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(message, true);
            messageHelper.setFrom(emailDetails.getSender());
            messageHelper.setSubject(emailDetails.getSubject());
            messageHelper.setTo(emailDetails.getRecipient());

            String emailTemplate = getEmailTemplate(emailDetails.getTemplateName());
            for (Map.Entry<String, String> entry : emailDetails.getReplacements().entrySet()) {
                emailTemplate = emailTemplate.replace(entry.getKey(), entry.getValue());
            }

            messageHelper.setText(emailTemplate, true);
            mailSender.send(message);
            LOGGER.info("Email sent to: {}", emailDetails.getRecipient());
        });
    }

    public void sendVerificationEmail(User user) {

        String token = tokenService.generateEmailToken(user);

        Map<String, String> replacements = new HashMap<>();
        replacements.put("#{name}", user.getName());
        replacements.put("#{token}", token);

        sendEmail(EmailDetailsDto.newBuilder()
                .withSender(SENDER_EMAIL)
                .withSubject(EMAIL_VERIFICATION_PROCESS)
                .withRecipient(user.getEmail())
                .withTemplateName(VERIFICATION_EMAIL_HTML)
                .withReplacements(replacements)
                .build()
        );
    }

    public void sendPasswordResetEmail(PasswordResetDto passwordReset) {

        User user = findUserByEmail(passwordReset.getEmail());
        String token = tokenService.generateEmailToken(user);

        Map<String, String> replacements = new HashMap<>();
        replacements.put("#{name}", user.getName());
        replacements.put("#{token}", token);

        sendEmail(EmailDetailsDto.newBuilder()
                .withSender(SENDER_EMAIL)
                .withSubject(PASSWORD_RESET_PROCESS)
                .withRecipient(user.getEmail())
                .withTemplateName(PASSWORD_RESET_HTML)
                .withReplacements(replacements)
                .build()
        );
    }

    private String getEmailTemplate(String path) {

        ClassPathResource pathResource = new ClassPathResource(path);
        return catchError.run(() -> new String(pathResource.getInputStream()
                .readAllBytes(), StandardCharsets.UTF_8));
    }

    public UserResponse validateEmailVerificationToken(String token) {

        User user = tokenService.validateEmailToken(token);
        saveEmailAsEnabled(user);
        return dataMapper.map(user, UserResponse.class);
    }

    public void validatePasswordResetToken(PasswordResetDto passwordReset) {

        User user = tokenService.validateEmailToken(passwordReset.getToken());
        user.setPassword(passwordReset.getPassword());
        saveNewPassword(user);
    }

    private User findUserByEmail(String email) {

        return catchError.run(() -> userRepository.findByEmail(email)).
                orElseThrow(() -> new NotFoundException("The user was not found with the email: " + email));
    }

    private void saveEmailAsEnabled(User user) {

        user.setEmailEnabled(true);
        User savedUser = catchError.run(() -> userRepository.save(user));
        LOGGER.info("User email verified and saved: {}", savedUser.getEmail());
    }

    private void saveNewPassword(User user) {

        passwordHelper.validate(user.getPassword());
        String passwordEncode = passwordHelper.enconde(user.getPassword());
        user.setPassword(passwordEncode);
        User savedUser = catchError.run(() -> userRepository.save(user));
        LOGGER.info("User password updated: {}", savedUser);
    }
}