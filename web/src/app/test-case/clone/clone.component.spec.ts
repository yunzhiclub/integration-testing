import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloneComponent } from './clone.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ProjectModule} from "../../project/project.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('testCase->CloneComponent', () => {
  let component: CloneComponent;
  let fixture: ComponentFixture<CloneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloneComponent ],
      imports: [
        ReactiveFormsModule,
        ProjectModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
