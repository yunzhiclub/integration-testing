import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestItemComponent } from './test-item.component';
import {TestCaseModule} from "../../test-case/test-case.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";
import {ProjectModule} from "../../project/project.module";

describe('test->TestItemComponent', () => {
  let component: TestItemComponent;
  let fixture: ComponentFixture<TestItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestItemComponent ],
      imports: [
        TestCaseModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        ProjectModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
