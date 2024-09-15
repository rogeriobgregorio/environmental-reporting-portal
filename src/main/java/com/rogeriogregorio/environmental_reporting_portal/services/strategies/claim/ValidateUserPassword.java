package com.rogeriogregorio.environmental_reporting_portal.services.strategies.claim;

import com.rogeriogregorio.environmental_reporting_portal.dto.UserTokenDetailsDto;
import com.rogeriogregorio.environmental_reporting_portal.exceptions.TokenJwtException;
import com.rogeriogregorio.environmental_reporting_portal.services.strategies.TokenClaimStrategy;
import org.springframework.stereotype.Component;

@Component
public class ValidateUserPassword implements TokenClaimStrategy {

    @Override
    public void validateTokenClaim(UserTokenDetailsDto userTokenDetails) {

        String userPasswordFromToken = userTokenDetails.getClaimUserPassword();
        String userPassword = userTokenDetails.getUserPassword();

        if (!userPasswordFromToken.equals(userPassword)) {
            throw new TokenJwtException("Invalid token");
        }
    }
}
