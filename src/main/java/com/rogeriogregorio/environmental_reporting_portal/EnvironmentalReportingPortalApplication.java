package com.rogeriogregorio.environmental_reporting_portal;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EnvironmentalReportingPortalApplication {

	public static void main(String[] args) {
		SpringApplication.run(EnvironmentalReportingPortalApplication.class, args);
	}
}
