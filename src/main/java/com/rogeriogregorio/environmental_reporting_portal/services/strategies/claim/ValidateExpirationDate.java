package com.rogeriogregorio.environmental_reporting_portal.services.strategies.claim;

import com.rogeriogregorio.environmental_reporting_portal.dto.UserTokenDetailsDto;
import com.rogeriogregorio.environmental_reporting_portal.exceptions.TokenJwtException;
import com.rogeriogregorio.environmental_reporting_portal.services.strategies.TokenClaimStrategy;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class ValidateExpirationDate implements TokenClaimStrategy {

    @Override
    public void validateTokenClaim(UserTokenDetailsDto userTokenDetails) {

        Instant expirationDateFromToken = userTokenDetails.getExpiresAt();

        if (expirationDateFromToken.isBefore(Instant.now())) {
            throw new TokenJwtException("The token has expired");
        }
    }
}
