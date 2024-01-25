package com.mengyunzhi.integrationTesting.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author kexiaobin
 */
public class ProjectDto {
    @Data
    public static class SaveRequest {
        @ApiModelProperty("名称")
        private String name;

        @ApiModelProperty("测试地址")
        private String projectUrl;

        @ApiModelProperty("项目代码仓库地址")
        private String repositoryUrl;
    }

    @EqualsAndHashCode(callSuper = true)
    @Data
    public static class UpdateRequest extends SaveRequest {
    }

}
