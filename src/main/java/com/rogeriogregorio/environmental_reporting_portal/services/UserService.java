package com.rogeriogregorio.environmental_reporting_portal.services;

import com.rogeriogregorio.environmental_reporting_portal.dto.request.UserRequest;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.UserResponse;
import com.rogeriogregorio.environmental_reporting_portal.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
public interface UserService {

    Page<UserResponse> findAllUsers(Pageable pageable);

    UserResponse registerUser(UserRequest userRequest);

    UserResponse createAdmin(String id, UserRequest userRequest);

    UserResponse findUserById(String id);

    UserResponse updateUser(String id, UserRequest userRequest);

    void deleteUser(String id);

    User getUserIfExists(String id);

}
