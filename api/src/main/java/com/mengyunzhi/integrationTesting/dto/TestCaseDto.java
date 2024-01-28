package com.mengyunzhi.integrationTesting.dto;

import com.mengyunzhi.integrationTesting.entity.Project;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author kexiaobin
 */
public class TestCaseDto {
    @Data
    public static class SaveRequest {
        private Project project;
        private String name;
        private String testPurpose;
        private String preconditions;
    }

    @EqualsAndHashCode(callSuper = true)
    @Data
    public static class UpdateRequest extends SaveRequest {
    }
}
