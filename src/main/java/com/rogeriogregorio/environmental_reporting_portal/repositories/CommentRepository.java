package com.rogeriogregorio.environmental_reporting_portal.repositories;

import com.rogeriogregorio.environmental_reporting_portal.entities.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {

    @Query("{ '$or' : [ { 'author.name' : { '$regex' : ?0, '$options' : 'i' } }, " +
            "{ 'author.email' : { '$regex' : ?1, '$options' : 'i' } } ] }")
    Page<Comment> findByAuthorNameOrEmail(String name, String email, Pageable pageable);
}
