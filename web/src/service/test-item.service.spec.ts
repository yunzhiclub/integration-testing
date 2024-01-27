import { TestBed } from '@angular/core/testing';

import { TestItemService } from './test-item.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TestItemService', () => {
  let service: TestItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(TestItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
