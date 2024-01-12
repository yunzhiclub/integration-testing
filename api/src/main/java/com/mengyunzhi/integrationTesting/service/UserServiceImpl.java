package com.mengyunzhi.integrationTesting.service;

import com.mengyunzhi.integrationTesting.dto.UserDto;
import com.mengyunzhi.integrationTesting.entity.User;
import com.mengyunzhi.integrationTesting.repository.UserRepository;
import net.bytebuddy.utility.RandomString;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;


import javax.persistence.EntityNotFoundException;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

/**
 * @author kexiaobin
 */
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
        return this.userRepository.findByUsername(username).orElseThrow(EntityNotFoundException::new);
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

    @Override
    public Page<User> pageAll(String name, Pageable pageable) {
        return this.userRepository.getAll(name, pageable);
    }

    @Override
    public User save(UserDto.SaveRequest saveRequest) {
        Assert.notNull(saveRequest.getName(), "name 不能为空");
        Assert.notNull(saveRequest.getContactPhone(), "contactPhone 不能为空");
        Assert.notNull(saveRequest.getRole(), "role 不能为空");
        Assert.notNull(saveRequest.getUsername(), "username 不能为空");

        User user = new User();
        user.setName(saveRequest.getName());
        user.setRole(saveRequest.getRole());
        user.setUsername(saveRequest.getUsername());
        user.setContactPhone(saveRequest.getContactPhone());
        user.setPassword(User.PASSWORD);
        return this.userRepository.save(user);
    }

    @Override
    public User update(Long id, UserDto.UpdateRequest updateRequest) {
        Assert.notNull(updateRequest.getName(), "name 不能为空");
        Assert.notNull(updateRequest.getContactPhone(), "contactPhone 不能为空");
        Assert.notNull(updateRequest.getRole(), "role 不能为空");
        Assert.notNull(updateRequest.getUsername(), "username 不能为空");

        User user = this.findById(id);
        user.setName(updateRequest.getName());
        user.setRole(updateRequest.getRole());
        user.setUsername(updateRequest.getUsername());
        user.setContactPhone(updateRequest.getContactPhone());
        return this.userRepository.save(user);
    }

    @Override
    public User findById(Long id) {
        return this.userRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public String resetPassword(Long id) {
        User user = this.findById(id);
        String password = RandomString.make(6);
        user.setPassword(RandomString.make(6));
        this.userRepository.save(user);
        return password;
    }

    @Override
    public void delete(Long id) {
        this.userRepository.deleteById(id);
    }
}
