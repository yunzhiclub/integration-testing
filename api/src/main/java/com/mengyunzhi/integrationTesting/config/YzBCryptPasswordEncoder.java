package com.mengyunzhi.integrationTesting.config;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class YzBCryptPasswordEncoder extends BCryptPasswordEncoder {

    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        if (rawPassword == null) {
            throw new IllegalArgumentException("rawPassword cannot be null");
        }
        return super.matches(rawPassword, encodedPassword);
    }
}
