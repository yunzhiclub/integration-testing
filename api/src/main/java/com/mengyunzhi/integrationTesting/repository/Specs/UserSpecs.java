package com.mengyunzhi.integrationTesting.repository.Specs;

import com.mengyunzhi.integrationTesting.entity.User;
import org.springframework.data.jpa.domain.Specification;

/**
 * @author kexiaobin
 */
public class UserSpecs {

    public static Specification<User> containingName(String name) {
        if (name != null) {
            return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name));
        } else {
            return Specification.where(null);
        }
    }
}
