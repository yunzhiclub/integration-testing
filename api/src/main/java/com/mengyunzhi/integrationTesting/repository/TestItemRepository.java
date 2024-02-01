package com.mengyunzhi.integrationTesting.repository;

import com.mengyunzhi.integrationTesting.entity.TestCase;
import com.mengyunzhi.integrationTesting.entity.TestItem;
import com.mengyunzhi.integrationTesting.repository.Specs.TestItemSpecs;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.*;

/**
 * @author kexiaobin
 */
public interface TestItemRepository extends PagingAndSortingRepository<TestItem, Long>, JpaSpecificationExecutor<TestItem> {

   default List<TestItem> getBelongTestCase(Long testCaseId) {
       Specification<TestItem> specification = TestItemSpecs.beLongTestItem(testCaseId);
       return this.findAll(specification);
    }
}
