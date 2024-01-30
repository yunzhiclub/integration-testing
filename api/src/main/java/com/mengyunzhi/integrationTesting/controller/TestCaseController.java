package com.mengyunzhi.integrationTesting.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.mengyunzhi.integrationTesting.dto.TestCaseDto;
import com.mengyunzhi.integrationTesting.entity.TestCase;
import com.mengyunzhi.integrationTesting.entity.TestPlan;
import com.mengyunzhi.integrationTesting.service.TestCaseService;
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
@RequestMapping("testCase")
public class TestCaseController {
    private final TestCaseService testCaseService;

    public TestCaseController(TestCaseService testCaseService) {
        this.testCaseService = testCaseService;
    }

    @GetMapping("page")
    @JsonView(PageJsonView.class)
    public Page<TestCase> page(@SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC))
                               Pageable pageable, @RequestParam Long projectId) {
        return this.testCaseService.pageAll(projectId, pageable);
    }

    @PostMapping
    @JsonView(SaveJsonView.class)
    public TestCase save(@RequestBody TestCaseDto.SaveRequest saveRequest) {
        return this.testCaseService.save(saveRequest);
    }

    @PutMapping("{id}")
    @JsonView(UpdateJsonView.class)
    public TestCase update(@PathVariable Long id, @RequestBody TestCaseDto.UpdateRequest updateRequest) {
        return this.testCaseService.update(id, updateRequest);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        this.testCaseService.delete(id);
    }

    @GetMapping("{id}")
    @JsonView(GetByIdJsonView.class)
    public TestCase getById(@PathVariable Long id) {
        return this.testCaseService.getById(id);
    }

    @PutMapping("toggleCollapse/{id}")
    public Boolean toggleCollapse(@PathVariable Long id) {
        return this.testCaseService.toggleCollapse(id);
    }

    @GetMapping("getTestCaseByProjectId/{id}")
    @JsonView(GetTestCasByyProjectIdJsonView.class)
    public List<TestCase> getTestCaseByProjectId(@PathVariable Long id) {
        return this.testCaseService.getTestCaseByProjectId(id);
    }

    interface PageJsonView extends TestCase.ProjectJsonView, TestCase.TestItemJsonView {
    }

    interface SaveJsonView extends TestCase.ProjectJsonView {
    }

    interface UpdateJsonView extends TestCase.ProjectJsonView {
    }

    interface GetByIdJsonView extends TestCase.ProjectJsonView {
    }

    interface GetTestCasByyProjectIdJsonView {
    }

}
