package com.mengyunzhi.integrationTesting.repository;

import com.mengyunzhi.integrationTesting.entity.Project;
import com.mengyunzhi.integrationTesting.entity.User;
import com.mengyunzhi.integrationTesting.repository.Specs.ProjectSpecs;
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
public interface ProjectRepository extends PagingAndSortingRepository<Project, Long>, JpaSpecificationExecutor<Project> {

    default Page<Project> getAll(String name, Pageable pageable) {
        Assert.notNull(pageable, "pageable不能为null");
        Specification<Project> specification = ProjectSpecs.containingName(name);
        return this.findAll(specification, pageable);
    }
}
