package com.mengyunzhi.integrationTesting.entity;

import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.SQLDelete;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import java.util.*;

/**
 * @author kexiaobin
 */
@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@SQLDelete(sql = "update `test_plan` set deleted = 1, delete_at = UNIX_TIMESTAMP() where id = ?")
public class TestPlan extends BaseEntity<Long> {
    @ApiModelProperty("待发布")
    public static final Integer PUBLISH = 0;
    @ApiModelProperty("待开始")
    public static final Integer START = 1;
    @ApiModelProperty("部分完成")
    public static final Integer PARTIALLY = 2;
    @ApiModelProperty("完成")
    public static final Integer DONE = 3;

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

    @ManyToOne
    @JsonView(TestUserJsonView.class)
    @ApiModelProperty("测试人员")
    private User testUser;

    @OneToMany
    @JsonView(TestCaseJsonView.class)
    @ApiModelProperty("测试用例")
    private List<TestCase> testCases;

    public static interface ProjectJsonView {
    }

    public static interface TestUserJsonView {
    }

    public static interface TestCaseJsonView {
    }
}
