package com.rogeriogregorio.environmental_reporting_portal.services.strategies.claim;

import com.rogeriogregorio.environmental_reporting_portal.dto.UserTokenDetailsDto;
import com.rogeriogregorio.environmental_reporting_portal.exceptions.TokenJwtException;
import com.rogeriogregorio.environmental_reporting_portal.services.strategies.TokenClaimStrategy;
import org.springframework.stereotype.Component;

@Component
public class ValidateUserEmail implements TokenClaimStrategy {

    @Override
    public void validateTokenClaim(UserTokenDetailsDto userTokenDetails) {

        String userEmailFromToken = userTokenDetails.getClaimUserPassword();
        String userEmail = userTokenDetails.getUserEmail();

        if (!userEmailFromToken.equals(userEmail)) {
            throw new TokenJwtException("The user with the token email was not found");
        }
    }
}
