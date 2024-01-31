package com.mengyunzhi.integrationTesting.service;

import com.mengyunzhi.integrationTesting.dto.UserDto;
import com.mengyunzhi.integrationTesting.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * @author kexiaobin
 */
public interface UserService {

    User findByUsername(String username);

    Optional<User> getCurrentLonginUser();

    Page<User> pageAll(String name, Pageable pageable);

    User save(UserDto.SaveRequest saveRequest);

    User update(Long id, UserDto.UpdateRequest updateRequest);

    User findById(Long id);

    String resetPassword(Long id);

    void delete(Long id);

    /**
     * 检查密码是否一致
     */
    boolean checkPasswordIsRight(String oldPassword);

    /**
     * 修改密码
     */
    void updatePassword(String oldPassword, String newPassword);

    List<User> getAllUser();
}
