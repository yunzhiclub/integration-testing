package com.mengyunzhi.integrationTesting.entity;

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
public class TestItem extends BaseEntity<Long>{
    private String name;
    private String steps;
    private String expectedResult;
}
