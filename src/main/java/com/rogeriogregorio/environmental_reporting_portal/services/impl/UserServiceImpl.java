package com.rogeriogregorio.environmental_reporting_portal.services.impl;

import com.rogeriogregorio.environmental_reporting_portal.dto.request.UserRequest;
import com.rogeriogregorio.environmental_reporting_portal.dto.response.UserResponse;
import com.rogeriogregorio.environmental_reporting_portal.entities.User;
import com.rogeriogregorio.environmental_reporting_portal.services.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    public Page<UserResponse> findAllUsers(Pageable pageable) {
        return null;
    }

    public UserResponse registerUser(UserRequest userRequest) {
        return null;
    }

    public UserResponse createAdmin(String id, UserRequest userRequest) {
        return null;
    }

    public UserResponse findUserById(String id) {
        return null;
    }

    public UserResponse updateUser(String id, UserRequest userRequest) {
        return null;
    }

    public void deleteUser(String id) {

    }

    public User getUserIfExists(String id) {
        return null;
    }
}
