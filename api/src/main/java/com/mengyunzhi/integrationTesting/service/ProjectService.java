package com.mengyunzhi.integrationTesting.service;

import com.mengyunzhi.integrationTesting.dto.ProjectDto;
import com.mengyunzhi.integrationTesting.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author kexiaobin
 */
public interface ProjectService {
    Page<Project> pageAll(String name, Pageable pageable);

    Project save(ProjectDto.SaveRequest saveRequest);

    Project getById(Long id);

    Project update(Long id, ProjectDto.UpdateRequest updateRequest);

    void delete(Long id);
}
