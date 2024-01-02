package com.mengyunzhi.integrationTesting.service;

import com.mengyunzhi.integrationTesting.entity.User;
import com.mengyunzhi.integrationTesting.repository.UserRepository;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    private final org.slf4j.Logger logger = LoggerFactory.getLogger(this.getClass());

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public User findByUsername(String username) {
        return this.userRepository.findByUsername(username).orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository.findByUsername(username).orElseThrow(EntityNotFoundException::new);
        return user;
    }


    /**
     * 从SecurityContextHolder获取认证用户
     */
    @Override
    public Optional<User> getCurrentLonginUser() {
        Object user = null;
        Authentication authentication = (Authentication) SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            try {
                user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
                if (user instanceof User) {
                    return Optional.of((User) user);
                }
            } catch (Exception e) {
                logger.error("在获取authUser时发生了异常，请确认loadUserByUsername方法返回的类型是否为AuthUser");
                throw e;
            }
        }
        return Optional.empty();
    }


}
