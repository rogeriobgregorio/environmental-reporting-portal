package com.rogeriogregorio.environmental_reporting_portal.services.impl;

import com.rogeriogregorio.environmental_reporting_portal.dto.request.MessageRequest;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.MessageResponse;
import com.rogeriogregorio.environmental_reporting_portal.entities.Message;
import com.rogeriogregorio.environmental_reporting_portal.entities.enums.MessageStatus;
import com.rogeriogregorio.environmental_reporting_portal.exceptions.NotFoundException;
import com.rogeriogregorio.environmental_reporting_portal.repositories.MessageRepository;
import com.rogeriogregorio.environmental_reporting_portal.services.MessageService;
import com.rogeriogregorio.environmental_reporting_portal.utils.CatchError;
import com.rogeriogregorio.environmental_reporting_portal.utils.DataMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final CatchError catchError;
    private final DataMapper dataMapper;
    private static final Logger LOGGER = LogManager.getLogger(MessageServiceImpl.class);

    @Autowired
    public MessageServiceImpl(MessageRepository messageRepository,
                              CatchError catchError, DataMapper dataMapper) {

        this.messageRepository = messageRepository;
        this.catchError = catchError;
        this.dataMapper = dataMapper;
    }

    public Page<MessageResponse> findAllMessages(Pageable pageable) {

        return catchError.run(() -> messageRepository.findAll(pageable))
                .map(message -> dataMapper.map(message, MessageResponse.class));
    }

    public MessageResponse createMessage(MessageRequest messageRequest) {

        Message message = Message.newBuilder()
                .withName(messageRequest.getName())
                .withEmail(messageRequest.getEmail())
                .withContent(messageRequest.getContent())
                .withMessageStatus(MessageStatus.UNREAD.getCode())
                .withTimestamp(Instant.now())
                .build();

        Message messageSaved = catchError.run(() -> messageRepository.save(message));
        LOGGER.info("Message created: {}", messageSaved);
        return dataMapper.map(messageSaved, MessageResponse.class);
    }

    public MessageResponse findMessageById(String id) {

        return catchError.run(() -> messageRepository.findById(id))
                .map(message -> dataMapper.map(message, MessageResponse.class))
                .orElseThrow(() -> new NotFoundException("Message not found with ID: " + id + "."));
    }

    public void deleteMessage(String id) {

        Message message = getMessageIfExists(id);
        catchError.run(() -> messageRepository.delete(message));
        LOGGER.warn("Message deleted: {}", message);
    }

    public Message getMessageIfExists(String id) {

        return catchError.run(() -> messageRepository.findById(id))
                .orElseThrow(() -> new NotFoundException("Message not found with ID: " + id + "."));
    }
}
