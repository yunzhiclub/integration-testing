import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleSelectComponent } from './role-select.component';
import {NzSelectModule} from "ng-zorro-antd/select";
import {FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {forwardRef} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('RoleSelectComponent', () => {
  let component: RoleSelectComponent;
  let fixture: ComponentFixture<RoleSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleSelectComponent ],
      imports: [
        NzSelectModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
