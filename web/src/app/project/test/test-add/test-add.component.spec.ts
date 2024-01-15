import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAddComponent } from './test-add.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {YzPageModule, YzSizeModule} from "@yunzhi/ng-common";
import {RouterTestingModule} from "@angular/router/testing";
import {ReactiveFormsModule} from "@angular/forms";

describe('TestAddComponent', () => {
  let component: TestAddComponent;
  let fixture: ComponentFixture<TestAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestAddComponent ],
      imports: [
        HttpClientTestingModule,
        YzSizeModule,
        YzPageModule,
        RouterTestingModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
