package com.mengyunzhi.integrationTesting.repository.Specs;

import com.mengyunzhi.integrationTesting.entity.TestCase;
import com.mengyunzhi.integrationTesting.entity.User;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.JoinType;

/**
 * @author kexiaobin
 */
public class TestCaseSpecs {

    public static Specification<TestCase> containingName(String name) {
        if (name != null) {
            return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("name").as(String.class), String.format("%s%%", name));
        } else {
            return Specification.where(null);
        }
    }

    public static Specification<TestCase> belongProject(Long projectId) {
        if (projectId == null || projectId == 0) {
            return Specification.where(null);
        } else {
            return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.join("project", JoinType.LEFT).get("id").as(Long.class), projectId);
        }
    }
}
