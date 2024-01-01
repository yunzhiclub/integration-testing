package com.mengyunzhi.integrationTesting.config;

import com.mengyunzhi.integrationTesting.entity.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.session.MapSessionRepository;
import org.springframework.session.SessionRepository;
import org.springframework.session.config.annotation.web.http.EnableSpringHttpSession;
import org.springframework.session.web.http.HttpSessionStrategy;


@Configuration
@EnableWebSecurity
@EnableSpringHttpSession
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class MvcSecurityConfig extends WebSecurityConfigurerAdapter {
    public static int order = 0;

    private final PasswordEncoder passwordEncoder;

    public MvcSecurityConfig() {
        this.passwordEncoder = new YzBCryptPasswordEncoder();
        User.setPasswordEncoder(this.passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .anyRequest().authenticated()
                .and().httpBasic()
                .and().cors()
                .and().csrf().disable();

        http.headers().frameOptions().disable();
    }

    /**
     * 由于我们启用了@EnableSpringHttpSession后，而非RedisHttpSession.
     * 所以应该为SessionRepository提供一个实现。
     * 而Spring中默认给了一个SessionRepository的实现MapSessionRepository.
     *
     * @return session策略
     */
    @Bean
    public SessionRepository sessionRepository() {
        return new MapSessionRepository();
    }

    @Bean
    public HttpSessionStrategy httpSessionStrategy() {
        return new HeaderAndParamHttpSessionStrategy();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return this.passwordEncoder;
    }
}
