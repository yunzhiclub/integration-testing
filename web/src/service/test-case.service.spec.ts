import { TestBed } from '@angular/core/testing';

import { TestCaseService } from './test-case.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TestCaseService', () => {
  let service: TestCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(TestCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
