package com.mengyunzhi.integrationTesting.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.mengyunzhi.integrationTesting.dto.UserDto;
import com.mengyunzhi.integrationTesting.entity.User;
import com.mengyunzhi.integrationTesting.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;

/**
 * @author kexiaobin
 */
@RestController
@RequestMapping("user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * 添加用户
     */
    @PostMapping()
    @JsonView(SaveJsonView.class)
    public User save(@RequestBody UserDto.SaveRequest saveRequest) {
        return this.userService.save(saveRequest);
    }

    /**
     * 获取用户列表，根据用户id排序
     */
    @GetMapping("page")
    @JsonView(PageJsonView.class)
    public Page<User> pageAll(@RequestParam(defaultValue = "") String name,
                              @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC))
                              Pageable pageable) {
        return this.userService.pageAll(name, pageable);
    }


    @GetMapping("{id}")
    public User getById(@PathVariable Long id) {
        return this.userService.findById(id);
    }

    @PutMapping("{id}")
    @JsonView(UpdateJsonView.class)
    public User update(@PathVariable Long id, @RequestBody UserDto.UpdateRequest updateRequest) {
        return this.userService.update(id, updateRequest);
    }

    @GetMapping("login")
    @JsonView(LoginJsonView.class)
    public User login(Principal user) {
        return this.userService.findByUsername(user.getName());
    }

    @PutMapping("resetPassword/{id}")
    public String resetPassword(@PathVariable Long id) {
        return this.userService.resetPassword(id);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        this.userService.delete(id);
    }

    @GetMapping("logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            new SecurityContextLogoutHandler().logout(request, response, authentication);
        }
    }

    @GetMapping("currentLoginUser")
    public User getCurrentLoginUser() {
        return this.userService.getCurrentLonginUser().get();
    }

    /**
     * 验证密码
     */
    @GetMapping("checkPasswordIsRight")
    public boolean checkPasswordIsRight(@RequestParam String oldPassword) {
        return this.userService.checkPasswordIsRight(oldPassword);
    }

    @PutMapping("updatePassword")
    public void updatePassword(@RequestBody UserDto.UpdatePassword updatePassword) {
        this.userService.updatePassword(updatePassword.getOldPassword(), updatePassword.getNewPassword());
    }

    interface LoginJsonView {
    }

    interface SaveJsonView {
    }

    interface PageJsonView {
    }

    interface UpdateJsonView {
    }
}
