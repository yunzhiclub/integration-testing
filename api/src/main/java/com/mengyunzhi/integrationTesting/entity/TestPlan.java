package com.mengyunzhi.integrationTesting.entity;

import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.SQLDelete;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.*;
/**
 * @author kexiaobin
 */
@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@SQLDelete(sql = "update `test_plan` set deleted = 1, delete_at = UNIX_TIMESTAMP() where id = ?")
public class TestPlan extends BaseEntity<Long> {
    @ApiModelProperty("标题")
    private String title;

    @ApiModelProperty("描述")
    private String description;

    @ApiModelProperty("状态")
    private Integer status;

    @ManyToOne
    @JsonView(ProjectJsonView.class)
    @ApiModelProperty("所属项目")
    private Project project;

    @OneToMany
    @JsonView(TestUserJsonView.class)
    @ApiModelProperty("测试人员")
    private List<User> testUser;

    @OneToMany
    @JsonView(TestCaseJsonView.class)
    @ApiModelProperty("测试用例")
    private List<TestCase> testCases;

    public static interface ProjectJsonView {}
    public static interface TestUserJsonView {}
    public static interface TestCaseJsonView {}
}
