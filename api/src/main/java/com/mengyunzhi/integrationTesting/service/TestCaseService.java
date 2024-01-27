package com.mengyunzhi.integrationTesting.service;

import com.mengyunzhi.integrationTesting.dto.ProjectDto;
import com.mengyunzhi.integrationTesting.dto.TestCaseDto;
import com.mengyunzhi.integrationTesting.entity.Project;
import com.mengyunzhi.integrationTesting.entity.TestCase;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author kexiaobin
 */
public interface TestCaseService {

    Page<TestCase> pageAll(Long projectId, Pageable pageable);

    TestCase save(TestCaseDto.SaveRequest saveRequest);

    TestCase getById(Long id);

    TestCase update(Long id, TestCaseDto.UpdateRequest updateRequest);

    void delete(Long id);
}
