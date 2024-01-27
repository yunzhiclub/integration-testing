import { TestBed } from '@angular/core/testing';
import {AttachmentService} from "./attachment.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";


describe('AttachmentService', () => {
  let service: AttachmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AttachmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
