package com.rogeriogregorio.environmental_reporting_portal.services.strategies.password;

import com.rogeriogregorio.environmental_reporting_portal.services.strategies.PasswordStrategy;
import org.springframework.stereotype.Component;

import java.util.regex.Pattern;

@Component
public class ValidatePasswordLowerCase implements PasswordStrategy {

    public boolean validatePassword(String password) {

        return Pattern.matches(".*[a-z].*", password);
    }

    public String getRequirement() {
        return "one lowercase letter";
    }
}
