package com.mengyunzhi.integrationTesting.entity;

import com.fasterxml.jackson.annotation.JsonView;
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
    private String title;

    private String description;

    private Integer status;

    @ManyToOne
    @JsonView(ProjectJsonView.class)
    private Project project;

    @OneToMany
    @JsonView(TestUserJsonView.class)
    private List<User> testUser;

    @OneToMany
    @JsonView(TestCaseJsonView.class)
    private List<TestCase> testCases;

    public static interface ProjectJsonView {}
    public static interface TestUserJsonView {}
    public static interface TestCaseJsonView {}
}
