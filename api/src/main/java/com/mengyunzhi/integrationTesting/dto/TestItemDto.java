package com.mengyunzhi.integrationTesting.dto;

import com.mengyunzhi.integrationTesting.entity.TestCase;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author kexiaobin
 */
public class TestItemDto {
    @Data
    public static class SaveRequest {
        private String name;
        private String steps;
        private String expectedResult;
        private TestCase testCase;
    }

    @Data
    public static class UpdateRequest {
        private String name;
        private String steps;
        private String expectedResult;
    }
}
