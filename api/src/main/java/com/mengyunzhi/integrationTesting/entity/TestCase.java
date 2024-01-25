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

    @OneToMany
    @JsonView(TestItemJsonView.class)
    private List<TestItem> testItems;

    @ManyToOne
    @JsonView(ProjectJsonView.class)
    private Project project;

    public static interface ProjectJsonView {}

    public static interface TestItemJsonView {}
}
