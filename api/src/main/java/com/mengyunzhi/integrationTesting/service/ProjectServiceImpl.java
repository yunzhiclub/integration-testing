package com.mengyunzhi.integrationTesting.service;

import com.mengyunzhi.integrationTesting.dto.ProjectDto;
import com.mengyunzhi.integrationTesting.entity.Project;
import com.mengyunzhi.integrationTesting.repository.ProjectRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
import java.util.List;

/**
 * @author kexiaobin
 */
@Service
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public Page<Project> pageAll(String name, Pageable pageable) {
        return this.projectRepository.getAll(name, pageable);
    }

    @Override
    public Project save(ProjectDto.SaveRequest saveRequest) {
        Assert.notNull(saveRequest.getName(), "名称不能为空");
        Assert.notNull(saveRequest.getProjectUrl(), "测试地址不能为空");
        Assert.notNull(saveRequest.getRepositoryUrl(), "代码仓库地址不能为空");

        Project project = new Project();
        project.setProjectUrl(saveRequest.getProjectUrl());
        project.setName(saveRequest.getName());
        project.setRepositoryUrl(saveRequest.getRepositoryUrl());
        return this.projectRepository.save(project);
    }

    @Override
    public Project getById(Long id) {
        return this.projectRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public Project update(Long id, ProjectDto.UpdateRequest updateRequest) {
        Assert.notNull(updateRequest.getName(), "名称不能为空");
        Assert.notNull(updateRequest.getProjectUrl(), "测试地址不能为空");
        Assert.notNull(updateRequest.getRepositoryUrl(), "代码仓库地址不能为空");

        Project project = this.getById(id);
        project.setRepositoryUrl(updateRequest.getRepositoryUrl());
        project.setProjectUrl(updateRequest.getProjectUrl());
        project.setName(updateRequest.getName());
        return this.projectRepository.save(project);
    }

    @Override
    public void delete(Long id) {
        this.projectRepository.deleteById(id);
    }

    @Override
    public List<Project> getAll() {
        return (List<Project>) this.projectRepository.findAll();
    }
}
