package com.rogeriogregorio.environmental_reporting_portal.repositories;

import com.rogeriogregorio.environmental_reporting_portal.entities.MessageBox;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageBoxRepository extends MongoRepository<MessageBox, String> {
}
