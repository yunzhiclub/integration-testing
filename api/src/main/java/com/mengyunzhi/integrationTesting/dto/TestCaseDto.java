package com.mengyunzhi.integrationTesting.dto;

import com.mengyunzhi.integrationTesting.entity.Project;
import com.mengyunzhi.integrationTesting.entity.TestCase;
import com.mengyunzhi.integrationTesting.entity.TestItem;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.*;

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

    @Data
    public static class CloneTestCase {
        private List<TestCase> testCases;
    }
}
