package com.mengyunzhi.integrationTesting.entity;

import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.SQLDelete;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

/**
 * @author kexiaobin
 */
@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@SQLDelete(sql = "update `test_item` set deleted = 1, delete_at = UNIX_TIMESTAMP() where id = ?")
public class TestItem extends BaseEntity<Long> {
    @ApiModelProperty("名称")
    private String name;

    @ApiModelProperty("测试步骤")
    private String steps;

    @ApiModelProperty("预期结果")
    private String expectedResult;

    @ManyToOne
    @ApiModelProperty("测试用例")
    @JsonView(TestCaseJsonView.class)
    private TestCase testCase;

    public static interface TestCaseJsonView {}
}
