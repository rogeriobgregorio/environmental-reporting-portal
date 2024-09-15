package com.rogeriogregorio.environmental_reporting_portal.services.strategies;

import com.rogeriogregorio.environmental_reporting_portal.dto.UserTokenDetailsDto;
import org.springframework.stereotype.Component;

@Component
public interface TokenClaimStrategy {

    void validateTokenClaim(UserTokenDetailsDto tokenClaimContext);
}
