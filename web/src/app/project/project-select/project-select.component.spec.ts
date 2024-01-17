import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSelectComponent } from './project-select.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NzSelectModule} from "ng-zorro-antd/select";
import {FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {forwardRef} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('ProjectSelectComponent', () => {
  let component: ProjectSelectComponent;
  let fixture: ComponentFixture<ProjectSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectSelectComponent ],
      imports: [
        HttpClientTestingModule,
        NzSelectModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR, multi: true,
          useExisting: forwardRef(() => ProjectSelectComponent)
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
