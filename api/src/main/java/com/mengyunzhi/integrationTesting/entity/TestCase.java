package com.mengyunzhi.integrationTesting.entity;

import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import org.hibernate.annotations.SQLDelete;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.*;

/**
 * @author kexiaobin
 * 测试用例（大项）
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@SQLDelete(sql = "update `test_case` set deleted = 1, delete_at = UNIX_TIMESTAMP() where id = ?")
public class TestCase extends BaseEntity<Long> {
    @ApiModelProperty("名称")
    private String name;

    @ApiModelProperty("测试目的")
    private String testPurpose;

    @ApiModelProperty("前置条件")
    private String preconditions;

    @OneToMany(mappedBy = "testCase")
    @JsonView(TestItemJsonView.class)
    @ApiModelProperty("测试项")
    private List<TestItem> testItems;

    @ManyToOne
    @JsonView(ProjectJsonView.class)
    @ApiModelProperty("所属项目")
    private Project project;

    @ApiModelProperty("是否显示子项")
    private Boolean isShow = false;

    public static interface ProjectJsonView {}

    public static interface TestItemJsonView {}
}
