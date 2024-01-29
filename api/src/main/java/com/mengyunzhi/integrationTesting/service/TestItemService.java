package com.mengyunzhi.integrationTesting.service;

import com.mengyunzhi.integrationTesting.dto.TestItemDto;
import com.mengyunzhi.integrationTesting.entity.TestItem;

/**
 * @author kexiaobin
 */
public interface TestItemService {
    TestItem save(TestItemDto.SaveRequest saveRequest);

    TestItem getById(Long id);

    TestItem update(Long id, TestItemDto.UpdateRequest updateRequest);

    void delete(Long id);
}
