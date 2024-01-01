package com.mengyunzhi.integrationTesting.config;

import javax.servlet.http.HttpServletRequest;

import org.springframework.session.web.http.HeaderHttpSessionStrategy;

public class HeaderAndParamHttpSessionStrategy extends HeaderHttpSessionStrategy {
    private final String headerName = "x-auth-token";

    public String getRequestedSessionId(HttpServletRequest request) {
        String token = request.getHeader(this.headerName);
        return (token != null && !token.isEmpty() ? token : request.getParameter(this.headerName));
    }
}
