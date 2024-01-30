package com.mengyunzhi.integrationTesting.repository;

import com.mengyunzhi.integrationTesting.entity.TestCase;
import com.mengyunzhi.integrationTesting.entity.User;
import com.mengyunzhi.integrationTesting.repository.Specs.TestCaseSpecs;
import com.mengyunzhi.integrationTesting.repository.Specs.UserSpecs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.util.Assert;

/**
 * @author kexiaobin
 */
public interface TestCaseRepository extends PagingAndSortingRepository<TestCase, Long>, JpaSpecificationExecutor<TestCase> {

    default Page<TestCase> getAll(Long projectId, Pageable pageable) {
        Assert.notNull(pageable, "pageable不能为null");
        Specification<TestCase> specification = TestCaseSpecs.belongProject(projectId);
        return this.findAll(specification, pageable);
    }
}
