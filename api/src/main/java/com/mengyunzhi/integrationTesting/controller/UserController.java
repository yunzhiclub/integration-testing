package com.mengyunzhi.integrationTesting.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.mengyunzhi.integrationTesting.entity.User;
import com.mengyunzhi.integrationTesting.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("login")
    @JsonView(UserController.LoginJsonView.class)
    public User login(Principal user) {
        return this.userService.findByUsername(user.getName());
    }

    @GetMapping("currentLoginUser")
    public User getCurrentLoginUser() {
        return this.userService.getCurrentLonginUser().get();
    }

    public static interface LoginJsonView extends User.UsernameJsonView, User.NameJsonView {

    }
}
