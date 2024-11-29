package com.rogeriogregorio.environmental_reporting_portal.services;

import com.rogeriogregorio.environmental_reporting_portal.dto.request.UserRequest;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.UserResponse;
import com.rogeriogregorio.environmental_reporting_portal.entities.User;
import com.rogeriogregorio.environmental_reporting_portal.entities.enums.UserRole;
import com.rogeriogregorio.environmental_reporting_portal.exceptions.NotFoundException;
import com.rogeriogregorio.environmental_reporting_portal.repositories.ReportRepository;
import com.rogeriogregorio.environmental_reporting_portal.repositories.UserRepository;
import com.rogeriogregorio.environmental_reporting_portal.services.impl.UserServiceImpl;
import com.rogeriogregorio.environmental_reporting_portal.utils.CatchError;
import com.rogeriogregorio.environmental_reporting_portal.utils.DataMapper;
import com.rogeriogregorio.environmental_reporting_portal.utils.FileStorage;
import com.rogeriogregorio.environmental_reporting_portal.utils.PasswordHelper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private ReportRepository reportRepository;

    @Mock
    private PasswordHelper passwordHelper;

    @Mock
    private FileStorage fileStorage;

    @Mock
    private CatchError catchError;

    @Mock
    private DataMapper dataMapper;

    @InjectMocks
    private UserServiceImpl userService;

    private static User user;
    private static UserRequest userRequest;
    private static UserResponse userResponse;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userService = new UserServiceImpl(userRepository, reportRepository,
                passwordHelper, fileStorage, catchError, dataMapper);

        user = User.newBuilder()
                .withId("1")
                .withName("Teste")
                .withEmail("teste@email.com")
                .withPassword("Teste123$")
                .withRole(UserRole.ADMIN)
                .withTimestamp(Instant.now())
                .build();

        userRequest = UserRequest.newBuilder()
                .withName("Teste")
                .withEmail("teste@email.com")
                .withPassword("Teste123$")
                .withRole(UserRole.ADMIN)
                .withTimestamp(Instant.now())
                .build();

        userResponse = UserResponse.newBuilder()
                .withId("1")
                .withName("Teste")
                .withEmail("teste@email.com")
                .withRole(UserRole.ADMIN)
                .withTimestamp(Instant.now())
                .build();
    }

    @Test
    @DisplayName("findAllUsers - Busca bem-sucedida retorna lista de usuários")
    void shouldFindAllUsers() {
        Page<User> userPage = new PageImpl<>(List.of(user));
        when(catchError.run((CatchError.SafeFunction<Object>) any())).thenReturn(userPage);
        when(dataMapper.map(any(User.class), eq(UserResponse.class))).thenReturn(userResponse);

        Page<UserResponse> result = userService.findAllUsers(Pageable.unpaged());

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals(userResponse, result.getContent().get(0));
        verify(catchError).run((CatchError.SafeFunction<Object>) any());
    }

    @Test
    @DisplayName("registerUser - Registro bem-sucedida retorna usuário registrado")
    void shouldRegisterUser() {
        // Arrange
        UserResponse expectedResponse = userResponse;

        doNothing().when(passwordHelper).validate(userRequest.getPassword());
        when(passwordHelper.enconde(userRequest.getPassword())).thenReturn(String.valueOf(String.class));
        when(userRepository.save(user)).thenReturn(user);
        when(catchError.run(any(CatchError.SafeFunction.class))).thenAnswer(invocation -> userRepository.save(user));
        when(dataMapper.map(user, UserResponse.class)).thenReturn(expectedResponse);

        // Act
        UserResponse actualResponse = userService.registerUser(userRequest);

        // Assert
        assertNotNull(actualResponse, "User should not be null");
        assertEquals(expectedResponse, actualResponse, "Expected and actual responses should be equal");
        verify(passwordHelper, times(1)).validate(userRequest.getPassword());
        verify(passwordHelper, times(1)).enconde(userRequest.getPassword());
        verify(userRepository, times(1)).save(user);
        verify(dataMapper, times(1)).map(user, UserResponse.class);
        verify(catchError, times(1)).run(any(CatchError.SafeFunction.class));
    }

    @Test
    @DisplayName("updateUser - Atualização bem-sucedida retorna usuário atualizado")
    void shouldUpdateUserRole() {
        // Arrange
        UserResponse expectedResponse = userResponse;

        when(dataMapper.map(user, UserResponse.class)).thenReturn(expectedResponse);
        when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));
        when(userRepository.save(user)).thenReturn(user);
        when(dataMapper.map(eq(user), eq(UserResponse.class))).thenReturn(expectedResponse);
        when(catchError.run(any(CatchError.SafeFunction.class))).then(invocation -> invocation
                .getArgument(0, CatchError.SafeFunction.class).execute());

        // Act
        UserResponse actualResponse = userService.updateUserRole(user.getId(), userRequest.getRole().toString());

        // Assert
        assertNotNull(actualResponse, "User should not be null");
        assertEquals(expectedResponse.getId(), actualResponse.getId(), "IDs should match");
        assertEquals(expectedResponse, actualResponse, "Expected and actual responses should be equal");
        verify(dataMapper, times(1)).map(user, UserResponse.class);
        verify(userRepository, times(1)).save(user);
        verify(catchError, times(2)).run(any(CatchError.SafeFunction.class));
    }

    @Test
    @DisplayName("findUserById - Busca bem-sucedida retorna usuário")
    void shouldFindUserById() {
        // Arrange
        UserResponse expectedResponse = userResponse;

        when(dataMapper.map(user, UserResponse.class)).thenReturn(expectedResponse);
        when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));
        when(catchError.run(any(CatchError.SafeFunction.class))).thenAnswer(invocation -> userRepository.findById(user.getId()));

        // Act
        UserResponse actualResponse = userService.findUserById(user.getId());

        // Assert
        assertNotNull(actualResponse, "User should not be null");
        assertEquals(expectedResponse.getId(), actualResponse.getId(), "IDs should match");
        assertEquals(expectedResponse, actualResponse, "Expected and actual responses should be equal");
        verify(dataMapper, times(1)).map(user, UserResponse.class);
        verify(userRepository, times(1)).findById(user.getId());
        verify(catchError, times(1)).run(any(CatchError.SafeFunction.class));
    }

    @Test
    @DisplayName("findUserById - Exceção ao tentar buscar usuário inexistente")
    void shouldThrowExceptionWhenUserNotFoundById() {
        // Arrange
        when(userRepository.findById(user.getId())).thenReturn(Optional.empty());
        when(catchError.run(any(CatchError.SafeFunction.class))).thenAnswer(invocation -> userRepository.findById(user.getId()));

        // Act and Assert
        assertThrows(NotFoundException.class, () -> userService.findUserById("1"),
                "Expected NotFoundException to be thrown");
        verify(userRepository, times(1)).findById("1");
        verify(userRepository, never()).save(user);
        verify(catchError, times(1)).run(any(CatchError.SafeFunction.class));
    }

    @Test
    @DisplayName("updateUser - Atualização bem-sucedida retorna usuário atualizado")
    void shouldUpdateUser() {
        // Arrange
        UserResponse expectedResponse = userResponse;

        doNothing().when(passwordHelper).validate(userRequest.getPassword());
        when(passwordHelper.enconde(userRequest.getPassword())).thenReturn(userRequest.getPassword());
        when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));
        when(userRepository.save(user)).thenReturn(user);
        when(dataMapper.map(eq(user), eq(UserResponse.class))).thenReturn(expectedResponse);
        when(catchError.run(any(CatchError.SafeFunction.class))).then(invocation -> invocation
                .getArgument(0, CatchError.SafeFunction.class).execute());

        // Act
        UserResponse actualResponse = userService.updateUser(user.getId(), userRequest);

        // Assert
        assertNotNull(actualResponse, "User should not be null");
        assertEquals(expectedResponse.getId(), actualResponse.getId(), "IDs should match");
        assertEquals(expectedResponse, actualResponse, "Expected and actual should match");
        verify(passwordHelper, times(1)).validate(userRequest.getPassword());
        verify(passwordHelper, times(1)).enconde(userRequest.getPassword());
        verify(userRepository, times(1)).findById(user.getId());
        verify(userRepository, times(1)).save(user);
        verify(dataMapper, times(1)).map(eq(user), eq(UserResponse.class));
        verify(catchError, times(2)).run(any(CatchError.SafeFunction.class));
    }

    @Test
    @DisplayName("deleteUser - Exclusão bem-sucedida do usuário")
    void shouldDeleteUser() {
        // Arrange
        when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));
        when(catchError.run(any(CatchError.SafeFunction.class))).then(invocation -> userRepository.findById(user.getId()));
        doAnswer(invocation -> {
            userRepository.delete(user);
            return null;
        }).when(catchError).run(any(CatchError.SafeProcedure.class));
        doNothing().when(userRepository).delete(user);

        // Act
        userService.deleteUser(user.getId());

        // Assert
        verify(userRepository, times(1)).findById(user.getId());
        verify(userRepository, times(1)).delete(user);
        verify(catchError, times(1)).run(any(CatchError.SafeFunction.class));
        verify(catchError, times(1)).run(any(CatchError.SafeProcedure.class));
    }
}
