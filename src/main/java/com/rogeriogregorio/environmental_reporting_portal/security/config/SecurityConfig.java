package com.rogeriogregorio.environmental_reporting_portal.security.config;

import com.rogeriogregorio.environmental_reporting_portal.utils.CatchError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final SecurityFilterConfig securityFilterConfig;
    private final CatchError catchError;

    @Autowired
    public SecurityConfig(SecurityFilterConfig securityFilterConfig, CatchError catchError) {

        this.securityFilterConfig = securityFilterConfig;
        this.catchError = catchError;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) {

        return catchError.run(() -> httpSecurity.cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/register").permitAll()
                        .requestMatchers(HttpMethod.POST, "/authenticate").permitAll()
                        .requestMatchers(HttpMethod.GET, "/email/validate/search").permitAll()
                        .requestMatchers(HttpMethod.POST, "/email/password-reset").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/email/password-reset").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.GET, "/users").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.POST, "/users").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.PUT, "/users/{id}").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.DELETE, "/users/{id}").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.GET, "/users/{id}").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.GET, "/users/search").hasAnyRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/users/roles").hasRole("ADMIN")
                        .anyRequest()
                        .authenticated())
                .addFilterBefore(securityFilterConfig, UsernamePasswordAuthenticationFilter.class)
                .build());
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) {

        return catchError.run(authenticationConfiguration::getAuthenticationManager);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}