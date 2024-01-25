import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCaseSelectComponent } from './test-case-select.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NzSelectModule} from "ng-zorro-antd/select";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('TestCaseSelectComponent', () => {
  let component: TestCaseSelectComponent;
  let fixture: ComponentFixture<TestCaseSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestCaseSelectComponent ],
      imports: [
        HttpClientTestingModule,
        NzSelectModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],

    })
    .compileComponents();

    fixture = TestBed.createComponent(TestCaseSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
