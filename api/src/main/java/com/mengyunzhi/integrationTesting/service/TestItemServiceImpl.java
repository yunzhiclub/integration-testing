package com.mengyunzhi.integrationTesting.service;

import com.mengyunzhi.integrationTesting.dto.TestItemDto;
import com.mengyunzhi.integrationTesting.entity.TestCase;
import com.mengyunzhi.integrationTesting.entity.TestItem;
import com.mengyunzhi.integrationTesting.repository.TestCaseRepository;
import com.mengyunzhi.integrationTesting.repository.TestItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;

/**
 * @author kexiaobin
 */
@Service
public class TestItemServiceImpl implements TestItemService {
    private final TestItemRepository testItemRepository;
    private final TestCaseRepository testCaseRepository;

    public TestItemServiceImpl(TestItemRepository testItemRepository, TestCaseRepository testCaseRepository) {
        this.testItemRepository = testItemRepository;
        this.testCaseRepository = testCaseRepository;
    }

    @Override
    public TestItem save(TestItemDto.SaveRequest saveRequest) {
        Assert.notNull(saveRequest.getName(), "名称不能为空");
        Assert.notNull(saveRequest.getSteps(), "步骤不能为空");
        Assert.notNull(saveRequest.getExpectedResult(), "预期结果不能为空");
        Assert.notNull(saveRequest.getTestCase(), "测试用例不能为空");

        TestCase testCase = this.testCaseRepository.findById(saveRequest.getTestCase().getId()).orElseThrow(EntityNotFoundException::new);
        TestItem testItem = new TestItem();
        testItem.setTestCase(testCase);
        testItem.setName(saveRequest.getName());
        testItem.setSteps(saveRequest.getSteps());
        testItem.setExpectedResult(saveRequest.getExpectedResult());
        return this.testItemRepository.save(testItem);
    }

    @Override
    public TestItem getById(Long id) {
        return this.testItemRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public TestItem update(Long id, TestItemDto.UpdateRequest updateRequest) {
        Assert.notNull(updateRequest.getName(), "名称不能为空");
        Assert.notNull(updateRequest.getSteps(), "步骤不能为空");
        Assert.notNull(updateRequest.getExpectedResult(), "预期结果不能为空");
        Assert.notNull(updateRequest.getTestCase(), "测试用例不能为空");

        TestCase testCase = this.testCaseRepository.findById(updateRequest.getTestCase().getId()).orElseThrow(EntityNotFoundException::new);
        TestItem testItem = this.getById(id);
        testItem.setTestCase(testCase);
        testItem.setName(updateRequest.getName());
        testItem.setSteps(updateRequest.getSteps());
        testItem.setExpectedResult(updateRequest.getExpectedResult());
        return this.testItemRepository.save(testItem);
    }

    @Override
    public void delete(Long id) {
        this.testItemRepository.deleteById(id);
    }
}
