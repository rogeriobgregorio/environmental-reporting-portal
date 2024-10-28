package com.rogeriogregorio.environmental_reporting_portal.services;

import com.rogeriogregorio.environmental_reporting_portal.dto.request.MessageRequest;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.MessageResponse;
import com.rogeriogregorio.environmental_reporting_portal.entities.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
public interface MessageService {

    Page<MessageResponse> findAllMessages(Pageable pageable);

    MessageResponse createMessage(MessageRequest messageRequest);

    MessageResponse updateMessageStatus(String id, Integer messageStatus);

    MessageResponse findMessageById(String id);

    void deleteMessage(String id);

    Message getMessageIfExists(String id);
}
