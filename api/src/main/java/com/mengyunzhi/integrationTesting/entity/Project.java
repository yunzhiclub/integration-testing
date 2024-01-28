package com.mengyunzhi.integrationTesting.entity;

import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import org.hibernate.annotations.SQLDelete;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.*;

/**
 * @author kexiaobin
 * 项目实体类
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@SQLDelete(sql = "update `project` set deleted = 1, delete_at = UNIX_TIMESTAMP() where id = ?")
public class Project extends BaseEntity<Long> {
    @ApiModelProperty("名称")
    private String name;

    @ApiModelProperty("测试地址")
    private String projectUrl;

    @ApiModelProperty("项目代码仓库地址")
    private String repositoryUrl;

    @ApiModelProperty("测试用例")
    @OneToMany(mappedBy = "project")
    @JsonView(TestCasesJsonView.class)
    private List<TestCase> testCases;

    @ApiModelProperty("项目计划")
    @OneToMany(mappedBy = "project")
    @JsonView(TestPlansJsonView.class)
    private List<TestPlan> testPlans;

    public static interface TestCasesJsonView {}
    public static interface TestPlansJsonView {}
}
