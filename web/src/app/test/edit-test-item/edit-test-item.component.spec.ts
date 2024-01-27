import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTestItemComponent } from './edit-test-item.component';
import {RouterTestingModule} from "@angular/router/testing";
import {EditorModule} from "../../editor/editor.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('EditTestItemComponent', () => {
  let component: EditTestItemComponent;
  let fixture: ComponentFixture<EditTestItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTestItemComponent ],
      imports: [
        RouterTestingModule,
        EditorModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        NzSelectModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTestItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
