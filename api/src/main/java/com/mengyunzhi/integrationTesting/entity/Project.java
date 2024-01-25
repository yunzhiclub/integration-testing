package com.mengyunzhi.integrationTesting.entity;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import org.hibernate.annotations.SQLDelete;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
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

    private String name;

    private String projectUrl;

    private String repositoryUrl;

    @OneToMany(mappedBy = "project")
    @JsonView(TestCasesJsonView.class)
    private List<TestCase> testCases;


    @OneToMany(mappedBy = "project")
    @JsonView(TestPlansJsonView.class)
    private List<TestPlan> testPlans;

    public static interface TestCasesJsonView {}
    public static interface TestPlansJsonView {}
}
