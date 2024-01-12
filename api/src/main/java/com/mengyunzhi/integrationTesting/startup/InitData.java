package com.mengyunzhi.integrationTesting.startup;


import com.mengyunzhi.integrationTesting.config.MvcSecurityConfig;
import com.mengyunzhi.integrationTesting.entity.User;
import com.mengyunzhi.integrationTesting.repository.UserRepository;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;


@Component
public class InitData implements ApplicationListener<ContextRefreshedEvent>, Ordered {
    public static int order = MvcSecurityConfig.order + 1;
    private final UserRepository userRepository;

    public InitData(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        if (userRepository.count() == 0) {
            User user = new User();
            user.setName("管理员");
            user.setUsername("13920618851");
            user.setPassword("yunzhi");
            user.setRole(User.ROLE_ADMIN);
            userRepository.save(user);
        }
    }

    @Override
    public int getOrder() {
        return InitData.order;
    }

}
