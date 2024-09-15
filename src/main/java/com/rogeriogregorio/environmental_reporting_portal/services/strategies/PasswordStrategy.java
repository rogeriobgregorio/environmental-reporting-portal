package com.rogeriogregorio.environmental_reporting_portal.services.strategies;

import org.springframework.stereotype.Component;

@Component
public interface PasswordStrategy {

    boolean validatePassword(String password);

    String getRequirement();
}
