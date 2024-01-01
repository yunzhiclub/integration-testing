package com.mengyunzhi.integrationTesting.service;

import com.mengyunzhi.integrationTesting.entity.User;

import java.util.Optional;

public interface UserService {

    User findByUsername(String username);

    Optional<User> getCurrentLonginUser();
}
