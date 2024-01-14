package com.mengyunzhi.integrationTesting.controller;

import com.mengyunzhi.integrationTesting.dto.UserDto;
import com.mengyunzhi.integrationTesting.entity.User;
import com.mengyunzhi.integrationTesting.service.UserService;
import net.bytebuddy.utility.RandomString;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Arrays;
import java.util.Random;


class UserControllerTest extends ControllerTest{

    @MockBean
    UserService userService;

    /**
     * 对增加进行测试
     */
    @Test
    void save() throws Exception {
        User user = UserControllerTest.getOneUser();
        Mockito.doReturn(user).when(this.userService).save(Mockito.any(UserDto.SaveRequest.class));

        this.mockMvc.perform(MockMvcRequestBuilders.post("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("id").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("name").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("username").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("role").exists());

    }

    /**
     * 对修改进行测试
     */
    @Test
    void update() throws Exception {
        Long id = new Random().nextLong();
        User user = UserControllerTest.getOneUser();
        Mockito.doReturn(user).when(this.userService).update(Mockito.eq(id), Mockito.any(UserDto.UpdateRequest.class));

        this.mockMvc.perform(MockMvcRequestBuilders.put("/user/" + id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("id").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("name").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("username").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("role").exists());
    }

    /**
     * 对分页进行测试
     */
    @Test
    void page() throws Exception {
        User user = UserControllerTest.getOneUser();

        Mockito.doReturn(new PageImpl<User>(Arrays.asList(user))).when(this.userService)
                .pageAll(Mockito.any(String.class), Mockito.any(Pageable.class));

        this.mockMvc.perform(MockMvcRequestBuilders.get("/user/page")
                .param("name", "")
                .param("page", "0")
                .param("size", "10")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("content[0].name").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("content[0].username").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("content[0].name").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("content[0].role").exists());
    }

    public static User getOneUser() {
        User user = new User();
        user.setId(1L);
        user.setName(RandomString.make(4));
        user.setUsername(RandomString.make(11));
        user.setRole(User.ROLE_ADMIN);
        user.setContactPhone(RandomString.make(11));

        return user;
    }

}