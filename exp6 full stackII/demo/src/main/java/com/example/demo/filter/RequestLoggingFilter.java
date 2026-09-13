package com.example.demo.filter;

import java.io.IOException;
import java.util.UUID;

import org.slf4j.MDC;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class RequestLoggingFilter extends OncePerRequestFilter {

    private static final String CORRELATION_ID = "correlationId";

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String correlationId = UUID.randomUUID().toString();

        MDC.put(CORRELATION_ID, correlationId);

        try {

            System.out.println(
                    "Incoming Request: "
                    + request.getMethod()
                    + " "
                    + request.getRequestURI()
                    + " | Correlation ID: "
                    + correlationId
            );

            response.setHeader(CORRELATION_ID, correlationId);

            filterChain.doFilter(request, response);

        } finally {

            MDC.remove(CORRELATION_ID);
        }
    }
}