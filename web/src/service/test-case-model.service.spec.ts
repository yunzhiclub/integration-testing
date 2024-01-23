import { TestBed } from '@angular/core/testing';

import { TestCaseModelService } from './test-case-model.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TestCaseModelService', () => {
  let service: TestCaseModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TestCaseModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
