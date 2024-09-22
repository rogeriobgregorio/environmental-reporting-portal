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

    private static final String USER = "USER";
    private static final String ADMIN = "ADMIN";

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

                        // authenticate and mail
                        .requestMatchers(HttpMethod.POST, "/authenticate").permitAll()
                        .requestMatchers(HttpMethod.POST, "/mail/recover-password").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/mail/reset-password").hasAnyRole(ADMIN, USER)

                        // users
                        .requestMatchers(HttpMethod.GET, "/users").hasRole(ADMIN)
                        .requestMatchers(HttpMethod.POST, "/users/register").hasAnyRole(ADMIN, USER)
                        .requestMatchers(HttpMethod.PATCH, "/users/roles/{id}").hasRole(ADMIN)
                        .requestMatchers(HttpMethod.GET, "/users/{id}").hasAnyRole(ADMIN, USER)
                        .requestMatchers(HttpMethod.PUT, "/users/{id}").hasAnyRole(ADMIN, USER)
                        .requestMatchers(HttpMethod.DELETE, "/users/{id}").hasAnyRole(ADMIN, USER)
                        .requestMatchers(HttpMethod.GET, "/users/search/name-email").hasAnyRole(ADMIN, USER)

                        // comments
                        .requestMatchers(HttpMethod.GET, "/comments").hasRole(ADMIN)
                        .requestMatchers(HttpMethod.POST, "/comments").hasAnyRole(ADMIN, USER)
                        .requestMatchers(HttpMethod.PUT, "/comments/{id}").hasAnyRole(ADMIN, USER)
                        .requestMatchers(HttpMethod.GET, "/comments/{id}").hasRole(ADMIN)
                        .requestMatchers(HttpMethod.DELETE, "/comments/{id}").hasAnyRole(ADMIN, USER)
                        .requestMatchers(HttpMethod.GET, "/comments/search/name-email").hasRole(ADMIN)

                        // reports
                        .requestMatchers(HttpMethod.GET, "/reports").hasAnyRole(ADMIN, USER)
                        .requestMatchers(HttpMethod.POST, "/reports").hasAnyRole(ADMIN, USER)
                        .requestMatchers(HttpMethod.PUT, "/reports/{id}").hasAnyRole(ADMIN, USER)
                        .requestMatchers(HttpMethod.PATCH, "/reports/{id}/status").hasRole(ADMIN)
                        .requestMatchers(HttpMethod.GET, "/reports/{id}").hasAnyRole(ADMIN, USER)
                        .requestMatchers(HttpMethod.DELETE, "/reports/{id}").hasAnyRole(ADMIN, USER)
                        .requestMatchers(HttpMethod.GET, "/reports/search/name-email").hasAnyRole(ADMIN, USER)
                        .requestMatchers(HttpMethod.GET, "/reports/search/severity-level").hasAnyRole(ADMIN, USER)
                        .requestMatchers(HttpMethod.GET, "/reports/search/report-type").hasAnyRole(ADMIN, USER)
                        .requestMatchers(HttpMethod.GET, "/reports/search/report-status").hasAnyRole(ADMIN, USER)

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