package com.rogeriogregorio.environmental_reporting_portal;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Environmental Reporting Portal", version = "1", description = "API desenvolvida para Portal de Denúncias Ambientais"))
public class EnvironmentalReportingPortalApplication {

	public static void main(String[] args) {
		SpringApplication.run(EnvironmentalReportingPortalApplication.class, args);
	}
}
