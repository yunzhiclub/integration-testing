package com.mengyunzhi.integrationTesting.service;

import com.mengyunzhi.integrationTesting.dto.TestCaseDto;
import com.mengyunzhi.integrationTesting.entity.Project;
import com.mengyunzhi.integrationTesting.entity.TestCase;
import com.mengyunzhi.integrationTesting.entity.TestItem;
import com.mengyunzhi.integrationTesting.repository.ProjectRepository;
import com.mengyunzhi.integrationTesting.repository.TestCaseRepository;
import com.mengyunzhi.integrationTesting.repository.TestItemRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @author kexiaobin
 */
@Service
public class TestCaseServiceImpl implements TestCaseService {
    private final TestCaseRepository testCaseRepository;
    private final ProjectRepository projectRepository;
    private final TestItemRepository testItemRepository;

    public TestCaseServiceImpl(TestCaseRepository testCaseRepository, ProjectRepository projectRepository, TestItemRepository testItemRepository) {
        this.testCaseRepository = testCaseRepository;
        this.projectRepository = projectRepository;
        this.testItemRepository = testItemRepository;
    }

    @Override
    public Page<TestCase> pageAll(Long projectId, Pageable pageable) {
        Page<TestCase> all = this.testCaseRepository.getAll(projectId, pageable);
        all.getContent().forEach(testCase -> {
            List<TestItem> filteredTestItems = testCase.getTestItems().stream()
                    .filter(testItem -> !testItem.getDeleted())
                    .collect(Collectors.toList());
            testCase.setTestItems(filteredTestItems);
        });
        return all;
    }

    @Override
    public TestCase save(TestCaseDto.SaveRequest saveRequest) {
        Assert.notNull(saveRequest.getName(), "名称不能为空");
        Assert.notNull(saveRequest.getTestPurpose(), "测试目的不能为空");
        Assert.notNull(saveRequest.getPreconditions(), "前置条件不能为空");
        Assert.notNull(saveRequest.getProject(), "项目不能为空");

        Project project = this.projectRepository.findById(saveRequest.getProject().getId()).orElseThrow(EntityNotFoundException::new);
        TestCase testCase = new TestCase();
        testCase.setTestPurpose(saveRequest.getTestPurpose());
        testCase.setProject(project);
        testCase.setName(saveRequest.getName());
        testCase.setPreconditions(saveRequest.getPreconditions());
        return this.testCaseRepository.save(testCase);
    }

    @Override
    public TestCase getById(Long id) {
        return this.testCaseRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public TestCase update(Long id, TestCaseDto.UpdateRequest updateRequest) {
        Assert.notNull(updateRequest.getName(), "名称不能为空");
        Assert.notNull(updateRequest.getTestPurpose(), "测试目的不能为空");
        Assert.notNull(updateRequest.getPreconditions(), "前置条件不能为空");
        Assert.notNull(updateRequest.getProject(), "项目不能为空");

        Project project = this.projectRepository.findById(updateRequest.getProject().getId()).orElseThrow(EntityNotFoundException::new);
        TestCase testCase = this.getById(id);
        testCase.setTestPurpose(updateRequest.getTestPurpose());
        testCase.setProject(project);
        testCase.setName(updateRequest.getName());
        testCase.setPreconditions(updateRequest.getPreconditions());

        return this.testCaseRepository.save(testCase);
    }

    @Override
    public void delete(Long id) {
        this.testCaseRepository.deleteById(id);
    }

    @Override
    public Boolean toggleCollapse(Long id) {
        TestCase testCase = this.getById(id);
        testCase.setIsShow(!testCase.getIsShow());
        return this.testCaseRepository.save(testCase).getIsShow();
    }

    @Override
    public List<TestCase> getTestCaseByProjectId(Long id) {
        return this.testCaseRepository.getTestCaseByProjectId(id);
    }

    @Override
    public List<TestCase> addTestCase(Long projectId, TestCaseDto.CloneTestCase cloneTestCase) {
        List<TestCase> testCases = new ArrayList<>();

        cloneTestCase.getTestCases().forEach(v -> {
            List<TestItem> testItems = new ArrayList<>();
            TestCase testCase = this.saveTestCase(projectId, v.getId());
            this.testItemRepository.getBelongTestCase(v.getId()).forEach(value -> {
                testItems.add(this.saveTestItem(testCase, value.getId()));
            });
            testCase.setTestItems(testItems);
            testCases.add(testCase);
        });

        return testCases;
    }


    public TestItem saveTestItem(TestCase testCase, Long id) {
        TestItem testItem = testItemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("TestItem not found with id: " + id));

        TestItem newTestItem = new TestItem();
        newTestItem.setTestCase(testCase);
        newTestItem.setName(testItem.getName());
        newTestItem.setSteps(testItem.getSteps());
        newTestItem.setExpectedResult(testItem.getExpectedResult());

        return testItemRepository.save(newTestItem);
    }

    public TestCase saveTestCase(Long projectId, Long id) {
        TestCase testCase = getById(id);
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));

        TestCase newTestCase = new TestCase();
        newTestCase.setTestPurpose(testCase.getTestPurpose());
        newTestCase.setProject(project);
        newTestCase.setName(testCase.getName());
        newTestCase.setPreconditions(testCase.getPreconditions());

        return testCaseRepository.save(newTestCase);
    }
}
