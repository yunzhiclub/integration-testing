import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {YzPageModule, YzSizeModule} from "@yunzhi/ng-common";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {forwardRef} from "@angular/core";
import {ProjectSelectComponent} from "../../project/project-select/project-select.component";
import {ProjectModule} from "../../project/project.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('testPlan->IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexComponent ],
      imports: [
        HttpClientTestingModule,
        YzSizeModule,
        YzPageModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        ProjectModule,
        BrowserAnimationsModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
