package com.rogeriogregorio.environmental_reporting_portal.services.impl;

import com.rogeriogregorio.environmental_reporting_portal.dto.request.UserRequest;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.UserResponse;
import com.rogeriogregorio.environmental_reporting_portal.entities.Report;
import com.rogeriogregorio.environmental_reporting_portal.entities.User;
import com.rogeriogregorio.environmental_reporting_portal.entities.enums.UserRole;
import com.rogeriogregorio.environmental_reporting_portal.exceptions.NotFoundException;
import com.rogeriogregorio.environmental_reporting_portal.repositories.ReportRepository;
import com.rogeriogregorio.environmental_reporting_portal.repositories.UserRepository;
import com.rogeriogregorio.environmental_reporting_portal.services.UserService;
import com.rogeriogregorio.environmental_reporting_portal.utils.CatchError;
import com.rogeriogregorio.environmental_reporting_portal.utils.DataMapper;
import com.rogeriogregorio.environmental_reporting_portal.utils.FileStorage;
import com.rogeriogregorio.environmental_reporting_portal.utils.PasswordHelper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ReportRepository reportRepository;
    private final PasswordHelper passwordHelper;
    private final FileStorage fileStorage;
    private final CatchError catchError;
    private final DataMapper dataMapper;
    private static final Logger LOGGER = LogManager.getLogger(UserServiceImpl.class);

    @Autowired
    public UserServiceImpl(UserRepository userRepository,
                           ReportRepository reportRepository,
                           PasswordHelper passwordHelper,
                           FileStorage fileStorage, CatchError catchError,
                           DataMapper dataMapper) {

        this.userRepository = userRepository;
        this.reportRepository = reportRepository;
        this.passwordHelper = passwordHelper;
        this.fileStorage = fileStorage;
        this.catchError = catchError;
        this.dataMapper = dataMapper;
    }


    public Page<UserResponse> findAllUsers(Pageable pageable) {

        return catchError.run(() -> userRepository.findAll(pageable))
                .map(user -> dataMapper.map(user, UserResponse.class));
    }

    public UserResponse registerUser(UserRequest userRequest) {

        passwordHelper.validate(userRequest.getPassword());
        String encodedPassword = passwordHelper.enconde(userRequest.getPassword());

        userRequest.setName(Objects.requireNonNullElse(userRequest.getName(), "Usuário Anônimo"));

        User user = User.newBuilder()
                .withName(userRequest.getName())
                .withEmail(userRequest.getEmail())
                .withRole(UserRole.USER)
                .withPassword(encodedPassword)
                .withTimestamp(Instant.now())
                .build();

        User savedUser = catchError.run(() -> userRepository.save(user));
        LOGGER.info("User registered: {}", savedUser);
        return dataMapper.map(savedUser, UserResponse.class);
    }

    public UserResponse updateUserRole(String id, String userRole) {

        User updatedUser = getUserIfExists(id)
                .toBuilder()
                .withRole(UserRole.valueOf(userRole))
                .build();

        User savedUser = catchError.run(() -> userRepository.save(updatedUser));
        LOGGER.info("User role updated: {}", savedUser);
        return dataMapper.map(savedUser, UserResponse.class);
    }

    public UserResponse findUserById(String id) {

        return catchError.run(() -> userRepository.findById(id))
                .map(user -> dataMapper.map(user, UserResponse.class))
                .orElseThrow(() -> new NotFoundException("User not found with ID: " + id + "."));
    }

    public UserResponse updateUser(String id, UserRequest userRequest) {

        if (Objects.nonNull(userRequest.getPassword())) {
            passwordHelper.validate(userRequest.getPassword());
            String encodedPassword = passwordHelper.enconde(userRequest.getPassword());
            userRequest.setPassword(encodedPassword);
        }

        User user = getUserIfExists(id);
        dataMapper.map(userRequest, user);

        User savedUser = catchError.run(() -> userRepository.save(user));
        LOGGER.info("User updated: {}", savedUser);
        return dataMapper.map(savedUser, UserResponse.class);
    }

    public void deleteUser(String id) {

        User user = getUserIfExists(id);

        List<Report> reports = reportRepository.findByAuthorId(user.getId());

        List<String> imageNames = reports.stream()
                .flatMap(report -> report.getImageURLs().stream())
                .map(url -> url.substring(url.lastIndexOf("/") + 1))
                .toList();

        reportRepository.deleteAllByAuthorId(user.getId());

        catchError.run(() -> {
            userRepository.delete(user);
            fileStorage.deleteFiles(imageNames);
        });
        LOGGER.warn("User and associated reports deleted: {}", user);
    }

    public User getUserIfExists(String id) {

        return catchError.run(() -> userRepository.findById(id))
                .orElseThrow(() -> new NotFoundException("User not found with ID: " + id + "."));
    }

    public UserResponse findUserByEmail(String email) {

        return catchError.run(() -> userRepository.findByEmail(email)
                .map(user -> dataMapper.map(user, UserResponse.class))
                .orElseThrow(() -> new NotFoundException("User not found with email: " + email + ".")));
    }
}
