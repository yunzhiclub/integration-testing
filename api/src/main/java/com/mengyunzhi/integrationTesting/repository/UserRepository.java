package com.mengyunzhi.integrationTesting.repository;

import com.mengyunzhi.integrationTesting.entity.User;
import com.mengyunzhi.integrationTesting.repository.Specs.UserSpecs;
import com.sun.istack.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.util.Assert;

import java.util.Optional;

/**
 * @author kexiaobin
 */
public interface UserRepository extends PagingAndSortingRepository<User, Long>, JpaSpecificationExecutor<User> {

    Optional<User> findByUsername(String username);

    default Page<User> getAll(String name,Pageable pageable) {
        Assert.notNull(pageable, "pageable不能为null");
        Specification<User> specification = UserSpecs.containingName(name);
        return this.findAll(specification, pageable);
    }
}
