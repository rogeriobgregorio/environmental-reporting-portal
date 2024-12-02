package com.rogeriogregorio.environmental_reporting_portal.services;

import com.rogeriogregorio.environmental_reporting_portal.dto.request.MessageRequest;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.MessageResponse;
import com.rogeriogregorio.environmental_reporting_portal.entities.Message;
import com.rogeriogregorio.environmental_reporting_portal.entities.enums.MessageStatus;
import com.rogeriogregorio.environmental_reporting_portal.exceptions.NotFoundException;
import com.rogeriogregorio.environmental_reporting_portal.repositories.MessageRepository;
import com.rogeriogregorio.environmental_reporting_portal.services.impl.MessageServiceImpl;
import com.rogeriogregorio.environmental_reporting_portal.utils.CatchError;
import com.rogeriogregorio.environmental_reporting_portal.utils.DataMapper;
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

class MessageServiceImplTest {

    @Mock
    private MessageRepository messageRepository;

    @Mock
    private CatchError catchError;

    @Mock
    private DataMapper dataMapper;

    @InjectMocks
    private MessageServiceImpl messageService;

    private static Message message;
    private static MessageRequest messageRequest;
    private static MessageResponse messageResponse;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        message = Message.newBuilder()
                .withId("1")
                .withName("Test User")
                .withEmail("test@example.com")
                .withContent("Test Content")
                .withMessageStatus(MessageStatus.UNREAD.getCode())
                .withTimestamp(Instant.now())
                .build();

        messageRequest = MessageRequest.newBuilder()
                .withName("Test User")
                .withEmail("test@example.com")
                .withContent("Test Content")
                .build();

        messageResponse = MessageResponse.newBuilder()
                .withId(message.getId())
                .withName(message.getName())
                .withEmail(message.getEmail())
                .withContent(message.getContent())
                .withMessageStatus(message.getMessageStatus().getCode())
                .withTimestamp(message.getTimestamp())
                .build();
    }

    @Test
    @DisplayName("findAllMessages - Retorna todas as mensagens com sucesso")
    void shouldFindAllMessages() {
        // Arrange
        Page<Message> messagePage = new PageImpl<>(List.of(message));
        when(catchError.run(any(CatchError.SafeFunction.class))).thenReturn(messagePage);
        when(dataMapper.map(any(Message.class), eq(MessageResponse.class))).thenReturn(messageResponse);

        // Act
        Page<MessageResponse> actualResponse = messageService.findAllMessages(Pageable.unpaged());

        // Asserts
        assertNotNull(actualResponse, "Messages should not be null");
        assertEquals(1, actualResponse.getTotalElements());
        assertEquals(messageResponse, actualResponse.getContent().get(0));
        verify(catchError, times(1)).run(any(CatchError.SafeFunction.class));
    }

    @Test
    @DisplayName("createMessage - Criação de mensagem bem-sucedida")
    void shouldCreateMessage() {
        // Arrange
        MessageResponse expectedResponse = messageResponse;
        when(messageRepository.save(any(Message.class))).thenReturn(message);
        when(catchError.run(any(CatchError.SafeFunction.class))).thenAnswer(invocation -> messageRepository.save(message));
        when(dataMapper.map(message, MessageResponse.class)).thenReturn(messageResponse);

        // Act
        MessageResponse actualResponse = messageService.createMessage(messageRequest);

        // Asserts
        assertNotNull(actualResponse, "Message should not be null");
        assertEquals(expectedResponse, actualResponse, "Expected and actual responses should be equal");
        verify(messageRepository, times(1)).save(any(Message.class));
    }

    @Test
    @DisplayName("updateMessageStatus - Atualiza o status de uma mensagem com sucesso")
    void shouldUpdateMessageStatus() {
        // Arrange
        MessageResponse expectedResponse = messageResponse;
        when(messageRepository.findById(message.getId())).thenReturn(Optional.of(message));
        when(messageRepository.save(any(Message.class))).thenReturn(message);
        when(catchError.run(any(CatchError.SafeFunction.class))).then(invocation -> invocation
                .getArgument(0, CatchError.SafeFunction.class).execute());
        when(dataMapper.map(message, MessageResponse.class)).thenReturn(messageResponse);

        // Act
        MessageResponse actualResponse = messageService.updateMessageStatus(message.getId(), MessageStatus.READ.getCode());

        // Asserts
        assertNotNull(actualResponse, "Message should not be null");
        assertEquals(expectedResponse, actualResponse, "Expected and actual responses should be equal");
        verify(messageRepository, times(1)).findById(message.getId());
        verify(messageRepository, times(1)).save(any(Message.class));
    }

    @Test
    @DisplayName("findMessageById - Retorna mensagem por ID com sucesso")
    void shouldFindMessageById() {
        // Arrange
        MessageResponse expectedResponse = messageResponse;
        when(messageRepository.findById(message.getId())).thenReturn(Optional.of(message));
        when(catchError.run(any(CatchError.SafeFunction.class))).then(invocation -> invocation
                .getArgument(0, CatchError.SafeFunction.class).execute());
        when(dataMapper.map(message, MessageResponse.class)).thenReturn(messageResponse);

        // Act
        MessageResponse actualResponse = messageService.findMessageById(message.getId());

        // Asserts
        assertNotNull(actualResponse, "Message should not be null");
        assertEquals(expectedResponse, actualResponse, "Expected and actual responses should be equal");
        verify(messageRepository, times(1)).findById(message.getId());
    }

    @Test
    @DisplayName("findMessageById - Lança exceção para mensagem inexistente")
    void shouldThrowExceptionWhenMessageNotFoundById() {
        // Arrange
        when(messageRepository.findById(message.getId())).thenReturn(Optional.empty());
        when(catchError.run(any(CatchError.SafeFunction.class))).thenAnswer(invocation -> messageRepository.findById(message.getId()));

        // Act & Assert
        assertThrows(NotFoundException.class, () -> messageService.findMessageById("1"),
                "Expected NotFoundException to be thrown");
        verify(messageRepository, times(1)).findById(message.getId());
        verify(catchError, times(1)).run(any(CatchError.SafeFunction.class));
    }

    @Test
    @DisplayName("deleteMessage - Exclui mensagem com sucesso")
    void shouldDeleteMessage() {
        // Arrange
        when(messageRepository.findById(message.getId())).thenReturn(Optional.of(message));
        when(catchError.run(any(CatchError.SafeFunction.class))).then(invocation -> messageRepository.findById(message.getId()));
        doAnswer(invocation -> {
            messageRepository.delete(message);
            return null;
        }).when(catchError).run(any(CatchError.SafeProcedure.class));
        doNothing().when(messageRepository).delete(message);

        // Act
        messageService.deleteMessage(message.getId());

        // Assert
        verify(messageRepository, times(1)).findById(message.getId());
        verify(messageRepository, times(1)).delete(message);
        verify(catchError, times(1)).run(any(CatchError.SafeFunction.class));
        verify(catchError, times(1)).run(any(CatchError.SafeProcedure.class));
    }
}
