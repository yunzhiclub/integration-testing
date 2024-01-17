import { TestBed } from '@angular/core/testing';

import { TestPlanService } from './test-plan.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TestPlanServiceService', () => {
  let service: TestPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(TestPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
