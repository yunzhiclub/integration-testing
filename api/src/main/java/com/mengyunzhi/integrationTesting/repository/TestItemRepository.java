package com.mengyunzhi.integrationTesting.repository;

import com.mengyunzhi.integrationTesting.entity.TestItem;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * @author kexiaobin
 */
public interface TestItemRepository extends PagingAndSortingRepository<TestItem, Long>, JpaSpecificationExecutor<TestItem> {
}
