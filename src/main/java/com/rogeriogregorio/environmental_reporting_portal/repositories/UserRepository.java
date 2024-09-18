package com.rogeriogregorio.environmental_reporting_portal.repositories;

import com.rogeriogregorio.environmental_reporting_portal.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByEmail(String emailLogin);

    @Query("{ '$or' : [ { 'name' : { '$regex' : ?0, '$options' : 'i' } }, " +
            "{ 'email' : { '$regex' : ?1, '$options' : 'i' } } ] }")
    Page<User> findByNameOrEmail(String name, String email, Pageable pageable);
}