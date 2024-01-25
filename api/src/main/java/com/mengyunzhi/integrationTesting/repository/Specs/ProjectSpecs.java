package com.mengyunzhi.integrationTesting.repository.Specs;

import com.mengyunzhi.integrationTesting.entity.Project;
import com.mengyunzhi.integrationTesting.entity.User;
import org.springframework.data.jpa.domain.Specification;

/**
 * @author kexiaobin
 */
public class ProjectSpecs {
    public static Specification<Project> containingName(String name) {
        if (name != null) {
            return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("name").as(String.class), String.format("%s%%", name));
        } else {
            return Specification.where(null);
        }
    }
}
