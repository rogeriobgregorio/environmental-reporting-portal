package com.rogeriogregorio.environmental_reporting_portal.security.impl;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.rogeriogregorio.environmental_reporting_portal.dto.UserAuthDetailsDto;
import com.rogeriogregorio.environmental_reporting_portal.dto.UserTokenDetailsDto;
import com.rogeriogregorio.environmental_reporting_portal.entities.User;
import com.rogeriogregorio.environmental_reporting_portal.exceptions.NotFoundException;
import com.rogeriogregorio.environmental_reporting_portal.repositories.UserRepository;
import com.rogeriogregorio.environmental_reporting_portal.security.TokenService;
import com.rogeriogregorio.environmental_reporting_portal.services.strategies.TokenClaimStrategy;
import com.rogeriogregorio.environmental_reporting_portal.utils.CatchError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class TokenServiceImpl implements TokenService {

    private static final String ISSUER_NAME = "environmental-reporting-portal";
    private static final Instant EXPIRY_TIME = Instant.now().plus(2, ChronoUnit.HOURS);

    @Value("${api.security.token.secret}")
    private String secretKey;
    private final UserRepository userRepository;
    private final List<TokenClaimStrategy> tokenValidators;
    private final CatchError catchError;

    @Autowired
    public TokenServiceImpl(UserRepository userRepository,
                            List<TokenClaimStrategy> tokenValidators,
                            CatchError catchError) {

        this.userRepository = userRepository;
        this.tokenValidators = tokenValidators;
        this.catchError = catchError;
    }

    private Algorithm getAlgorithm() {
        return Algorithm.HMAC256(secretKey);
    }

    public String generateAuthenticationToken(UserAuthDetailsDto userAuthDetailsDto) {

        return catchError.run(() -> JWT.create()
                .withIssuer(ISSUER_NAME)
                .withSubject(userAuthDetailsDto.getUsername())
                .withClaim("role", userAuthDetailsDto.getRole())
                .withClaim("id", userAuthDetailsDto.getUserId())
                .withExpiresAt(EXPIRY_TIME)
                .sign(getAlgorithm()));
    }

    public String validateAuthenticationToken(String token) {

        return catchError.run(() -> JWT.require(getAlgorithm())
                .withIssuer(ISSUER_NAME)
                .build()
                .verify(token)
                .getSubject());
    }

    public String generateEmailToken(User user) {

        return catchError.run(() -> JWT.create()
                .withIssuer(ISSUER_NAME)
                .withSubject(user.getEmail())
                .withClaim("userId", String.valueOf(user.getId()))
                .withClaim("userEmail", user.getEmail())
                .withClaim("userPassword", user.getPassword())
                .withExpiresAt(EXPIRY_TIME)
                .sign(getAlgorithm()));
    }

    public User validateEmailToken(String token) {

        DecodedJWT decodedJWT = catchError.run(() -> JWT.require(getAlgorithm())
                .withIssuer(ISSUER_NAME)
                .build()
                .verify(token));

        String userIdFromToken = decodedJWT.getClaim("userId").asString();
        User user = findUserByIdFromToken(userIdFromToken);

        UserTokenDetailsDto userTokenDetails = new UserTokenDetailsDto(user, decodedJWT);
        tokenValidators.forEach(strategy -> strategy.validateTokenClaim(userTokenDetails));

        return user;
    }

    private User findUserByIdFromToken(String userIdFromToken) {

        return catchError.run(() -> userRepository.findById(userIdFromToken))
                .orElseThrow(() -> new NotFoundException("The user with the token ID was not found"));
    }
}
