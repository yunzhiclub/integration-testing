import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCaseSelectMultipleComponent } from './test-case-select-multiple.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NzSelectModule} from "ng-zorro-antd/select";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('TestCaseSelectComponent', () => {
  let component: TestCaseSelectMultipleComponent;
  let fixture: ComponentFixture<TestCaseSelectMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestCaseSelectMultipleComponent ],
      imports: [
        HttpClientTestingModule,
        NzSelectModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],

    })
    .compileComponents();

    fixture = TestBed.createComponent(TestCaseSelectMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
