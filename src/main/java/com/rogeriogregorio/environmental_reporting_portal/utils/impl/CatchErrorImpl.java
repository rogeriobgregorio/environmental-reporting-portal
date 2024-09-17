package com.rogeriogregorio.environmental_reporting_portal.utils.impl;

import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.rogeriogregorio.environmental_reporting_portal.exceptions.*;
import com.rogeriogregorio.environmental_reporting_portal.utils.CatchError;
import jakarta.mail.MessagingException;
import jakarta.servlet.ServletException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.modelmapper.MappingException;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class CatchErrorImpl implements CatchError {

    private static final Logger LOGGER = LogManager.getLogger(CatchErrorImpl.class);
    private static final Map<Class<? extends Exception>, ExceptionCreator> EXCEPTION_MAP = new HashMap<>();

    static {
        EXCEPTION_MAP.put(UsernameNotFoundException.class, NotFoundException::new);
        EXCEPTION_MAP.put(JWTVerificationException.class, TokenJwtException::new);
        EXCEPTION_MAP.put(DataAccessException.class, RepositoryException::new);
        EXCEPTION_MAP.put(JWTCreationException.class, TokenJwtException::new);
        EXCEPTION_MAP.put(ServletException.class, HttpServletException::new);
        EXCEPTION_MAP.put(MappingException.class, DataMapperException::new);
        EXCEPTION_MAP.put(MessagingException.class, MailException::new);
        EXCEPTION_MAP.put(IOException.class, IOProcessException::new);
    }

    @Override
    public <T> T run(SafeFunction<T> method) {

        try {
            return method.execute();
        } catch (Exception ex) {
            throwException(ex);
            return null;
        }
    }

    @Override
    public void run(SafeProcedure method) {

        try {
            method.execute();
        } catch (Exception ex) {
            throwException(ex);
        }
    }

    private void throwException(Exception ex) {

        LOGGER.error(ex.getMessage(), ex);
        throw EXCEPTION_MAP.getOrDefault(ex.getClass(), UnexpectedException::new).create(ex.getMessage(), ex);
    }
}