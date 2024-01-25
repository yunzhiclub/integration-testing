package com.mengyunzhi.integrationTesting.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.SQLDelete;

import javax.persistence.Entity;

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
}
