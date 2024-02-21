import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NzSelectModule} from "ng-zorro-antd/select";
import {YzPageModule, YzSizeModule} from "@yunzhi/ng-common";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('testAdmin-> IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NzSelectModule,
        YzSizeModule,
        YzPageModule,
        BrowserAnimationsModule
      ]
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
