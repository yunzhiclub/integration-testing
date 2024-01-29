package com.mengyunzhi.integrationTesting.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.mengyunzhi.integrationTesting.dto.TestCaseDto;
import com.mengyunzhi.integrationTesting.dto.TestItemDto;
import com.mengyunzhi.integrationTesting.entity.TestCase;
import com.mengyunzhi.integrationTesting.entity.TestItem;
import com.mengyunzhi.integrationTesting.service.TestItemService;
import org.springframework.web.bind.annotation.*;

/**
 * @author kexiaobin
 */
@RestController
@RequestMapping("testItem")
public class TestItemController {

    private final TestItemService testItemService;

    public TestItemController(TestItemService testItemService) {
        this.testItemService = testItemService;
    }

    @PostMapping
    @JsonView(TestItemController.SaveJsonView.class)
    public TestItem save(@RequestBody TestItemDto.SaveRequest saveRequest) {
        return this.testItemService.save(saveRequest);
    }

    @PutMapping("{id}")
    @JsonView(TestItemController.UpdateJsonView.class)
    public TestItem update(@PathVariable Long id, @RequestBody TestItemDto.UpdateRequest updateRequest) {
        return this.testItemService.update(id, updateRequest);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        this.testItemService.delete(id);
    }

    @GetMapping("{id}")
    @JsonView(TestItemController.GetByIdJsonView.class)
    public TestItem getById(@PathVariable Long id) {
        return this.testItemService.getById(id);
    }

    interface SaveJsonView {
    }

    interface UpdateJsonView  {
    }

    interface GetByIdJsonView extends TestItem.TestCaseJsonView {
    }

}
