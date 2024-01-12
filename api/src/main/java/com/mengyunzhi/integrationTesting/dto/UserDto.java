package com.mengyunzhi.integrationTesting.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author kexiaobin
 */
public class UserDto {

    @Data
    public static class SaveRequest {
        private String name;
        private String role;
        private String contactPhone;
        private String username;
    }

    @EqualsAndHashCode(callSuper = true)
    @Data
    public static class UpdateRequest extends SaveRequest {
    }

    @Data
    public static class UpdatePassword {
        private String oldPassword;
        private String newPassword;
    }
}
