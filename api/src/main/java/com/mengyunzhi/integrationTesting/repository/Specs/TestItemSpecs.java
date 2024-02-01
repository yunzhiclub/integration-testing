package com.mengyunzhi.integrationTesting.repository.Specs;

import com.mengyunzhi.integrationTesting.entity.TestItem;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.JoinType;

/**
 * @author kexiaobin
 */
public class TestItemSpecs {

    public static Specification<TestItem> beLongTestItem(Long testItemId) {
        return (root, criteriaQuery, criteriaBuilder) ->
                criteriaBuilder.equal(root.join("testCase", JoinType.LEFT).get("id").as(Long.class), testItemId);
    }
}
