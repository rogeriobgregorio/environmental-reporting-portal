package com.rogeriogregorio.environmental_reporting_portal.services;

import com.rogeriogregorio.environmental_reporting_portal.dto.request.MessageBoxRequest;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.MessageBoxResponse;
import com.rogeriogregorio.environmental_reporting_portal.entities.MessageBox;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
public interface MessageBoxService {

    Page<MessageBoxResponse> findAllMessageBoxs(Pageable pageable);

    MessageBoxResponse createMessageBox(MessageBoxRequest messageBoxRequest);

    MessageBoxResponse updateMessageBox(String id, MessageBoxRequest messageBoxRequest);

    MessageBoxResponse findMessageBoxById(String id);

    void deleteMessageBox(String id);

    MessageBox getMessageBoxIfExists(String id);
}
