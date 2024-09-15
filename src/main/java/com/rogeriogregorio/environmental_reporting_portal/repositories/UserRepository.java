package com.rogeriogregorio.environmental_reporting_portal.repositories;

import com.rogeriogregorio.environmental_reporting_portal.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByEmail(String emailLogin);
}