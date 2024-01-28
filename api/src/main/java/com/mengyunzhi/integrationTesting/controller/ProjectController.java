package com.mengyunzhi.integrationTesting.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.mengyunzhi.integrationTesting.dto.ProjectDto;
import com.mengyunzhi.integrationTesting.entity.Project;
import com.mengyunzhi.integrationTesting.service.ProjectService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * @author kexiaobin
 */
@RestController
@RequestMapping("project")
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("page")
    @JsonView(PageAllJsonView.class)
    public Page<Project> pageAll(@SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC)) Pageable pageable, @RequestParam(defaultValue = "") String name) {
        return this.projectService.pageAll(name, pageable);
    }

    @PostMapping
    @JsonView(SavaJsonView.class)
    public Project save(@RequestBody ProjectDto.SaveRequest saveRequest) {
        return this.projectService.save(saveRequest);
    }

    @GetMapping("{id}")
    @JsonView(GetByIdJsonView.class)
    public Project getById(@PathVariable Long id) {
        return this.projectService.getById(id);
    }

    @PutMapping("{id}")
    @JsonView(UpdateJsonView.class)
    public Project update(@PathVariable Long id, @RequestBody ProjectDto.UpdateRequest updateRequest) {
        return this.projectService.update(id, updateRequest);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        this.projectService.delete(id);
    }

    @GetMapping("getAll")
    @JsonView(GetAllJsonView.class)
    public List<Project> getAll() {
        return this.projectService.getAll();
    }

    interface PageAllJsonView {
    }

    interface GetByIdJsonView {
    }

    interface SavaJsonView {
    }

    interface UpdateJsonView {
    }

    interface GetAllJsonView {
    }
}
