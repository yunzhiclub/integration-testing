import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestItemComponent } from './add-test-item.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EditorModule} from "../../editor/editor.module";

describe('AddTestItemComponent', () => {
  let component: AddTestItemComponent;
  let fixture: ComponentFixture<AddTestItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTestItemComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        EditorModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTestItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
